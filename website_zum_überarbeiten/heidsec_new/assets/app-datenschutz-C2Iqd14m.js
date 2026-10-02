import{j as e}from"./index-DD8YQk5e.js";import{L as i}from"./LegalLayout-DqmAU23O.js";import{p as s}from"./legal-content-Dl_3fVYE.js";const a=`# App-Datenschutz – HeidSec Security\r
\r
Ergänzung zur Datenschutzerklärung · Stand: August 2026\r
\r
## 1. Lokale Speicherung auf dem Endgerät\r
\r
Nicht-sensible Einstellungen (Onboarding-Status, Vault-/KI-Einstellungen, Feature-Zustände) werden im lokalen Gerätespeicher abgelegt. Zugriffstoken werden im geschützten Speicherbereich des Betriebssystems abgelegt (Android: verschlüsselte Einstellungen/Keystore; iOS: Keychain). In der Web-Version bleiben Zugriffstoken ausschließlich im Arbeitsspeicher des Browsers und gehen beim Neuladen der Seite verloren.\r
\r
## 2. Verschlüsselung\r
\r
Vault-Inhalte werden mit dem Verschlüsselungsverfahren XChaCha20-Poly1305 Ende-zu-Ende verschlüsselt. Unser Server erhält ausschließlich Chiffretext, Nonce und kryptografische Versionsdaten; das Masterpasswort verlässt niemals das Gerät. Eine optionale biometrische Freigabe schützt den zufälligen Vault-Schlüssel über den systemeigenen sicheren Speicherbereich (Android Keystore bzw. iOS Keychain); biometrische Merkmale verlassen das Gerät nicht.\r
\r
## 3. Berechtigungen\r
\r
Die App fordert ausschließlich Berechtigungen an, die für den jeweiligen von Ihnen genutzten Dienst technisch erforderlich sind. Sie können erteilte Berechtigungen jederzeit in den Systemeinstellungen widerrufen; dies kann die Funktionsfähigkeit einzelner Dienste einschränken.\r
\r
## 4. Hintergrundaktivitäten\r
\r
Schutzmodule können im Hintergrund ausgeführt werden, um kontinuierlichen Schutz zu gewährleisten. Nach einer Phase der Inaktivität ist eine erneute Freigabe (biometrisch oder per Passwort) erforderlich. Hintergrunddienste werden nachvollziehbar protokolliert und können in den Systemeinstellungen deaktiviert werden.\r
\r
## 5. Zwischenablage\r
\r
Sensible Daten wie Zugriffstoken, Passwörter und 2FA-Codes werden bei Beendigung der Sitzung automatisch aus der Zwischenablage entfernt.\r
\r
## 6. Eingesetzte Drittkomponenten\r
\r
Die App nutzt Open-Source- und Drittkomponenten für Funktionen wie Vault-Verschlüsselung, Gerätescan und Zahlungsabwicklung. Die jeweiligen Lizenzbedingungen dieser Komponenten sind den entsprechenden Open-Source-Lizenzen zu entnehmen.\r
\r
## 7. Zustimmung in der App\r
\r
AGB und Datenschutzerklärung werden Ihnen in der App getrennt zur Kenntnisnahme angezeigt. Optionale Einwilligungen holen wir über separate, unabhängig widerrufbare Einstellungen ein, die keine Voraussetzung für die Nutzung des Basisdienstes sind.\r
`;function h(){const t=s(a);return e.jsx(i,{title:"Datenschutz Mobile App",eyebrow:"Rechtliches",children:e.jsx("div",{className:"space-y-4",children:t.map((n,r)=>{switch(n.type){case"heading1":return e.jsx("h1",{className:"mt-8 mb-4 font-display text-3xl font-bold text-frost",children:n.content},r);case"heading2":return e.jsx("h2",{className:"mt-6 mb-3 font-display text-xl font-semibold text-frost",children:n.content},r);case"heading3":return e.jsx("h3",{className:"mt-4 mb-2 font-display text-lg font-semibold text-frost",children:n.content},r);case"paragraph":return e.jsx("p",{className:"mb-4 text-mist leading-relaxed",children:n.content},r);default:return null}})})})}export{h as component};
