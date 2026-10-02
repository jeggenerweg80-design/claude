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
const lizenzContent = "# Lizenzbedingungen – HeidSec Security\r\n\r\nStand: August 2026\r\n\r\n## § 1 Lizenzgewährung\r\n\r\nHeidSec räumt dem Nutzer ein persönliches, nicht übertragbares, nicht ausschließliches Recht zur Nutzung der Software im Rahmen des gebuchten Tarifs ein. Die Lizenz bezieht sich auf die jeweils aktuelle, von HeidSec bereitgestellte Version.\r\n\r\n## § 2 Nutzungsumfang\r\n\r\n(1) Installation und Ausführung sind auf den tarifgemäß zugelassenen Geräten gestattet (Gerätelimit gemäß Tarif).\r\n\r\n(2) Sicherungskopien für den eigenen Gebrauch sind zulässig, soweit technisch erforderlich und gesetzlich gestattet.\r\n\r\n(3) Vermietung, Verleasung, Weiterlizenzierung oder der Einsatz für Dienstleistungen Dritter sind ausgeschlossen, soweit nicht ausdrücklich gestattet.\r\n\r\n## § 3 Einschränkungen\r\n\r\n(1) Übersetzung, Disassemblierung, Dekompilierung oder sonstiges Reverse Engineering sind untersagt, soweit dies nicht nach § 69e UrhG oder anderen zwingenden gesetzlichen Vorschriften ausdrücklich gestattet ist.\r\n\r\n(2) Marken, Logos und Urheberrechtsvermerke dürfen nicht entfernt oder verändert werden.\r\n\r\n## § 4 Updates und Upgrades\r\n\r\n(1) HeidSec stellt Updates zur Schließung von Sicherheitslücken und zur Aufrechterhaltung der Funktionsfähigkeit bereit. Die Benachrichtigung erfolgt in der App oder automatisch über den jeweiligen App Store.\r\n\r\n(2) Änderungen, die den geschuldeten Funktionsumfang zu Lasten des Nutzers wesentlich einschränken, werden vorab angekündigt.\r\n\r\n## § 5 Rechte an der Software\r\n\r\nAlle Rechte an der Software, den Benutzeroberflächen, den KI-Modellen und den technischen Schutzmechanismen verbleiben bei HeidSec bzw. den jeweiligen Rechteinhabern eingesetzter Drittkomponenten.\r\n\r\n## § 6 Laufzeit und Beendigung\r\n\r\nDie Lizenz erlischt mit Beendigung des zugrunde liegenden Nutzungsvertrags (Kündigung, wirksamer Widerruf, Kontolöschung). Der Nutzer entfernt die App danach von allen Geräten.\r\n\r\n## § 7 Gewährleistung\r\n\r\nFür Mängel der Software gilt die gesetzliche Gewährleistung. Für Open-Source-Komponenten gelten ergänzend deren jeweilige Drittlizenzen.\r\n";
function Lizenzbedingungen() {
  const sections = parseLegalMarkdown(lizenzContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LegalLayout, { title: "Lizenzbedingungen", eyebrow: "Verträge", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section, i) => {
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
  Lizenzbedingungen as component
};
