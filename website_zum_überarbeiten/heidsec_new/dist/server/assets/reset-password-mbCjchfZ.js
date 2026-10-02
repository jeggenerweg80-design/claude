import { K as reactExports, P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { u as useNavigate, a as useSearch } from "./router-Cdgab8eA.js";
import { f as resetPassword } from "./auth-DKM4MRJi.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function ResetPasswordPage() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/reset-password"
  });
  const token = search?.token || "";
  const [password, setPassword] = reactExports.useState("");
  const [passwordConfirm, setPasswordConfirm] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
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
      setError(result.error || "Der Reset-Link ist ungültig oder abgelaufen.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "inline-flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec", className: "h-8 w-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-[0.22em] text-frost", children: "HEIDSEC" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: "Neues Passwort setzen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Lege ein neues Passwort für dein Konto fest" })
    ] }),
    success && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-electric/10 border border-electric/30 rounded text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-frost mb-2", children: "✓ Passwort zurückgesetzt" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist", children: "Wird zur Anmeldung weitergeleitet..." })
    ] }),
    !token && !success && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "Dieser Link ist ungültig — es fehlt ein Reset-Token." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login/forgot-password", className: "text-electric hover:text-electric/80 transition-colors", children: "Neuen Link anfordern" })
    ] }),
    error && !success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm text-center", children: error }),
    token && !success && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-frost mb-2", children: "Neues Passwort" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "password", type: "password", required: true, autoComplete: "new-password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "Mindestens 12 Zeichen", minLength: 12, disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "passwordConfirm", className: "block text-sm font-medium text-frost mb-2", children: "Passwort wiederholen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "passwordConfirm", type: "password", required: true, autoComplete: "new-password", value: passwordConfirm, onChange: (e) => setPasswordConfirm(e.target.value), className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-colors", placeholder: "••••••••", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Wird gespeichert..." : "Passwort speichern" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "text-electric hover:text-electric/80 transition-colors", children: "Zurück zur Anmeldung" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login/forgot-password", className: "text-mist hover:text-frost transition-colors", children: "Neuen Reset-Link anfordern" }) })
      ] })
    ] })
  ] }) });
}
export {
  ResetPasswordPage as component
};
