import { K as reactExports, P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { u as useNavigate, a as useSearch } from "./router-Cdgab8eA.js";
import { b as bootstrapSession, v as verifyEmail, h as resendVerificationEmail } from "./auth-DKM4MRJi.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/verify-email"
  });
  const [email, setEmail] = reactExports.useState("");
  const [token, setToken] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (search?.email) setEmail(search.email);
    if (search?.token) setToken(search.token);
  }, [search?.email, search?.token]);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [resendMessage, setResendMessage] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [resendLoading, setResendLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (search?.token) {
      handleVerify(search.token);
    } else {
      bootstrapSession();
    }
  }, [search?.token]);
  const handleVerify = async (tokenToVerify) => {
    const verifyToken = tokenToVerify || token;
    if (!verifyToken) {
      setError("Verification token is required");
      return;
    }
    setError("");
    setLoading(true);
    const result = await verifyEmail(verifyToken);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate({
          to: "/mein-konto"
        });
      }, 2e3);
    } else {
      setError(result.error || "Verification failed");
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("E-Mail is required");
      return;
    }
    setError("");
    setResendLoading(true);
    const result = await resendVerificationEmail(email);
    setResendLoading(false);
    if (result.success) {
      setResendMessage("Bestätigungs-E-Mail wurde erneut versendet. Prüfe dein Postfach.");
      setError("");
      setTimeout(() => setResendMessage(""), 5e3);
    } else {
      setError(result.error || "Resend failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "inline-flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec", className: "h-8 w-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-[0.22em] text-frost", children: "HEIDSEC" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: "E-Mail bestätigen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Verifizie deine E-Mail-Adresse um dein Konto zu aktivieren" })
    ] }),
    success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-electric/10 border border-electric/30 rounded text-electric text-sm text-center", children: "✓ E-Mail erfolgreich bestätigt. Wird weitergeleitet..." }),
    error && !success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm", children: error }),
    resendMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-electric/10 border border-electric/30 rounded text-electric text-sm text-center", children: resendMessage }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      !success && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        handleVerify();
      }, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "token", className: "block text-sm font-medium text-frost mb-2", children: "Verification Token" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "token", type: "text", value: token, onChange: (e) => setToken(e.target.value), placeholder: "Token aus E-Mail einfügen", className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors", disabled: loading })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading || !token, className: "btn-primary w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Wird bestätigt..." : "Bestätigen" })
      ] }),
      !success && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleResend, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-frost mb-2", children: "E-Mail (zum erneuten Versenden)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "deine@email.de", className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 transition-colors", disabled: resendLoading })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: resendLoading || !email, className: "btn-ghost w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed", children: resendLoading ? "Wird versendet..." : "Link erneut versendet" })
      ] }),
      !success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "text-electric hover:text-electric/80 transition-colors", children: "Zurück zur Anmeldung" }) }) })
    ] })
  ] }) });
}
export {
  VerifyEmailPage as component
};
