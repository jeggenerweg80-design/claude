import{c as B}from"./index-Btarnaie.js";import{a as o}from"./framer-motion-DYQYoNvX.js";import{F as U,A as R}from"./heidsec-api-DWaVkzfm.js";const j=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],Ve=B("arrow-up",j);function Y(n){return n.toLowerCase().replace(/ß/g,"ss")}const t={greeting:/^(hallo+|hi|hey|hej|moin|servus|na|guten\s+(tag|morgen|abend))[\s!,.?]*(wie\s+geht(?:['’]s|s)?(?:\s+dir)?[?!.]*)?$/,howAreYou:/^(?:na[\s,!]+|und\s+)?wie\s+geht\s*(?:'?s|es|s)?(?:\s+(?:es\s+)?(?:dir|ihnen|euch|es))?[\s!?,.()]*$/,bye:/^(tschuess|tschüss|ciao|bye|bis\s+(dann|bald))[\s!,.?]*$/,thanks:/(\bdanke\b|dankeschoen|dankeschön|\bmerci\b)/,chitchat:/^(ok(ay)?|alles klar|aha|verstanden|super|gut|perfekt|na klar|stimmt|ja genau|genau)[\s!.,]*$/,about:/wer bist du|was bist du|wie heißt du|wie heisst du|was kannst du(\s+eigentlich)?|was kannst du mir (sagen|helfen)|was kann ich (dich\s+)?fragen|was kannst du alles|^hilfe$/,tariffOverview:/\btarif\w*|\bangebote\b/,planExplain:/(was\s+ist\s+(?:in\s+)?(?:der|die|das|dem)?\s*|was\s+sind\s+|was\s+steckt\s+in\s+(?:dem|der)?\s*|was\s+kann\s+(?:der|die|das)?\s*|enthalten\s+in\s+(?:dem|der)?\s*|erklär\w*\s+(?:mir\s+)?(?:den|die|das)?\s*|wie\s+funktioniert\s+(?:der|die|das)?\s*|info\w*\s+zu\s+(?:dem|der)?\s*|mehr\s+über\s+(?:den|die|das)?\s*)(free|pro|ki)\b/,tariffSwitch:/tarif\w*\s*wechs\w*|wechs\w*\s+.*\btarif\b/,trouble:/(funktioniert nicht|geht nicht|verbindet nicht|erscheint nicht|startet nicht|klappt nicht|hängt|bricht ab|stoppt|crasht|\bfehler\b|probleme?\b|nicht mehr|scheitert|kann mich nicht|ausgesperrt|komme nicht (mehr )?(rein|hinein)|kein zugang|offline|nicht erreichbar|wartung|einloggprobleme?|loginprobleme?)/,register:/(registrier|konto\s+erstellen|neues\s+konto|account\s+erstellen|sign\s?up|anmeldung\s+als\s+neuer\s+kunde)/,moduleInclusion:/(enthalten|inklusive?|\bextra\b|separat|dazubuchen|dazu\s+buchen|gehört\w*\s+.*\bdazu\b|brauche\s+ich\s+.*\bextra\b|wenn\s+ich\s+(?:den\s+|die\s+|das\s+)?(free|pro|ki)\s+habe|bei\s+(?:free|pro|ki)\s+dabei|mit\s+(?:free|pro|ki)\s+dabei)/,password:/passwort/,twofactor:/2fa|zwei-?faktor/,login:/\blogin\b|anmeld\w*|einlogg\w*|logg\w*\s+(?:ich\s+)?mich\s+ein|meld\w*\s+(?:ich\s+)?mich\s+an|zugangsdaten/,widerruf:/widerruf/,cancel:/künd|kuend/,contract:/\bvertrag/,planAdvice:/welchen?\s+tarife?|welche\s+tarife?\s|tarife?.{0,24}(familie|brauch|empfehl|passt|sind)|familie.{0,24}(tarif|paket)|fuer meine familie|für meine familie/,recommendation:/was\s+w(?:ü|u)rdest\s+du\s+mir\s+empfehlen|was\s+empf(?:iehl|ie)st\s+du(?:\s+einer?\s+familie)?|welcher\s+(?:tarif|schutz|umfang)\s+passt/,compare:/(unterscheid\w*|unterschied\w*|vergleich|\bvs\.?\b|genau anders|besser als|oder eher)/,planWord:/\bfree\b|\bpro\b|\bki\b|\btarif|pakete?\b/,legacyPlan:/\bultimate\b|\bsuite\s+ultimate\b/,legacyPlanNames:/\b(mainapp|main\s?app|security\s+(?:pro|ki|free|ultimate)|security[-\s]+(?:pro|ki))\b/i,billing:/(rechnung|zahlung|\bstripe\b|play[\s-]?store|abo-?verwaltung|\babonnement|\babos?\b|verlänger|verlaenger|laufzeit|\bpremium\b)/,pricing:/(\bpreis\w*|kostenlos|\bkosten\b|\bkostet\b|\bteuer\w*|günstig\w*|guenstig\w*|billig\w*|€|\beuro\b|monatlich|j[aä]hrlich|jaehrlich|\babo-?preis\w*|im\s+(monat|jahr)|pro\s+(monat|jahr)|\bmonat\b)/,license:/(lizenz\w*|license|produktschl(?:ü|ue)ssel|aktivierungscode|aktivierungsschl(?:ü|ue)ssel|seriennummer|\bkey\b|\bcode\s+eingeben\b|freischalt\w*|entitlement\w*|berechtigung\w*)/,pairing:/pairing|koppeln|koppelcode|gerät(e)? verbinden|verbinden.{0,16}app/,sessions:/sitzung/,device:/\bgerät|\bgeraet|\bdevice\b|geräteliste/,account:/(\bkonto\b|\baccount\b|\bprofil\b|kundebereich|kundenbereich)/,privacy:/(datenschutz|dsgvo|privatsphaere|privatsphäre|personenbezogen|verkauft.{0,12}daten|verkauf.{0,12}daten|weitergabe|daten speicher|speichert.{0,20}daten|dateien lesen|mitlesen|einsehen kann|einblick)/,legal:/(impressum|\bagb\b|datenschutzerklaerung|datenschutzerklärung|\blegal\b|rechtlich)/,support:/(\bsupport\b|\bkontakt\b|kundendienst|heidsec erreichen|hotline)/,compatibility:/(\bandroid\b|version\s*\d|unterstützt|kompatibel|systemvorau|anforderung|mindestversion)/,av:/(virenschutz|antivirus|virenscanner|klassischen? schutz|normale[nm] virenschutz)/,beginner:/(anfänger|anfaenger|einfach erklärt|einfach erklaert|kindgerecht|für laien|laien)/,featureGeneric:/(\bfeatures?\b|funktionen\b|was kann (man|heidsec)|leistungen\b|umfang)/,cyber:/(phishing|betrugsmail|\bscam\b|\bvirus\b|malware|trojaner|sicheres? passwort|starke passwörter|passwörter merken|öffentliche?s?\s+wlans?|\bwlans?\b|gestohlen|gehackt|dritte zugreifen)/,productGeneric:/(was ist heidsec|überblick|\bprodukte?\b|\bmodule\b|plattform|\bapp\b.*\bfunktion|wofür ist heidsec)/,anaphor:/\b(das|dieses|diese|dem|ihm|damit|es|sie|er)\b/,followup:/\b(mehr|genauer?|details|weiter|und\b|das\b|davon|damit|auch\b|beispiel|nochmal|er\b|sie\b|es\b|wie\s+meinst\s+du\s+das|was\s+meinst\s+du)\b/},Z=[["vpn",/\bvpn\b|\btunnel\b|hotel[- ]?wlan|standort unsichtbar/],["mailguard",/mailguard|posteingang|quarantäne|quantaene|verdächtig\w* anhang|schädliche anhänge|phishing.*mailguard/],["vault",/vault|\btresor\b|datengewölbe|dokumente verschlüsselt|dateien verschlüsselt/],["parental",/kinderschutz|parental control|kindersicherung|\bkinder(n)?\b.*schutz|schutz.*kinder/],["smartscan",/smart[\s-]?scan|\bsecapp\b|sicherheitszentrum|apps scannen/],["schutzcenter",/schutzcenter|\bcore\b|analyse-engine|\bengine\b|schutzschichten/]];function $(n){const r=[];for(const[e,d]of Z)d.test(n)&&r.push(e);return r}function q(n){if(/\bfree\b/.test(n))return"free";if(/\bki\b/.test(n))return"ki";if(/\bpro\b/.test(n))return"pro"}const i=[{source:"knowledge",title:"HeidSec Wissensbasis (heidsec.de)"}],h=[{source:"terms",title:"AGB § 3/§ 4 (heidsec.de)"}],C=[{source:"privacy",title:"Datenschutzerklärung (heidsec.de)"}],V=[{source:"faq",title:"heidsec.de FAQ"}],z=[{source:"support",title:"HeidSec Support (heidsec.de/support)"}],Q=[{source:"general",title:"Allgemeine Sicherheitshinweise"}],A={smartscan:{text:`Smart Scan (in der App intern SecApp genannt) ist dein Sicherheitszentrum in der Tasche: Er scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich, bevor aus einem Klick ein Problem wird.

• Echtzeit-Scan aller Apps
• Sofortige Warnung bei Auffälligkeiten
• Status auf einen Blick`,sources:i},mailguard:{text:`MailGuard überwacht deinen Posteingang und hält Phishing, Betrug und schädliche Anhänge fern — bevor sie dich erreichen.

• Verdächtige Anhänge werden erkannt und landen lautlos in der Quarantäne, statt sie zu öffnen.
• Erkennung von Phishing- und Betrugsversuchen
• Schutz für alle deine Postfächer`,sources:i},vault:{text:`Vault legt Dokumente, Zugänge und Geheimnisse in einen verschlüsselten Raum, zu dem nur du den Schlüssel hältst — auf all deinen Geräten synchron.

Zur Sicherheit: Laut Datenschutzerklärung ist der Inhalt Ende-zu-Ende-verschlüsselt — die Server erhalten ausschließlich Chiffretext und können deine Dateien nicht lesen.`,sources:i},vpn:{text:`HeidSec VPN kapselt deine Verbindung und macht deinen Standort unsichtbar — gerade in öffentlichen Netzen wie dem Hotel-WLAN sinnvoll, weil dort Mitnutzer theoretisch den Datenverkehr mitlesen können.

Laut Datenschutzerklärung beschränken sich erhobene VPN-Verbindungsdaten auf Verbindungszeitpunkt, zugewiesene Gateway-Adresse und übertragene Datenmenge.`,sources:i},parental:{text:`Der Kinderschutz ist die Kindersicherungsfunktion (Parental Control) von HeidSec: Er hilft Eltern, den digitalen Alltag ihrer Kinder altersgerecht und sicher zu gestalten.

Den konkreten Funktionsumfang zeigt die HeidSec-App unter dem Modul Kinderschutz — ich nenne hier bewusst nur Belegtes.`,sources:i},schutzcenter:{text:`Das Schutzcenter ist das Herz von HeidSec: Eine Analyse-Engine bewertet jedes Signal einmal und speist die Erkenntnis sofort in alle Produkte — vom Smartphone bis zum verschlüsselten Tunnel.

• Einmal erkannt — überall abgewehrt
• Gerät, Posteingang, Ablage und Verbindung als ein System (vier Schutzschichten)
• Klare Entscheidungen statt Alarmflut`,sources:i}},J={text:`HeidSec bündelt sechs Sicherheitsmodule in einem System — eine Engine, mehrere Schutzschichten, ein Konto:

• Smart Scan — mobiles Sicherheitszentrum (App-intern SecApp)
• MailGuard — Posteingang unter Kontrolle
• Vault — verschlüsselter Raum
• VPN — privater Tunnel
• Schutzcenter — eine Engine, vier Schutzschichten
• Kinderschutz — altersgerechte Sicherheit für Familien

Zu welchem Modul möchtest du mehr erfahren?`,sources:i},X={text:`Ganz einfach erklärt: HeidSec ist eine App für dein Smartphone, die mehrere Schutzhelfer gleichzeitig vereint.

• Smart Scan prüft deine Apps und Verbindungen.
• MailGuard sortiert gefährliche Mails aus.
• Vault ist ein Tresor für Dokumente und Passwörter.
• VPN versteckt deinen Standort im Netz.
• Das Schutzcenter fasst alles zusammen, der Kinderschutz hilft Familien.

Du brauchst dafür ein Android-Smartphone ab Version 8.0. Alles Weitere kannst du nach der Anmeldung Schritt für Schritt in der App entdecken.`,sources:i},ee={text:`Klassischer Virenschutz konzentriert sich auf Schadsoftware auf dem Gerät. HeidSec denkt breiter — sechs Module als ein System:

• Smart Scan: Geräte- und App-Schutz auf dem Smartphone
• MailGuard: Phishing und Betrug schon im Posteingang stoppen
• Vault: Ende-zu-Ende-verschlüsselter Tresor für Dokumente und Zugänge
• VPN: privater Tunnel für deine Verbindung
• Kinderschutz: altersgerechte Sicherheit für Familien
• Schutzcenter: eine zentrale Engine, die alle Module speist — einmal erkannt, überall abgewehrt

Ich behaupte hier bewusst nichts über Erkennungsraten — den Funktionsumfang findest du belegt auf heidsec.de und in der App.`,sources:i};function G(n){const r="Vault, MailGuard, VPN und Kinderschutz sind separate Module und werden einzeln dazugebucht. Die genauen Preise zeigt dir der Tarifkatalog in deinem HeidSec-Konto.";switch(n){case"free":return{text:`HeidSec Free ist der kostenlose Tarif mit dem Smart-Scan-Schutz (Scanner) für dein Smartphone — ohne feste Laufzeit und jederzeit beendbar.

${r}`,sources:h};case"pro":return{text:`Pro baut auf Free auf und ergänzt das Schutzcenter (die Core-Engine, die alle Schutzschichten zusammenführt) — wahlweise als Monats- oder Jahresabonnement.

${r}`,sources:h};case"ki":return{text:`KI baut auf Pro auf und ergänzt die Security-AI — die Analyse läuft ausschließlich lokal auf deinem Gerät, es werden keine KI-Daten übertragen.

${r}`,sources:h};default:return{text:`Die aktuellen Tarife:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine).
• KI — Pro plus Security-AI; die Analyse läuft ausschließlich lokal auf deinem Gerät.

Vault, MailGuard, VPN und Kinderschutz sind separate Module und werden einzeln dazugebucht. Preise und verfügbare Kombinationen zeigt dir der aktuelle Tarifkatalog in deinem HeidSec-Konto.`,sources:h}}}function ne(n){return n==="free"?G("free"):null}function W(n){const r={smartscan:"Smart Scan",mailguard:"MailGuard",vault:"Vault",vpn:"VPN",parental:"der Kinderschutz",schutzcenter:"das Schutzcenter"};return n==="smartscan"?{text:`Ja — Smart Scan (Scanner) ist Teil des kostenlosen Free-Tarifs. Pro baut darauf auf (Schutzcenter), KI ergänzt die Security-AI.

Die genauen Preise zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:i}:n==="schutzcenter"?{text:`Das Schutzcenter (die Core-Engine) steckt im Pro-Tarif — und damit auch in KI, das auf Pro aufbaut. Im kostenlosen Free-Tarif ist es nicht enthalten.

Die genauen Preise zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:i}:{text:`${n?r[n]:"das Modul"} ist ein separates Modul und steckt nicht automatisch in Free, Pro oder KI — es wird einzeln dazugebucht.

Die genauen Preise und verfügbaren Kombinationen zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:i}}const te={text:`HeidSec arbeitet ohne Lizenzschlüssel: Es gibt keinen Key, keinen Aktivierungscode und keine Seriennummer, die du irgendwo einträgst. Deine Freischaltung hängt am HeidSec-Konto.

• Anmelden — mit demselben Konto in der App und auf heidsec.de.
• Kundenbereich (/account), Tab „Lizenzen“ — dort siehst du deinen Tarif, den Planstatus, dein Gerätelimit sowie die freigeschalteten Capabilities/Entitlements.
• Geräte — jedes neue Gerät wird über die App am Konto angemeldet; die Übersicht steht unter /account, Tab „Geräte“.

Gebuchtes Modul noch nicht aktiv? Meist hilft Abmelden und neu anmelden — sonst hilft der Support (heidsec.de/support) weiter.`,sources:i},ie={text:`Zu Passwörtern gibt es drei Wege:

• Ändern (angemeldet): Über dein HeidSec-Konto bzw. „Mein Konto“.
• Vergessen: Auf der Anmeldeseite (/login) den Punkt „Passwort vergessen“ nutzen — du erhältst eine E-Mail mit Reset-Link.
• Regeln: Dein Passwort braucht mindestens 12 Zeichen (das prüft das Backend, live verifiziert). Komplexitätsregeln gibt es darüber hinaus nicht.

Tipp: Einzigartige Passwörter pro Dienst und am besten einen Passwort-Manager nutzen.`,sources:i},re={text:`Zwei-Faktor ist im HeidSec-Backend vollständig vorgesehen — ob 2FA für dein Konto aktiv ist, siehst du im Kundenbereich (/account) unter Profil.

Transparenz: Die Aktivierung über die Web-Oberfläche ist derzeit durch einen Step-up-Schutz des Backends blockiert („Step-up authentication required“); der zugehörige Client-Ablauf ist seitens des Backend-Teams noch nicht dokumentiert. Bis dahin läuft die 2FA-Einrichtung über die HeidSec-App.

Ich sage dir das lieber offen, statt einen Ablauf zu erfinden.`,sources:i},se={text:`Geräte verwaltest du so:

• Übersicht & Entfernen: Kundenbereich (/account), Tab „Geräte“ — dort erscheinen alle angemeldeten Geräte, jedes lässt sich direkt entfernen.
• Neues Gerät hinzufügen: über die HeidSec-App auf dem jeweiligen Smartphone.

Ein Web-Pairing existiert aktuell noch nicht (die Route fehlt im Backend) — das Pairing läuft ausschließlich über die App.`,sources:i},ae={text:`Angemeldete Sitzungen siehst du im Kundenbereich (/account), Tab „Profil“ unter „Aktive Sitzungen“ — inklusive Gerätename, Startzeit, Ablaufdatum und Markierung der aktuellen Sitzung.

Jede einzelne Sitzung lässt sich dort sofort beenden; der Zugang dieser Sitzung ist damit unwiderruflich entzogen. Praktisch, wenn du ein Gerät verloren hast oder verdächtige Aktivitäten bemerkst.`,sources:i},ue={text:`Dein HeidSec-Konto:

• Registrieren & Anmelden: über die Anmeldeseite (/login) — danach landest du im geschützten Kundenbereich (/account).
• Profil & Tarif: im Kundenbereich bzw. über „Mein Konto“ auf heidsec.de.
• E-Mail-Verifikation: nach der Registrierung kommt ein Bestätigungslink per Mail.
• Passwort: mindestens 12 Zeichen; zurücksetzen geht jederzeit über „Passwort vergessen“.

Womit genau kann ich helfen — Anmeldung, Verifikation oder Profil?`,sources:i},ce={text:`So erstellst du dein HeidSec-Konto:

1. Auf heidsec.de/login „Konto erstellen“ wählen.
2. E-Mail-Adresse und Passwort (mindestens 12 Zeichen) eingeben.
3. E-Mail bestätigen: Nach der Registrierung kommt ein Bestätigungslink per Mail — auch den Spam-Ordner prüfen.

Danach landest du im Kundenbereich (/account) und kannst Geräte koppeln. Dein Tarif (Free, Pro oder KI) wird dort unter „Tarif & Billing“ angezeigt.`,sources:i},de={text:`Die Anmeldung findest du unter /login (Registrieren geht dort genauso).

Hilfreich zu wissen:
• Passwörter brauchen mindestens 12 Zeichen.
• Nach der Registrierung bestätigst du deine E-Mail über den Link aus der Verifikationsmail.
• Passwort vergessen? „Passwort vergessen“ auf der Anmeldeseite nutzt dir innerhalb weniger Minuten einen Reset-Link in die Mailbox.

Hakt es an einer bestimmten Stelle?`,sources:i};function le(n){return n==="widerruf"?{text:`Zum Widerruf (laut AGB):

• Für Verbraucher besteht ein gesetzliches Widerrufsrecht bei digitalen Dienstleistungen nach § 356a BGB; Details regelt die Widerrufsbelehrung.
• Die Widerrufsfrist beginnt mit Vertragsschluss; maßgeblich ist die zum Zeitpunkt des Abschlusses gültige Belehrung.
• Die Seite heidsec.de/widerruf führt dich durch den Vorgang.

Für die formale Abwicklung (Fristen im Einzelfall, Adresse) empfehle ich den Weg über Support oder das Kundenportal — Rechtsaussagen im Detail traue ich mir hier nicht zu.`,sources:h}:{text:`Kündigen laut AGB § 4:

• Free ist ohnehin ohne feste Laufzeit — nichts zu kündigen.
• Kostenpflichtige Abonnements (monatlich/jährlich) verlängern sich automatisch; Kündigung spätestens einen Monat vor Periodenende.
• Website-/Stripe-Abo: Kündigungsbutton im Kundenportal — danach Bestätigungsseite und E-Mail.
• Google-Play-Abo: Kündigung über die Abo-Verwaltung des Play Store.
• Wirksam zum Ende der laufenden Periode; dein Umfang bleibt bis dahin vollständig erhalten.

Auch erreichbar über heidsec.de/kuendigen. Soll ich dir zusätzlich den Widerruf erklären?`,sources:h}}const oe={text:`Zahlen & Abrechnung bei HeidSec:

• Website-Abos werden über Stripe abgewickelt, Android-Abos über Google Play.
• HeidSec speichert selbst keinerlei Kartendaten oder IBANs — das bestätigt die Datenschutzerklärung ausdrücklich.
• Rechnungen und Abo-Status siehst du im Kundenportal bzw. in der App.
• Preise und Leistungsumfang zeigt dir der Tarifkatalog in deinem HeidSec-Konto.

Um was geht es dir konkret: Rechnung, Zahlungsmethode oder Abo-Status?`,sources:C},he={text:`Welche Daten HeidSec verarbeitet, listet die Datenschutzerklärung sehr konkret:

• Kontodaten: E-Mail, Kundennummer, Rechnungsadresse
• Authentifizierung: ausschließlich Passwort-Hashes (nie Klartext)
• Sicherheitsdaten: Audit-Ereignisse, Geräteinfos, Schutzmodul-Berichte
• Vault-Inhalte: Ende-zu-Ende-verschlüsselt — Server sehen nur Chiffretext
• KI-Daten: laufen ausschließlich lokal auf deinem Gerät, keine Übertragung
• VPN: nur Verbindungszeitpunkt, Gateway-Adresse, Datenmenge
• Zahlungen: keine Karten-/IBAN-Daten bei HeidSec (Stripe/Google Play)

Einwilligungen sind freiwillige Opt-ins und jederzeit widerrufbar. Volltext: heidsec.de/legal/datenschutz`,sources:C},ge={text:`Verschlüsselung & Sicherheit nach offiziellen Angaben:

• Vault: Ende-zu-Ende — die Server erhalten ausschließlich Chiffretext, HeidSec kann deine Dateien technisch nicht lesen.
• VPN: die Verbindung wird gekapselt; Standort bleibt nach außen unsichtbar.
• Anmeldung: nur Passwort-Hashes werden gespeichert, nie Klartext.
• Sitzungen: jede Anmeldung ist separat einsehbar und sofort widerrufbar (Kundenbereich).

Obendrauf kannst du 2FA nutzen, sobald die Aktivierung über App/Web bereitsteht.`,sources:C},fe={text:`Rechtliche Seiten im Überblick:

• Impressum: heidsec.de/legal/impressum
• Datenschutz: heidsec.de/legal/datenschutz
• AGB: heidsec.de/legal/agb
• Widerruf: heidsec.de/widerruf
• Verträge kündigen: heidsec.de/kuendigen

Kontakt laut Anbieterangaben: info@heidsec.de. Bei rechtlichen Detailfragen bin ich bewusst vorsichtig — dafür sind die verlinkten Texte und der Support die richtige Adresse.`,sources:[{source:"legal",title:"Rechtliches (heidsec.de)"}]},be={text:`Support & Kontakt:

• Support-Seite: heidsec.de/support
• E-Mail: info@heidsec.de
• Häufige Fragen: FAQ-Abschnitt auf der Startseite bzw. heidsec.de

Wenn du magst, beschreib mir dein Anliegen kurz — bei Produkttarifen, Konto, Geräten und Sicherheitsthemen kann ich meist schon direkt helfen.`,sources:z},me={text:`Laut offizieller FAQ läuft HeidSec auf Android-Geräten ab Version 8.0.

Weitere Systemvoraussetzungen jenseits davon sind öffentlich nicht dokumentiert — das sagt dir die App beim Download bzw. der Support im Zweifel exakt.`,sources:V},pe={text:`Für technische Fragen bin ich gern dein erster Anlauf — je konkreter, desto besser (Gerät, Modul, was genau passiert).

Grundlagen, die ich sicher sagen kann: Android ab 8.0 wird unterstützt; Updates laufen über die App bzw. den Play Store; bei hartnäckigen Fällen hilft der Support (heidsec.de/support · info@heidsec.de).`,sources:V};function Se(n){return n==="login"?{text:`Login-Probleme — Schritt für Schritt:

1. E-Mail-Adresse auf Tippfehler prüfen.
2. Passwort hat mindestens 12 Zeichen — Groß-/Kleinschreibung und Tastatur-Layout kontrollieren.
3. Noch nicht verifiziert? Schau in dein Postfach nach dem Verifikationslink (auch Spam-Ordner).
4. Passwort vergessen: „Passwort vergessen“ auf /login → Reset-Link per Mail.
5. Immer noch blockiert: heidsec.de/support kontaktieren — dann kann jemand ins Konto schauen.

An welchem der Schritte hängt es?`,sources:z}:n==="device"?{text:`Wenn ein Gerät nicht auftaucht:

1. Ist auf dem Gerät überhaupt die HeidSec-App installiert und mit demselben Konto angemeldet?
2. Pairing läuft ausschließlich über die App — eine Web-Kopplung gibt es (noch) nicht.
3. Kundenbereich (/account → „Geräte“) einmal neu laden.
4. Bleibt das Gerät weg: Support (heidsec.de/support) mit Angabe des Geräts fragen.

Wichtig: Entfernen geht jederzeit über denselben Tab.`,sources:i}:n==="vpn"?{text:`Wenn sich das VPN nicht verbindet:

1. Internetverbindung generell prüfen (Browser-Test).
2. App komplett schließen und neu starten.
3. Gerät neu starten — löst die meisten Verbindungs-Hänger.
4. Netzwechsel testen (mobile Daten vs. WLAN), manche Netze blockieren Tunnel-Protokolle.

Bleibt es bestehen, beschreib mir kurz, was du siehst — konkrete Server-/Konfigurationsdaten habe ich ehrlicherweise nicht, da möchte ich nichts erfinden.`,sources:z}:n==="scan"?{text:`Wenn der Scan nicht startet:

1. App komplett schließen und neu öffnen.
2. Smartphone neu starten.
3. Prüfen, ob ein App-Update verfügbar ist (Play Store).
4. Hängt es weiter, sag mir kurz, was du siehst (Fehlermeldung, Modul) — dann helfe ich gezielter weiter.`,sources:z}:n==="service"?{text:`Wenn HeidSec gerade nicht erreichbar scheint:

1. Kurz warten und erneut versuchen — manchmal läuft gerade ein Update oder Wartung.
2. Internetverbindung prüfen und App neu starten.
3. Hält der Ausfall an, findest du aktuelle Hinweise auf heidsec.de/support.

Den Live-Status des Dienstes kenne ich hier nicht — das prüft der Support bzw. die Statusangaben auf heidsec.de verlässlich.`,sources:z}:{text:`Erste Schritte, wenn etwas nicht klappt:

1. App aktualisieren und neu starten.
2. Anmeldung prüfen — bei Problemen Sitzungen im Kundenbereich beenden und neu anmelden.
3. Gerät neu starten — behebt die meisten Hänger.

Sag mir kurz, welches Modul betroffen ist und was genau passiert — dann helfe ich gezielter weiter.`,sources:z}}const ke={text:`Klar, gerne weiter — was genau interessiert dich? Ich kann dir zu folgenden Bereichen Konkretes sagen:

• Produkte & Funktionen (Smart Scan, MailGuard, Vault, VPN, Schutzcenter, Kinderschutz)
• Tarife & Preise aus dem aktuellen Katalog
• Konto, Anmeldung, Passwort, 2FA, Sitzungen
• Geräte, Abos und Support
• Datenschutz, Verschlüsselung und allgemeine Sicherheit`,sources:i},Ae={text:`Hallo! Schön, dass du da bist. Wie geht's dir?

Ich helfe dir bei HeidSec-Produkten, den Tarifen Free, Pro und KI, Konto, Geräten, Abos, Datenschutz und Support. Was möchtest du wissen?`,sources:i},ze={text:"Mir geht's gut, danke der Nachfrage! Und dir? Womit kann ich dir heute helfen?",sources:i},we={text:"Bis bald! Wenn du wieder Fragen zu HeidSec hast, bin ich jederzeit für dich da.",sources:i};function Pe(n){return n==="laufzeit"?{text:`Vertragslaufzeiten laut AGB § 4:

• Free — keine feste Laufzeit, jederzeit beendbar.
• Kostenpflichtige Abonnements laufen wahlweise monatlich oder jährlich und verlängern sich automatisch.
• Kündigung spätestens einen Monat vor Periodenende; wirksam zum Ende der laufenden Periode — dein Umfang bleibt bis dahin vollständig erhalten.

Deine konkrete Laufzeit und das nächste Verlängerungsdatum siehst du im Kundenportal.`,sources:h}:n==="wechsel"?{text:`Zum Tarifwechsel:

• Der Wechsel läuft über dein HeidSec-Konto bzw. den Tarifkatalog im Kundenportal.
• Preise und Leistungsumfang werden dir dort immer transparent vor Vertragsschluss angezeigt.
• Welche Funktionen Pro gegenüber KI im Detail freischaltet, listet keine öffentliche Quelle — das möchte ich nicht erfinden.

Soll ich dir die aktuellen Preise zeigen?`,sources:h}:{text:`Geht es dir um deinen Vertrag, um die Kündigung, einen Tarifwechsel oder den Widerruf?

• Kündigung — AGB § 4: Kündigungsbutton im Kundenportal (bzw. Play Store), wirksam zum Periodenende
• Widerruf — gesetzliches Widerrufsrecht bei digitalen Dienstleistungen (§ 356a BGB), siehe heidsec.de/widerruf
• Laufzeit — Free ohne feste Laufzeit, Abos monatlich/jährlich mit automatischer Verlängerung
• Tarifwechsel — über den Tarifkatalog in deinem HeidSec-Konto

Sag mir einfach, welcher Punkt es ist — dann gehe ich tiefer.`,sources:h}}function Ee(n,r={}){const e=Y(n),d=$(e),c=d[0],l=q(e),s=(a,m={})=>({intent:a,...c?{topic:c}:{},...m}),g=e.trim();if(t.greeting.test(g))return{intent:"GREETING"};if(t.howAreYou.test(g))return{intent:"HOW_ARE_YOU"};if(t.bye.test(g))return{intent:"BYE"};if(g.length<=30&&t.thanks.test(g))return{intent:"SMALLTALK"};if(t.chitchat.test(g))return{intent:"CHITCHAT"};if(t.about.test(e))return{intent:"ABOUT"};if(t.trouble.test(e)){let a="allgemein";return/vpn/.test(e)?a="vpn":/scan|smartscan|secapp/.test(e)?a="scan":/offline|nicht erreichbar|wartung|server|backend/.test(e)?a="service":/\blogin\b|anmeld|passwort|einlogg|registrier/.test(e)?a="login":(t.device.test(e)||/erscheint nicht/.test(e))&&(a="device"),s("TROUBLESHOOTING",{problem:a})}if(t.password.test(e))return s("PASSWORD");if(t.twofactor.test(e))return s("TWO_FACTOR");if(t.register.test(e))return s("REGISTER");if(t.login.test(e))return s("LOGIN");if(t.support.test(e))return s("SUPPORT_CONTACT");if(t.widerruf.test(e))return s("CANCELLATION",{subject:"widerruf"});if(t.cancel.test(e))return s("CANCELLATION",{subject:"kuendigung"});if(t.tariffSwitch.test(e))return s("CONTRACT",{contractKind:"wechsel"});if(t.contract.test(e)){let a="allgemein";return/laufzeit|wie lange|mindestlaufzeit|verlänger|verlaenger|läuft/.test(e)?a="laufzeit":/wechsel|up-?grad|down-?grad|anderen? tarif/.test(e)&&(a="wechsel"),s("CONTRACT",{contractKind:a})}const b=t.compare.test(e),v=d.includes("smartscan")&&d.includes("schutzcenter");if(t.legacyPlan.test(e))return{intent:"PLAN_COMPARISON"};if(t.legacyPlanNames.test(e))return{intent:"PLAN_COMPARISON",legacy:!0};if(t.recommendation.test(e))return{intent:"RECOMMENDATION",.../(familie|kinder|kids|eltern)/.test(e)?{family:!0}:{}};if(t.planAdvice.test(e))return{intent:"PLAN_COMPARISON"};if(b&&t.av.test(e))return{intent:"PRODUCT",compare:!0};if(b&&v)return{intent:"SMART_SCAN",topic:"smartscan",compare:!0};if(b&&t.pricing.test(e))return{intent:"PRICING",...l?{plan:l}:{}};if(b&&t.planWord.test(e))return{intent:"PLAN_COMPARISON"};if(l&&/^(free|pro|ki)([!?.]*)$/.test(g))return{intent:"PLAN_INFO",plan:l};if(l&&t.planExplain.test(e))return{intent:"PLAN_INFO",plan:l};if(t.tariffOverview.test(e)&&!t.pricing.test(e))return{intent:"PLAN_COMPARISON"};if(t.license.test(e)&&!t.pricing.test(e))return s("LICENSE");if(t.pricing.test(e)){const a=l??(/(kostenlos|gratis)/.test(e)?"free":void 0);let m=c;return!m&&r.lastTopic&&t.anaphor.test(e)&&(m=r.lastTopic),{intent:"PRICING",...m?{topic:m}:{},...a?{plan:a}:{}}}if(t.billing.test(e))return s("BILLING");if(t.pairing.test(e))return s("PAIRING");if(t.sessions.test(e))return s("SESSIONS");if(t.device.test(e))return s("DEVICE");if(t.privacy.test(e))return s("PRIVACY");if(t.legal.test(e))return s("LEGAL");if(t.compatibility.test(e))return s("COMPATIBILITY");const P=d[0]??r.lastTopic;if(P&&t.moduleInclusion.test(e))return{intent:"MODULE_INCLUSION",topic:P};if(d.includes("schutzcenter"))return{intent:"PROTECTION_CENTER"};const E={vpn:"VPN",mailguard:"MAILGUARD",vault:"VAULT",parental:"PARENTAL_CONTROL",smartscan:"SMART_SCAN"};if(c&&c!=="schutzcenter")return{intent:E[c],topic:c,...b?{compare:!0}:{}};if(t.beginner.test(e))return{intent:"PRODUCT",beginner:!0};if(/verschlüssel|verschluessel|wie sicher/.test(e))return s("SECURITY");if(t.cyber.test(e))return{intent:"GENERAL_CYBERSECURITY"};if(t.featureGeneric.test(e))return s("FEATURE");if(t.account.test(e))return s("ACCOUNT");if(t.productGeneric.test(e))return{intent:"PRODUCT"};const p=n.length<=48&&t.followup.test(e);if(r.lastTopic){const a=r.lastTopic;if(r.lastIntent==="PRICING"&&p&&t.pricing.test(e))return{intent:"PRICING",topic:a};if(p)return{intent:{vpn:"VPN",mailguard:"MAILGUARD",vault:"VAULT",parental:"PARENTAL_CONTROL",smartscan:"SMART_SCAN",schutzcenter:"PROTECTION_CENTER"}[a],topic:a}}if((r.lastIntent==="PLAN_COMPARISON"||r.lastIntent==="RECOMMENDATION"||r.lastIntent==="PLAN_INFO"||r.lastIntent==="PRICING")&&p){if(l)return{intent:"PLAN_INFO",plan:l};if(t.pricing.test(e))return{intent:"PRICING"};if(/(familie|kinder|kids|eltern)/.test(e))return{intent:"RECOMMENDATION",family:!0};if(t.compare.test(e)||t.planWord.test(e))return{intent:"PLAN_COMPARISON"}}return p&&(r.lastTopic||r.lastIntent)?{intent:"FOLLOW_UP"}:{intent:"UNKNOWN"}}function Ne(n){switch(n.intent){case"SMALLTALK":return{text:"Gern geschehen! Womit kann ich dir sonst noch helfen?",sources:i};case"CHITCHAT":return{text:"Alles klar — womit kann ich dir helfen?",sources:i};case"ABOUT":return{text:`Ich bin der HeidSec-Assistent und beantworte Fragen zu HeidSec-Produkten (Smart Scan, MailGuard, Vault, VPN, Schutzcenter, Kinderschutz), den Tarifen Free, Pro und KI, Preisen aus dem aktuellen Katalog, Konto, Geräten, Abos, Datenschutz und Sicherheit.

Womit soll ich anfangen?`,sources:i};case"GREETING":return Ae;case"HOW_ARE_YOU":return ze;case"BYE":return we;case"CONTRACT":return Pe(n.contractKind);case"FOLLOW_UP":return ke;case"PRICING":return ne(n.plan);case"PLAN_COMPARISON":return n.legacy?Ie:ve();case"RECOMMENDATION":return Te(n.family);case"PLAN_INFO":return G(n.plan);case"MODULE_INCLUSION":return W(n.topic);case"SMART_SCAN":return n.compare?Re:A.smartscan;case"MAILGUARD":return A.mailguard;case"VAULT":return A.vault;case"VPN":return A.vpn;case"PARENTAL_CONTROL":return A.parental;case"PROTECTION_CENTER":return A.schutzcenter;case"PRODUCT":return n.compare?ee:n.beginner?X:J;case"FEATURE":return{text:`Die Funktionen im Überblick:

• Smart Scan — Echtzeit-Scan aller Apps, Warnung bei Auffälligkeiten, Status auf einen Blick
• MailGuard — Phishing/Betrug erkennen, lautlose Quarantäne, Schutz aller Postfächer
• Vault — verschlüsselte Ablage nur mit deinem Schlüssel, synchron auf allen Geräten
• VPN — gekapselte Verbindung, Standort privat, ein Klick überall geschützt
• Schutzcenter — eine Engine, vier Schutzschichten
• Kinderschutz — altersgerechte Sicherheit für Familien

Zu welchem Modul soll ich tiefer einsteigen?`,sources:i};case"PASSWORD":return ie;case"TWO_FACTOR":return re;case"LOGIN":return de;case"REGISTER":return ce;case"ACCOUNT":return ue;case"DEVICE":return se;case"PAIRING":return{text:`Pairing läuft aktuell ausschließlich über die HeidSec-App auf dem neuen Gerät — eine Web-Kopplung existiert noch nicht (die Backend-Route fehlt, das ist dokumentiert).

Im Kundenbereich (/account, Tab „Geräte“) siehst du anschließend alle gekoppelten Geräte und kannst sie dort auch wieder entfernen.`,sources:i};case"SESSIONS":return ae;case"BILLING":return oe;case"LICENSE":return te;case"CANCELLATION":return le(n.subject);case"PRIVACY":return he;case"SECURITY":return ge;case"LEGAL":return fe;case"SUPPORT_CONTACT":return be;case"COMPATIBILITY":return me;case"TECH_SUPPORT":return pe;case"TROUBLESHOOTING":return Se(n.problem);case"GENERAL_CYBERSECURITY":return{text:`Ein paar Grundregeln, die den Großteil der Alltagsrisiken abdecken:

• Einzigartige Passwörter mit mindestens 12 Zeichen pro Dienst — ein Passwort-Manager hilft enorm.
• Zwei-Faktor-Schutz überall aktivieren, wo angeboten.
• Updates zeitnah einspielen (System und Apps).
• Phishing-Merkenkmale: fremder Absender, künstliche Dringlichkeit, verdächtige Links, unerwartete Anhänge — lieber einmal mehr prüfen.
• Öffentliche WLANs meiden oder ein VPN nutzen.

Diese Bereiche deckt das HeidSec-Schutzsystem ab — sag Bescheid, wenn du zu einem Modul Details willst.`,sources:Q};case"UNKNOWN":return null;default:return null}}const Ie={text:`Die früheren getrennten Tariflinien gibt es nicht mehr — es gelten ausschließlich diese drei aktuellen HeidSec-Tarife:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine, führt alle Schutzschichten zusammen).
• KI — Pro plus Security-AI; die Analyse läuft ausschließlich lokal auf deinem Gerät, keine KI-Daten verlassen es.

Vault, MailGuard, VPN und Kinderschutz sind separate Module und werden einzeln dazugebucht — sie stecken nicht automatisch in Free, Pro oder KI. Die genauen Preise und Kombinationen zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:h};function ve(){return{text:`Die Tarife im Überblick:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine, führt alle Schutzschichten zusammen).
• KI — Pro plus Security-AI; die Analyse läuft ausschließlich lokal auf deinem Gerät, keine KI-Daten verlassen es.

Vault, MailGuard, VPN und Kinderschutz sind separate Module und werden einzeln dazugebucht — sie stecken nicht automatisch in Free, Pro oder KI. Die genauen Preise und Kombinationen zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:h}}function Te(n){return n?{text:`Für Familien sieht die Empfehlung so aus:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine).
• KI — Pro plus Security-AI; die Analyse läuft lokal auf den Geräten.
• Dazu separat buchbar: der Kinderschutz (altersgerechte Sicherheit für Kinder) sowie Vault, MailGuard und VPN.

Der Kinderschutz steckt nicht automatisch in Pro oder KI — er wird als Modul einzeln dazugebucht. Preise und verfügbare Kombinationen zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:i}:{text:`Das hängt davon ab, was dir wichtig ist:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine).
• KI — Pro plus Security-AI, die lokal auf deinem Gerät läuft.

Vault, MailGuard, VPN und Kinderschutz sind separate Module und lassen sich einzeln dazubuchen. Was passt besser zu dir: Geräteschutz, E-Mail-/Posteingangsschutz oder Familienschutz? Dann grenze ich die Empfehlung weiter ein.`,sources:i}}const Re={text:`Gute Frage — die beiden werden oft verwechselt:

• Smart Scan ist der Schutz auf dem Gerät selbst: Die App scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich direkt.
• Das Schutzcenter (die Core-Engine) ist die zentrale Instanz dahinter: Sie bewertet jedes Signal einmal und speist die Erkenntnis in alle Module — Gerät, Posteingang, Ablage und Verbindung arbeiten als ein System.

Kurz gesagt: Smart Scan ist der Schutz direkt auf deinem Gerät, das Schutzcenter die zentrale Intelligenz, die alle Module zusammendenkt.`,sources:i},D="Die aktuellen Beträge stehen im Tarifkatalog in deinem HeidSec-Konto (/account, „Tarif & Billing“) bzw. im Play Store — ich nenne hier bewusst keine Zahlen, die veraltet sein könnten.";function _(n){if(n.intent!=="PRICING")return null;if(n.topic){const e=W(n.topic);return{text:`${e.text}

${D}`,sources:e.sources}}const r=G(n.plan);return n.plan==="free"?r:{text:`${r.text}

${D}`,sources:r.sources}}const x="Dazu liegt mir gerade keine verlässliche Information vor — das möchte ich nicht erfinden.",Ke=/\b(mainapp|main\s?app|security\s+(?:pro|ki|free|ultimate)|security[-\s]+(?:pro|ki))\b|ultimate|suite\s+ultimate/i;function Ce(n,r){const e=String(r??"").trim();if(!e||/€/.test(e)&&/\b(preis|kosten|kostet|tarif|monat|jahr|abo)\b/i.test(e)&&n.intent!=="PRICING")return null;if(Ke.test(e)){const c=_(n);return c?c.text:x}return e}function Ge(){let n=0;return{begin(){return n+=1,n},isLatest(r){return r===n}}}const Oe=60;function K(){return Math.max(1,Date.now()%1e9)+Math.floor(Math.random()*1e6)}function We(n){const r=n?.welcomeMessage,[e,d]=o.useState(()=>r?[{id:K(),role:"assistant",text:r}]:[]),[c,l]=o.useState(""),[s,g]=o.useState(!1),[b,v]=o.useState(0),[P,E]=o.useState(!1),[p,O]=o.useState(void 0),[a,m]=o.useState(()=>Date.now()),T=o.useRef({}),L=o.useRef(Ge());o.useEffect(()=>{if(b<=Date.now())return;const S=window.setInterval(()=>m(Date.now()),1e3);return()=>window.clearInterval(S)},[b]);const N=Math.max(0,Math.ceil((b-a)/1e3)),y=c.trim().length>0&&!s&&N===0,F=o.useCallback(async()=>{const S=c.trim();if(!S||s||N>0)return;const H=L.current.begin();d(u=>[...u,{id:K(),role:"user",text:S}]),l(""),g(!0),E(!1);const w=Ee(S,T.current);T.current={lastTopic:w.topic??T.current.lastTopic,lastIntent:w.intent};const M=()=>L.current.isLatest(H),I=u=>{M()&&d(f=>[...f,{id:K(),...u}])};try{const u=Ne(w);if(u){I({role:"assistant",text:u.text,sources:u.sources});return}const f=await U(S,p),k=Ce(w,f.reply);I({role:"assistant",text:k??x,sources:f.sources}),f.conversationId&&O(f.conversationId)}catch(u){const f=_(w);if(f&&!(u instanceof R&&u.status===429)){I({role:"assistant",text:f.text,sources:f.sources});return}let k="Der HeidSec-Chat ist gerade nicht erreichbar.";u instanceof R&&u.status===429?(v(Date.now()+Oe*1e3),k="Viele Anfragen auf einmal — bitte warte kurz, bevor du erneut fragst."):u instanceof R&&u.status>=400&&u.status<500?k=u.message:(E(!0),k="Der HeidSec-Assistent ist derzeit nicht erreichbar."),I({role:"assistant",text:k})}finally{M()&&g(!1)}},[c,s,N,p]);return{messages:e,setMessages:d,input:c,setInput:l,pending:s,unavailable:P,cooldownLeft:N,canSend:y,send:F}}export{Ve as A,We as u};
