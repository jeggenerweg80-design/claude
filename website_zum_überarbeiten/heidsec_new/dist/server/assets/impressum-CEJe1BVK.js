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
const impressumContent = "# Impressum – HeidSec Security\r\n\r\nAngaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)\r\n\r\n## Anbieter\r\n\r\nHeidSec Security [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: vollständiger Firmenname mit Rechtsform]\r\n[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: Straße und Hausnummer]\r\n[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: PLZ, Ort]\r\nDeutschland\r\n\r\n## Vertretungsberechtigt\r\n\r\n[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: Name der/des vertretungsberechtigten Geschäftsführer(s)/Gesellschafter(s)]\r\n\r\n## Kontakt\r\n\r\nE-Mail: info@heidsec.de\r\nWeb: https://www.heidsec.de\r\n\r\n## Registereintrag\r\n\r\nHandelsregister: [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN]\r\nRegistergericht: [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN]\r\nRegisternummer: [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN]\r\n\r\n## Umsatzsteuer-Identifikationsnummer\r\n\r\nUmsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN]\r\n\r\n## Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)\r\n\r\n[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: Name, Anschrift]\r\n\r\n## Streitschlichtung\r\n\r\nDie Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.\r\n\r\n## Haftung für Inhalte\r\n\r\nAls Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.\r\n\r\n## Haftung für Links\r\n\r\nUnser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte können wir daher keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.\r\n\r\n## Urheberrecht\r\n\r\nDie durch uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.\r\n";
function ImpressumPage() {
  const sections = parseLegalMarkdown(impressumContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LegalLayout, { title: "Impressum", eyebrow: "Rechtliches", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section, i) => {
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
  ImpressumPage as component
};
