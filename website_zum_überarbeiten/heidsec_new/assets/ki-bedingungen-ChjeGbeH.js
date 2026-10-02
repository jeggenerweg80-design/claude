import { U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import { L as LegalLayout } from "./LegalLayout-D2uBUa7p.js";
import { p as parseLegalMarkdown } from "./legal-content-DQjZ2Yr1.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./router-lSCE4rBE.js";
const kiContent = '# KI-Bedingungen – HeidSec Security\r\n\r\nStand: August 2026\r\n\r\n## § 1 Geltungsbereich\r\n\r\nDiese KI-Bedingungen regeln die Nutzung der lokalen KI-gestützten Sicherheitsanalyse ("Security-AI") innerhalb der App und gelten ergänzend zu den AGB und den Nutzungsbedingungen.\r\n\r\n## § 2 Funktionsweise\r\n\r\n(1) Die Security-AI läuft ausschließlich auf dem Endgerät des Nutzers. Es werden keine Eingabedaten, Befunde oder Modell-Interaktionen an HeidSec oder Dritte übermittelt.\r\n\r\n(2) Die KI korreliert lokal die von den Schutzmodulen erhobenen Befunde und erzeugt daraus Handlungsempfehlungen.\r\n\r\n## § 3 Leistungsbeschreibung und Grenzen\r\n\r\n(1) KI-generierte Einschätzungen unterstützen die Risikoeinordnung, sind nicht autoritativ und ersetzen keine sachkundige menschliche Prüfung.\r\n\r\n(2) Die Qualität der Ergebnisse hängt von der technischen Umgebung, den verfügbaren Daten und dem eingesetzten Modell ab.\r\n\r\n(3) Anpassungen des KI-Leistungsumfangs, die den geschuldeten Funktionsumfang zu Lasten des Nutzers wesentlich einschränken, werden vorab mit angemessener Frist angekündigt.\r\n\r\n## § 4 Transparenz nach der EU-KI-Verordnung\r\n\r\nSoweit die Security-AI Transparenzpflichten der Verordnung (EU) 2024/1689 unterliegt, etwa nach Art. 50 bei direkter Interaktion mit natürlichen Personen, kennzeichnet HeidSec die betreffenden Ausgaben in der App entsprechend als KI-generiert.\r\n\r\n## § 5 Keine Gewähr für KI-Ergebnisse\r\n\r\n(1) HeidSec übernimmt keine Gewähr für Richtigkeit, Vollständigkeit oder Verwendbarkeit KI-generierter Inhalte, Empfehlungen oder Risikoeinstufungen, unbeschadet der Haftungsregelung in § 7.\r\n\r\n(2) Entscheidungen des Nutzers aufgrund von KI-Ausgaben erfolgen in eigener Verantwortung.\r\n\r\n## § 6 Nutzerverantwortung\r\n\r\n(1) Die KI darf nicht für medizinische, rechtliche oder sicherheitskritische autonome Entscheidungen ohne menschliche Prüfung eingesetzt werden.\r\n\r\n(2) Der Nutzer verpflichtet sich, KI-Ausgaben kritisch zu prüfen und bei Unsicherheit weitere Informationsquellen heranzuziehen.\r\n\r\n## § 7 Haftung für KI-basierte Empfehlungen\r\n\r\n(1) Für Schäden aus fehlerhaften oder unvollständigen KI-Empfehlungen haftet HeidSec nach Maßgabe von § 6 AGB.\r\n\r\n(2) Der Nutzer hat HeidSec von Ansprüchen Dritter freizustellen, die auf einer vorsätzlichen oder grob fahrlässigen missbräuchlichen Nutzung der KI-Funktionen durch den Nutzer selbst beruhen, soweit HeidSec kein eigenes Mitverschulden trifft.\r\n\r\n## § 8 Datenverarbeitung durch die KI\r\n\r\nDie KI verarbeitet keine personenbezogenen Daten in einer Cloud oder auf externen Servern; alle Verarbeitungsschritte finden im geschützten Bereich des Endgeräts statt. Es werden keine Trainingsdaten aus Nutzerinteraktionen an HeidSec übermittelt.\r\n';
function KiBedingungen() {
  const sections = parseLegalMarkdown(kiContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LegalLayout, { title: "KI-Bedingungen", eyebrow: "Verträge", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section, i) => {
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
  KiBedingungen as component
};
