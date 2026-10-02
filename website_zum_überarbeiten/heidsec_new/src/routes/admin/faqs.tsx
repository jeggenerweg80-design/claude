import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getFaqs, updateFaq, CmsFaq } from "../../lib/admin";

export const Route = createFileRoute("/admin/faqs")({
  component: FaqManagement,
});

function FaqManagement() {
  const [faqs, setFaqs] = useState<CmsFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<CmsFaq>>({});

  useEffect(() => {
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

  const handleEdit = (faq: CmsFaq) => {
    setEditingId(faq.id);
    setEditData({
      question: faq.question,
      answer: faq.answer,
      published: faq.published,
      category: faq.category,
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
        <h1 className="font-display text-3xl font-bold text-frost mb-2">FAQ</h1>
        <p className="text-mist">Verwalte häufig gestellte Fragen</p>
      </div>

      {/* FAQs List */}
      {faqs.length === 0 ? (
        <div className="p-6 bg-ink/50 border border-electric/10 rounded text-center">
          <p className="text-mist">Keine FAQs gefunden</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-6 bg-ink/50 border border-electric/10 rounded">
              {editingId === faq.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-frost mb-2">Frage</label>
                    <input
                      type="text"
                      value={editData.question || ""}
                      onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                      className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-frost mb-2">Antwort</label>
                    <textarea
                      value={editData.answer || ""}
                      onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-frost mb-2">Kategorie</label>
                      <input
                        type="text"
                        value={editData.category || ""}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
                      />
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
                    <h3 className="font-display text-lg font-semibold text-frost">{faq.question}</h3>
                    <p className="text-sm text-mist mt-1">
                      {faq.answer.substring(0, 80)}
                      {faq.answer.length > 80 ? "..." : ""}
                    </p>
                    <p className="text-xs text-mist/50 mt-2">
                      {faq.published ? "✓" : "⚫"} {faq.category}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEdit(faq)}
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
