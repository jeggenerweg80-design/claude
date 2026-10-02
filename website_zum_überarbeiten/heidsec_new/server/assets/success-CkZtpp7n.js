import { P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { a as useSearch } from "./router-Cdgab8eA.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function CheckoutSuccess() {
  const search = useSearch({
    from: "/checkout/success"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-4xl px-5 py-10 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6 md:p-8 border-green-500/30", "data-checkout-success": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-green-400!", children: "Checkout erfolgreich" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-bold tracking-tight text-frost", children: "Zahlung erfolgreich!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-mist leading-relaxed", children: "Dein Abonnement wurde aktiviert. Du erhältst eine Bestätigung per E-Mail." }),
    search.session_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm text-mist/70", children: [
      "Session-ID: ",
      search.session_id
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/mein-konto", className: "btn-primary", children: "Zu Mein Konto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "btn-ghost", children: "Zur Startseite" })
    ] })
  ] }) }) });
}
export {
  CheckoutSuccess as component
};
