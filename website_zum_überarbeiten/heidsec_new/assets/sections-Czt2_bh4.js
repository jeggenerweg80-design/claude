import { N as reactExports, U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import { i as getSections, j as updateSection } from "./admin-8wxL1wMd.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./auth-DKM4MRJi.js";
function SectionsManagement() {
  const [sections, setSections] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState({});
  reactExports.useEffect(() => {
    loadSections();
  }, []);
  const loadSections = async () => {
    setLoading(true);
    const result = await getSections();
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setSections(result.sections || []);
    }
    setLoading(false);
  };
  const handleEdit = (section) => {
    setEditingId(section.id);
    setEditData({
      title: section.title,
      content: section.content,
      published: section.published
    });
  };
  const handleSave = async () => {
    if (!editingId) return;
    const result = await updateSection(editingId, editData);
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setEditingId(null);
      setEditData({});
      loadSections();
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: "Seiten & Sektionen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Bearbeite die Inhalte deiner Website-Seiten" })
    ] }),
    sections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Keine Seiten gefunden" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded", children: editingId === section.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Titel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editData.title || "", onChange: (e) => setEditData({
          ...editData,
          title: e.target.value
        }), className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Inhalt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: editData.content || "", onChange: (e) => setEditData({
          ...editData,
          content: e.target.value
        }), rows: 6, className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "published", checked: editData.published || false, onChange: (e) => setEditData({
          ...editData,
          published: e.target.checked
        }), className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "published", className: "text-sm text-frost", children: "Veröffentlicht" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: section.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-mist mt-1", children: [
          section.content.substring(0, 100),
          section.content.length > 100 ? "..." : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-mist/50 mt-2", children: [
          section.published ? "✓ Veröffentlicht" : "⚫ Entwurf",
          " · Bearbeitet von ",
          section.updatedBy
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEdit(section), className: "ml-4 px-4 py-2 text-sm bg-electric/20 text-electric rounded hover:bg-electric/30 transition-colors", children: "Bearbeiten" })
    ] }) }, section.id)) })
  ] });
}
export {
  SectionsManagement as component
};
