import { K as reactExports, P as jsxRuntimeExports } from "./server-CLVLWOFx.js";
import { b as getFaqs, e as updateFaq } from "./admin-8wxL1wMd.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./auth-DKM4MRJi.js";
function FaqManagement() {
  const [faqs, setFaqs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState({});
  reactExports.useEffect(() => {
    loadFaqs();
  }, []);
  const loadFaqs = async () => {
    setLoading(true);
    const result = await getFaqs();
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setSections(result.faqs || []);
    }
    setLoading(false);
  };
  const setSections = setFaqs;
  const handleEdit = (faq) => {
    setEditingId(faq.id);
    setEditData({
      question: faq.question,
      answer: faq.answer,
      published: faq.published,
      category: faq.category
    });
  };
  const handleSave = async () => {
    if (!editingId) return;
    const result = await updateFaq(editingId, editData);
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setEditingId(null);
      setEditData({});
      loadFaqs();
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Wird geladen..." });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-red-900/20 border border-red-500/30 rounded text-red-300", children: error === "Zugriff verweigert" ? "Du hast keine Berechtigung" : error });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Verwalte häufig gestellte Fragen" })
    ] }),
    faqs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Keine FAQs gefunden" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: faqs.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded", children: editingId === faq.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Frage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editData.question || "", onChange: (e) => setEditData({
          ...editData,
          question: e.target.value
        }), className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Antwort" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: editData.answer || "", onChange: (e) => setEditData({
          ...editData,
          answer: e.target.value
        }), rows: 4, className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Kategorie" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editData.category || "", onChange: (e) => setEditData({
            ...editData,
            category: e.target.value
          }), className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editData.published || false, onChange: (e) => setEditData({
            ...editData,
            published: e.target.checked
          }), className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-frost", children: "Veröffentlicht" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, className: "btn-primary py-2", children: "Speichern" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setEditingId(null);
          setEditData({});
        }, className: "btn-ghost py-2", children: "Abbrechen" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: faq.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-mist mt-1", children: [
          faq.answer.substring(0, 80),
          faq.answer.length > 80 ? "..." : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-mist/50 mt-2", children: [
          faq.published ? "✓" : "⚫",
          " ",
          faq.category
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEdit(faq), className: "ml-4 px-4 py-2 text-sm bg-electric/20 text-electric rounded hover:bg-electric/30 transition-colors", children: "Bearbeiten" })
    ] }) }, faq.id)) })
  ] });
}
export {
  FaqManagement as component
};
