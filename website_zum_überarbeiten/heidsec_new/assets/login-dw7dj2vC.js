import { N as reactExports, U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import { u as useNavigate, a as useSearch } from "./router-lSCE4rBE.js";
import { b as bootstrapSession, a as loginUser } from "./auth-DKM4MRJi.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/login"
  });
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [initialized, setInitialized] = reactExports.useState(false);
  reactExports.useEffect(() => {
    bootstrapSession().then((result) => {
      if (result.authenticated && result.user) {
        navigate({
          to: "/mein-konto"
        });
      } else {
        setInitialized(true);
      }
    });
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);
    if (result.success) {
      const redirectTo = search?.redirect || "/mein-konto";
      navigate({
        to: redirectTo
      });
    } else if (result.requiresVerification) {
      navigate({
        to: `/verify-email?email=${encodeURIComponent(email)}`
      });
    } else {
      setError(result.error || "Login failed");
    }
  };
  if (!initialized) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Wird initialisiert..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "inline-flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec", className: "h-8 w-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-[0.22em] text-frost", children: "HEIDSEC" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: "Anmelden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Zugang zu deinem HeidSec-Konto" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-frost mb-2", children: "E-Mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "deine@email.de", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-frost mb-2", children: "Passwort" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "••••••••", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Wird angemeldet..." : "Anmelden" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4 text-sm text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login/forgot-password", className: "block text-electric hover:text-electric/80 transition-colors", children: "Passwort vergessen?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-mist", children: "Noch kein Konto?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/register", className: "text-electric font-medium hover:text-electric/80 transition-colors", children: "Jetzt registrieren" })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
