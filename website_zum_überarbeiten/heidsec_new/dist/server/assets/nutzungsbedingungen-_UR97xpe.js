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
const nutzungsContent = '# Nutzungsbedingungen – HeidSec Security\r\n\r\nStand: August 2026\r\n\r\n## § 1 Geltungsbereich\r\n\r\nDiese Nutzungsbedingungen ergänzen die AGB und konkretisieren die erlaubte und unerlaubte Nutzung von App und Website. Maßgeblich ist die aktuelle, in der App und auf der Website unter „Rechtliches" bereitgestellte Fassung.\r\n\r\n## § 2 Zugang und Registrierung\r\n\r\n(1) Der Nutzer bestätigt bei der Registrierung sein Geburtsdatum und gibt eine gültige E-Mail-Adresse an.\r\n\r\n(2) Der Nutzer sichert zu, volljährig zu sein, oder – bei fehlender Volljährigkeit – dass die nach Art. 8 DSGVO und den anwendbaren Vorschriften erforderliche Zustimmung des Trägers der elterlichen Verantwortung vorliegt. Für die Nutzung von Parental Control durch Erziehungsberechtigte gilt zusätzlich § 8 AGB.\r\n\r\n(3) HeidSec kann Registrierungen aus sachlichem Grund ablehnen.\r\n\r\n## § 3 Erlaubte Nutzung\r\n\r\nDer Nutzer darf die App auf den tarifgemäß zulässigen Geräten installieren und ausschließlich zum Schutz der eigenen digitalen Sicherheit nutzen.\r\n\r\n## § 4 Verbotene Handlungen\r\n\r\nUntersagt sind insbesondere:\r\n\r\n- die Nutzung zu rechtswidrigen Zwecken,\r\n- die Manipulation oder der Versuch der Entschlüsselung fremder Vault-Inhalte,\r\n- der Versuch, die On-Device-KI oder die Scanner-Engine zu extrahieren, zurückzuentwickeln oder zu dekompilieren, soweit dies nicht nach § 69e UrhG oder anderen zwingenden gesetzlichen Vorschriften ausdrücklich gestattet ist,\r\n- das Umgehen von Lizenz- oder Gerätelimitierungen,\r\n- die Nutzung des VPN-Dienstes für Urheberrechtsverletzungen, DDoS-Angriffe, Spam, Phishing oder sonstige rechtswidrige Aktivitäten.\r\n\r\n## § 5 Inhalte Dritter und Verlinkungen\r\n\r\nVerweise auf Webseiten Dritter begründen keine inhaltliche Verantwortung von HeidSec für diese Seiten.\r\n\r\n## § 6 Änderungen der Dienste\r\n\r\nHeidSec kann Funktionen, Tarife und technische Voraussetzungen anpassen. Änderungen, die den vertraglich geschuldeten Funktionsumfang zu Lasten des Nutzers wesentlich einschränken, werden vorab mit angemessener Frist angekündigt.\r\n\r\n## § 7 Beendigung der Nutzungsberechtigung\r\n\r\n(1) Bei erheblichem Verstoß gegen diese Nutzungsbedingungen kann HeidSec den Zugang vorübergehend sperren oder beenden; der Nutzer wird hierüber unterrichtet.\r\n\r\n(2) Der Widerruf einer datenschutzrechtlichen Einwilligung (Art. 7 Abs. 3 DSGVO) betrifft ausschließlich die jeweils eingewilligte Verarbeitung und beendet weder automatisch den Nutzungsvertrag noch ein kostenpflichtiges Abonnement. Der vertragliche Widerruf eines entgeltlichen Vertrags richtet sich ausschließlich nach der Widerrufsbelehrung (§§ 355, 356 BGB). Die Kündigung des Vertrags erfolgt nach § 4 AGB.\r\n';
function NutzungsbedingungenPage() {
  const sections = parseLegalMarkdown(nutzungsContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LegalLayout, { title: "Nutzungsbedingungen", eyebrow: "Verträge", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section, i) => {
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
  NutzungsbedingungenPage as component
};
