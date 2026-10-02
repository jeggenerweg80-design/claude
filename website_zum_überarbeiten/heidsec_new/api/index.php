<?php
/**
 * HeidSec Same-Origin API Proxy (D18)
 * ===================================
 * Webspace counterpart of scripts/e2e-proxy.mjs. Every /api/* request that
 * does not map to a real file is rewritten by api/.htaccess to this script,
 * which forwards it to the HeidSec Railway backend.
 *
 * Why: the backend's CORS allowlist only contains https://heidsec.de, and the
 * live webspace Content-Security-Policy restricts connect-src to 'self' (no
 * Railway origin). A same-origin proxy keeps every site→API call on heidsec.de:
 *   - no cross-origin CORS in the browser at all;
 *   - the HttpOnly web-session cookie is stored host-only for heidsec.de and
 *     is automatically sent on every /api/auth/web/* call;
 *   - CSRF double-submit (X-CSRF-Token header + cookie) and the in-memory
 *     Bearer token (Authorization header) pass through unchanged;
 *   - Set-Cookie responses pass through unchanged;
 *   - the response body is streamed, so SSE chat / device telemetry work.
 *
 * Forwarding contract (mirrors scripts/e2e-proxy.mjs):
 *   - method, query string and body forwarded as-is;
 *   - Origin rewritten to https://heidsec.de (backend allowlist);
 *   - Cookie / X-CSRF-Token / Authorization / Content-Type / Accept /
 *     User-Agent / Last-Event-ID forwarded;
 *   - hop-by-hop and CORS response headers stripped, everything else passed.
 *
 * SECURITY: never logs tokens. This script performs no header/body logging at
 * all — only a token-free error_log line on upstream failure.
 */

declare(strict_types=1);

// Suppress PHP warnings/notices — any stray output would corrupt a JSON/SSE
// stream. Real failures surface through the HTTP status / error JSON below.
error_reporting(E_ERROR);
ini_set('display_errors', '0');

const UPSTREAM_BASE  = 'https://heidsec-backend-production.up.railway.app';
const TRUSTED_ORIGIN = 'https://heidsec.de';

// Long-lived streams (SSE) must not be killed by PHP's default time limit.
@set_time_limit(0);

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';

// Only /api/* is proxied. Everything else stays with the static host.
if (!preg_match('#^/api/.*#', $requestUri)) {
    http_response_code(404);
    header('Content-Type: application/json; charset=utf-8');
    echo '{"error":"not found"}';
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$target = UPSTREAM_BASE . $requestUri;

// ── Upstream request headers ─────────────────────────────────────────────
$headers = [];
if (isset($_SERVER['HTTP_ACCEPT']))          $headers[] = 'Accept: ' . $_SERVER['HTTP_ACCEPT'];
if (isset($_SERVER['CONTENT_TYPE'])) {
    $headers[] = 'Content-Type: ' . $_SERVER['CONTENT_TYPE'];
} elseif (isset($_SERVER['HTTP_CONTENT_TYPE'])) {
    $headers[] = 'Content-Type: ' . $_SERVER['HTTP_CONTENT_TYPE'];
}
if (isset($_SERVER['HTTP_COOKIE']))          $headers[] = 'Cookie: ' . $_SERVER['HTTP_COOKIE'];
if (isset($_SERVER['HTTP_X_CSRF_TOKEN']))    $headers[] = 'X-CSRF-Token: ' . $_SERVER['HTTP_X_CSRF_TOKEN'];
if (isset($_SERVER['HTTP_AUTHORIZATION']))   $headers[] = 'Authorization: ' . $_SERVER['HTTP_AUTHORIZATION'];
if (isset($_SERVER['HTTP_USER_AGENT']))      $headers[] = 'User-Agent: ' . $_SERVER['HTTP_USER_AGENT'];
if (isset($_SERVER['HTTP_LAST_EVENT_ID']))   $headers[] = 'Last-Event-ID: ' . $_SERVER['HTTP_LAST_EVENT_ID'];
// Server-to-server hop: present the origin the backend's web-session
// validator / CORS allowlist expects.
$headers[] = 'Origin: ' . TRUSTED_ORIGIN;

// ── Request body ─────────────────────────────────────────────────────────
$body = null;
if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
    $body = file_get_contents('php://input');
    if ($body === false) {
        $body = null;
    }
}

// ── cURL forward (streaming) ─────────────────────────────────────────────
$responseStatus  = 200;
$responseHeaders = [];
$headersSent     = false;

$strip = [
    'connection', 'keep-alive', 'transfer-encoding', 'upgrade',
    'proxy-authenticate', 'proxy-authorization', 'te', 'trailer',
    'content-length', 'content-encoding',
    'access-control-allow-origin', 'access-control-allow-credentials',
    'access-control-expose-headers',
];

// Emit status + collected response headers exactly once.
$flushHeaders = static function () use (&$headersSent, &$responseStatus, &$responseHeaders, $strip): void {
    if ($headersSent) {
        return;
    }
    http_response_code($responseStatus);
    foreach ($responseHeaders as [$name, $value]) {
        if (in_array(strtolower($name), $strip, true)) {
            continue;
        }
        // Set-Cookie may appear multiple times → additive header().
        header($name . ': ' . $value, false);
    }
    header('X-Powered-By-HeidSec: same-origin-api-proxy');
    $headersSent = true;
};

$headerFunction = static function ($ch, string $line) use (&$responseStatus, &$responseHeaders): int {
    $trimmed = trim($line);
    if ($trimmed === '') {
        return strlen($line);
    }
    // Status line: HTTP/1.1 200 OK
    if (preg_match('#^HTTP/\S+\s+(\d{3})#', $trimmed, $m)) {
        $responseStatus = (int) $m[1];
        return strlen($line);
    }
    $colon = strpos($line, ':');
    if ($colon !== false) {
        $responseHeaders[] = [
            trim(substr($line, 0, $colon)),
            trim(substr($line, $colon + 1)),
        ];
    }
    return strlen($line);
};

// Hop-by-hop / CORS headers must not reach the browser; Content-Length is
// dropped so the response streams chunked (SSE compatible).


$writeFunction = static function ($ch, string $chunk) use (&$flushHeaders): int {
    $flushHeaders();
    echo $chunk;
    if (ob_get_level() > 0) {
        ob_flush();
    }
    flush();
    return strlen($chunk);
};

$ch = curl_init($target);
if ($ch === false) {
    http_response_code(502);
    header('Content-Type: application/json; charset=utf-8');
    echo '{"error":"proxy init failed"}';
    exit;
}

curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST  => $method,
    CURLOPT_HTTPHEADER     => $headers,
    CURLOPT_RETURNTRANSFER => false,
    CURLOPT_HEADERFUNCTION => $headerFunction,
    CURLOPT_WRITEFUNCTION  => $writeFunction,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_CONNECTTIMEOUT => 15,
    CURLOPT_TIMEOUT        => 300,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
]);

if ($body !== null && $body !== '') {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

$ok = curl_exec($ch);

if ($ok === false && !$headersSent) {
    // No sensitive data in the log line: no URL, no headers, no body.
    error_log('heidsec same-origin api proxy: curl error ' . curl_errno($ch));
    http_response_code(502);
    header('Content-Type: application/json; charset=utf-8');
    echo '{"error":"proxy upstream error"}';
} elseif ($ok === true && !$headersSent) {
    // Success with an empty body (e.g. 204/304): headers were never emitted
    // by the write callback — send them now so the browser sees the real
    // status and any Set-Cookie the upstream produced.
    $flushHeaders();
}

curl_close($ch);
exit;