import{a as d,j as n}from"./framer-motion-DfXMriiy.js";import{D as B,A as G}from"./heidsec-api-DPulPd1e.js";import{c as V,X as M,L,E as H}from"./index-DZifpNsM.js";import{S as U}from"./shield-check-Bv4sTOMj.js";const Z=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],J=V("arrow-up",Z);const Y=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],Q=V("message-circle",Y);function $(t){return t.toLowerCase().replace(/ß/g,"ss")}const i={greeting:/^(hallo+|hi|hey|hej|moin|servus|na|guten\s+(tag|morgen|abend))[\s!,.?]*$/,bye:/^(tschuess|tschüss|ciao|bye|bis\s+(dann|bald))[\s!,.?]*$/,thanks:/(\bdanke\b|dankeschoen|dankeschön|\bmerci\b)/,trouble:/(funktioniert nicht|geht nicht|verbindet nicht|erscheint nicht|klappt nicht|hängt|\bfehler\b|probleme?\b|nicht mehr|scheitert|kann mich nicht|ausgesperrt|komme nicht (mehr )?(rein|hinein)|kein zugang|einloggprobleme?|loginprobleme?)/,password:/passwort/,twofactor:/2fa|zwei-?faktor/,login:/\blogin\b|anmeld\w*|einlogg\w*|zugangsdaten|registrier/,widerruf:/widerruf/,cancel:/künd|kuend/,contract:/\bvertrag/,planAdvice:/welchen?\s+tarife?|welche\s+tarife?\s|tarife?.{0,24}(familie|brauch|empfehl|passt|sind)|familie.{0,24}(tarif|paket|suite)|fuer meine familie|für meine familie/,compare:/(unterscheid\w*|unterschied\w*|vergleich|\bvs\.?\b|genau anders|besser als|oder eher)/,planWord:/\bfree\b|\bpro\b|\bki\b|ultimate|\bsuite\b|\btarif|pakete?\b/,billing:/(rechnung|zahlung|\bstripe\b|play[\s-]?store|abo-?verwaltung|\babonnement|\babos?\b|verlänger|verlaenger|laufzeit|\bpremium\b)/,pricing:/(\bpreis\w*|kostenlos|\bkosten\b|\bkostet\b|\bteuer\w*|€|\beuro\b|monatlich|j[aä]hrlich|jaehrlich|\babo-?preis\w*|im\s+(monat|jahr)|pro\s+(monat|jahr)|\bmonat\b|lizenz)/,pairing:/pairing|koppeln|koppelcode|gerät(e)? verbinden|verbinden.{0,16}app/,sessions:/sitzung/,device:/\bgerät|\bgeraet|\bdevice\b|geräteliste/,account:/(\bkonto\b|\baccount\b|\bprofil\b|kundebereich|kundenbereich)/,privacy:/(datenschutz|dsgvo|privatsphaere|privatsphäre|personenbezogen|verkauft.{0,12}daten|verkauf.{0,12}daten|weitergabe|daten speicher|speichert.{0,20}daten|dateien lesen|mitlesen|einsehen kann|einblick)/,legal:/(impressum|\bagb\b|datenschutzerklaerung|datenschutzerklärung|\blegal\b|rechtlich)/,support:/(\bsupport\b|\bkontakt\b|kundendienst|heidsec erreichen|hotline)/,compatibility:/(\bandroid\b|version\s*\d|unterstützt|kompatibel|systemvorau|anforderung|mindestversion)/,av:/(virenschutz|antivirus|virenscanner|klassischen? schutz|normale[nm] virenschutz)/,beginner:/(anfänger|anfaenger|einfach erklärt|einfach erklaert|kindgerecht|für laien|laien)/,featureGeneric:/(\bfeatures?\b|funktionen\b|was kann (man|heidsec)|leistungen\b|umfang)/,cyber:/(phishing|betrugsmail|\bscam\b|\bvirus\b|malware|trojaner|sicheres? passwort|starke passwörter|passwörter merken|öffentliche?s?\s+wlans?|\bwlans?\b|gestohlen|gehackt|dritte zugreifen)/,productGeneric:/(was ist heidsec|überblick|\bprodukte?\b|\bmodule\b|\bsuite\b|plattform|\bapp\b.*\bfunktion|wofür ist heidsec)/,anaphor:/\b(das|dieses|diese|dem|ihm|damit)\b/,followup:/\b(mehr|genauer?|details|weiter|und\b|das\b|davon|damit|auch\b|beispiel)\b/},q=[["vpn",/\bvpn\b|\btunnel\b|hotel[- ]?wlan|standort unsichtbar/],["mailguard",/mailguard|posteingang|quarantäne|quantaene|verdächtig\w* anhang|schädliche anhänge|phishing.*mailguard/],["vault",/vault|\btresor\b|datengewölbe|dokumente verschlüsselt|dateien verschlüsselt/],["parental",/kinderschutz|parental control|kindersicherung|\bkinder(n)?\b.*schutz|schutz.*kinder/],["smartscan",/smart[\s-]?scan|\bsecapp\b|sicherheitszentrum|apps scannen/],["schutzcenter",/schutzcenter|\bcore\b|analyse-engine|\bengine\b|schutzschichten/]];function X(t){const c=[];for(const[e,h]of q)h.test(t)&&c.push(e);return c}function ee(t){if(/\bultimate\b/.test(t))return"ultimate";if(/\bfree\b/.test(t))return"free";if(/\bki\b/.test(t))return"ki";if(/\bpro\b/.test(t))return"pro"}const s=[{source:"knowledge",title:"HeidSec Wissensbasis (heidsec.de)"}],N=[{source:"prices",title:"Offizielle HeidSec-Preisliste"}],S=[{source:"terms",title:"AGB § 3/§ 4 (heidsec.de)"}],I=[{source:"privacy",title:"Datenschutzerklärung (heidsec.de)"}],y=[{source:"faq",title:"heidsec.de FAQ"}],v=[{source:"support",title:"HeidSec Support (heidsec.de/support)"}],ne=[{source:"general",title:"Allgemeine Sicherheitshinweise"}],O=`MainApp KI: 29,99 €/Monat · 299,99 €/Jahr
MainApp PRO: 9,99 €/Monat · 99,99 €/Jahr
MainApp Ultimate: 19,99 €/Monat · 199,99 €/Jahr
Security KI: 24,99 €/Monat · 249,99 €/Jahr
Security PRO: 7,99 €/Monat · 79,99 €/Jahr
Security Ultra: 14,99 €/Monat · 149,99 €/Jahr
MailGuard Module: 3,99 €/Monat · 39,99 €/Jahr
Vault Module: 3,99 €/Monat · 39,99 €/Jahr
VPN Module: 4,99 €/Monat · 49,99 €/Jahr`,A={smartscan:{text:`Smart Scan (in der App intern SecApp genannt) ist dein Sicherheitszentrum in der Tasche: Er scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich, bevor aus einem Klick ein Problem wird.

• Echtzeit-Scan aller Apps
• Sofortige Warnung bei Auffälligkeiten
• Status auf einen Blick`,sources:s},mailguard:{text:`MailGuard überwacht deinen Posteingang und hält Phishing, Betrug und schädliche Anhänge fern — bevor sie dich erreichen.

• Verdächtige Anhänge werden erkannt und landen lautlos in der Quarantäne, statt sie zu öffnen.
• Erkennung von Phishing- und Betrugsversuchen
• Schutz für alle deine Postfächer`,sources:s},vault:{text:`Vault legt Dokumente, Zugänge und Geheimnisse in einen verschlüsselten Raum, zu dem nur du den Schlüssel hältst — auf all deinen Geräten synchron.

Zur Sicherheit: Laut Datenschutzerklärung ist der Inhalt Ende-zu-Ende-verschlüsselt — die Server erhalten ausschließlich Chiffretext und können deine Dateien nicht lesen.`,sources:s},vpn:{text:`HeidSec VPN kapselt deine Verbindung und macht deinen Standort unsichtbar — gerade in öffentlichen Netzen wie dem Hotel-WLAN sinnvoll, weil dort Mitnutzer theoretisch den Datenverkehr mitlesen können.

Laut Datenschutzerklärung beschränken sich erhobene VPN-Verbindungsdaten auf Verbindungszeitpunkt, zugewiesene Gateway-Adresse und übertragene Datenmenge.`,sources:s},parental:{text:`Der Kinderschutz ist die Kindersicherungsfunktion (Parental Control) von HeidSec: Er hilft Eltern, den digitalen Alltag ihrer Kinder altersgerecht und sicher zu gestalten.

Den konkreten Funktionsumfang zeigt die HeidSec-App unter dem Modul Kinderschutz — ich nenne hier bewusst nur Belegtes.`,sources:s},schutzcenter:{text:`Das Schutzcenter ist das Herz von HeidSec: Eine Analyse-Engine bewertet jedes Signal einmal und speist die Erkenntnis sofort in alle Produkte — vom Smartphone bis zum verschlüsselten Tunnel.

• Einmal erkannt — überall abgewehrt
• Gerät, Posteingang, Ablage und Verbindung als ein System (vier Schutzschichten)
• Klare Entscheidungen statt Alarmflut`,sources:s}},te={text:`HeidSec bündelt sechs Sicherheitsmodule in einer Suite — eine Engine, mehrere Schutzschichten, ein Konto:

• Smart Scan — mobiles Sicherheitszentrum (App-intern SecApp)
• MailGuard — Posteingang unter Kontrolle
• Vault — verschlüsselter Raum
• VPN — privater Tunnel
• Schutzcenter — eine Engine, vier Schutzschichten
• Kinderschutz — altersgerechte Sicherheit für Familien

Zu welchem Modul möchtest du mehr erfahren?`,sources:s},ie={text:`Ganz einfach erklärt: HeidSec ist eine App für dein Smartphone, die mehrere Schutzhelfer gleichzeitig vereint.

• Smart Scan prüft deine Apps und Verbindungen.
• MailGuard sortiert gefährliche Mails aus.
• Vault ist ein Tresor für Dokumente und Passwörter.
• VPN versteckt deinen Standort im Netz.
• Das Schutzcenter fasst alles zusammen, der Kinderschutz hilft Familien.

Du brauchst dafür ein Android-Smartphone ab Version 8.0. Alles Weitere kannst du nach der Anmeldung Schritt für Schritt in der App entdecken.`,sources:s},re={text:`Klassischer Virenschutz konzentriert sich auf Schadsoftware auf dem Gerät. HeidSec denkt breiter — sechs Module als ein System:

• Smart Scan: Geräte- und App-Schutz auf dem Smartphone
• MailGuard: Phishing und Betrug schon im Posteingang stoppen
• Vault: Ende-zu-Ende-verschlüsselter Tresor für Dokumente und Zugänge
• VPN: privater Tunnel für deine Verbindung
• Kinderschutz: altersgerechte Sicherheit für Familien
• Schutzcenter: eine zentrale Engine, die alle Module speist — einmal erkannt, überall abgewehrt

Ich behaupte hier bewusst nichts über Erkennungsraten — den Funktionsumfang findest du belegt auf heidsec.de und in der App.`,sources:s},se={text:`Ja. Laut AGB gilt: HeidSec Free ist die kostenlose Nutzung mit Basisschutz — ohne feste Laufzeit und jederzeit beendbar.

Danach gibt es kostenpflichtige Tarife mit erweitertem Leistungsumfang (Pro, KI, Ultimate) sowie einzeln buchbare Zusatzmodule. Soll ich dir die aktuelle Preisliste zeigen?`,sources:S};function ae(t,c){const e={vault:"Vault Module: 3,99 €/Monat · 39,99 €/Jahr",vpn:"VPN Module: 4,99 €/Monat · 49,99 €/Jahr",mailguard:"MailGuard Module: 3,99 €/Monat · 39,99 €/Jahr"};return c==="pro"?{text:`Aktuelle Konditionen mit „Pro“ laut offizieller Preisliste:

• MainApp PRO: 9,99 €/Monat · 99,99 €/Jahr
• Security PRO: 7,99 €/Monat · 79,99 €/Jahr

Beide Stufen sind kostenpflichtige Tarife mit erweitertem Leistungsumfang (Monats-/Jahresabonnement). Welches Bundle zu dir passt, zeigt der Tarifkatalog in deinem HeidSec-Konto.`,sources:N}:c==="ki"?{text:`Aktuelle Konditionen mit „KI“ laut offizieller Preisliste:

• MainApp KI: 29,99 €/Monat · 299,99 €/Jahr
• Security KI: 24,99 €/Monat · 249,99 €/Jahr

Die KI-Tarife schließen Security-AI ein — die Analyse läuft dabei ausschließlich lokal auf deinem Gerät.`,sources:N}:c==="ultimate"?{text:`Aktuelle Konditionen laut offizieller Preisliste:

• MainApp Ultimate: 19,99 €/Monat · 199,99 €/Jahr

Die Suite Ultimate selbst bündelt die vier Kernprodukte Smart Scan, MailGuard, Vault und VPN in einem Abo.`,sources:N}:c==="free"?se:{text:`${t&&e[t]?`Aktuelle Konditionen:
${e[t]}

Vollständige offizielle Preisliste:
${O}`:`Aktuelle offizielle Preisliste:
${O}`}

Die Basisversion ist kostenlos (ohne feste Laufzeit). Tarifwechsel und Abrechnung laufen über dein HeidSec-Konto.`,sources:N}}const le={text:`Zu Passwörtern gibt es drei Wege:

• Ändern (angemeldet): Über dein HeidSec-Konto bzw. „Mein Konto“.
• Vergessen: Auf der Anmeldeseite (/login) den Punkt „Passwort vergessen“ nutzen — du erhältst eine E-Mail mit Reset-Link.
• Regeln: Dein Passwort braucht mindestens 12 Zeichen (das prüft das Backend, live verifiziert). Komplexitätsregeln gibt es darüber hinaus nicht.

Tipp: Einzigartige Passwörter pro Dienst und am besten einen Passwort-Manager nutzen.`,sources:s},ue={text:`Zwei-Faktor ist im HeidSec-Backend vollständig vorgesehen — ob 2FA für dein Konto aktiv ist, siehst du im Kundenbereich (/account) unter Profil.

Transparenz: Die Aktivierung über die Web-Oberfläche ist derzeit durch einen Step-up-Schutz des Backends blockiert („Step-up authentication required“); der zugehörige Client-Ablauf ist seitens des Backend-Teams noch nicht dokumentiert. Bis dahin läuft die 2FA-Einrichtung über die HeidSec-App.

Ich sage dir das lieber offen, statt einen Ablauf zu erfinden.`,sources:s},ce={text:`Geräte verwaltest du so:

• Übersicht & Entfernen: Kundenbereich (/account), Tab „Geräte“ — dort erscheinen alle angemeldeten Geräte, jedes lässt sich direkt entfernen.
• Neues Gerät hinzufügen: über die HeidSec-App auf dem jeweiligen Smartphone.

Ein Web-Pairing existiert aktuell noch nicht (die Route fehlt im Backend) — das Pairing läuft ausschließlich über die App.`,sources:s},de={text:`Angemeldete Sitzungen siehst du im Kundenbereich (/account), Tab „Profil“ unter „Aktive Sitzungen“ — inklusive Gerätename, Startzeit, Ablaufdatum und Markierung der aktuellen Sitzung.

Jede einzelne Sitzung lässt sich dort sofort beenden; der Zugang dieser Sitzung ist damit unwiderruflich entzogen. Praktisch, wenn du ein Gerät verloren hast oder verdächtige Aktivitäten bemerkst.`,sources:s},oe={text:`Dein HeidSec-Konto:

• Registrieren & Anmelden: über die Anmeldeseite (/login) — danach landest du im geschützten Kundenbereich (/account).
• Profil & Tarif: im Kundenbereich bzw. über „Mein Konto“ auf heidsec.de.
• E-Mail-Verifikation: nach der Registrierung kommt ein Bestätigungslink per Mail.
• Passwort: mindestens 12 Zeichen; zurücksetzen geht jederzeit über „Passwort vergessen“.

Womit genau kann ich helfen — Anmeldung, Verifikation oder Profil?`,sources:s},he={text:`Die Anmeldung findest du unter /login (Registrieren geht dort genauso).

Hilfreich zu wissen:
• Passwörter brauchen mindestens 12 Zeichen.
• Nach der Registrierung bestätigst du deine E-Mail über den Link aus der Verifikationsmail.
• Passwort vergessen? „Passwort vergessen“ auf der Anmeldeseite nutzt dir innerhalb weniger Minuten einen Reset-Link in die Mailbox.

Hakt es an einer bestimmten Stelle?`,sources:s};function ge(t){return t==="widerruf"?{text:`Zum Widerruf (laut AGB):

• Für Verbraucher besteht ein gesetzliches Widerrufsrecht bei digitalen Dienstleistungen nach § 356a BGB; Details regelt die Widerrufsbelehrung.
• Die Widerrufsfrist beginnt mit Vertragsschluss; maßgeblich ist die zum Zeitpunkt des Abschlusses gültige Belehrung.
• Die Seite heidsec.de/widerruf führt dich durch den Vorgang.

Für die formale Abwicklung (Fristen im Einzelfall, Adresse) empfehle ich den Weg über Support oder das Kundenportal — Rechtsaussagen im Detail traue ich mir hier nicht zu.`,sources:S}:{text:`Kündigen laut AGB § 4:

• Free ist ohnehin ohne feste Laufzeit — nichts zu kündigen.
• Kostenpflichtige Abonnements (monatlich/jährlich) verlängern sich automatisch; Kündigung spätestens einen Monat vor Periodenende.
• Website-/Stripe-Abo: Kündigungsbutton im Kundenportal — danach Bestätigungsseite und E-Mail.
• Google-Play-Abo: Kündigung über die Abo-Verwaltung des Play Store.
• Wirksam zum Ende der laufenden Periode; dein Umfang bleibt bis dahin vollständig erhalten.

Auch erreichbar über heidsec.de/kuendigen. Soll ich dir zusätzlich den Widerruf erklären?`,sources:S}}const fe={text:`Zahlen & Abrechnung bei HeidSec:

• Website-Abos werden über Stripe abgewickelt, Android-Abos über Google Play.
• HeidSec speichert selbst keinerlei Kartendaten oder IBANs — das bestätigt die Datenschutzerklärung ausdrücklich.
• Rechnungen und Abo-Status siehst du im Kundenportal bzw. in der App.
• Preise nenne ich dir gern auf Nachfrage — sag einfach „Was kostet Pro?“ o. Ä.

Um was geht es dir konkret: Rechnung, Zahlungsmethode oder Abo-Status?`,sources:I},me={text:`Welche Daten HeidSec verarbeitet, listet die Datenschutzerklärung sehr konkret:

• Kontodaten: E-Mail, Kundennummer, Rechnungsadresse
• Authentifizierung: ausschließlich Passwort-Hashes (nie Klartext)
• Sicherheitsdaten: Audit-Ereignisse, Geräteinfos, Schutzmodul-Berichte
• Vault-Inhalte: Ende-zu-Ende-verschlüsselt — Server sehen nur Chiffretext
• KI-Daten: laufen ausschließlich lokal auf deinem Gerät, keine Übertragung
• VPN: nur Verbindungszeitpunkt, Gateway-Adresse, Datenmenge
• Zahlungen: keine Karten-/IBAN-Daten bei HeidSec (Stripe/Google Play)

Einwilligungen sind freiwillige Opt-ins und jederzeit widerrufbar. Volltext: heidsec.de/legal/datenschutz`,sources:I},be={text:`Verschlüsselung & Sicherheit nach offiziellen Angaben:

• Vault: Ende-zu-Ende — die Server erhalten ausschließlich Chiffretext, HeidSec kann deine Dateien technisch nicht lesen.
• VPN: die Verbindung wird gekapselt; Standort bleibt nach außen unsichtbar.
• Anmeldung: nur Passwort-Hashes werden gespeichert, nie Klartext.
• Sitzungen: jede Anmeldung ist separat einsehbar und sofort widerrufbar (Kundenbereich).

Obendrauf kannst du 2FA nutzen, sobald die Aktivierung über App/Web bereitsteht.`,sources:I},pe={text:`Rechtliche Seiten im Überblick:

• Impressum: heidsec.de/legal/impressum
• Datenschutz: heidsec.de/legal/datenschutz
• AGB: heidsec.de/legal/agb
• Widerruf: heidsec.de/widerruf
• Verträge kündigen: heidsec.de/kuendigen

Kontakt laut Anbieterangaben: info@heidsec.de. Bei rechtlichen Detailfragen bin ich bewusst vorsichtig — dafür sind die verlinkten Texte und der Support die richtige Adresse.`,sources:[{source:"legal",title:"Rechtliches (heidsec.de)"}]},Se={text:`Support & Kontakt:

• Support-Seite: heidsec.de/support
• E-Mail: info@heidsec.de
• Häufige Fragen: FAQ-Abschnitt auf der Startseite bzw. heidsec.de

Wenn du magst, beschreib mir dein Anliegen kurz — bei Produkttarifen, Konto, Geräten und Sicherheitsthemen kann ich meist schon direkt helfen.`,sources:v},ke={text:`Laut offizieller FAQ läuft HeidSec auf Android-Geräten ab Version 8.0.

Weitere Systemvoraussetzungen jenseits davon sind öffentlich nicht dokumentiert — das sagt dir die App beim Download bzw. der Support im Zweifel exakt.`,sources:y},Ae={text:`Für technische Fragen bin ich gern dein erster Anlauf — je konkreter, desto besser (Gerät, Modul, was genau passiert).

Grundlagen, die ich sicher sagen kann: Android ab 8.0 wird unterstützt; Updates laufen über die App bzw. den Play Store; bei hartnäckigen Fällen hilft der Support (heidsec.de/support · info@heidsec.de).`,sources:y};function ze(t){return t==="login"?{text:`Login-Probleme — Schritt für Schritt:

1. E-Mail-Adresse auf Tippfehler prüfen.
2. Passwort hat mindestens 12 Zeichen — Groß-/Kleinschreibung und Tastatur-Layout kontrollieren.
3. Noch nicht verifiziert? Schau in dein Postfach nach dem Verifikationslink (auch Spam-Ordner).
4. Passwort vergessen: „Passwort vergessen“ auf /login → Reset-Link per Mail.
5. Immer noch blockiert: heidsec.de/support kontaktieren — dann kann jemand ins Konto schauen.

An welchem der Schritte hängt es?`,sources:v}:t==="device"?{text:`Wenn ein Gerät nicht auftaucht:

1. Ist auf dem Gerät überhaupt die HeidSec-App installiert und mit demselben Konto angemeldet?
2. Pairing läuft ausschließlich über die App — eine Web-Kopplung gibt es (noch) nicht.
3. Kundenbereich (/account → „Geräte“) einmal neu laden.
4. Bleibt das Gerät weg: Support (heidsec.de/support) mit Angabe des Geräts fragen.

Wichtig: Entfernen geht jederzeit über denselben Tab.`,sources:s}:t==="vpn"?{text:`Wenn sich das VPN nicht verbindet:

1. Internetverbindung generell prüfen (Browser-Test).
2. App komplett schließen und neu starten.
3. Gerät neu starten — löst die meisten Verbindungs-Hänger.
4. Netzwechsel testen (mobile Daten vs. WLAN), manche Netze blockieren Tunnel-Protokolle.
5. Bleibt es bestehen: heidsec.de/support — konkrete Server-/Konfigurationsdaten habe ich ehrlicherweise nicht, da möchte ich nichts erfinden.`,sources:v}:{text:`Lass uns das strukturiert angehen — beschreib mir kurz:

1. Was hast du gemacht?
2. Was hast du erwartet?
3. Was ist stattdessen passiert (Fehlermeldung)?

Allgemeine Soforthilfe: App aktualisieren/neu starten, Anmeldung prüfen, ggf. Sitzungen im Kundenbereich beenden und neu anmelden. Für tiefe Diagnosen ist der Support (heidsec.de/support) die richtige Stelle.`,sources:v}}const we={text:`Das kann ich dir ehrlich gesagt nicht sicher beantworten — dazu habe ich keine geprüfte Information, und raten möchte ich nicht.

So findest du es verlässlich heraus:
• Ausführliche Antworten: FAQ auf heidsec.de
• Direkt Hilfe: heidsec.de/support · info@heidsec.de

Oder frag mich zu Produkten, Tarifen, Preisen, Konto, Geräten, Datenschutz und allgemeiner IT-Sicherheit — da kenne ich mich mit belegten Fakten aus.`,sources:v},xe={text:`Klar, gerne weiter — was genau interessiert dich? Ich kann dir zu folgenden Bereichen Konkretes sagen:

• Produkte & Funktionen (Smart Scan, MailGuard, Vault, VPN, Schutzcenter, Kinderschutz)
• Tarife & Preise (Free, Pro, KI, Ultimate, Module)
• Konto, Anmeldung, Passwort, 2FA, Sitzungen
• Geräte & Billing
• Datenschutz, Verschlüsselung, allgemeine Sicherheit`,sources:s},ve={text:`Hallo! Schön, dass du da bist.

Ich helfe dir bei allem rund um HeidSec:
• Produkte & Funktionen (Smart Scan, MailGuard, Vault, VPN, Schutzcenter, Kinderschutz)
• Tarife & Preise (Free, Pro, KI, Ultimate)
• Konto, Anmeldung, Passwort, 2FA, Geräte
• Datenschutz & allgemeine IT-Sicherheit

Was möchtest du wissen?`,sources:s},Pe={text:"Bis bald! Wenn du wieder Fragen zu HeidSec hast, bin ich jederzeit für dich da.",sources:s};function Ne(t){return t==="laufzeit"?{text:`Vertragslaufzeiten laut AGB § 4:

• Free — keine feste Laufzeit, jederzeit beendbar.
• Kostenpflichtige Abonnements laufen wahlweise monatlich oder jährlich und verlängern sich automatisch.
• Kündigung spätestens einen Monat vor Periodenende; wirksam zum Ende der laufenden Periode — dein Umfang bleibt bis dahin vollständig erhalten.

Deine konkrete Laufzeit und das nächste Verlängerungsdatum siehst du im Kundenportal.`,sources:S}:t==="wechsel"?{text:`Zum Tarifwechsel:

• Der Wechsel läuft über dein HeidSec-Konto bzw. den Tarifkatalog im Kundenportal.
• Preise und Leistungsumfang werden dir dort immer transparent vor Vertragsschluss angezeigt.
• Welche Funktionen Pro gegenüber KI im Detail freischaltet, listet keine öffentliche Quelle — das möchte ich nicht erfinden.

Soll ich dir die aktuellen Preise zeigen?`,sources:S}:{text:`Geht es dir um deinen Vertrag, um die Kündigung, einen Tarifwechsel oder den Widerruf?

• Kündigung — AGB § 4: Kündigungsbutton im Kundenportal (bzw. Play Store), wirksam zum Periodenende
• Widerruf — gesetzliches Widerrufsrecht bei digitalen Dienstleistungen (§ 356a BGB), siehe heidsec.de/widerruf
• Laufzeit — Free ohne feste Laufzeit, Abos monatlich/jährlich mit automatischer Verlängerung
• Tarifwechsel — über den Tarifkatalog in deinem HeidSec-Konto

Sag mir einfach, welcher Punkt es ist — dann gehe ich tiefer.`,sources:S}}function Ee(t,c={}){const e=$(t),h=X(e),o=h[0],b=ee(e),a=(l,f={})=>({intent:l,...o?{topic:o}:{},...f}),p=e.trim();if(i.greeting.test(p))return{intent:"GREETING"};if(i.bye.test(p))return{intent:"BYE"};if(p.length<=30&&i.thanks.test(p))return{intent:"SMALLTALK"};if(i.trouble.test(e)){let l="allgemein";return/vpn/.test(e)?l="vpn":/\blogin\b|anmeld|passwort|einlogg/.test(e)?l="login":(i.device.test(e)||/erscheint nicht/.test(e))&&(l="device"),a("TROUBLESHOOTING",{problem:l})}if(i.password.test(e))return a("PASSWORD");if(i.twofactor.test(e))return a("TWO_FACTOR");if(i.login.test(e))return a("LOGIN");if(i.support.test(e))return a("SUPPORT_CONTACT");if(i.widerruf.test(e))return a("CANCELLATION",{subject:"widerruf"});if(i.cancel.test(e))return a("CANCELLATION",{subject:"kuendigung"});if(i.contract.test(e)){let l="allgemein";return/laufzeit|wie lange|mindestlaufzeit|verlänger|verlaenger|läuft/.test(e)?l="laufzeit":/wechsel|up-?grad|down-?grad|anderen? tarif/.test(e)&&(l="wechsel"),a("CONTRACT",{contractKind:l})}const g=i.compare.test(e),P=h.includes("smartscan")&&h.includes("schutzcenter");if(i.planAdvice.test(e))return{intent:"PLAN_COMPARISON"};if(g&&i.av.test(e))return{intent:"PRODUCT",compare:!0};if(g&&P)return{intent:"SMART_SCAN",topic:"smartscan",compare:!0};if(g&&i.planWord.test(e))return{intent:"PLAN_COMPARISON"};if(i.pricing.test(e)){const l=b??(/(kostenlos|gratis)/.test(e)?"free":void 0);let f=o;return!f&&c.lastTopic&&i.anaphor.test(e)&&(f=c.lastTopic),{intent:"PRICING",...f?{topic:f}:{},...l?{plan:l}:{}}}if(i.billing.test(e))return a("BILLING");if(i.pairing.test(e))return a("PAIRING");if(i.sessions.test(e))return a("SESSIONS");if(i.device.test(e))return a("DEVICE");if(i.privacy.test(e))return a("PRIVACY");if(i.legal.test(e))return a("LEGAL");if(i.compatibility.test(e))return a("COMPATIBILITY");if(h.includes("schutzcenter"))return{intent:"PROTECTION_CENTER"};const E={vpn:"VPN",mailguard:"MAILGUARD",vault:"VAULT",parental:"PARENTAL_CONTROL",smartscan:"SMART_SCAN"};if(o&&o!=="schutzcenter")return{intent:E[o],topic:o,...g?{compare:!0}:{}};if(i.beginner.test(e))return{intent:"PRODUCT",beginner:!0};if(/verschlüssel|verschluessel|wie sicher/.test(e))return a("SECURITY");if(i.cyber.test(e))return{intent:"GENERAL_CYBERSECURITY"};if(i.featureGeneric.test(e))return a("FEATURE");if(i.account.test(e))return a("ACCOUNT");if(i.productGeneric.test(e))return{intent:"PRODUCT"};const z=t.length<=48&&i.followup.test(e);if(c.lastTopic){const l=c.lastTopic;if(c.lastIntent==="PRICING"&&z)return{intent:"PRICING",topic:l};if(z)return{intent:{vpn:"VPN",mailguard:"MAILGUARD",vault:"VAULT",parental:"PARENTAL_CONTROL",smartscan:"SMART_SCAN",schutzcenter:"PROTECTION_CENTER"}[l],topic:l}}return z?{intent:"FOLLOW_UP"}:{intent:"UNKNOWN"}}function Te(t){switch(t.intent){case"SMALLTALK":return{text:"Gern geschehen! Frag mich alles zu HeidSec-Produkten, Tarifen, Preisen, Konto & Geräten oder allgemeiner IT-Sicherheit.",sources:s};case"GREETING":return ve;case"BYE":return Pe;case"CONTRACT":return Ne(t.contractKind);case"FOLLOW_UP":return xe;case"PRICING":return ae(t.topic,t.plan);case"PLAN_COMPARISON":return Re();case"SMART_SCAN":return t.compare?Ie:A.smartscan;case"MAILGUARD":return A.mailguard;case"VAULT":return A.vault;case"VPN":return A.vpn;case"PARENTAL_CONTROL":return A.parental;case"PROTECTION_CENTER":return A.schutzcenter;case"PRODUCT":return t.compare?re:t.beginner?ie:te;case"FEATURE":return{text:`Die Funktionen im Überblick:

• Smart Scan — Echtzeit-Scan aller Apps, Warnung bei Auffälligkeiten, Status auf einen Blick
• MailGuard — Phishing/Betrug erkennen, lautlose Quarantäne, Schutz aller Postfächer
• Vault — verschlüsselte Ablage nur mit deinem Schlüssel, synchron auf allen Geräten
• VPN — gekapselte Verbindung, Standort privat, ein Klick überall geschützt
• Schutzcenter — eine Engine, vier Schutzschichten
• Kinderschutz — altersgerechte Sicherheit für Familien

Zu welchem Modul soll ich tiefer einsteigen?`,sources:s};case"PASSWORD":return le;case"TWO_FACTOR":return ue;case"LOGIN":return he;case"ACCOUNT":return oe;case"DEVICE":return ce;case"PAIRING":return{text:`Pairing läuft aktuell ausschließlich über die HeidSec-App auf dem neuen Gerät — eine Web-Kopplung existiert noch nicht (die Backend-Route fehlt, das ist dokumentiert).

Im Kundenbereich (/account, Tab „Geräte“) siehst du anschließend alle gekoppelten Geräte und kannst sie dort auch wieder entfernen.`,sources:s};case"SESSIONS":return de;case"BILLING":return fe;case"CANCELLATION":return ge(t.subject);case"PRIVACY":return me;case"SECURITY":return be;case"LEGAL":return pe;case"SUPPORT_CONTACT":return Se;case"COMPATIBILITY":return ke;case"TECH_SUPPORT":return Ae;case"TROUBLESHOOTING":return ze(t.problem);case"GENERAL_CYBERSECURITY":return{text:`Ein paar Grundregeln, die den Großteil der Alltagsrisiken abdecken:

• Einzigartige Passwörter mit mindestens 12 Zeichen pro Dienst — ein Passwort-Manager hilft enorm.
• Zwei-Faktor-Schutz überall aktivieren, wo angeboten.
• Updates zeitnah einspielen (System und Apps).
• Phishing-Merkenkmale: fremder Absender, künstliche Dringlichkeit, verdächtige Links, unerwartete Anhänge — lieber einmal mehr prüfen.
• Öffentliche WLANs meiden oder ein VPN nutzen.

Genau diese Bereiche deckt die HeidSec Suite ab — sag Bescheid, wenn du zu einem Modul Details willst.`,sources:ne};default:return we}}function Re(){return{text:`Tarife im Vergleich (nach offiziellen Quellen):

• Free — kostenlos, Basisschutz, keine Laufzeit
• Pro — kostenpflichtig, erweiterter Umfang (Monat/Jahr)
• KI — wie Pro, plus Security-AI: die Analyse läuft ausschließlich lokal auf deinem Gerät
• Ultimate/Suite — bündelt Smart Scan, MailGuard, Vault und VPN in einem Abo

Ehrlichkeitshalber: Der genaue Funktionsunterschied zwischen Pro und KI wird öffentlich nicht gelistet, sondern erst im Tarifkatalog vor Vertragsschluss angezeigt — das erfinde ich nicht.

Für Familien gilt: Der Kinderschutz ist als Zusatzmodul buchbar, die Suite Ultimate trägt die vier Kernprodukte. Soll ich dir die passende Preisübersicht zeigen?`,sources:S}}const Ie={text:`Gute Frage — die beiden werden oft verwechselt:

• Smart Scan ist der Schutz auf dem Gerät selbst: Die App scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich direkt.
• Das Schutzcenter (die Core-Engine) ist die zentrale Instanz dahinter: Sie bewertet jedes Signal einmal und speist die Erkenntnis in alle Module — Gerät, Posteingang, Ablage und Verbindung arbeiten als ein System.

Kurz gesagt: Smart Scan ist der Schutz direkt auf deinem Gerät, das Schutzcenter die zentrale Intelligenz, die alle Module zusammendenkt.`,sources:s},Ce=60,Ke="Hallo! Frag mich alles zu HeidSec-Produkten, Tarifen und Preisen. Antworten kommen aus offiziellen HeidSec-Quellen.",Ge="Du bist in deinem HeidSec-Konto angemeldet. Hier bekommst du allgemeine Hilfe zu Produkten, Tarifen und Preisen — für Konto- und Tarifänderungen nutze „Mein Konto“. Es werden keine Kontodaten an den Chat übertragen.";let x=1;function ye({accountContext:t=!1,faqHref:c}){const[e,h]=d.useState(!1),[o,b]=d.useState([]),[a,p]=d.useState(""),[g,P]=d.useState(!1),[E,z]=d.useState(void 0),[l,f]=d.useState(0),[,D]=d.useState(0),[W,C]=d.useState(!1),[K,j]=d.useState({}),T=d.useRef(null);d.useEffect(()=>{if(!e||l<=Date.now())return;const r=window.setInterval(()=>D(u=>u+1),1e3);return()=>window.clearInterval(r)},[e,l]),d.useEffect(()=>{e&&o.length===0&&b([{id:x++,role:"assistant",text:t?Ge:Ke}])},[e,o.length,t]),d.useEffect(()=>{e&&requestAnimationFrame(()=>{T.current?.scrollTo({top:T.current.scrollHeight})})},[o,g,e]);const w=Math.max(0,Math.ceil((l-Date.now())/1e3)),F=a.trim().length>0&&!g&&w===0;async function _(){const r=a.trim();if(!(!r||g||w>0)){b(u=>[...u,{id:x++,role:"user",text:r}]),p(""),P(!0),C(!1);try{const u=Ee(r,K);j({lastTopic:u.topic??K.lastTopic,lastIntent:u.intent});const m=Te(u);if(m){b(R=>[...R,{id:x++,role:"assistant",text:m.text,sources:m.sources}]);return}const k=await B(r,E);b(R=>[...R,{id:x++,role:"assistant",text:k.reply||"Dazu habe ich gerade keine Antwort.",sources:k.sources}]),k.conversationId&&z(k.conversationId)}catch(u){let m="Der HeidSec-Chat ist gerade nicht erreichbar.";u instanceof G&&u.status===429?(f(Date.now()+Ce*1e3),m="Viele Anfragen auf einmal — bitte warte kurz, bevor du erneut fragst."):u instanceof G&&u.status>=400&&u.status<500?m=u.message:C(!0),b(k=>[...k,{id:x++,role:"assistant",text:m}])}finally{P(!1)}}}return n.jsxs(n.Fragment,{children:[n.jsx("button",{type:"button",onClick:()=>h(r=>!r),"aria-expanded":e,"aria-label":e?"HeidSec-Chat schließen":"HeidSec-Chat öffnen",className:"fixed bottom-4 right-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-primary text-[#05070b] shadow-lg transition-all hover:brightness-110 hover:glow-blue sm:bottom-6 sm:right-6",children:e?n.jsx(M,{className:"size-5","aria-hidden":!0}):n.jsx(Q,{className:"size-5","aria-hidden":!0})}),e&&n.jsxs("section",{"aria-label":"HeidSec-Chat",onKeyDown:r=>{r.key==="Escape"&&h(!1)},className:"fixed bottom-[4.75rem] right-3 z-40 flex h-[min(68svh,540px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl glow-blue sm:bottom-[5.75rem] sm:right-6",children:[n.jsxs("header",{className:"flex items-center justify-between gap-3 border-b border-white/8 bg-graphite/60 px-4 py-3",children:[n.jsxs("div",{className:"flex min-w-0 items-center gap-2.5",children:[n.jsx("img",{src:"/heidsec/logo-monogram.svg",alt:"",className:"size-7 shrink-0",width:28,height:28}),n.jsxs("div",{className:"min-w-0",children:[n.jsx("p",{className:"font-display text-sm font-bold leading-tight text-frost",children:"HeidSec Assistent"}),n.jsx("p",{className:"truncate text-[11px] text-mist",children:"Produkte · Tarife · Preise"})]})]}),n.jsx("button",{type:"button",onClick:()=>h(!1),"aria-label":"Chat schließen",className:"inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-mist transition-colors hover:border-primary/40 hover:text-frost",children:n.jsx(M,{className:"size-3.5","aria-hidden":!0})})]}),n.jsxs("div",{ref:T,"aria-live":"polite",className:"flex-1 space-y-3 overflow-y-auto px-3 py-3",children:[o.map(r=>r.role==="user"?n.jsx("div",{className:"flex justify-end",children:n.jsx("p",{className:"max-w-[85%] whitespace-pre-wrap rounded-xl rounded-br-sm bg-primary px-3 py-2 text-sm font-medium text-[#05070b]",children:r.text})},r.id):n.jsxs("div",{className:"flex flex-col gap-1",children:[n.jsx("p",{className:"max-w-[90%] whitespace-pre-wrap rounded-xl rounded-bl-sm border border-border bg-white/[0.04] px-3 py-2 text-sm leading-relaxed text-frost",children:r.text}),r.sources&&r.sources.length>0&&n.jsx("div",{className:"flex flex-wrap gap-1 pl-1",children:r.sources.slice(0,4).map((u,m)=>n.jsx("span",{className:"rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-neon",children:u.title||u.source||"Quelle"},`${r.id}-${m}`))})]},r.id)),g&&n.jsxs("div",{className:"flex items-center gap-2 pl-1 text-xs text-mist",children:[n.jsx(L,{className:"size-3.5 animate-spin","aria-hidden":!0}),"HeidSec Assistent schreibt…"]}),W&&n.jsxs("div",{className:"mx-1 rounded-lg border border-primary/25 bg-primary/5 p-3 text-xs leading-relaxed text-mist",children:["Chat momentan nicht erreichbar. Alternativ:"," ",n.jsxs("a",{href:"https://www.heidsec.de/support",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline",children:["Support",n.jsx(H,{className:"size-3","aria-hidden":!0})]}),c&&n.jsxs(n.Fragment,{children:[" · ",n.jsx("a",{href:c,className:"text-primary underline-offset-2 hover:underline",children:"FAQ"})]})]})]}),n.jsxs("form",{onSubmit:r=>{r.preventDefault(),_()},className:"border-t border-white/8 bg-graphite/40 px-3 py-2.5",children:[n.jsxs("div",{className:"flex items-end gap-2",children:[n.jsx("label",{htmlFor:"heidsec-chat-input",className:"sr-only",children:"Deine Frage"}),n.jsx("input",{id:"heidsec-chat-input",value:a,onChange:r=>p(r.target.value),placeholder:w>0?`Kurze Pause — ${w}s`:"Deine Frage zu HeidSec…",disabled:g||w>0,maxLength:500,autoComplete:"off",className:"h-11 min-w-0 flex-1 rounded-lg border border-border bg-white/[0.04] px-3 text-sm text-frost placeholder:text-mist/60 outline-none transition-colors focus:border-primary/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-ring/40 disabled:opacity-60"}),n.jsx("button",{type:"submit",disabled:!F,"aria-label":"Nachricht senden",className:"inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-[#05070b] transition-all hover:brightness-110 disabled:opacity-50",children:g?n.jsx(L,{className:"size-4 animate-spin","aria-hidden":!0}):n.jsx(J,{className:"size-4","aria-hidden":!0})})]}),n.jsxs("p",{className:"mt-2 flex items-center gap-1.5 text-[10px] leading-snug text-mist/70",children:[n.jsx(U,{className:"size-3 shrink-0 text-primary","aria-hidden":!0}),"Antworten aus offiziellen HeidSec-Quellen. Es werden keine Konto- oder Profildaten übermittelt."]})]})]})]})}export{ye as C};
