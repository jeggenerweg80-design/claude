import{r as g,j as r}from"./radix-ui-OOgTdGds.js";import{c as y,a3 as O,L,E as j,a4 as B,A as M}from"./index-Bhg8t5N7.js";import{S as U}from"./shield-check-Bofmg4k-.js";import"./react-vendor-17qWAY6X.js";const Z=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],Y=y("arrow-up",Z);const $=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],Q=y("message-circle",$);function q(n){return n.toLowerCase().replace(/ß/g,"ss")}const t={greeting:/^(hallo+|hi|hey|hej|moin|servus|na|guten\s+(tag|morgen|abend))[\s!,.?]*(wie\s+geht(?:['’]s|s)?(?:\s+dir)?[?!.]*)?$/,bye:/^(tschuess|tschüss|ciao|bye|bis\s+(dann|bald))[\s!,.?]*$/,thanks:/(\bdanke\b|dankeschoen|dankeschön|\bmerci\b)/,chitchat:/^(ok(ay)?|alles klar|aha|verstanden|super|gut|perfekt|na klar|stimmt|ja genau|genau)[\s!.,]*$/,about:/wer bist du|was bist du|wie heißt du|wie heisst du|was kannst du(\s+eigentlich)?|was kannst du mir (sagen|helfen)|was kann ich (dich\s+)?fragen|was kannst du alles|^hilfe$/,tariffOverview:/\btarif\w*|\bangebote\b/,planExplain:/(was\s+ist\s+(?:in\s+)?(?:der|die|das|dem)?\s*|was\s+sind\s+|was\s+steckt\s+in\s+(?:dem|der)?\s*|was\s+kann\s+(?:der|die|das)?\s*|enthalten\s+in\s+(?:dem|der)?\s*|erklär\w*\s+(?:mir\s+)?(?:den|die|das)?\s*|wie\s+funktioniert\s+(?:der|die|das)?\s*|info\w*\s+zu\s+(?:dem|der)?\s*|mehr\s+über\s+(?:den|die|das)?\s*)(free|pro|ki)\b/,tariffSwitch:/tarif\w*\s*wechs\w*|wechs\w*\s+.*\btarif\b/,trouble:/(funktioniert nicht|geht nicht|verbindet nicht|erscheint nicht|startet nicht|klappt nicht|hängt|bricht ab|stoppt|crasht|\bfehler\b|probleme?\b|nicht mehr|scheitert|kann mich nicht|ausgesperrt|komme nicht (mehr )?(rein|hinein)|kein zugang|offline|nicht erreichbar|wartung|einloggprobleme?|loginprobleme?)/,register:/(registrier|konto\s+erstellen|neues\s+konto|account\s+erstellen|sign\s?up|anmeldung\s+als\s+neuer\s+kunde)/,moduleInclusion:/(enthalten|inklusive?|\bextra\b|separat|dazubuchen|dazu\s+buchen|gehört\w*\s+.*\bdazu\b|brauche\s+ich\s+.*\bextra\b|wenn\s+ich\s+(?:den\s+|die\s+|das\s+)?(free|pro|ki)\s+habe|bei\s+(?:free|pro|ki)\s+dabei|mit\s+(?:free|pro|ki)\s+dabei)/,password:/passwort/,twofactor:/2fa|zwei-?faktor/,login:/\blogin\b|anmeld\w*|einlogg\w*|logg\w*\s+(?:ich\s+)?mich\s+ein|meld\w*\s+(?:ich\s+)?mich\s+an|zugangsdaten/,widerruf:/widerruf/,cancel:/künd|kuend/,contract:/\bvertrag/,planAdvice:/welchen?\s+tarife?|welche\s+tarife?\s|tarife?.{0,24}(familie|brauch|empfehl|passt|sind)|familie.{0,24}(tarif|paket)|fuer meine familie|für meine familie/,recommendation:/was\s+w(?:ü|u)rdest\s+du\s+mir\s+empfehlen|was\s+empf(?:iehl|ie)st\s+du(?:\s+einer?\s+familie)?|welcher\s+(?:tarif|schutz|umfang)\s+passt/,compare:/(unterscheid\w*|unterschied\w*|vergleich|\bvs\.?\b|genau anders|besser als|oder eher)/,planWord:/\bfree\b|\bpro\b|\bki\b|\btarif|pakete?\b/,legacyPlan:/\bultimate\b|\bsuite\s+ultimate\b/,billing:/(rechnung|zahlung|\bstripe\b|play[\s-]?store|abo-?verwaltung|\babonnement|\babos?\b|verlänger|verlaenger|laufzeit|\bpremium\b)/,pricing:/(\bpreis\w*|kostenlos|\bkosten\b|\bkostet\b|\bteuer\w*|günstig\w*|guenstig\w*|billig\w*|€|\beuro\b|monatlich|j[aä]hrlich|jaehrlich|\babo-?preis\w*|im\s+(monat|jahr)|pro\s+(monat|jahr)|\bmonat\b|lizenz)/,pairing:/pairing|koppeln|koppelcode|gerät(e)? verbinden|verbinden.{0,16}app/,sessions:/sitzung/,device:/\bgerät|\bgeraet|\bdevice\b|geräteliste/,account:/(\bkonto\b|\baccount\b|\bprofil\b|kundebereich|kundenbereich)/,privacy:/(datenschutz|dsgvo|privatsphaere|privatsphäre|personenbezogen|verkauft.{0,12}daten|verkauf.{0,12}daten|weitergabe|daten speicher|speichert.{0,20}daten|dateien lesen|mitlesen|einsehen kann|einblick)/,legal:/(impressum|\bagb\b|datenschutzerklaerung|datenschutzerklärung|\blegal\b|rechtlich)/,support:/(\bsupport\b|\bkontakt\b|kundendienst|heidsec erreichen|hotline)/,compatibility:/(\bandroid\b|version\s*\d|unterstützt|kompatibel|systemvorau|anforderung|mindestversion)/,av:/(virenschutz|antivirus|virenscanner|klassischen? schutz|normale[nm] virenschutz)/,beginner:/(anfänger|anfaenger|einfach erklärt|einfach erklaert|kindgerecht|für laien|laien)/,featureGeneric:/(\bfeatures?\b|funktionen\b|was kann (man|heidsec)|leistungen\b|umfang)/,cyber:/(phishing|betrugsmail|\bscam\b|\bvirus\b|malware|trojaner|sicheres? passwort|starke passwörter|passwörter merken|öffentliche?s?\s+wlans?|\bwlans?\b|gestohlen|gehackt|dritte zugreifen)/,productGeneric:/(was ist heidsec|überblick|\bprodukte?\b|\bmodule\b|plattform|\bapp\b.*\bfunktion|wofür ist heidsec)/,anaphor:/\b(das|dieses|diese|dem|ihm|damit|es|sie|er)\b/,followup:/\b(mehr|genauer?|details|weiter|und\b|das\b|davon|damit|auch\b|beispiel|nochmal|er\b|sie\b|es\b|wie\s+meinst\s+du\s+das|was\s+meinst\s+du)\b/},J=[["vpn",/\bvpn\b|\btunnel\b|hotel[- ]?wlan|standort unsichtbar/],["mailguard",/mailguard|posteingang|quarantäne|quantaene|verdächtig\w* anhang|schädliche anhänge|phishing.*mailguard/],["vault",/vault|\btresor\b|datengewölbe|dokumente verschlüsselt|dateien verschlüsselt/],["parental",/kinderschutz|parental control|kindersicherung|\bkinder(n)?\b.*schutz|schutz.*kinder/],["smartscan",/smart[\s-]?scan|\bsecapp\b|sicherheitszentrum|apps scannen/],["schutzcenter",/schutzcenter|\bcore\b|analyse-engine|\bengine\b|schutzschichten/]];function X(n){const s=[];for(const[e,h]of J)h.test(n)&&s.push(e);return s}function ee(n){if(/\bfree\b/.test(n))return"free";if(/\bki\b/.test(n))return"ki";if(/\bpro\b/.test(n))return"pro"}const i=[{source:"knowledge",title:"HeidSec Wissensbasis (heidsec.de)"}],m=[{source:"terms",title:"AGB § 3/§ 4 (heidsec.de)"}],R=[{source:"privacy",title:"Datenschutzerklärung (heidsec.de)"}],V=[{source:"faq",title:"heidsec.de FAQ"}],A=[{source:"support",title:"HeidSec Support (heidsec.de/support)"}],ne=[{source:"general",title:"Allgemeine Sicherheitshinweise"}],w={smartscan:{text:`Smart Scan (in der App intern SecApp genannt) ist dein Sicherheitszentrum in der Tasche: Er scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich, bevor aus einem Klick ein Problem wird.

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
• Klare Entscheidungen statt Alarmflut`,sources:i}},te={text:`HeidSec bündelt sechs Sicherheitsmodule in einem System — eine Engine, mehrere Schutzschichten, ein Konto:

• Smart Scan — mobiles Sicherheitszentrum (App-intern SecApp)
• MailGuard — Posteingang unter Kontrolle
• Vault — verschlüsselter Raum
• VPN — privater Tunnel
• Schutzcenter — eine Engine, vier Schutzschichten
• Kinderschutz — altersgerechte Sicherheit für Familien

Zu welchem Modul möchtest du mehr erfahren?`,sources:i},re={text:`Ganz einfach erklärt: HeidSec ist eine App für dein Smartphone, die mehrere Schutzhelfer gleichzeitig vereint.

• Smart Scan prüft deine Apps und Verbindungen.
• MailGuard sortiert gefährliche Mails aus.
• Vault ist ein Tresor für Dokumente und Passwörter.
• VPN versteckt deinen Standort im Netz.
• Das Schutzcenter fasst alles zusammen, der Kinderschutz hilft Familien.

Du brauchst dafür ein Android-Smartphone ab Version 8.0. Alles Weitere kannst du nach der Anmeldung Schritt für Schritt in der App entdecken.`,sources:i},ie={text:`Klassischer Virenschutz konzentriert sich auf Schadsoftware auf dem Gerät. HeidSec denkt breiter — sechs Module als ein System:

• Smart Scan: Geräte- und App-Schutz auf dem Smartphone
• MailGuard: Phishing und Betrug schon im Posteingang stoppen
• Vault: Ende-zu-Ende-verschlüsselter Tresor für Dokumente und Zugänge
• VPN: privater Tunnel für deine Verbindung
• Kinderschutz: altersgerechte Sicherheit für Familien
• Schutzcenter: eine zentrale Engine, die alle Module speist — einmal erkannt, überall abgewehrt

Ich behaupte hier bewusst nichts über Erkennungsraten — den Funktionsumfang findest du belegt auf heidsec.de und in der App.`,sources:i};function W(n){const s="Vault, MailGuard, VPN und Kinderschutz sind separate Module und werden einzeln dazugebucht. Die genauen Preise zeigt dir der Tarifkatalog in deinem HeidSec-Konto.";switch(n){case"free":return{text:`HeidSec Free ist der kostenlose Tarif mit dem Smart-Scan-Schutz (Scanner) für dein Smartphone — ohne feste Laufzeit und jederzeit beendbar.

${s}`,sources:m};case"pro":return{text:`Pro baut auf Free auf und ergänzt das Schutzcenter (die Core-Engine, die alle Schutzschichten zusammenführt) — wahlweise als Monats- oder Jahresabonnement.

${s}`,sources:m};case"ki":return{text:`KI baut auf Pro auf und ergänzt die Security-AI — die Analyse läuft ausschließlich lokal auf deinem Gerät, es werden keine KI-Daten übertragen.

${s}`,sources:m};default:return{text:`Die aktuellen Tarife:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine).
• KI — Pro plus Security-AI; die Analyse läuft ausschließlich lokal auf deinem Gerät.

Vault, MailGuard, VPN und Kinderschutz sind separate Module und werden einzeln dazugebucht. Preise und verfügbare Kombinationen zeigt dir der aktuelle Tarifkatalog in deinem HeidSec-Konto.`,sources:m}}}function se(n){return n==="free"?W("free"):null}function ae(n){const s={smartscan:"Smart Scan",mailguard:"MailGuard",vault:"Vault",vpn:"VPN",parental:"der Kinderschutz",schutzcenter:"das Schutzcenter"};return n==="smartscan"?{text:`Ja — Smart Scan (Scanner) ist Teil des kostenlosen Free-Tarifs. Pro baut darauf auf (Schutzcenter), KI ergänzt die Security-AI.

Die genauen Preise zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:i}:n==="schutzcenter"?{text:`Das Schutzcenter (die Core-Engine) steckt im Pro-Tarif — und damit auch in KI, das auf Pro aufbaut. Im kostenlosen Free-Tarif ist es nicht enthalten.

Die genauen Preise zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:i}:{text:`${n?s[n]:"das Modul"} ist ein separates Modul und steckt nicht automatisch in Free, Pro oder KI — es wird einzeln dazugebucht.

Die genauen Preise und verfügbaren Kombinationen zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:i}}const ue={text:`Zu Passwörtern gibt es drei Wege:

• Ändern (angemeldet): Über dein HeidSec-Konto bzw. „Mein Konto“.
• Vergessen: Auf der Anmeldeseite (/login) den Punkt „Passwort vergessen“ nutzen — du erhältst eine E-Mail mit Reset-Link.
• Regeln: Dein Passwort braucht mindestens 12 Zeichen (das prüft das Backend, live verifiziert). Komplexitätsregeln gibt es darüber hinaus nicht.

Tipp: Einzigartige Passwörter pro Dienst und am besten einen Passwort-Manager nutzen.`,sources:i},ce={text:`Zwei-Faktor ist im HeidSec-Backend vollständig vorgesehen — ob 2FA für dein Konto aktiv ist, siehst du im Kundenbereich (/account) unter Profil.

Transparenz: Die Aktivierung über die Web-Oberfläche ist derzeit durch einen Step-up-Schutz des Backends blockiert („Step-up authentication required“); der zugehörige Client-Ablauf ist seitens des Backend-Teams noch nicht dokumentiert. Bis dahin läuft die 2FA-Einrichtung über die HeidSec-App.

Ich sage dir das lieber offen, statt einen Ablauf zu erfinden.`,sources:i},de={text:`Geräte verwaltest du so:

• Übersicht & Entfernen: Kundenbereich (/account), Tab „Geräte“ — dort erscheinen alle angemeldeten Geräte, jedes lässt sich direkt entfernen.
• Neues Gerät hinzufügen: über die HeidSec-App auf dem jeweiligen Smartphone.

Ein Web-Pairing existiert aktuell noch nicht (die Route fehlt im Backend) — das Pairing läuft ausschließlich über die App.`,sources:i},le={text:`Angemeldete Sitzungen siehst du im Kundenbereich (/account), Tab „Profil“ unter „Aktive Sitzungen“ — inklusive Gerätename, Startzeit, Ablaufdatum und Markierung der aktuellen Sitzung.

Jede einzelne Sitzung lässt sich dort sofort beenden; der Zugang dieser Sitzung ist damit unwiderruflich entzogen. Praktisch, wenn du ein Gerät verloren hast oder verdächtige Aktivitäten bemerkst.`,sources:i},oe={text:`Dein HeidSec-Konto:

• Registrieren & Anmelden: über die Anmeldeseite (/login) — danach landest du im geschützten Kundenbereich (/account).
• Profil & Tarif: im Kundenbereich bzw. über „Mein Konto“ auf heidsec.de.
• E-Mail-Verifikation: nach der Registrierung kommt ein Bestätigungslink per Mail.
• Passwort: mindestens 12 Zeichen; zurücksetzen geht jederzeit über „Passwort vergessen“.

Womit genau kann ich helfen — Anmeldung, Verifikation oder Profil?`,sources:i},he={text:`So erstellst du dein HeidSec-Konto:

1. Auf heidsec.de/login „Konto erstellen“ wählen.
2. E-Mail-Adresse und Passwort (mindestens 12 Zeichen) eingeben.
3. E-Mail bestätigen: Nach der Registrierung kommt ein Bestätigungslink per Mail — auch den Spam-Ordner prüfen.

Danach landest du im Kundenbereich (/account) und kannst Geräte koppeln. Dein Tarif (Free, Pro oder KI) wird dort unter „Tarif & Billing“ angezeigt.`,sources:i},ge={text:`Die Anmeldung findest du unter /login (Registrieren geht dort genauso).

Hilfreich zu wissen:
• Passwörter brauchen mindestens 12 Zeichen.
• Nach der Registrierung bestätigst du deine E-Mail über den Link aus der Verifikationsmail.
• Passwort vergessen? „Passwort vergessen“ auf der Anmeldeseite nutzt dir innerhalb weniger Minuten einen Reset-Link in die Mailbox.

Hakt es an einer bestimmten Stelle?`,sources:i};function fe(n){return n==="widerruf"?{text:`Zum Widerruf (laut AGB):

• Für Verbraucher besteht ein gesetzliches Widerrufsrecht bei digitalen Dienstleistungen nach § 356a BGB; Details regelt die Widerrufsbelehrung.
• Die Widerrufsfrist beginnt mit Vertragsschluss; maßgeblich ist die zum Zeitpunkt des Abschlusses gültige Belehrung.
• Die Seite heidsec.de/widerruf führt dich durch den Vorgang.

Für die formale Abwicklung (Fristen im Einzelfall, Adresse) empfehle ich den Weg über Support oder das Kundenportal — Rechtsaussagen im Detail traue ich mir hier nicht zu.`,sources:m}:{text:`Kündigen laut AGB § 4:

• Free ist ohnehin ohne feste Laufzeit — nichts zu kündigen.
• Kostenpflichtige Abonnements (monatlich/jährlich) verlängern sich automatisch; Kündigung spätestens einen Monat vor Periodenende.
• Website-/Stripe-Abo: Kündigungsbutton im Kundenportal — danach Bestätigungsseite und E-Mail.
• Google-Play-Abo: Kündigung über die Abo-Verwaltung des Play Store.
• Wirksam zum Ende der laufenden Periode; dein Umfang bleibt bis dahin vollständig erhalten.

Auch erreichbar über heidsec.de/kuendigen. Soll ich dir zusätzlich den Widerruf erklären?`,sources:m}}const me={text:`Zahlen & Abrechnung bei HeidSec:

• Website-Abos werden über Stripe abgewickelt, Android-Abos über Google Play.
• HeidSec speichert selbst keinerlei Kartendaten oder IBANs — das bestätigt die Datenschutzerklärung ausdrücklich.
• Rechnungen und Abo-Status siehst du im Kundenportal bzw. in der App.
• Preise und Leistungsumfang zeigt dir der Tarifkatalog in deinem HeidSec-Konto.

Um was geht es dir konkret: Rechnung, Zahlungsmethode oder Abo-Status?`,sources:R},be={text:`Welche Daten HeidSec verarbeitet, listet die Datenschutzerklärung sehr konkret:

• Kontodaten: E-Mail, Kundennummer, Rechnungsadresse
• Authentifizierung: ausschließlich Passwort-Hashes (nie Klartext)
• Sicherheitsdaten: Audit-Ereignisse, Geräteinfos, Schutzmodul-Berichte
• Vault-Inhalte: Ende-zu-Ende-verschlüsselt — Server sehen nur Chiffretext
• KI-Daten: laufen ausschließlich lokal auf deinem Gerät, keine Übertragung
• VPN: nur Verbindungszeitpunkt, Gateway-Adresse, Datenmenge
• Zahlungen: keine Karten-/IBAN-Daten bei HeidSec (Stripe/Google Play)

Einwilligungen sind freiwillige Opt-ins und jederzeit widerrufbar. Volltext: heidsec.de/legal/datenschutz`,sources:R},pe={text:`Verschlüsselung & Sicherheit nach offiziellen Angaben:

• Vault: Ende-zu-Ende — die Server erhalten ausschließlich Chiffretext, HeidSec kann deine Dateien technisch nicht lesen.
• VPN: die Verbindung wird gekapselt; Standort bleibt nach außen unsichtbar.
• Anmeldung: nur Passwort-Hashes werden gespeichert, nie Klartext.
• Sitzungen: jede Anmeldung ist separat einsehbar und sofort widerrufbar (Kundenbereich).

Obendrauf kannst du 2FA nutzen, sobald die Aktivierung über App/Web bereitsteht.`,sources:R},Se={text:`Rechtliche Seiten im Überblick:

• Impressum: heidsec.de/legal/impressum
• Datenschutz: heidsec.de/legal/datenschutz
• AGB: heidsec.de/legal/agb
• Widerruf: heidsec.de/widerruf
• Verträge kündigen: heidsec.de/kuendigen

Kontakt laut Anbieterangaben: info@heidsec.de. Bei rechtlichen Detailfragen bin ich bewusst vorsichtig — dafür sind die verlinkten Texte und der Support die richtige Adresse.`,sources:[{source:"legal",title:"Rechtliches (heidsec.de)"}]},ke={text:`Support & Kontakt:

• Support-Seite: heidsec.de/support
• E-Mail: info@heidsec.de
• Häufige Fragen: FAQ-Abschnitt auf der Startseite bzw. heidsec.de

Wenn du magst, beschreib mir dein Anliegen kurz — bei Produkttarifen, Konto, Geräten und Sicherheitsthemen kann ich meist schon direkt helfen.`,sources:A},ze={text:`Laut offizieller FAQ läuft HeidSec auf Android-Geräten ab Version 8.0.

Weitere Systemvoraussetzungen jenseits davon sind öffentlich nicht dokumentiert — das sagt dir die App beim Download bzw. der Support im Zweifel exakt.`,sources:V},we={text:`Für technische Fragen bin ich gern dein erster Anlauf — je konkreter, desto besser (Gerät, Modul, was genau passiert).

Grundlagen, die ich sicher sagen kann: Android ab 8.0 wird unterstützt; Updates laufen über die App bzw. den Play Store; bei hartnäckigen Fällen hilft der Support (heidsec.de/support · info@heidsec.de).`,sources:V};function Ae(n){return n==="login"?{text:`Login-Probleme — Schritt für Schritt:

1. E-Mail-Adresse auf Tippfehler prüfen.
2. Passwort hat mindestens 12 Zeichen — Groß-/Kleinschreibung und Tastatur-Layout kontrollieren.
3. Noch nicht verifiziert? Schau in dein Postfach nach dem Verifikationslink (auch Spam-Ordner).
4. Passwort vergessen: „Passwort vergessen“ auf /login → Reset-Link per Mail.
5. Immer noch blockiert: heidsec.de/support kontaktieren — dann kann jemand ins Konto schauen.

An welchem der Schritte hängt es?`,sources:A}:n==="device"?{text:`Wenn ein Gerät nicht auftaucht:

1. Ist auf dem Gerät überhaupt die HeidSec-App installiert und mit demselben Konto angemeldet?
2. Pairing läuft ausschließlich über die App — eine Web-Kopplung gibt es (noch) nicht.
3. Kundenbereich (/account → „Geräte“) einmal neu laden.
4. Bleibt das Gerät weg: Support (heidsec.de/support) mit Angabe des Geräts fragen.

Wichtig: Entfernen geht jederzeit über denselben Tab.`,sources:i}:n==="vpn"?{text:`Wenn sich das VPN nicht verbindet:

1. Internetverbindung generell prüfen (Browser-Test).
2. App komplett schließen und neu starten.
3. Gerät neu starten — löst die meisten Verbindungs-Hänger.
4. Netzwechsel testen (mobile Daten vs. WLAN), manche Netze blockieren Tunnel-Protokolle.

Bleibt es bestehen, beschreib mir kurz, was du siehst — konkrete Server-/Konfigurationsdaten habe ich ehrlicherweise nicht, da möchte ich nichts erfinden.`,sources:A}:n==="scan"?{text:`Wenn der Scan nicht startet:

1. App komplett schließen und neu öffnen.
2. Smartphone neu starten.
3. Prüfen, ob ein App-Update verfügbar ist (Play Store).
4. Hängt es weiter, sag mir kurz, was du siehst (Fehlermeldung, Modul) — dann helfe ich gezielter weiter.`,sources:A}:n==="service"?{text:`Wenn HeidSec gerade nicht erreichbar scheint:

1. Kurz warten und erneut versuchen — manchmal läuft gerade ein Update oder Wartung.
2. Internetverbindung prüfen und App neu starten.
3. Hält der Ausfall an, findest du aktuelle Hinweise auf heidsec.de/support.

Den Live-Status des Dienstes kenne ich hier nicht — das prüft der Support bzw. die Statusangaben auf heidsec.de verlässlich.`,sources:A}:{text:`Erste Schritte, wenn etwas nicht klappt:

1. App aktualisieren und neu starten.
2. Anmeldung prüfen — bei Problemen Sitzungen im Kundenbereich beenden und neu anmelden.
3. Gerät neu starten — behebt die meisten Hänger.

Sag mir kurz, welches Modul betroffen ist und was genau passiert — dann helfe ich gezielter weiter.`,sources:A}}const Pe={text:`Klar, gerne weiter — was genau interessiert dich? Ich kann dir zu folgenden Bereichen Konkretes sagen:

• Produkte & Funktionen (Smart Scan, MailGuard, Vault, VPN, Schutzcenter, Kinderschutz)
• Tarife & Preise aus dem aktuellen Katalog
• Konto, Anmeldung, Passwort, 2FA, Sitzungen
• Geräte, Abos und Support
• Datenschutz, Verschlüsselung und allgemeine Sicherheit`,sources:i},Ne={text:`Hallo! Schön, dass du da bist. Wie geht's dir?

Ich helfe dir bei HeidSec-Produkten, den Tarifen Free, Pro und KI, Konto, Geräten, Abos, Datenschutz und Support. Was möchtest du wissen?`,sources:i},ve={text:"Bis bald! Wenn du wieder Fragen zu HeidSec hast, bin ich jederzeit für dich da.",sources:i};function xe(n){return n==="laufzeit"?{text:`Vertragslaufzeiten laut AGB § 4:

• Free — keine feste Laufzeit, jederzeit beendbar.
• Kostenpflichtige Abonnements laufen wahlweise monatlich oder jährlich und verlängern sich automatisch.
• Kündigung spätestens einen Monat vor Periodenende; wirksam zum Ende der laufenden Periode — dein Umfang bleibt bis dahin vollständig erhalten.

Deine konkrete Laufzeit und das nächste Verlängerungsdatum siehst du im Kundenportal.`,sources:m}:n==="wechsel"?{text:`Zum Tarifwechsel:

• Der Wechsel läuft über dein HeidSec-Konto bzw. den Tarifkatalog im Kundenportal.
• Preise und Leistungsumfang werden dir dort immer transparent vor Vertragsschluss angezeigt.
• Welche Funktionen Pro gegenüber KI im Detail freischaltet, listet keine öffentliche Quelle — das möchte ich nicht erfinden.

Soll ich dir die aktuellen Preise zeigen?`,sources:m}:{text:`Geht es dir um deinen Vertrag, um die Kündigung, einen Tarifwechsel oder den Widerruf?

• Kündigung — AGB § 4: Kündigungsbutton im Kundenportal (bzw. Play Store), wirksam zum Periodenende
• Widerruf — gesetzliches Widerrufsrecht bei digitalen Dienstleistungen (§ 356a BGB), siehe heidsec.de/widerruf
• Laufzeit — Free ohne feste Laufzeit, Abos monatlich/jährlich mit automatischer Verlängerung
• Tarifwechsel — über den Tarifkatalog in deinem HeidSec-Konto

Sag mir einfach, welcher Punkt es ist — dann gehe ich tiefer.`,sources:m}}function Ee(n,s={}){const e=q(n),h=X(e),l=h[0],o=ee(e),a=(c,p={})=>({intent:c,...l?{topic:l}:{},...p}),b=e.trim();if(t.greeting.test(b))return{intent:"GREETING"};if(t.bye.test(b))return{intent:"BYE"};if(b.length<=30&&t.thanks.test(b))return{intent:"SMALLTALK"};if(t.chitchat.test(b))return{intent:"CHITCHAT"};if(t.about.test(e))return{intent:"ABOUT"};if(t.trouble.test(e)){let c="allgemein";return/vpn/.test(e)?c="vpn":/scan|smartscan|secapp/.test(e)?c="scan":/offline|nicht erreichbar|wartung|server|backend/.test(e)?c="service":/\blogin\b|anmeld|passwort|einlogg|registrier/.test(e)?c="login":(t.device.test(e)||/erscheint nicht/.test(e))&&(c="device"),a("TROUBLESHOOTING",{problem:c})}if(t.password.test(e))return a("PASSWORD");if(t.twofactor.test(e))return a("TWO_FACTOR");if(t.register.test(e))return a("REGISTER");if(t.login.test(e))return a("LOGIN");if(t.support.test(e))return a("SUPPORT_CONTACT");if(t.widerruf.test(e))return a("CANCELLATION",{subject:"widerruf"});if(t.cancel.test(e))return a("CANCELLATION",{subject:"kuendigung"});if(t.tariffSwitch.test(e))return a("CONTRACT",{contractKind:"wechsel"});if(t.contract.test(e)){let c="allgemein";return/laufzeit|wie lange|mindestlaufzeit|verlänger|verlaenger|läuft/.test(e)?c="laufzeit":/wechsel|up-?grad|down-?grad|anderen? tarif/.test(e)&&(c="wechsel"),a("CONTRACT",{contractKind:c})}const f=t.compare.test(e),v=h.includes("smartscan")&&h.includes("schutzcenter");if(t.legacyPlan.test(e))return{intent:"PLAN_COMPARISON"};if(t.recommendation.test(e))return{intent:"RECOMMENDATION",.../(familie|kinder|kids|eltern)/.test(e)?{family:!0}:{}};if(t.planAdvice.test(e))return{intent:"PLAN_COMPARISON"};if(f&&t.av.test(e))return{intent:"PRODUCT",compare:!0};if(f&&v)return{intent:"SMART_SCAN",topic:"smartscan",compare:!0};if(f&&t.pricing.test(e))return{intent:"PRICING",...o?{plan:o}:{}};if(f&&t.planWord.test(e))return{intent:"PLAN_COMPARISON"};if(o&&/^(free|pro|ki)([!?.]*)$/.test(b))return{intent:"PLAN_INFO",plan:o};if(o&&t.planExplain.test(e))return{intent:"PLAN_INFO",plan:o};if(t.tariffOverview.test(e)&&!t.pricing.test(e))return{intent:"PLAN_COMPARISON"};if(t.pricing.test(e)){const c=o??(/(kostenlos|gratis)/.test(e)?"free":void 0);let p=l;return!p&&s.lastTopic&&t.anaphor.test(e)&&(p=s.lastTopic),{intent:"PRICING",...p?{topic:p}:{},...c?{plan:c}:{}}}if(t.billing.test(e))return a("BILLING");if(t.pairing.test(e))return a("PAIRING");if(t.sessions.test(e))return a("SESSIONS");if(t.device.test(e))return a("DEVICE");if(t.privacy.test(e))return a("PRIVACY");if(t.legal.test(e))return a("LEGAL");if(t.compatibility.test(e))return a("COMPATIBILITY");const x=h[0]??s.lastTopic;if(x&&t.moduleInclusion.test(e))return{intent:"MODULE_INCLUSION",topic:x};if(h.includes("schutzcenter"))return{intent:"PROTECTION_CENTER"};const E={vpn:"VPN",mailguard:"MAILGUARD",vault:"VAULT",parental:"PARENTAL_CONTROL",smartscan:"SMART_SCAN"};if(l&&l!=="schutzcenter")return{intent:E[l],topic:l,...f?{compare:!0}:{}};if(t.beginner.test(e))return{intent:"PRODUCT",beginner:!0};if(/verschlüssel|verschluessel|wie sicher/.test(e))return a("SECURITY");if(t.cyber.test(e))return{intent:"GENERAL_CYBERSECURITY"};if(t.featureGeneric.test(e))return a("FEATURE");if(t.account.test(e))return a("ACCOUNT");if(t.productGeneric.test(e))return{intent:"PRODUCT"};const k=n.length<=48&&t.followup.test(e);if(s.lastTopic){const c=s.lastTopic;if(s.lastIntent==="PRICING"&&k&&t.pricing.test(e))return{intent:"PRICING",topic:c};if(k)return{intent:{vpn:"VPN",mailguard:"MAILGUARD",vault:"VAULT",parental:"PARENTAL_CONTROL",smartscan:"SMART_SCAN",schutzcenter:"PROTECTION_CENTER"}[c],topic:c}}if((s.lastIntent==="PLAN_COMPARISON"||s.lastIntent==="RECOMMENDATION"||s.lastIntent==="PLAN_INFO"||s.lastIntent==="PRICING")&&k){if(o)return{intent:"PLAN_INFO",plan:o};if(t.pricing.test(e))return{intent:"PRICING"};if(/(familie|kinder|kids|eltern)/.test(e))return{intent:"RECOMMENDATION",family:!0};if(t.compare.test(e)||t.planWord.test(e))return{intent:"PLAN_COMPARISON"}}return k?{intent:"FOLLOW_UP"}:{intent:"UNKNOWN"}}function Te(n){switch(n.intent){case"SMALLTALK":return{text:"Gern geschehen! Womit kann ich dir sonst noch helfen?",sources:i};case"CHITCHAT":return{text:"Alles klar — womit kann ich dir helfen?",sources:i};case"ABOUT":return{text:`Ich bin der HeidSec-Assistent und beantworte Fragen zu HeidSec-Produkten (Smart Scan, MailGuard, Vault, VPN, Schutzcenter, Kinderschutz), den Tarifen Free, Pro und KI, Preisen aus dem aktuellen Katalog, Konto, Geräten, Abos, Datenschutz und Sicherheit.

Womit soll ich anfangen?`,sources:i};case"GREETING":return Ne;case"BYE":return ve;case"CONTRACT":return xe(n.contractKind);case"FOLLOW_UP":return Pe;case"PRICING":return se(n.plan);case"PLAN_COMPARISON":return Ie();case"RECOMMENDATION":return Re(n.family);case"PLAN_INFO":return W(n.plan);case"MODULE_INCLUSION":return ae(n.topic);case"SMART_SCAN":return n.compare?Ce:w.smartscan;case"MAILGUARD":return w.mailguard;case"VAULT":return w.vault;case"VPN":return w.vpn;case"PARENTAL_CONTROL":return w.parental;case"PROTECTION_CENTER":return w.schutzcenter;case"PRODUCT":return n.compare?ie:n.beginner?re:te;case"FEATURE":return{text:`Die Funktionen im Überblick:

• Smart Scan — Echtzeit-Scan aller Apps, Warnung bei Auffälligkeiten, Status auf einen Blick
• MailGuard — Phishing/Betrug erkennen, lautlose Quarantäne, Schutz aller Postfächer
• Vault — verschlüsselte Ablage nur mit deinem Schlüssel, synchron auf allen Geräten
• VPN — gekapselte Verbindung, Standort privat, ein Klick überall geschützt
• Schutzcenter — eine Engine, vier Schutzschichten
• Kinderschutz — altersgerechte Sicherheit für Familien

Zu welchem Modul soll ich tiefer einsteigen?`,sources:i};case"PASSWORD":return ue;case"TWO_FACTOR":return ce;case"LOGIN":return ge;case"REGISTER":return he;case"ACCOUNT":return oe;case"DEVICE":return de;case"PAIRING":return{text:`Pairing läuft aktuell ausschließlich über die HeidSec-App auf dem neuen Gerät — eine Web-Kopplung existiert noch nicht (die Backend-Route fehlt, das ist dokumentiert).

Im Kundenbereich (/account, Tab „Geräte“) siehst du anschließend alle gekoppelten Geräte und kannst sie dort auch wieder entfernen.`,sources:i};case"SESSIONS":return le;case"BILLING":return me;case"CANCELLATION":return fe(n.subject);case"PRIVACY":return be;case"SECURITY":return pe;case"LEGAL":return Se;case"SUPPORT_CONTACT":return ke;case"COMPATIBILITY":return ze;case"TECH_SUPPORT":return we;case"TROUBLESHOOTING":return Ae(n.problem);case"GENERAL_CYBERSECURITY":return{text:`Ein paar Grundregeln, die den Großteil der Alltagsrisiken abdecken:

• Einzigartige Passwörter mit mindestens 12 Zeichen pro Dienst — ein Passwort-Manager hilft enorm.
• Zwei-Faktor-Schutz überall aktivieren, wo angeboten.
• Updates zeitnah einspielen (System und Apps).
• Phishing-Merkenkmale: fremder Absender, künstliche Dringlichkeit, verdächtige Links, unerwartete Anhänge — lieber einmal mehr prüfen.
• Öffentliche WLANs meiden oder ein VPN nutzen.

Diese Bereiche deckt das HeidSec-Schutzsystem ab — sag Bescheid, wenn du zu einem Modul Details willst.`,sources:ne};case"UNKNOWN":return null;default:return null}}function Ie(){return{text:`Die Tarife im Überblick:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine, führt alle Schutzschichten zusammen).
• KI — Pro plus Security-AI; die Analyse läuft ausschließlich lokal auf deinem Gerät, keine KI-Daten verlassen es.

Vault, MailGuard, VPN und Kinderschutz sind separate Module und werden einzeln dazugebucht — sie stecken nicht automatisch in Free, Pro oder KI. Die genauen Preise und Kombinationen zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:m}}function Re(n){return n?{text:`Für Familien sieht die Empfehlung so aus:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine).
• KI — Pro plus Security-AI; die Analyse läuft lokal auf den Geräten.
• Dazu separat buchbar: der Kinderschutz (altersgerechte Sicherheit für Kinder) sowie Vault, MailGuard und VPN.

Der Kinderschutz steckt nicht automatisch in Pro oder KI — er wird als Modul einzeln dazugebucht. Preise und verfügbare Kombinationen zeigt dir der Tarifkatalog in deinem HeidSec-Konto.`,sources:i}:{text:`Das hängt davon ab, was dir wichtig ist:

• Free — Smart-Scan-Schutz (Scanner), kostenlos.
• Pro — Free plus Schutzcenter (Core-Engine).
• KI — Pro plus Security-AI, die lokal auf deinem Gerät läuft.

Vault, MailGuard, VPN und Kinderschutz sind separate Module und lassen sich einzeln dazubuchen. Was passt besser zu dir: Geräteschutz, E-Mail-/Posteingangsschutz oder Familienschutz? Dann grenze ich die Empfehlung weiter ein.`,sources:i}}const Ce={text:`Gute Frage — die beiden werden oft verwechselt:

• Smart Scan ist der Schutz auf dem Gerät selbst: Die App scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich direkt.
• Das Schutzcenter (die Core-Engine) ist die zentrale Instanz dahinter: Sie bewertet jedes Signal einmal und speist die Erkenntnis in alle Module — Gerät, Posteingang, Ablage und Verbindung arbeiten als ein System.

Kurz gesagt: Smart Scan ist der Schutz direkt auf deinem Gerät, das Schutzcenter die zentrale Intelligenz, die alle Module zusammendenkt.`,sources:i},Ke=60,D=/ultimate|suite\s+ultimate|\bultra\b/i;function Ge(n){const s=n.trim();if(!D.test(s))return n;const h=s.split("|").map(l=>l.trim()).filter(l=>!D.test(l)).join(" | ").replace(/\s*\|\s*/g," | ").trim().replace(/^Aktuelle\s+Preise:\s*/i,"").replace(/^Aktuelle\s+Angebote[^|]*$/i,"").trim();return h.length>0?h:n}const Oe="Hallo! Ich bin der HeidSec-Assistent. Frag mich zu Produkten wie Smart Scan, MailGuard, Vault, VPN oder Schutzcenter, zu den Tarifen Free, Pro und KI, zu Preisen, Konto, Geräten und Datenschutz. Antworten kommen aus offiziellen HeidSec-Quellen.",Le="Du bist in deinem HeidSec-Konto angemeldet. Frag mich zu Produkten wie Smart Scan, MailGuard, Vault, VPN oder Schutzcenter, zu den Tarifen Free, Pro und KI, Preisen, Geräten und Abos — für Konto- und Tarifänderungen nutze „Mein Konto“. Es werden keine Kontodaten an den Chat übertragen.";let N=1;function We({accountContext:n=!1,faqHref:s}){const[e,h]=g.useState(!1),[l,o]=g.useState([]),[a,b]=g.useState(""),[f,v]=g.useState(!1),[x,E]=g.useState(void 0),[k,C]=g.useState(0),[,c]=g.useState(0),[p,K]=g.useState(!1),[G,F]=g.useState({}),T=g.useRef(null);g.useEffect(()=>{if(!e||k<=Date.now())return;const u=window.setInterval(()=>c(d=>d+1),1e3);return()=>window.clearInterval(u)},[e,k]),g.useEffect(()=>{e&&l.length===0&&o([{id:N++,role:"assistant",text:n?Le:Oe}])},[e,l.length,n]),g.useEffect(()=>{e&&requestAnimationFrame(()=>{T.current?.scrollTo({top:T.current.scrollHeight})})},[l,f,e]);const P=Math.max(0,Math.ceil((k-Date.now())/1e3)),_=a.trim().length>0&&!f&&P===0;async function H(){const u=a.trim();if(!(!u||f||P>0)){o(d=>[...d,{id:N++,role:"user",text:u}]),b(""),v(!0),K(!1);try{const d=Ee(u,G);F({lastTopic:d.topic??G.lastTopic,lastIntent:d.intent});const S=Te(d);if(S){o(I=>[...I,{id:N++,role:"assistant",text:S.text,sources:S.sources}]);return}const z=await B(u,x);o(I=>[...I,{id:N++,role:"assistant",text:Ge(z.reply||"Dazu habe ich gerade keine Antwort."),sources:z.sources}]),z.conversationId&&E(z.conversationId)}catch(d){let S="Der HeidSec-Chat ist gerade nicht erreichbar.";d instanceof M&&d.status===429?(C(Date.now()+Ke*1e3),S="Viele Anfragen auf einmal — bitte warte kurz, bevor du erneut fragst."):d instanceof M&&d.status>=400&&d.status<500?S=d.message:K(!0),o(z=>[...z,{id:N++,role:"assistant",text:S}])}finally{v(!1)}}}return r.jsxs(r.Fragment,{children:[r.jsx("button",{type:"button",onClick:()=>h(u=>!u),"aria-expanded":e,"aria-label":e?"HeidSec-Chat schließen":"HeidSec-Chat öffnen",className:"fixed bottom-4 right-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-primary text-[#05070b] shadow-lg transition-all hover:brightness-110 hover:glow-blue sm:bottom-6 sm:right-6",children:e?r.jsx(O,{className:"size-5","aria-hidden":!0}):r.jsx(Q,{className:"size-5","aria-hidden":!0})}),e&&r.jsxs("section",{"aria-label":"HeidSec-Chat",onKeyDown:u=>{u.key==="Escape"&&h(!1)},className:"fixed bottom-[4.75rem] right-3 z-40 flex h-[min(68svh,540px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl glow-blue sm:bottom-[5.75rem] sm:right-6",children:[r.jsxs("header",{className:"flex items-center justify-between gap-3 border-b border-white/8 bg-graphite/60 px-4 py-3",children:[r.jsxs("div",{className:"flex min-w-0 items-center gap-2.5",children:[r.jsx("img",{src:"/heidsec/logo-monogram.svg",alt:"",className:"size-7 shrink-0",width:28,height:28}),r.jsxs("div",{className:"min-w-0",children:[r.jsx("p",{className:"font-display text-sm font-bold leading-tight text-frost",children:"HeidSec Assistent"}),r.jsx("p",{className:"truncate text-[11px] text-mist",children:"Produkte · Tarife · Preise · Support"})]})]}),r.jsx("button",{type:"button",onClick:()=>h(!1),"aria-label":"Chat schließen",className:"inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-mist transition-colors hover:border-primary/40 hover:text-frost",children:r.jsx(O,{className:"size-3.5","aria-hidden":!0})})]}),r.jsxs("div",{ref:T,"aria-live":"polite",className:"flex-1 space-y-3 overflow-y-auto px-3 py-3",children:[l.map(u=>u.role==="user"?r.jsx("div",{className:"flex justify-end",children:r.jsx("p",{className:"max-w-[85%] whitespace-pre-wrap rounded-xl rounded-br-sm bg-primary px-3 py-2 text-sm font-medium text-[#05070b]",children:u.text})},u.id):r.jsxs("div",{className:"flex flex-col gap-1",children:[r.jsx("p",{className:"max-w-[90%] whitespace-pre-wrap rounded-xl rounded-bl-sm border border-border bg-white/[0.04] px-3 py-2 text-sm leading-relaxed text-frost",children:u.text}),u.sources&&u.sources.length>0&&r.jsx("div",{className:"flex flex-wrap gap-1 pl-1",children:u.sources.slice(0,4).map((d,S)=>r.jsx("span",{className:"rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-neon",children:d.title||d.source||"Quelle"},`${u.id}-${S}`))})]},u.id)),f&&r.jsxs("div",{className:"flex items-center gap-2 pl-1 text-xs text-mist",children:[r.jsx(L,{className:"size-3.5 animate-spin","aria-hidden":!0}),"HeidSec Assistent schreibt…"]}),p&&r.jsxs("div",{className:"mx-1 rounded-lg border border-primary/25 bg-primary/5 p-3 text-xs leading-relaxed text-mist",children:["Chat momentan nicht erreichbar. Alternativ:"," ",r.jsxs("a",{href:"https://www.heidsec.de/support",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline",children:["Support",r.jsx(j,{className:"size-3","aria-hidden":!0})]}),s&&r.jsxs(r.Fragment,{children:[" · ",r.jsx("a",{href:s,className:"text-primary underline-offset-2 hover:underline",children:"FAQ"})]})]})]}),r.jsxs("form",{onSubmit:u=>{u.preventDefault(),H()},className:"border-t border-white/8 bg-graphite/40 px-3 py-2.5",children:[r.jsxs("div",{className:"flex items-end gap-2",children:[r.jsx("label",{htmlFor:"heidsec-chat-input",className:"sr-only",children:"Deine Frage"}),r.jsx("input",{id:"heidsec-chat-input",value:a,onChange:u=>b(u.target.value),placeholder:P>0?`Kurze Pause — ${P}s`:"Deine Frage zu HeidSec…",disabled:f||P>0,maxLength:500,autoComplete:"off",className:"h-11 min-w-0 flex-1 rounded-lg border border-border bg-white/[0.04] px-3 text-sm text-frost placeholder:text-mist/60 outline-none transition-colors focus:border-primary/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-ring/40 disabled:opacity-60"}),r.jsx("button",{type:"submit",disabled:!_,"aria-label":"Nachricht senden",className:"inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-[#05070b] transition-all hover:brightness-110 disabled:opacity-50",children:f?r.jsx(L,{className:"size-4 animate-spin","aria-hidden":!0}):r.jsx(Y,{className:"size-4","aria-hidden":!0})})]}),r.jsxs("p",{className:"mt-2 flex items-center gap-1.5 text-[10px] leading-snug text-mist/70",children:[r.jsx(U,{className:"size-3 shrink-0 text-primary","aria-hidden":!0}),"Antworten aus offiziellen HeidSec-Quellen. Preise kommen aus dem aktuellen Tarifkatalog; es werden keine Konto- oder Profildaten übermittelt."]})]})]})]})}export{We as ChatWidget,Ge as sanitizeBackendReply};
