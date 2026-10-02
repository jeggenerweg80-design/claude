import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, CmsAnnouncement } from "../../lib/admin";

export const Route = createFileRoute("/admin/announcements")({
  component: AnnouncementsManagement,
});

function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState<CmsAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<CmsAnnouncement>>({});
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
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
      type: (editData.type || "info") as any,
      published: editData.published || false,
      position: announcements.length,
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

  const handleDelete = async (id: string) => {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-frost mb-2">Ankündigungen</h1>
          <p className="text-mist">Erstelle Nachrichten und Banner</p>
        </div>
        <button
          onClick={() => {
            setShowNew(!showNew);
            setEditData({});
            setEditingId(null);
          }}
          className="btn-primary py-2"
        >
          {showNew ? "Abbrechen" : "Neue Ankündigung"}
        </button>
      </div>

      {/* New Announcement Form */}
      {showNew && (
        <div className="p-6 bg-ink/50 border border-electric/10 rounded space-y-4">
          <h3 className="font-display text-lg font-semibold text-frost">Neue Ankündigung</h3>

          <div>
            <label className="block text-sm font-medium text-frost mb-2">Titel</label>
            <input
              type="text"
              value={editData.title || ""}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
              placeholder="z.B. Wartungsmitteilung"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-frost mb-2">Inhalt</label>
            <textarea
              value={editData.content || ""}
              onChange={(e) => setEditData({ ...editData, content: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
              placeholder="Ankündigungstext..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-frost mb-2">Typ</label>
              <select
                value={editData.type || "info"}
                onChange={(e) => setEditData({ ...editData, type: e.target.value as any })}
                className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
              >
                <option value="info">Info</option>
                <option value="warning">Warnung</option>
                <option value="success">Erfolg</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editData.published || false}
                  onChange={(e) => setEditData({ ...editData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-frost">Veröffentlicht</span>
              </label>
            </div>
          </div>

          <button onClick={handleCreate} className="btn-primary py-2">
            Erstellen
          </button>
        </div>
      )}

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <div className="p-6 bg-ink/50 border border-electric/10 rounded text-center">
          <p className="text-mist">Keine Ankündigungen</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div key={ann.id} className="p-6 bg-ink/50 border border-electric/10 rounded">
              {editingId === ann.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.title || ""}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
                  />
                  <textarea
                    value={editData.content || ""}
                    onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
                  />
                  <div className="flex gap-3">
                    <button onClick={handleUpdate} className="btn-primary py-2">
                      Speichern
                    </button>
                    <button onClick={() => setEditingId(null)} className="btn-ghost py-2">
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        ann.type === "info" ? "bg-blue-900/20 text-blue-300" :
                        ann.type === "warning" ? "bg-yellow-900/20 text-yellow-300" :
                        "bg-green-900/20 text-green-300"
                      }`}>
                        {ann.type}
                      </span>
                      {!ann.published && <span className="text-xs text-mist">Entwurf</span>}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-frost">{ann.title}</h3>
                    <p className="text-sm text-mist mt-1">{ann.content.substring(0, 80)}...</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditingId(ann.id);
                        setEditData(ann);
                      }}
                      className="px-3 py-2 text-sm bg-electric/20 text-electric rounded hover:bg-electric/30 transition-colors"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDelete(ann.id)}
                      className="px-3 py-2 text-sm bg-red-900/20 text-red-300 rounded hover:bg-red-900/40 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
