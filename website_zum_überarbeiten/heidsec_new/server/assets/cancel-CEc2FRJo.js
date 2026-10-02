import { P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { L as Link } from "./router-Cdgab8eA.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function CheckoutCancel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-4xl px-5 py-10 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8 border-yellow-500/30", "data-checkout-cancel": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-yellow-400!", children: "Checkout abgebrochen" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-bold tracking-tight text-frost", children: "Zahlung abgebrochen" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-mist leading-relaxed", children: "Der Checkout-Vorgang wurde abgebrochen. Dein Abonnement wurde nicht geändert." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/checkout", className: "btn-primary", children: "Erneut versuchen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "btn-ghost", children: "Zu Mein Konto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-ghost", children: "Zur Startseite" })
    ] })
  ] }) }) });
}
export {
  CheckoutCancel as component
};
