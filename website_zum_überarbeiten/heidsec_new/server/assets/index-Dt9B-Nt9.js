import { K as reactExports, P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { u as useNavigate, a as useSearch } from "./router-Cdgab8eA.js";
import { j as apiPost, b as bootstrapSession } from "./auth-DKM4MRJi.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const PRODUCTS = [
  { id: "pro-monthly", name: "PRO — monatlich", price: 1999, currency: "eur", interval: "month", stripePriceId: "price_1UHSRvDkd7aOBtvOmrMTMaf2" },
  { id: "pro-yearly", name: "PRO — jährlich", price: 17990, currency: "eur", interval: "year", stripePriceId: "price_1UHSRvDkd7aOBtvOmWvmgjNB" },
  { id: "ki-monthly", name: "KI — monatlich", price: 999, currency: "eur", interval: "month", stripePriceId: "price_1UHSRwDkd7aOBtvOdJogpoiP" },
  { id: "ki-yearly", name: "KI — jährlich", price: 8990, currency: "eur", interval: "year", stripePriceId: "price_1UHSRwDkd7aOBtvOGWX5wViT" },
  { id: "vpn-monthly", name: "VPN — monatlich", price: 799, currency: "eur", interval: "month", stripePriceId: "price_1UHSRxDkd7aOBtvOkSp6xGBL" },
  { id: "vpn-yearly", name: "VPN — jährlich", price: 6990, currency: "eur", interval: "year", stripePriceId: "price_1UHSRxDkd7aOBtvOpTL36GL0" },
  { id: "mailguard-monthly", name: "MailGuard — monatlich", price: 799, currency: "eur", interval: "month", stripePriceId: "price_1UHSRyDkd7aOBtvO5nDwp4Up" },
  { id: "mailguard-yearly", name: "MailGuard — jährlich", price: 6990, currency: "eur", interval: "year", stripePriceId: "price_1UHSRyDkd7aOBtvOTMozFXHd" },
  { id: "vault-monthly", name: "Vault — monatlich", price: 799, currency: "eur", interval: "month", stripePriceId: "price_1UHSRzDkd7aOBtvOtO3J8avU" },
  { id: "vault-yearly", name: "Vault — jährlich", price: 6990, currency: "eur", interval: "year", stripePriceId: "price_1UHSRzDkd7aOBtvO6s1HnuaD" },
  { id: "pro-vpn-monthly", name: "PRO+VPN — monatlich", price: 2499, currency: "eur", interval: "month", stripePriceId: "price_1UHSS0Dkd7aOBtvOX12ivTZI" },
  { id: "pro-vpn-yearly", name: "PRO+VPN — jährlich", price: 22490, currency: "eur", interval: "year", stripePriceId: "price_1UHSS0Dkd7aOBtvOOwD0yHRC" },
  { id: "pro-mailguard-monthly", name: "PRO+MailGuard — monatlich", price: 2499, currency: "eur", interval: "month", stripePriceId: "price_1UHSS1Dkd7aOBtvOKABLSWu1" },
  { id: "pro-mailguard-yearly", name: "PRO+MailGuard — jährlich", price: 22490, currency: "eur", interval: "year", stripePriceId: "price_1UHSS1Dkd7aOBtvOuEoNA8P5" },
  { id: "pro-vault-monthly", name: "PRO+Vault — monatlich", price: 2499, currency: "eur", interval: "month", stripePriceId: "price_1UHSS2Dkd7aOBtvOmB7nwHQu" },
  { id: "pro-vault-yearly", name: "PRO+Vault — jährlich", price: 22490, currency: "eur", interval: "year", stripePriceId: "price_1UHSS3Dkd7aOBtvOMm9BdObR" },
  { id: "pro-mailguard-vault-monthly", name: "PRO+MailGuard+Vault — monatlich", price: 2999, currency: "eur", interval: "month", stripePriceId: "price_1UHSS4Dkd7aOBtvOEsGexRPA" },
  { id: "pro-mailguard-vault-yearly", name: "PRO+MailGuard+Vault — jährlich", price: 26990, currency: "eur", interval: "year", stripePriceId: "price_1UHSS4Dkd7aOBtvOl9ZilZS4" },
  { id: "ki-komplett-monthly", name: "KI Komplett — monatlich", price: 3499, currency: "eur", interval: "month", stripePriceId: "price_1UHSS5Dkd7aOBtvOMZuhkorw" },
  { id: "ki-komplett-yearly", name: "KI Komplett — jährlich", price: 31990, currency: "eur", interval: "year", stripePriceId: "price_1UHSS6Dkd7aOBtvOU3stJw3J" },
  { id: "zusatzgeraet-monthly", name: "Zusatzgerät — monatlich", price: 499, currency: "eur", interval: "month", stripePriceId: "price_1UHSSCDkd7aOBtvOJaVNr9pm" },
  { id: "zusatzgeraet-yearly", name: "Zusatzgerät — jährlich", price: 4499, currency: "eur", interval: "year", stripePriceId: "price_1UHSSEDkd7aOBtvOM4uswIzb" }
];
async function createStripeCheckout(input) {
  const result = await apiPost(
    "/api/billing/checkout",
    input,
    false,
    true
  );
  if (!result.ok) return { error: result.data?.error || "Checkout session creation failed" };
  return { url: result.data?.url, sessionId: result.data?.sessionId };
}
function CheckoutPage() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/checkout/"
  });
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [selectedInterval, setSelectedInterval] = reactExports.useState("month");
  const [selectedProduct, setSelectedProduct] = reactExports.useState(search.productId || "suite-monthly");
  reactExports.useEffect(() => {
    let cancelled = false;
    void (async () => {
      const session = await bootstrapSession();
      if (!cancelled && session.authenticated && session.user) {
        setUser(session.user);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  PRODUCTS.find((p) => p.id === selectedProduct);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await createStripeCheckout({
        productId: selectedProduct,
        interval: selectedInterval,
        email: user?.email
      });
      if (result.error) {
        setError(result.error);
        setSubmitting(false);
        return;
      }
      if (result.url) {
        window.location.href = result.url;
        return;
      }
      setError("No checkout URL received.");
    } catch {
      setError("Fehler beim Erstellen der Checkout-Session.");
    }
    setSubmitting(false);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Wird geladen..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-5 py-10 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-bold tracking-tight text-frost", children: "Produkt wählen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-mist leading-relaxed", children: "Wähle dein Produkt und deinen Abo-Zyklus. Der Checkout läuft über Stripe." })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm mb-6", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", "data-checkout-form": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Produkt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: PRODUCTS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-start gap-3 cursor-pointer p-4 rounded-lg border transition-colors ${selectedProduct === p.id ? "border-electric bg-electric/10" : "border-electric/10 bg-ink/50 hover:border-electric/30"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "product", value: p.id, checked: selectedProduct === p.id, onChange: () => setSelectedProduct(p.id), className: "mt-1 accent-[#2e9bff]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-frost", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-mist", children: p.interval === "month" ? `${(p.price / 100).toFixed(2)} €/Monat` : `${(p.price / 100).toFixed(2)} €/Jahr` })
          ] })
        ] }, p.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display text-lg font-semibold text-frost", children: "Abo-Zyklus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "interval", value: "month", checked: selectedInterval === "month", onChange: () => setSelectedInterval("month"), className: "accent-[#2e9bff]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-frost", children: "Monatlich" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "interval", value: "year", checked: selectedInterval === "year", onChange: () => setSelectedInterval("year"), className: "accent-[#2e9bff]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-frost", children: "Jährlich" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "btn-primary px-8! py-3! disabled:opacity-50 disabled:cursor-not-allowed", children: submitting ? "Wird geladen..." : "Zu Stripe Checkout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
          to: "/"
        }), className: "text-sm text-mist hover:text-frost transition-colors", children: "Abbrechen" })
      ] })
    ] })
  ] }) });
}
export {
  CheckoutPage as component
};
