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
const vpnContent = "# VPN-Bedingungen – HeidSec Security\r\n\r\nStand: August 2026\r\n\r\n## § 1 Geltungsbereich\r\n\r\n(1) Diese VPN-Bedingungen regeln die Nutzung des von HeidSec angebotenen VPN-Dienstes und gelten ergänzend zu den AGB, den Nutzungsbedingungen und der Datenschutzerklärung.\r\n\r\n(2) Der VPN-Dienst steht je nach Tarif als eigenständig buchbares Modul oder als Bestandteil eines Bundles zur Verfügung und ist nicht Bestandteil von HeidSec Free.\r\n\r\n## § 2 Leistungsbeschreibung\r\n\r\n(1) VPN-Gateways werden bereitgestellt an den Standorten Deutschland (Frankfurt), Niederlande (Amsterdam) und USA (New York). Weitere Standorte (Schweiz, Großbritannien) können nach Verfügbarkeit freigeschaltet werden.\r\n\r\n(2) Die Übertragung erfolgt über das WireGuard-Protokoll.\r\n\r\n(3) Der Nutzer wählt den Standort in der App; die konkrete IP-Zuweisung obliegt HeidSec.\r\n\r\n## § 3 Verbindungs- und Nutzungsdaten\r\n\r\n(1) Zum Betrieb des Dienstes verarbeiten wir: Zeitpunkt der Verbindungsherstellung und -trennung, zugewiesene Gateway-Adresse, übertragene Datenmenge sowie Missbrauchskennungen bei verdächtigen Mustern. Einzelheiten und Speicherfristen ergeben sich aus der Datenschutzerklärung, Abschnitt 5.\r\n\r\n(2) VPN-Verbindungsdaten werden ausschließlich für die dort genannte Frist gespeichert: [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: konkrete Frist].\r\n\r\n## § 4 Drittlandtransfer beim US-Gateway\r\n\r\n(1) Bei Nutzung des Gateway-Standorts USA werden Verbindungsmetadaten – nicht der Inhalt Ihres Datenverkehrs – im Rahmen der technischen Diensterbringung in einem Drittland außerhalb des EWR verarbeitet.\r\n\r\n(2) Diese Übermittlung erfolgt auf Grundlage von EU-Standardvertragsklauseln nebst erforderlicher zusätzlicher technischer und organisatorischer Maßnahmen. Wenn Sie eine Verarbeitung außerhalb des EWR vermeiden möchten, wählen Sie den Standort Deutschland oder Niederlande.\r\n\r\n## § 5 Fair Use und Datenvolumen\r\n\r\n(1) Der VPN-Zugang unterliegt den im Tarif festgelegten Datenvolumensbegrenzungen; die aktuelle Nutzung wird in der App angezeigt.\r\n\r\n(2) Bei Erschöpfung des Datenvolumens oder missbräuchlicher Nutzung kann der Zugang vorübergehend gedrosselt oder gesperrt werden.\r\n\r\n(3) HeidSec behält sich vor, Fair-Use-Regeln zur Sicherung der Dienstqualität für alle Nutzer durchzusetzen.\r\n\r\n## § 6 Zulässige und unzulässige Nutzung\r\n\r\nDie Nutzung des VPN für legale Zwecke ist gestattet. Untersagt sind insbesondere rechtswidrige Aktivitäten (u. a. Urheberrechtsverletzungen, DDoS-Angriffe, Spam, Phishing), das Betreiben öffentlich zugänglicher Server ohne ausdrückliche Genehmigung sowie das rechtswidrige Umgehen geo-blockierender Maßnahmen Dritter.\r\n\r\n## § 7 Verfügbarkeit\r\n\r\nHeidSec bemüht sich um eine hohe Verfügbarkeit des VPN-Dienstes; eine bestimmte Verfügbarkeit wird nicht zugesichert. Wartungsarbeiten können zu kurzzeitigen Ausfällen führen; wir informieren Sie nach Möglichkeit vorab.\r\n\r\n## § 8 Haftung\r\n\r\n(1) Für Schäden aus der Nutzung des VPN haftet HeidSec nach Maßgabe von § 6 AGB.\r\n\r\n(2) HeidSec haftet nicht für Inhalte, auf die der Nutzer über den VPN-Zugang zugreift, oder für Handlungen Dritter, die den VPN-Dienst missbräuchlich nutzen, unbeschadet Absatz 1.\r\n\r\n## § 9 Beendigung\r\n\r\n(1) Der VPN-Zugang endet mit Beendigung des zugrunde liegenden Vertrags (Kündigung nach § 4 AGB, wirksamer Widerruf, Kontolöschung).\r\n\r\n(2) HeidSec kann den VPN-Zugang vorübergehend sperren, wenn ein begründeter Verdacht auf Missbrauch besteht; der Nutzer wird hierüber informiert.\r\n";
function VpnBedingungen() {
  const sections = parseLegalMarkdown(vpnContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LegalLayout, { title: "VPN-Bedingungen", eyebrow: "Verträge", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section, i) => {
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
  VpnBedingungen as component
};
