import { K as reactExports, P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { u as useNavigate, L as Link } from "./router-Cdgab8eA.js";
import { b as bootstrapSession, l as logoutUser } from "./auth-DKM4MRJi.js";
import { i as isGooglePlaySubscription, g as getAccountData, s as submitWithdrawal } from "./account-D6Qgmhwo.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const DRAFT_KEY = "heidsec_withdrawal_draft";
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
function planLabelFor(subscription, custom) {
  if (subscription?.plan_key || subscription?.plan) {
    const cycle = subscription.billing_cycle === "yearly" ? "jährlich" : subscription.billing_cycle === "monthly" ? "monatlich" : "";
    return `${subscription.plan_key || subscription.plan}${cycle ? ` — ${cycle}` : ""}`;
  }
  return custom.trim() || "HeidSec Abonnement";
}
function WithdrawalPage() {
  const navigate = useNavigate();
  const [user, setUser] = reactExports.useState(null);
  const [accountData, setAccountData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [view, setView] = reactExports.useState("form");
  const [confirmation, setConfirmation] = reactExports.useState(null);
  const [email, setEmail] = reactExports.useState("");
  const [customerNumber, setCustomerNumber] = reactExports.useState("");
  const [planCustom, setPlanCustom] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const [agreedToWithdraw, setAgreedToWithdraw] = reactExports.useState(false);
  const subscription = accountData?.subscription;
  const isPlay = isGooglePlaySubscription(subscription);
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
          if (data.data.profile?.customer_number) {
            setCustomerNumber(data.data.profile.customer_number);
          }
          const sub = data.data.subscription;
          if (isGooglePlaySubscription(sub)) {
            setView("google-play");
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
            if (draft.email) setEmail(draft.email);
            if (draft.customerNumber) setCustomerNumber(draft.customerNumber);
            if (draft.planCustom) setPlanCustom(draft.planCustom);
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
      setError("Bitte gib eine gültige E-Mail-Adresse an.");
      return;
    }
    if (!agreedToWithdraw) {
      setError("Bitte bestätige, dass du diesen Vertrag widerrufen möchtest.");
      return;
    }
    if (!user) {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify({
          email: email.trim(),
          customerNumber: customerNumber.trim(),
          planCustom: planCustom.trim(),
          reason: reason.trim()
        }));
      }
      navigate({
        to: "/login",
        search: {
          redirect: "/widerruf"
        }
      });
      return;
    }
    if (isPlay) {
      setView("google-play");
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitWithdrawal({
        email: email.trim(),
        customerNumber: customerNumber.trim() || void 0,
        planLabel: planLabelFor(subscription, planCustom),
        reason: reason.trim() || void 0
      });
      if (result.notWithdrawable) {
        setView("no-subscription");
        return;
      }
      if (result.success) {
        setConfirmation({
          receivedAt: (/* @__PURE__ */ new Date()).toISOString(),
          email: email.trim(),
          customerNumber: customerNumber.trim() || void 0,
          planLabel: planLabelFor(subscription, planCustom),
          reason: reason.trim() || void 0,
          confirmationId: result.confirmationId
        });
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(DRAFT_KEY);
        }
        setView("confirmation");
      } else {
        setError(result.error || "Der Widerruf konnte nicht übermittelt werden.");
      }
    } catch (err) {
      setError("Der Widerruf konnte nicht übermittelt werden. Bitte versuche es später erneut.");
    }
    setSubmitting(false);
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
        redirect: "/widerruf"
      }, className: "text-sm text-mist hover:text-frost transition-colors", children: "Anmelden" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-5 py-10 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Verbraucherschutz" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-bold tracking-tight text-frost", children: "Vertrag widerrufen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-mist leading-relaxed", children: "Nach § 356a BGB hast du das Recht, Verträge über digitale Dienstleistungen innerhalb von 14 Tagen nach Vertragsschluss zu widerrufen. Das Online-Widerrufsformular unten gibt dir die Möglichkeit, dein Widerrufsrecht auszuüben." })
      ] }),
      view === "confirmation" && confirmation && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmationView, { data: confirmation }),
      view === "google-play" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-frost mb-3", children: "Google-Play-Abonnement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist leading-relaxed", children: "Für Google-Play-Abonnements gilt: Der Widerruf erfolgt über dein Google-Konto, nicht über diese Website." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://play.google.com/store/account/subscriptions", target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: "In Google Play verwalten" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "btn-ghost", children: "Zurück zu Mein Konto" })
        ] })
      ] }),
      view === "no-subscription" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-frost mb-3", children: "Kein kostenpflichtiges Abonnement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist leading-relaxed", children: "Für dieses Konto besteht kein kostenpflichtiges Abonnement. Es gibt nichts zu widerrufen." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "btn-ghost", children: "Zu Mein Konto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-ghost", children: "Zur Startseite" })
        ] })
      ] }),
      view === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", "data-withdrawal-form": true, children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Vertragsangaben" }),
          user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-electric/5 border border-electric/15 rounded text-sm text-mist", children: [
              "Angemeldet als ",
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
                "Kundennummer ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-mist/70", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "customerNumber", type: "text", value: customerNumber, onChange: (e) => setCustomerNumber(e.target.value), className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors", placeholder: "z.B. HE-000000" })
            ] })
          ] }),
          subscription?.plan_key || subscription?.plan ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-frost/5 border border-frost/10 rounded text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Vertrag" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-medium text-frost", children: planLabelFor(subscription, planCustom) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "planCustom", className: "block text-sm font-medium text-frost mb-2", children: "Name des Tarifs / Moduls" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "planCustom", type: "text", value: planCustom, onChange: (e) => setPlanCustom(e.target.value), placeholder: "z.B. HeidSec Premium Monatlich", className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Begründung (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: reason, onChange: (e) => setReason(e.target.value), rows: 3, className: "w-full px-4 py-2 bg-ink border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors", placeholder: "Grund für den Widerruf (optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6 space-y-4 border-yellow-500/30 bg-yellow-900/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Bestätigung" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: agreedToWithdraw, onChange: (e) => setAgreedToWithdraw(e.target.checked), className: "mt-1 accent-[#2e9bff]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-mist leading-relaxed", children: [
              "Ich bestätige hiermit, dass ich diesen Vertrag widerrufen möchte. Mir ist bekannt, dass ich durch diesen Widerruf innerhalb von 14 Tagen meine volle Zahlung erhalte und die Leistung endet.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Diese Erklärung ist nach § 356a BGB rechtsverbindlich."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting || !agreedToWithdraw, className: "btn-primary px-8! py-3! disabled:opacity-50 disabled:cursor-not-allowed", children: submitting ? "Wird übermittelt..." : "Widerruf bestätigen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-mist hover:text-frost transition-colors", children: "Abbrechen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist/70 leading-relaxed", children: "Der Widerruf wird sofort übermittelt. Du erhältst eine elektronische Bestätigung per E-Mail. Deine Zahlung wird innerhalb von 14 Tagen via ursprüngliches Zahlungsmittel erstattet." })
      ] })
    ] })
  ] });
}
function ConfirmationView({
  data
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8 border-yellow-500/30", "data-withdrawal-confirmation": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-yellow-300!", children: "§ 356a Bestätigung" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-2xl font-semibold text-frost", children: "Dein Widerruf ist eingegangen" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-mist leading-relaxed", children: "Die Widerrufsanmeldung wurde elektronisch erfasst und ist mit folgendem Zeitpunkt bestätigt:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-6 space-y-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Eingangszeitpunkt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: formatDateTime(data.receivedAt) })
      ] }),
      data.confirmationId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Bestätigungs-ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-mono text-xs", children: data.confirmationId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Vertrag" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: data.planLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "E-Mail-Bestätigung" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost", children: data.email })
      ] }),
      data.customerNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Kundennummer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: data.customerNumber })
      ] }),
      data.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Begründung" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost", children: data.reason })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded text-sm text-yellow-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-2", children: "Nächste Schritte:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Bestätigungsmail wird an dein E-Mail-Konto versendet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Rückzahlung innerhalb von 14 Tagen via ursprüngliches Zahlungsmittel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Der Dienst bleibt bis zum Ende der Abrechnungsperiode verfügbar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        if (typeof window !== "undefined") window.print();
      }, className: "btn-primary", children: "Bestätigung drucken" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "btn-ghost", children: "Zu Mein Konto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-ghost", children: "Zur Startseite" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-mist/70", children: "Diese Seite ist deine elektronische Bestätigung nach § 356a BGB. Du kannst sie speichern oder ausdrucken." })
  ] }) });
}
export {
  WithdrawalPage as component
};
