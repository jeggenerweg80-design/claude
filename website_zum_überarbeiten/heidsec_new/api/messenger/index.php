<?php
/**
 * HeidSec Messenger Relay (Messaging-/Network-Umfang)
 * ===================================================
 * Minimaler Nachrichten-Relay-Endpunkt für den HeidSec Messenger
 * (app: com.heidsec.messenger.transport.MessageTransportClient).
 *
 * Vertrag (identisch zum Dokumentationskopf der Transport-Clients):
 *   POST /api/messenger          Body: MessageEnvelope-JSON
 *       -> 200 {"accepted":true,"messageId":"<id>"}
 *       -> 400 {"error":"…"}   (fehlende/malformed/widersprüchliche Felder)
 *       -> 413 {"error":"…"}   (Body oder Felder übergroß)
 *       -> 429 {"error":"…","retryAfterSeconds":n} + Retry-After (Postfach voll)
 *   GET  /api/messenger?identity=<id>&cursor=<n>
 *       -> 200 {"messages":[MessageEnvelope…],"cursor":<n>}
 *       -> 400 {"error":"…"}   (identity/cursor invalid)
 *   POST /api/messenger/ack      Body: {"identity":"…","messageIds":[…]}
 *       -> 200 {"acked":[…]}
 *       -> 400 {"error":"…"}   (identity/messageId invalid)
 *       -> 413 {"error":"…"}   (> MAX_ACK_BATCH Einträge)
 *
 * Härtung (Protocol Boundary / Limits / Backpressure):
 *   - Strikte Feldvalidierung: IDs/Identity gegen feste Zeichenklasse und
 *     Längenbegrenzung, protocolVersion nur exakt PROTOCOL_VERSION,
 *     Timestamp plausibel (nicht negativ, nicht weit in der Zukunft),
 *     sender != recipient. Alles Unvollständige/Widersprüchliche → 400.
 *   - Body-Größenlimit (MAX_BODY_BYTES) → 413, bevor der Body gelesen wird.
 *   - Dedupe + Append + ACK sind per flock serialisiert: wiederholte Sends
 *     mit gleicher messageId erzeugen nie eine zweite logische Nachricht,
 *     auch bei konkurrierenden Requests (Idempotenz).
 *   - Ein beschädigtes Postfach führt zu 500, NICHT zu stiller Rücksetzung.
 *   - Nicht-destruktiver Poll mit Cursor (erst ACK entfernt Nachrichten);
 *     Backpressure: MAX_POLL_BATCH je Antwort, MAX_MAILBOX_MESSAGES je
 *     Postfach (→ 429 + Retry-After), MAX_ACK_BATCH je Acknowledge.
 *   - Keine Krypto, keine Inhaltsanalyse, keine Tokens im Log.
 *   - TransportPayload / Peer-Key-Bundle: Server behandelt Payload ausschließlich
 *     als opaque Transportdaten. Keine Trust-, Identity-, Session- oder Key-
 *     Entscheidungen im Network-Layer. Empfangene Payloads werden unverändert
 *     über Relay/Mailbox weitergeleitet; Crypto-Handoff erfolgt ausschließlich
 *     auf Client-Seite.
 *
 * Mailbox-Lifecycle / Retention / Storage-Safety (dieser Stand):
 *   - Postfachzustand ist seq-basiert: jede Nachricht erhält beim Eingang
 *     eine stabile, monoton wachsende seq. Der Poll-Cursor ist eine Position
 *     in dieser seq-Ordnung. ACK-Entfernen, Retention und Migration
 *     verschieben keine Positionen, und neue Nachrichten erhalten stets
 *     höhere seqs — ein gelieferter Cursor bleibt gültig, nachfolgende
 *     Nachrichten können zwischen zwei Polls nicht übersprungen werden.
 *   - Recipient-Isolation: exakt eine Zustandsdatei je Identity (determin-
 *     istisch abgeleitet), Einträge je Empfänger — keine Nachrichten eines
 *     Empfängers in der Mailbox eines anderen.
 *   - Retention/Cleanup: bereits bestätigte Einträge werden beim ACK sofort
 *     entfernt; noch nicht bestätigte Einträge laufen nach
 *     MESSAGE_RETENTION_SECONDS ab Eingang ab (deckelt Nie-ACK-Postfächer);
 *     ein Idle-Sweep räumt abgelaufene Einträge unter dem Postfach-Lock beim
 *     ersten Zugriff nach STATE_SWEEP_INTERVAL_SECONDS ab — Cleanup
 *     komponiert mit parallelem Send/Poll/ACK, gültige noch nicht
 *     abgelaufene Nachrichten werden nie vorzeitig gelöscht. Leere Polls und
 *     ACKs auf unbekannte Postfächer erzeugen keine Dateien.
 *   - Storage-Safety, fail-closed: Schreibvorgänge sind tmp-Datei + rename
 *     (atomar, 'x'-Mode gegen tmp-Überschreiben, flush vor rename); Disk
 *     full / nicht beschreibbar / fehlgeschlagener rename → 500, nie Erfolg
 *     bei unklarer Persistenz. Bytes-leere oder strukturell korrupte
 *     Zustandsdatei → 500 (keine stille Rücksetzung).
 */

declare(strict_types=1);

error_reporting(E_ERROR);
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const DATA_DIR = __DIR__ . '/data/messenger';
const PROTOCOL_VERSION = 1;
const MAX_BODY_BYTES = 262144;          // 256 KiB JSON-Body-Limit
const MAX_TEXT_BYTES = 65536;           // Envelope-Text-Limit
const MAX_PAYLOAD_BYTES = 262144;       // Opaque TransportPayload / Key-Bundle-Limit
const MAX_ID_LENGTH = 191;              // messageId/conversationId/identity
const MAX_DISPLAY_NAME_BYTES = 128;     // optionaler Anzeigename
const MAX_MAILBOX_MESSAGES = 10000;     // Backpressure: Postfach-Kapazität
const MAX_POLL_BATCH = 100;             // Backpressure: Nachrichten je Poll
const MAX_ACK_BATCH = 500;              // Backpressure: messageIds je ACK
const MAILBOX_FULL_RETRY_SECONDS = 60;  // Retry-After bei Postfach voll
const MESSAGE_RETENTION_SECONDS = 1209600; // Retention: 14 Tage ab Eingang
const STATE_SWEEP_INTERVAL_SECONDS = 3600; // Idle-Sweep-Intervall je Postfach
const STATE_VERSION = 2;                // Postfach-Zustandsformat

// IDs sind UUIDs/Hex-Identitäten; feste Zeichenklasse verhindert Pfad- und
// Speicher-Manipulation über Identitätsangaben.
const ID_PATTERN = '/^[A-Za-z0-9][A-Za-z0-9._:@-]{0,' . (MAX_ID_LENGTH - 1) . '}$/';
const CURSOR_PATTERN = '/^\d{1,12}$/';

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_body(): array
{
    $contentLength = $_SERVER['CONTENT_LENGTH'] ?? null;
    if (is_string($contentLength) && preg_match('/^\d+$/', $contentLength) === 1
        && (int) $contentLength > MAX_BODY_BYTES) {
        respond(413, ['error' => 'body too large']);
    }
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        respond(400, ['error' => 'empty body']);
    }
    if (strlen($raw) > MAX_BODY_BYTES) {
        respond(413, ['error' => 'body too large']);
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        respond(400, ['error' => 'body is not a JSON object']);
    }
    return $decoded;
}

function mailbox_path(string $identity): string
{
    return DATA_DIR . '/' . preg_replace('/[^A-Za-z0-9._-]/', '_', $identity) . '.json';
}

/**
 * Serialisiert alle Lese-Schreib-Zugriffe auf ein Postfach. respond() verlässt
 * den Prozess; finally gibt den Lock trotzdem frei.
 */
function with_mailbox_lock(string $identity, callable $fn): void
{
    if (!is_dir(DATA_DIR) && !mkdir(DATA_DIR, 0770, true) && !is_dir(DATA_DIR)) {
        respond(500, ['error' => 'storage unavailable']);
    }
    $handle = fopen(mailbox_path($identity) . '.lock', 'c');
    if ($handle === false) {
        respond(500, ['error' => 'storage unavailable']);
    }
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        respond(500, ['error' => 'storage lock failed']);
    }
    try {
        $fn();
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

/** PHP-7-kompatible Prüfung „Liste ohne Lücken“ (array_is_list ist PHP ≥ 8.1). */
function is_plain_list(array $value): bool
{
    if ($value === []) {
        return true;
    }
    return array_keys($value) === range(0, count($value) - 1);
}

/**
 * Strikte Strukturprüfung eines Zustandseintrags: korrupte Einträge sind ein
 * Storage-Fehler (fail-closed), keine still verworfenen Daten.
 */
function valid_entry(mixed $entry): bool
{
    if (!is_array($entry) || !isset($entry['envelope']) || !is_array($entry['envelope'])) {
        return false;
    }
    if (!isset($entry['messageId']) || !is_string($entry['messageId']) || $entry['messageId'] === '') {
        return false;
    }
    if (!array_key_exists('ack', $entry) || !is_bool($entry['ack'])) {
        return false;
    }
    if (!isset($entry['seq']) || !is_int($entry['seq']) || $entry['seq'] < 1) {
        return false;
    }
    if (!isset($entry['receivedAt']) || !is_int($entry['receivedAt']) || $entry['receivedAt'] < 0) {
        return false;
    }
    return true;
}

/**
 * Liest den seq-basierten Postfachzustand. Bytes-leere oder strukturell
 * korrupte Bestände führen zu 500, nie zu stiller Rücksetzung. Legacy-
 * Postfächer (Liste von Envelopes) werden beim ersten Zugriff deterministisch
 * migriert — kein Eintrag geht dabei verloren.
 *
 * @return array{version:int,nextSeq:int,sweptAt:int,messages:array<string,array>}
 */
function load_state(string $identity): array
{
    $path = mailbox_path($identity);
    if (!is_file($path)) {
        return ['version' => STATE_VERSION, 'nextSeq' => 1, 'sweptAt' => 0, 'messages' => []];
    }
    $raw = file_get_contents($path);
    if ($raw === false) {
        respond(500, ['error' => 'storage read failed']);
    }
    if (trim($raw) === '') {
        // Bytes-leere Datei = unterbrochener Schreibvorgang: fail-closed.
        respond(500, ['error' => 'mailbox corrupt']);
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        respond(500, ['error' => 'mailbox corrupt']);
    }
    if (isset($decoded['version']) && $decoded['version'] === STATE_VERSION
        && isset($decoded['nextSeq']) && is_int($decoded['nextSeq']) && $decoded['nextSeq'] >= 1
        && isset($decoded['messages']) && is_array($decoded['messages'])
        && ((isset($decoded['sweptAt']) && is_int($decoded['sweptAt']) && $decoded['sweptAt'] >= 0)
            || !array_key_exists('sweptAt', $decoded))) {
        foreach ($decoded['messages'] as $messageId => $entry) {
            if (!is_string($messageId) || $messageId === '' || !valid_entry($entry)
                || $entry['messageId'] !== $messageId) {
                respond(500, ['error' => 'mailbox corrupt']);
            }
        }
        $decoded['sweptAt'] = $decoded['sweptAt'] ?? 0;
        return $decoded;
    }
    // Migration: Legacy-Postfach (Liste von Envelopes, inklusive leerem []).
    // Einträge gelten als unbestätigt; receivedAt wird konservativ aus dem
    // plausibilisierten sentAt des Envelopes abgeleitet (nie in der Zukunft,
    // daher feuert Retention nicht früher als nach voller Haltedauer).
    if (is_plain_list($decoded)) {
        $messages = [];
        $now = time();
        foreach ($decoded as $item) {
            if (!is_array($item) || !isset($item['messageId']) || !is_string($item['messageId'])
                || $item['messageId'] === '' || isset($messages[$item['messageId']])) {
                respond(500, ['error' => 'mailbox corrupt']);
            }
            $receivedAt = isset($item['sentAtEpochMillis']) && is_int($item['sentAtEpochMillis'])
                && $item['sentAtEpochMillis'] > 0
                ? (int) min($now, intdiv($item['sentAtEpochMillis'], 1000))
                : $now;
            $messages[$item['messageId']] = [
                'envelope' => $item,
                'ack' => false,
                'seq' => count($messages) + 1,
                'receivedAt' => $receivedAt,
            ];
        }
        return [
            'version' => STATE_VERSION,
            'nextSeq' => count($messages) + 1,
            'sweptAt' => 0,
            'messages' => $messages,
        ];
    }
    respond(500, ['error' => 'mailbox corrupt']);
}

/**
 * Atomarer, fail-closed Schreibvorgang: JSON in eine temporäre Datei im
 * selben Verzeichnis schreiben ('x'-Mode, flush), dann atomar auf die
 * Zieldatei umbenennen. Jeder Fehler (Disk full, nicht beschreibbar,
 * fehlgeschlagener rename) wird gemeldet — niemals Erfolg bei unklarer
 * Persistenz.
 */
function save_state(string $identity, array $state): void
{
    $json = json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        respond(500, ['error' => 'storage encode failed']);
    }
    $target = mailbox_path($identity);
    $tmp = $target . '.' . getmypid() . '.tmp';
    $handle = @fopen($tmp, 'x');
    if ($handle === false) {
        // 'x' verhindert das Überschreiben einer existierenden tmp-Datei;
        // eine verwaiste tmp-Datei eines abgebrochenen Vorgangs wird genau
        // einmal ersetzt, sonst fail-closed.
        if (!is_file($tmp) || !@unlink($tmp)) {
            respond(500, ['error' => 'storage write failed']);
        }
        $handle = @fopen($tmp, 'x');
        if ($handle === false) {
            respond(500, ['error' => 'storage write failed']);
        }
    }
    $written = fwrite($handle, $json);
    $flushed = $written !== false && $written === strlen($json) && fflush($handle);
    fclose($handle);
    if (!$flushed || !rename($tmp, $target)) {
        if (is_file($tmp)) {
            @unlink($tmp); // fehlgeschlagener Versuch: tmp aufräumen
        }
        respond(500, ['error' => 'storage write failed']);
    }
}

function valid_identity(mixed $value): bool
{
    return is_string($value) && preg_match(ID_PATTERN, $value) === 1;
}

/** Strikte Envelope-Prüfung: vollständig, wohlgeformt, plausibel, widerspruchsfrei. */
function valid_envelope(array $e): bool
{
    foreach (['messageId', 'conversationId', 'senderIdentityId', 'recipientIdentityId'] as $key) {
        if (!valid_identity($e[$key] ?? null)) {
            return false;
        }
    }
    // Widerspruch: Absender und Empfänger identisch → Ablehnung statt Selbst-Loop.
    if ($e['senderIdentityId'] === $e['recipientIdentityId']) {
        return false;
    }
    if (array_key_exists('senderDisplayName', $e)) {
        $name = $e['senderDisplayName'];
        if (!is_string($name) || strlen($name) > MAX_DISPLAY_NAME_BYTES) {
            return false;
        }
    }
    // TransportPayload / Key-Bundle: opaque, keine Inhaltsprüfung, nur Größen-/Typ-Kontrolle.
    // Legacy Text-Nachrichten bleiben unterstützt. SC-02 Bootstrap-Umschläge
    // senden Text LEER ("") mit gesetzter Payload — Text ist nur ohne Payload
    // Pflichtfeld, damit Bootstrap-Zustellung nicht an der Textgrenze scheitert.
    $hasText = isset($e['text']) && is_string($e['text']);
    $hasPayload = isset($e['payload']) && is_string($e['payload']);
    if (!$hasText && !$hasPayload) {
        return false;
    }
    if ($hasText) {
        if ($e['text'] === '' && !$hasPayload) {
            return false;
        }
        if (strlen($e['text']) > MAX_TEXT_BYTES) {
            return false;
        }
    }
    if ($hasPayload) {
        if (strlen($e['payload']) > MAX_PAYLOAD_BYTES) {
            return false;
        }
    }
    $sentAt = $e['sentAtEpochMillis'] ?? null;
    if (!is_int($sentAt) || $sentAt <= 0 || $sentAt > (time() * 1000) + 86400000) {
        return false;
    }
    // Protokollversion: exakt die unterstützte Version — keine stillen Upgrades.
    if (array_key_exists('protocolVersion', $e) && $e['protocolVersion'] !== PROTOCOL_VERSION) {
        return false;
    }
    return true;
}

/**
 * Retention/Cleanup: entfernt abgelaufene (MESSAGE_RETENTION_SECONDS ab
 * Eingang) Einträge aus dem Zustand. Bestätigte Einträge werden beim ACK
 * direkt entfernt; dieser Sweep räumt zusätzlich verwaiste/abgelaufene
 * Bestände ab. Läuft immer unter dem Postfach-Lock und komponiert daher mit
 * parallelem Send/Poll/ACK. Gültige, noch nicht abgelaufene, unbestätigte
 * Nachrichten bleiben erhalten.
 *
 * @return array{0:array,1:bool} [state, changed]
 */
function purge_expired(array $state): array
{
    $now = time();
    $changed = false;
    foreach ($state['messages'] as $messageId => $entry) {
        if ($entry['receivedAt'] + MESSAGE_RETENTION_SECONDS <= $now) {
            unset($state['messages'][$messageId]);
            $changed = true;
        }
    }
    return [$state, $changed];
}

/**
 * Idle-Sweep: räumt auch dann, wenn kein Send/Poll/ACK mehr kommt — beim
 * ersten Zugriff nach STATE_SWEEP_INTERVAL_SECONDS unter dem Postfach-Lock.
 *
 * @return array{0:array,1:bool} [state, changed]
 */
function maybe_sweep(array $state): array
{
    $now = time();
    if (($now - (int) $state['sweptAt']) < STATE_SWEEP_INTERVAL_SECONDS) {
        return [$state, false];
    }
    [$state, $changed] = purge_expired($state);
    $state['sweptAt'] = $now;
    return [$state, true];
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$isAck = (bool) preg_match('#/api/messenger/ack$#', $_SERVER['SCRIPT_URL'] ?? ($_SERVER['REQUEST_URI'] ?? ''));

if ($method === 'POST' && $isAck) {
    // ── ACK: Empfangsbestätigungen entfernen Nachrichten aus dem Postfach ──
    $body = read_json_body();
    if (!valid_identity($body['identity'] ?? null)) {
        respond(400, ['error' => 'valid identity required']);
    }
    $identity = trim((string) $body['identity']);
    $messageIdsRaw = $body['messageIds'] ?? null;
    if (!is_array($messageIdsRaw)) {
        respond(400, ['error' => 'messageIds array required']);
    }
    if (count($messageIdsRaw) > MAX_ACK_BATCH) {
        respond(413, ['error' => 'too many messageIds']);
    }
    // Kein stilles Herausfiltern: jeder Eintrag muss ein gültiger ID-String sein.
    foreach ($messageIdsRaw as $messageId) {
        if (!valid_identity($messageId)) {
            respond(400, ['error' => 'invalid messageId']);
        }
    }
    /** @var list<string> $messageIds */
    $messageIds = array_values(array_unique($messageIdsRaw));

    with_mailbox_lock($identity, static function () use ($identity, $messageIds): void {
        $stateExisted = is_file(mailbox_path($identity));
        $state = load_state($identity);
        $changed = false;
        if ($stateExisted) {
            [$state, $swept] = maybe_sweep($state);
            $changed = $swept;
        }
        foreach ($messageIds as $messageId) {
            if (isset($state['messages'][$messageId])) {
                // Bestätigt → sofort entfernen: der Postfachspeicher bleibt
                // klein, und der seq-basierte Cursor bleibt unberührt (ACK
                // verschiebt keine Positionen anderer Nachrichten).
                unset($state['messages'][$messageId]);
                $changed = true;
            }
            // Idempotent: bereits bestätigte (bereits entfernte) IDs bleiben
            // "acked" — ein wiederholter ACK setzt nichts zurück.
        }
        if ($changed && $stateExisted) {
            save_state($identity, $state);
        }
        respond(200, ['acked' => $messageIds]);
    });
}

if ($method === 'POST') {
    // ── SEND: Umschlag entgegennehmen (idempotent je messageId) ──────────
    $envelope = read_json_body();
    if (!valid_envelope($envelope)) {
        respond(400, ['error' => 'invalid envelope']);
    }
    $recipient = $envelope['recipientIdentityId'];

    with_mailbox_lock($recipient, static function () use ($envelope, $recipient): void {
        $stateExisted = is_file(mailbox_path($recipient));
        $state = load_state($recipient);
        if ($stateExisted) {
            [$state, $swept] = maybe_sweep($state);
            if ($swept) {
                save_state($recipient, $state);
            }
        }
        if (isset($state['messages'][$envelope['messageId']])) {
            // Duplikat (Retry nach Timeout/Redelivery): bereits eingereiht —
            // ack, keine zweite logische Nachricht, kein Retention-Reset.
            respond(200, ['accepted' => true, 'messageId' => $envelope['messageId']]);
        }
        if (count($state['messages']) >= MAX_MAILBOX_MESSAGES) {
            // Backpressure: 429 mit Retry-After statt wahllosem 503.
            header('Retry-After: ' . MAILBOX_FULL_RETRY_SECONDS);
            respond(429, [
                'error' => 'mailbox full',
                'retryAfterSeconds' => MAILBOX_FULL_RETRY_SECONDS,
            ]);
        }
        // Lifecycle: stabile seq vergeben, Eingangszeit für die Retention
        // festhalten — ACK/Retention entfernen den Eintrag später
        // deterministisch wieder. sweptAt wird hier gestempelt, damit der
        // erste Zugriff auf das neue Postfach keinen redundanten Sweep-Save
        // auslöst.
        $state['sweptAt'] = time();
        $state['messages'][$envelope['messageId']] = [
            'envelope' => $envelope,
            'ack' => false,
            'seq' => $state['nextSeq'],
            'receivedAt' => time(),
        ];
        $state['nextSeq']++;
        save_state($recipient, $state);
        respond(200, ['accepted' => true, 'messageId' => $envelope['messageId']]);
    });
}

if ($method === 'GET') {
    // ── POLL: Postfach oberhalb des Cursors lesen (nicht-destruktiv) ─────
    $identityRaw = $_GET['identity'] ?? null;
    if (!is_string($identityRaw) || !valid_identity(trim($identityRaw))) {
        respond(400, ['error' => 'valid identity required']);
    }
    $identity = trim($identityRaw);
    $cursorRaw = $_GET['cursor'] ?? '0';
    if (!is_string($cursorRaw) || preg_match(CURSOR_PATTERN, $cursorRaw) !== 1) {
        respond(400, ['error' => 'invalid cursor']);
    }
    $cursor = (int) $cursorRaw;

    with_mailbox_lock($identity, static function () use ($identity, $cursor): void {
        $stateExisted = is_file(mailbox_path($identity));
        $state = load_state($identity);
        if ($stateExisted) {
            [$state, $swept] = maybe_sweep($state);
            if ($swept) {
                save_state($identity, $state);
            }
        }
        // Cursor-stabiler Poll: Zustand nach seq sortiert ausliefern; der
        // Cursor ist eine Position in der seq-Ordnung. ACK-Entfernen,
        // Retention und Migration verschieben keine Positionen, und neue
        // Nachrichten erhalten stets höhere seqs — zwischen zwei Polls kann
        // keine Nachricht übersprungen werden. Ein leerer Poll erzeugt keine
        // Postfachdatei.
        $entries = array_values($state['messages']);
        usort($entries, static fn (array $a, array $b): int => $a['seq'] <=> $b['seq']);
        $delivered = [];
        $nextCursor = $cursor;
        // Storage-Verlust-Erkennung: zeigt der Cursor hinter die höchste je
        // vergebene seq (nextSeq - 1), stammt er aus einem Storage-Stand, den
        // es hier nicht mehr gibt — dann von vorn ausliefern. Der Client
        // dedupliziert an der messageId und ackt erneut; es geht keine
        // Nachricht verloren und das Postfach leert sich selbst.
        $fromBeginning = $cursor > $state['nextSeq'] - 1;
        foreach ($entries as $entry) {
            if (!$fromBeginning && $entry['seq'] <= $cursor) {
                continue;
            }
            $delivered[] = $entry['envelope'];
            $nextCursor = $entry['seq'];
            // Backpressure: Antwortgröße begrenzen; Rest im nächsten Poll.
            if (count($delivered) >= MAX_POLL_BATCH) {
                break;
            }
        }
        respond(200, ['messages' => $delivered, 'cursor' => $nextCursor]);
    });
}

respond(405, ['error' => 'method not allowed']);
