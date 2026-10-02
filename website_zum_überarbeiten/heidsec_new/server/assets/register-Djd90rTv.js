import { K as reactExports, P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { u as useNavigate } from "./router-Cdgab8eA.js";
import { b as bootstrapSession, e as registerUser } from "./auth-DKM4MRJi.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [licenseKey, setLicenseKey] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [passwordConfirm, setPasswordConfirm] = reactExports.useState("");
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
    if (password !== passwordConfirm) {
      setError("Passwörter stimmen nicht überein");
      return;
    }
    if (password.length < 12) {
      setError("Passwort muss mindestens 12 Zeichen lang sein");
      return;
    }
    setLoading(true);
    const result = await registerUser(email, password, name, licenseKey.trim() || void 0);
    setLoading(false);
    if (result.success) {
      if (result.requiresVerification) {
        navigate({
          to: `/verify-email?email=${encodeURIComponent(email)}`
        });
      } else {
        navigate({
          to: "/mein-konto"
        });
      }
    } else {
      setError(result.error || "Registration failed");
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: "Konto erstellen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Sicherheit beginnt mit einem Konto" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-frost mb-2", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "name", type: "text", required: true, value: name, onChange: (e) => setName(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "Dein Name", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-frost mb-2", children: "E-Mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "deine@email.de", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "licenseKey", className: "block text-sm font-medium text-frost mb-2", children: "Lizenzschlüssel (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "licenseKey", type: "text", autoComplete: "off", value: licenseKey, onChange: (e) => setLicenseKey(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "Aus deiner Bestellbestätigung (optional)", disabled: loading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-mist", children: "Ohne Lizenzschlüssel registrierst du ein kostenloses HeidSec-Konto. Du kannst einen Lizenzschlüssel später jederzeit in deinem Konto hinterlegen." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-frost mb-2", children: "Passwort" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "Mindestens 12 Zeichen", minLength: 12, disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "passwordConfirm", className: "block text-sm font-medium text-frost mb-2", children: "Passwort wiederholen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "passwordConfirm", type: "password", required: true, value: passwordConfirm, onChange: (e) => setPasswordConfirm(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "••••••••", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Wird registriert..." : "Konto erstellen" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-sm text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-mist", children: "Bereits angemeldet?" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "text-electric font-medium hover:text-electric/80 transition-colors", children: "Jetzt anmelden" })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
