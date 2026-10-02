import { K as reactExports, P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { f as getLegalText, h as updateLegalText } from "./admin-8wxL1wMd.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./auth-DKM4MRJi.js";
function LegalManagement() {
  const [type, setType] = reactExports.useState("privacy");
  const [content, setContent] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadLegal(type);
  }, [type]);
  const loadLegal = async (legalType) => {
    setLoading(true);
    const result = await getLegalText(legalType);
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setContent(result.content || "");
    }
    setLoading(false);
  };
  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess(false);
    const result = await updateLegalText(type, content);
    setSaving(false);
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Wird geladen..." });
  }
  if (error && error !== "Zugriff verweigert") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-red-900/20 border border-red-500/30 rounded text-red-300", children: error });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: "Rechtstexte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Verwalte Datenschutz, AGB und Impressum" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["privacy", "terms", "imprint"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setType(t), className: `px-4 py-2 rounded text-sm font-medium transition-colors ${type === t ? "bg-electric/20 text-electric" : "bg-ink/50 border border-electric/10 text-mist hover:text-frost"}`, children: t === "privacy" ? "Datenschutz" : t === "terms" ? "AGB" : "Impressum" }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      error === "Zugriff verweigert" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-red-900/20 border border-red-500/30 rounded text-red-300", children: "Du hast keine Berechtigung" }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-green-900/20 border border-green-500/30 rounded text-green-300", children: "✓ Gespeichert" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: content, onChange: (e) => setContent(e.target.value), rows: 12, className: "w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors", disabled: error === "Zugriff verweigert" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, disabled: saving || error === "Zugriff verweigert", className: "btn-primary py-2 disabled:opacity-50", children: saving ? "Wird gespeichert..." : "Speichern" })
    ] })
  ] });
}
export {
  LegalManagement as component
};
