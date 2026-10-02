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
const widerrufContent = '# Widerrufsbelehrung und Muster-Widerrufsformular – HeidSec Security\r\n\r\nStand: August 2026\r\n\r\n## Widerrufsrecht\r\n\r\nSie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.\r\n\r\nUm Ihr Widerrufsrecht auszuüben, müssen Sie uns\r\n\r\nHeidSec Security [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: vollständiger Name/Rechtsform]\r\n[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: vollständige Anschrift]\r\nE-Mail: info@heidsec.de\r\nOnline-Widerrufsformular: [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: URL im Kundenportal]\r\n\r\nmittels einer eindeutigen Erklärung (z. B. Brief, E-Mail oder über unser Online-Widerrufsformular) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, dies ist jedoch nicht vorgeschrieben.\r\n\r\nNutzen Sie unser Online-Widerrufsformular, übermitteln wir Ihnen unverzüglich eine Bestätigung über den Eingang Ihres Widerrufs (z. B. per E-Mail).\r\n\r\nZur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.\r\n\r\n## Folgen des Widerrufs\r\n\r\nWenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle von Ihnen erhaltenen Zahlungen unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben (Google Play Billing bzw. Stripe, je nach Vertriebsweg), es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; es werden Ihnen wegen dieser Rückzahlung keine Entgelte berechnet.\r\n\r\nHaben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zur Mitteilung Ihres Widerrufs bereits erbrachten Dienstleistung im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistung entspricht.\r\n\r\n## Erlöschen des Widerrufsrechts\r\n\r\n**Digitale Dienstleistungen mit fortlaufender Leistungserbringung** (Vault-Zugriff, VPN-Dienst, Security-AI, aktivierte Schutzmodule als laufendes Abonnement):\r\n\r\nIhr Widerrufsrecht erlischt, wenn wir mit der Ausführung der Dienstleistung begonnen haben, nachdem Sie\r\n\r\n1. ausdrücklich zugestimmt haben, dass wir vor Ablauf der Widerrufsfrist mit der Vertragserfüllung beginnen, und\r\n2. Ihre Kenntnis davon bestätigt haben, dass Sie durch diese Zustimmung mit Beginn der Ausführung Ihr Widerrufsrecht verlieren.\r\n\r\nBei einer fortlaufenden Dienstleistung wie einem Abonnement erlischt Ihr Widerrufsrecht erst mit dem tatsächlichen Beginn der Ausführung nach den vorstehenden Voraussetzungen. Die hierfür erforderliche gesonderte Erklärung geben Sie unmittelbar vor Abschluss Ihrer Bestellung als eigenen Bestätigungsschritt ab.\r\n\r\n**Digitale Inhalte ohne körperlichen Datenträger:**\r\n\r\nIhr Widerrufsrecht erlischt, wenn wir mit der Ausführung des Vertrags begonnen haben, nachdem Sie ausdrücklich zugestimmt haben, dass wir vor Ablauf der Widerrufsfrist mit der Vertragserfüllung beginnen, Sie Ihre Kenntnis vom Verlust des Widerrufsrechts bei vollständiger Vertragserfüllung bestätigt haben und wir Ihnen eine Bestätigung des Vertrags zur Verfügung gestellt haben. Bei kostenlosen Verträgen über digitale Inhalte erlischt das Widerrufsrecht bereits mit Beginn der Vertragserfüllung.\r\n\r\n## Muster-Widerrufsformular\r\n\r\n(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden es zurück, oder nutzen Sie unser Online-Widerrufsformular im Kundenportal.)\r\n\r\nAn:\r\nHeidSec Security [MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: vollständiger Name/Rechtsform]\r\n[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN: vollständige Anschrift]\r\nE-Mail: info@heidsec.de\r\n\r\nHiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden digitalen Dienstleistung/den Kauf der folgenden digitalen Inhalte (*):\r\n\r\n_____________________________________________ (Bestellnummer, Kunden-ID oder E-Mail-Adresse des Kontos, sofern bekannt)\r\n\r\n_____________________________________________ (Name des Tarifs/Moduls, z. B. „HeidSec Premium Monatlich" oder „VPN-Modul")\r\n\r\nBestelldatum: _______________\r\nName des/der Verbraucher(s): ______________________________\r\nAnschrift des/der Verbraucher(s): __________________________\r\nUnterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ______________________________\r\nDatum: _______________\r\n\r\n(*) Nicht Zutreffendes bitte streichen.\r\n';
function Widerruf() {
  const sections = parseLegalMarkdown(widerrufContent);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LegalLayout, { title: "Widerrufsrecht & Muster-Widerrufsformular", eyebrow: "Verbraucherschutz", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section, i) => {
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
  Widerruf as component
};
