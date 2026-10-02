import{j as e}from"./index-QIAVLfKl.js";import{p as r,L as s}from"./legal-content-CoiggmUn.js";const a=`# App-Datenschutz – HeidSec Security

Ergänzung zur Datenschutzerklärung · Stand: August 2026

## 1. Lokale Speicherung auf dem Endgerät

Nicht-sensible Einstellungen (Onboarding-Status, Vault-/KI-Einstellungen, Feature-Zustände) werden im lokalen Gerätespeicher abgelegt. Zugriffstoken werden im geschützten Speicherbereich des Betriebssystems abgelegt (Android: verschlüsselte Einstellungen/Keystore; iOS: Keychain). In der Web-Version bleiben Zugriffstoken ausschließlich im Arbeitsspeicher des Browsers und gehen beim Neuladen der Seite verloren.

## 2. Verschlüsselung

Vault-Inhalte werden mit dem Verschlüsselungsverfahren XChaCha20-Poly1305 Ende-zu-Ende verschlüsselt. Unser Server erhält ausschließlich Chiffretext, Nonce und kryptografische Versionsdaten; das Masterpasswort verlässt niemals das Gerät. Eine optionale biometrische Freigabe schützt den zufälligen Vault-Schlüssel über den systemeigenen sicheren Speicherbereich (Android Keystore bzw. iOS Keychain); biometrische Merkmale verlassen das Gerät nicht.

## 3. Berechtigungen

Die App fordert ausschließlich Berechtigungen an, die für den jeweiligen von Ihnen genutzten Dienst technisch erforderlich sind. Sie können erteilte Berechtigungen jederzeit in den Systemeinstellungen widerrufen; dies kann die Funktionsfähigkeit einzelner Dienste einschränken.

## 4. Hintergrundaktivitäten

Schutzmodule können im Hintergrund ausgeführt werden, um kontinuierlichen Schutz zu gewährleisten. Nach einer Phase der Inaktivität ist eine erneute Freigabe (biometrisch oder per Passwort) erforderlich. Hintergrunddienste werden nachvollziehbar protokolliert und können in den Systemeinstellungen deaktiviert werden.

## 5. Zwischenablage

Sensible Daten wie Zugriffstoken, Passwörter und 2FA-Codes werden bei Beendigung der Sitzung automatisch aus der Zwischenablage entfernt.

## 6. Eingesetzte Drittkomponenten

Die App nutzt Open-Source- und Drittkomponenten für Funktionen wie Vault-Verschlüsselung, Gerätescan und Zahlungsabwicklung. Die jeweiligen Lizenzbedingungen dieser Komponenten sind den entsprechenden Open-Source-Lizenzen zu entnehmen.

## 7. Zustimmung in der App

AGB und Datenschutzerklärung werden Ihnen in der App getrennt zur Kenntnisnahme angezeigt. Optionale Einwilligungen holen wir über separate, unabhängig widerrufbare Einstellungen ein, die keine Voraussetzung für die Nutzung des Basisdienstes sind.
`;function d(){const i=r(a);return e.jsx(s,{title:"Datenschutz Mobile App",eyebrow:"Rechtliches",children:e.jsx("div",{className:"space-y-4",children:i.map((n,t)=>{switch(n.type){case"heading1":return e.jsx("h1",{className:"mt-8 mb-4 font-display text-3xl font-bold text-frost",children:n.content},t);case"heading2":return e.jsx("h2",{className:"mt-6 mb-3 font-display text-xl font-semibold text-frost",children:n.content},t);case"heading3":return e.jsx("h3",{className:"mt-4 mb-2 font-display text-lg font-semibold text-frost",children:n.content},t);case"paragraph":return e.jsx("p",{className:"mb-4 text-mist leading-relaxed",children:n.content},t);default:return null}})})})}export{d as component};
