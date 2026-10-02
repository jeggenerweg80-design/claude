import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSections, updateSection, CmsSection } from "../../lib/admin";

export const Route = createFileRoute("/admin/sections")({
  component: SectionsManagement,
});

function SectionsManagement() {
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<CmsSection>>({});

  useEffect(() => {
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

  const handleEdit = (section: CmsSection) => {
    setEditingId(section.id);
    setEditData({ title: section.title, content: section.content, published: section.published });
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
    return <div className="text-mist">Wird geladen...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/20 border border-red-500/30 rounded text-red-300">
        {error === "Zugriff verweigert" ? "Du hast keine Berechtigung" : error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-frost mb-2">Seiten & Sektionen</h1>
        <p className="text-mist">Bearbeite die Inhalte deiner Website-Seiten</p>
      </div>

      {/* Sections List */}
      {sections.length === 0 ? (
        <div className="p-6 bg-ink/50 border border-electric/10 rounded text-center">
          <p className="text-mist">Keine Seiten gefunden</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="p-6 bg-ink/50 border border-electric/10 rounded">
              {editingId === section.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-frost mb-2">Titel</label>
                    <input
                      type="text"
                      value={editData.title || ""}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-frost mb-2">Inhalt</label>
                    <textarea
                      value={editData.content || ""}
                      onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={editData.published || false}
                      onChange={(e) => setEditData({ ...editData, published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="published" className="text-sm text-frost">
                      Veröffentlicht
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={handleSave} className="btn-primary py-2">
                      Speichern
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditData({});
                      }}
                      className="btn-ghost py-2"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-frost">{section.title}</h3>
                    <p className="text-sm text-mist mt-1">
                      {section.content.substring(0, 100)}
                      {section.content.length > 100 ? "..." : ""}
                    </p>
                    <p className="text-xs text-mist/50 mt-2">
                      {section.published ? "✓ Veröffentlicht" : "⚫ Entwurf"} · Bearbeitet von {section.updatedBy}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEdit(section)}
                    className="ml-4 px-4 py-2 text-sm bg-electric/20 text-electric rounded hover:bg-electric/30 transition-colors"
                  >
                    Bearbeiten
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
