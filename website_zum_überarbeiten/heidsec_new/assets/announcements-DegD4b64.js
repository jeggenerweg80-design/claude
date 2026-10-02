import { N as reactExports, U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import { g as getAnnouncements, a as createAnnouncement, u as updateAnnouncement, d as deleteAnnouncement } from "./admin-8wxL1wMd.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./auth-DKM4MRJi.js";
function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState({});
  const [showNew, setShowNew] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadAnnouncements();
  }, []);
  const loadAnnouncements = async () => {
    setLoading(true);
    const result = await getAnnouncements();
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setAnnouncements(result.announcements || []);
    }
    setLoading(false);
  };
  const handleCreate = async () => {
    if (!editData.title || !editData.content) {
      setError("Titel und Inhalt sind erforderlich");
      return;
    }
    const result = await createAnnouncement({
      title: editData.title,
      content: editData.content,
      type: editData.type || "info",
      published: editData.published || false,
      position: announcements.length
    });
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setShowNew(false);
      setEditData({});
      loadAnnouncements();
    }
  };
  const handleUpdate = async () => {
    if (!editingId) return;
    const result = await updateAnnouncement(editingId, editData);
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      setEditingId(null);
      setEditData({});
      loadAnnouncements();
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Wirklich löschen?")) return;
    const result = await deleteAnnouncement(id);
    if (result.forbidden) {
      setError("Zugriff verweigert");
    } else if (result.error) {
      setError(result.error);
    } else {
      loadAnnouncements();
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Wird geladen..." });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-red-900/20 border border-red-500/30 rounded text-red-300", children: error === "Zugriff verweigert" ? "Du hast keine Berechtigung" : error });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-frost mb-2", children: "Ankündigungen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Erstelle Nachrichten und Banner" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setShowNew(!showNew);
        setEditData({});
        setEditingId(null);
      }, className: "btn-primary py-2", children: showNew ? "Abbrechen" : "Neue Ankündigung" })
    ] }),
    showNew && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: "Neue Ankündigung" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Titel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editData.title || "", onChange: (e) => setEditData({
          ...editData,
          title: e.target.value
        }), className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors", placeholder: "z.B. Wartungsmitteilung" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Inhalt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: editData.content || "", onChange: (e) => setEditData({
          ...editData,
          content: e.target.value
        }), rows: 4, className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors", placeholder: "Ankündigungstext..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Typ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editData.type || "info", onChange: (e) => setEditData({
            ...editData,
            type: e.target.value
          }), className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "info", children: "Info" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warning", children: "Warnung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "success", children: "Erfolg" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editData.published || false, onChange: (e) => setEditData({
            ...editData,
            published: e.target.checked
          }), className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-frost", children: "Veröffentlicht" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleCreate, className: "btn-primary py-2", children: "Erstellen" })
    ] }),
    announcements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Keine Ankündigungen" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: announcements.map((ann) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded", children: editingId === ann.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editData.title || "", onChange: (e) => setEditData({
        ...editData,
        title: e.target.value
      }), className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: editData.content || "", onChange: (e) => setEditData({
        ...editData,
        content: e.target.value
      }), rows: 3, className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleUpdate, className: "btn-primary py-2", children: "Speichern" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingId(null), className: "btn-ghost py-2", children: "Abbrechen" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 rounded text-xs font-medium ${ann.type === "info" ? "bg-blue-900/20 text-blue-300" : ann.type === "warning" ? "bg-yellow-900/20 text-yellow-300" : "bg-green-900/20 text-green-300"}`, children: ann.type }),
          !ann.published && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-mist", children: "Entwurf" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: ann.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-mist mt-1", children: [
          ann.content.substring(0, 80),
          "..."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setEditingId(ann.id);
          setEditData(ann);
        }, className: "px-3 py-2 text-sm bg-electric/20 text-electric rounded hover:bg-electric/30 transition-colors", children: "✎" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(ann.id), className: "px-3 py-2 text-sm bg-red-900/20 text-red-300 rounded hover:bg-red-900/40 transition-colors", children: "✕" })
      ] })
    ] }) }, ann.id)) })
  ] });
}
export {
  AnnouncementsManagement as component
};
