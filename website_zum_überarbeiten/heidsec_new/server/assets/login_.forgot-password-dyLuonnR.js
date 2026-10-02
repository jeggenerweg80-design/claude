import { K as reactExports, P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { u as useNavigate, a as useSearch } from "./router-Cdgab8eA.js";
import { b as bootstrapSession, n as requestPasswordReset, f as resetPassword } from "./auth-DKM4MRJi.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function ForgotPasswordPage() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/login_/forgot-password"
  });
  const [step, setStep] = reactExports.useState(search?.token ? "reset" : "email");
  const [email, setEmail] = reactExports.useState("");
  const [token, setToken] = reactExports.useState(search?.token || "");
  const [password, setPassword] = reactExports.useState("");
  const [passwordConfirm, setPasswordConfirm] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [initialized, setInitialized] = reactExports.useState(false);
  reactExports.useEffect(() => {
    bootstrapSession().then(() => {
      setInitialized(true);
    });
  }, []);
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await requestPasswordReset(email);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 3e3);
    } else {
      setError(result.error || "Request failed");
    }
  };
  const handleResetPassword = async (e) => {
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
    const result = await resetPassword(token, password);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate({
          to: "/login"
        });
      }, 2e3);
    } else {
      setError(result.error || "Reset failed");
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: step === "email" ? "Passwort zurücksetzen" : "Neues Passwort setzen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: step === "email" ? "Gib deine E-Mail ein, um einen Link zum Zurücksetzen zu erhalten" : "Lege ein neues Passwort für dein Konto fest" })
    ] }),
    success && step === "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-electric/10 border border-electric/30 rounded text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-frost mb-2", children: "✓ E-Mail versendet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist", children: "Wenn ein Konto mit dieser E-Mail existiert, erhältst du einen Link zum Zurücksetzen." })
    ] }),
    success && step === "reset" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-electric/10 border border-electric/30 rounded text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-frost mb-2", children: "✓ Passwort zurückgesetzt" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist", children: "Wird weitergeleitet..." })
    ] }),
    error && !success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm", children: error }),
    step === "email" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRequestReset, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-frost mb-2", children: "E-Mail-Adresse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "deine@email.de", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Wird versendet..." : "Link versendet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "text-electric hover:text-electric/80 transition-colors", children: "Zurück zur Anmeldung" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleResetPassword, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-frost mb-2", children: "Neues Passwort" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "Mindestens 12 Zeichen", minLength: 12, disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "passwordConfirm", className: "block text-sm font-medium text-frost mb-2", children: "Passwort wiederholen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "passwordConfirm", type: "password", required: true, value: passwordConfirm, onChange: (e) => setPasswordConfirm(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "••••••••", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Wird gespeichert..." : "Passwort speichern" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "text-electric hover:text-electric/80 transition-colors", children: "Zurück zur Anmeldung" }) })
    ] })
  ] }) });
}
export {
  ForgotPasswordPage as component
};
