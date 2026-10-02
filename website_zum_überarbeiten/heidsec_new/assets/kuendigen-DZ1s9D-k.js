import { N as reactExports, U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import { u as useNavigate, L as Link } from "./router-lSCE4rBE.js";
import { b as bootstrapSession, l as logoutUser } from "./auth-DKM4MRJi.js";
import { i as isGooglePlaySubscription, g as getAccountData, c as cancelSubscription } from "./account-D6Qgmhwo.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const DRAFT_KEY = "heidsec_cancel_draft";
const PLAY_CANCEL_URL = "https://play.google.com/store/account/subscriptions";
function formatDateTime(iso) {
  return new Date(iso).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("de-DE");
}
function todayLocal() {
  const now = /* @__PURE__ */ new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 6e4).toISOString().split("T")[0];
}
function tariffLabelFor(subscription, choice, custom) {
  if (subscription?.plan_key || subscription?.plan) {
    const cycle = subscription.billing_cycle === "yearly" ? "jährlich" : subscription.billing_cycle === "monthly" ? "monatlich" : "";
    return `${subscription.plan_key || subscription.plan}${cycle ? ` — ${cycle}` : ""}`;
  }
  if (choice === "suite-monthly") return "HeidSec Suite Ultimate — monatlich";
  if (choice === "suite-yearly") return "HeidSec Suite Ultimate — jährlich";
  if (choice === "other") return custom.trim() || "Sonstiges Abonnement";
  return "HeidSec Abonnement";
}
function CancelPage() {
  const navigate = useNavigate();
  const [user, setUser] = reactExports.useState(null);
  const [accountData, setAccountData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [view, setView] = reactExports.useState("form");
  const [confirmation, setConfirmation] = reactExports.useState(null);
  const [terminationType, setTerminationType] = reactExports.useState("ordentlich");
  const [email, setEmail] = reactExports.useState("");
  const [customerNumber, setCustomerNumber] = reactExports.useState("");
  const [tariffChoice, setTariffChoice] = reactExports.useState("suite-monthly");
  const [tariffCustom, setTariffCustom] = reactExports.useState("");
  const [requestedDate, setRequestedDate] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const subscription = accountData?.subscription;
  const isPlay = isGooglePlaySubscription(subscription);
  const alreadyCanceled = subscription?.cancel_at_period_end === true;
  reactExports.useEffect(() => {
    let cancelled = false;
    void (async () => {
      const session = await bootstrapSession();
      if (cancelled) return;
      if (session.authenticated && session.user) {
        setUser(session.user);
        const data = await getAccountData();
        if (!cancelled && data.data) {
          setAccountData({
            profile: data.data.profile,
            subscription: data.data.subscription
          });
          setEmail(session.user?.email || "");
          if (data.data.profile?.customerNumber || data.data.profile?.customer_number) {
            setCustomerNumber(data.data.profile.customerNumber || data.data.profile.customer_number || "");
          }
          const sub = data.data.subscription;
          if (isGooglePlaySubscription(sub)) {
            setView("play");
          } else if (sub?.cancel_at_period_end === true) {
            setView("already-canceled");
          } else if (!sub) {
            setView("no-subscription");
          }
        }
      }
      if (!cancelled && typeof window !== "undefined") {
        try {
          const raw = window.sessionStorage.getItem(DRAFT_KEY);
          if (raw) {
            const draft = JSON.parse(raw);
            if (draft.terminationType) setTerminationType(draft.terminationType);
            if (draft.email) setEmail(draft.email);
            if (draft.customerNumber) setCustomerNumber(draft.customerNumber);
            if (draft.tariffChoice) setTariffChoice(draft.tariffChoice);
            if (draft.tariffCustom) setTariffCustom(draft.tariffCustom);
            if (draft.requestedDate) setRequestedDate(draft.requestedDate);
            if (draft.reason) setReason(draft.reason);
          }
        } catch {
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const handleLogout = async () => {
    await logoutUser();
    navigate({
      to: "/"
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Bitte gib eine gültige E-Mail-Adresse für die Bestätigung an.");
      return;
    }
    if (!user) {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify({
          terminationType,
          email: email.trim(),
          customerNumber: customerNumber.trim(),
          tariffChoice,
          tariffCustom: tariffCustom.trim(),
          requestedDate,
          reason: reason.trim()
        }));
      }
      navigate({
        to: "/login",
        search: {
          redirect: "/kuendigen"
        }
      });
      return;
    }
    if (isPlay) {
      setView("play");
      return;
    }
    setSubmitting(true);
    const result = await cancelSubscription();
    setSubmitting(false);
    if (result.notCancelable) {
      setView("no-subscription");
      return;
    }
    if (result.success) {
      setConfirmation({
        receivedAt: (/* @__PURE__ */ new Date()).toISOString(),
        terminationType,
        tariffLabel: tariffLabelFor(subscription, tariffChoice, tariffCustom),
        requestedDate: requestedDate || void 0,
        reason: reason.trim() || void 0,
        email: email.trim(),
        customerNumber: customerNumber.trim() || void 0,
        periodEnd: subscription?.current_period_end || void 0
      });
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(DRAFT_KEY);
      }
      setView("confirmation");
    } else {
      setError(result.error || "Die Kündigung konnte nicht übermittelt werden.");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Wird geladen..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-electric/10 bg-ink/95 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-5 py-4 md:px-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec", className: "h-7 w-7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-[0.22em] text-frost hidden sm:inline", children: "HEIDSEC" })
      ] }),
      user ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "text-sm text-mist hover:text-frost transition-colors", children: "Abmelden" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", search: {
        redirect: "/kuendigen"
      }, className: "text-sm text-mist hover:text-frost transition-colors", children: "Anmelden" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-5 py-10 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Kündigung" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-bold tracking-tight text-frost", children: "Verträge hier kündigen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-mist leading-relaxed", children: "Nach § 312k BGB kannst du Verträge, die über die Website geschlossen wurden, jederzeit hier kündigen. Die Kündigung wird dir mit Datum und Uhrzeit elektronisch bestätigt." })
      ] }),
      view === "confirmation" && confirmation && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmationView, { data: confirmation }),
      view === "play" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-frost mb-3", children: "Google-Play-Abonnement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist leading-relaxed", children: "Dein HeidSec-Abonnement wurde über Google Play abgeschlossen. Google-Play-Abonnements werden direkt in deinem Google-Konto gekündigt — das ist der verbindliche Kündigungsweg für diesen Vertrag." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: PLAY_CANCEL_URL, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: "In Google Play kündigen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "btn-ghost", children: "Zurück zu Mein Konto" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-mist/70", children: "Nach der Kündigung in Google Play endet dein Abonnement zum Ende des bezahlten Zeitraums. Eine zusätzliche Kündigung über HeidSec ist nicht erforderlich." })
      ] }),
      view === "no-subscription" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-frost mb-3", children: "Kein kostenpflichtiges Abonnement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist leading-relaxed", children: "Für dieses Konto besteht kein kostenpflichtiges Abonnement. HeidSec Free ist dauerhaft nutzbar — es ist nichts zu kündigen." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "btn-ghost", children: "Zu Mein Konto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-ghost", children: "Zur Startseite" })
        ] })
      ] }),
      view === "already-canceled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-frost mb-3", children: "Bereits gekündigt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-mist leading-relaxed", children: [
          "Dein Abonnement ist bereits gekündigt und läuft zum Ende der aktuellen Abrechnungsperiode aus",
          subscription?.current_period_end ? ` (${formatDate(subscription.current_period_end)})` : "",
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "btn-ghost", children: "Zu Mein Konto" }) })
      ] }),
      view === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", "data-cancel-form": true, "aria-label": "Kündigungsformular", children: [
        alreadyCanceled && !isPlay && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-yellow-900/20 border border-yellow-500/30 rounded text-yellow-200 text-sm", children: "Dein Abonnement ist bereits gekündigt und läuft zum Ende der aktuellen Abrechnungsperiode aus." }),
        isPlay && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-electric/10 border border-electric/30 rounded text-sm text-mist", children: "Dieses Abonnement wurde über Google Play abgeschlossen. Kündigungen für Google-Play-Abonnements führst du direkt in deinem Google-Konto durch." }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Kündigungsart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "terminationType", value: "ordentlich", checked: terminationType === "ordentlich", onChange: () => setTerminationType("ordentlich"), className: "mt-1 accent-[#2e9bff]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-medium text-frost", children: "Ordentlich" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm text-mist", children: "Kündigung zum Ende der Vertragslaufzeit (reguläre Kündigung)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "terminationType", value: "ausserordentlich", checked: terminationType === "ausserordentlich", onChange: () => setTerminationType("ausserordentlich"), className: "mt-1 accent-[#2e9bff]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-medium text-frost", children: "Außerordentlich" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm text-mist", children: "Fristlose Kündigung aus wichtigem Grund (bitte begründen)" })
            ] })
          ] }),
          terminationType === "ausserordentlich" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "reason", className: "block text-sm font-medium text-frost mb-2", children: [
              "Begründung ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-mist/70", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "reason", value: reason, onChange: (e) => setReason(e.target.value), rows: 3, className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors", placeholder: "Grund der außerordentlichen Kündigung" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Identifikation" }),
          user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-electric/5 border border-electric/15 rounded text-sm text-mist", children: [
              "Angemeldet als",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-frost font-medium", children: user.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "E-Mail für die Bestätigung" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-frost mb-2", children: "E-Mail-Adresse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors", placeholder: "deine@email.de" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "customerNumber", className: "block text-sm font-medium text-frost mb-2", children: [
                "Kundennummer",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-mist/70", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "customerNumber", type: "text", value: customerNumber, onChange: (e) => setCustomerNumber(e.target.value), className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors", placeholder: "z.B. HE-000000" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Vertrag / Tarif" }),
          subscription?.plan_key || subscription?.plan ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-frost/5 border border-frost/10 rounded text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Aktives Abonnement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-medium text-frost", children: tariffLabelFor(subscription, tariffChoice, tariffCustom) }),
            subscription.current_period_end && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-mist/80", children: [
              "Aktuelle Periode bis ",
              formatDate(subscription.current_period_end)
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist", children: "Wähle den Tarif, den du kündigen möchtest." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "tariff", value: "suite-monthly", checked: tariffChoice === "suite-monthly", onChange: () => setTariffChoice("suite-monthly"), className: "accent-[#2e9bff]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-frost", children: "HeidSec Suite Ultimate — monatlich" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "tariff", value: "suite-yearly", checked: tariffChoice === "suite-yearly", onChange: () => setTariffChoice("suite-yearly"), className: "accent-[#2e9bff]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-frost", children: "HeidSec Suite Ultimate — jährlich" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "tariff", value: "other", checked: tariffChoice === "other", onChange: () => setTariffChoice("other"), className: "accent-[#2e9bff]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-frost", children: "Anderes Abonnement" })
            ] }),
            tariffChoice === "other" && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: tariffCustom, onChange: (e) => setTariffCustom(e.target.value), placeholder: "Name des Abonnements", className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Gewünschter Kündigungszeitpunkt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist mb-4", children: "Optional: Wenn du keinen Termin wählst, wird die Kündigung zum Ende der aktuellen Abrechnungsperiode wirksam." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: requestedDate, min: todayLocal(), onChange: (e) => setRequestedDate(e.target.value), className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "btn-primary px-8! py-3! disabled:opacity-50 disabled:cursor-not-allowed", children: submitting ? "Wird übermittelt..." : "Jetzt kündigen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-mist hover:text-frost transition-colors", children: "Abbrechen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist/70 leading-relaxed", children: "Hinweis: Die Kündigung ist unverzüglich nach dem Absenden wirksam. Die Bestätigung mit Datum und Uhrzeit erscheint direkt im Anschluss und kann gespeichert oder ausgedruckt werden. Eine Kündigung über diese Seite ersetzt die Vertragsbeendigung; Zahlungen werden nur bis zum Kündigungszeitpunkt eingezogen." })
      ] })
    ] })
  ] });
}
function ConfirmationView({
  data
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8 border-green-500/30", "data-cancel-confirmation": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-green-400!", children: "Bestätigung" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-2xl font-semibold text-frost", children: "Ihre Kündigung ist eingegangen." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-mist leading-relaxed", children: "Die Kündigung wurde elektronisch erfasst und ist mit folgendem Zeitpunkt bestätigt:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-6 space-y-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Eingangszeitpunkt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: formatDateTime(data.receivedAt) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Kündigungsart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: data.terminationType === "ordentlich" ? "Ordentliche Kündigung" : "Außerordentliche Kündigung" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Vertrag / Tarif" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: data.tariffLabel })
      ] }),
      data.requestedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Gewünschter Kündigungszeitpunkt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: formatDate(data.requestedDate) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Wirksamkeit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: data.periodEnd ? `Zum Ende der Abrechnungsperiode (${formatDate(data.periodEnd)})` : "Zum Ende der aktuellen Abrechnungsperiode" })
      ] }),
      data.customerNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Kundennummer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: data.customerNumber })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Bestätigung an" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: data.email })
      ] }),
      data.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Begründung" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost", children: data.reason })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        if (typeof window !== "undefined") window.print();
      }, className: "btn-primary", children: "Bestätigung drucken" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "btn-ghost", children: "Zu Mein Konto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-ghost", children: "Zur Startseite" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-mist/70", children: "Diese Seite ist Ihre elektronische Bestätigung nach § 312k BGB. Sie können sie speichern oder ausdrucken. Über die Kündigung selbst entscheidet der Vertrag; eine gesonderte E-Mail-Bestätigung erfolgt über die in deinem Konto hinterlegte E-Mail-Adresse." })
  ] }) });
}
export {
  CancelPage as component
};
