import { P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { L as LegalLayout } from "./LegalLayout-D8dKsJii.js";
import { p as parseLegalMarkdown } from "./legal-content-DQjZ2Yr1.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./router-Cdgab8eA.js";
const appDatenschutzContent = "# App-Datenschutz – HeidSec Security\r\n\r\nErgänzung zur Datenschutzerklärung · Stand: August 2026\r\n\r\n## 1. Lokale Speicherung auf dem Endgerät\r\n\r\nNicht-sensible Einstellungen (Onboarding-Status, Vault-/KI-Einstellungen, Feature-Zustände) werden im lokalen Gerätespeicher abgelegt. Zugriffstoken werden im geschützten Speicherbereich des Betriebssystems abgelegt (Android: verschlüsselte Einstellungen/Keystore; iOS: Keychain). In der Web-Version bleiben Zugriffstoken ausschließlich im Arbeitsspeicher des Browsers und gehen beim Neuladen der Seite verloren.\r\n\r\n## 2. Verschlüsselung\r\n\r\nVault-Inhalte werden mit dem Verschlüsselungsverfahren XChaCha20-Poly1305 Ende-zu-Ende verschlüsselt. Unser Server erhält ausschließlich Chiffretext, Nonce und kryptografische Versionsdaten; das Masterpasswort verlässt niemals das Gerät. Eine optionale biometrische Freigabe schützt den zufälligen Vault-Schlüssel über den systemeigenen sicheren Speicherbereich (Android Keystore bzw. iOS Keychain); biometrische Merkmale verlassen das Gerät nicht.\r\n\r\n## 3. Berechtigungen\r\n\r\nDie App fordert ausschließlich Berechtigungen an, die für den jeweiligen von Ihnen genutzten Dienst technisch erforderlich sind. Sie können erteilte Berechtigungen jederzeit in den Systemeinstellungen widerrufen; dies kann die Funktionsfähigkeit einzelner Dienste einschränken.\r\n\r\n## 4. Hintergrundaktivitäten\r\n\r\nSchutzmodule können im Hintergrund ausgeführt werden, um kontinuierlichen Schutz zu gewährleisten. Nach einer Phase der Inaktivität ist eine erneute Freigabe (biometrisch oder per Passwort) erforderlich. Hintergrunddienste werden nachvollziehbar protokolliert und können in den Systemeinstellungen deaktiviert werden.\r\n\r\n## 5. Zwischenablage\r\n\r\nSensible Daten wie Zugriffstoken, Passwörter und 2FA-Codes werden bei Beendigung der Sitzung automatisch aus der Zwischenablage entfernt.\r\n\r\n## 6. Eingesetzte Drittkomponenten\r\n\r\nDie App nutzt Open-Source- und Drittkomponenten für Funktionen wie Vault-Verschlüsselung, Gerätescan und Zahlungsabwicklung. Die jeweiligen Lizenzbedingungen dieser Komponenten sind den entsprechenden Open-Source-Lizenzen zu entnehmen.\r\n\r\n## 7. Zustimmung in der App\r\n\r\nAGB und Datenschutzerklärung werden Ihnen in der App getrennt zur Kenntnisnahme angezeigt. Optionale Einwilligungen holen wir über separate, unabhängig widerrufbare Einstellungen ein, die keine Voraussetzung für die Nutzung des Basisdienstes sind.\r\n";
function AppDatenschutz() {
  const sections = parseLegalMarkdown(appDatenschutzContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LegalLayout, { title: "Datenschutz Mobile App", eyebrow: "Rechtliches", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section, i) => {
    switch (section.type) {
      case "heading1":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-8 mb-4 font-display text-3xl font-bold text-frost", children: section.content }, i);
      case "heading2":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 mb-3 font-display text-xl font-semibold text-frost", children: section.content }, i);
      case "heading3":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 mb-2 font-display text-lg font-semibold text-frost", children: section.content }, i);
      case "paragraph":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-mist leading-relaxed", children: section.content }, i);
      default:
        return null;
    }
  }) }) });
}
export {
  AppDatenschutz as component
};
