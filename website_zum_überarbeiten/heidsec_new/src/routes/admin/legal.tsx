import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLegalText, updateLegalText } from "../../lib/admin";

export const Route = createFileRoute("/admin/legal")({
  component: LegalManagement,
});

function LegalManagement() {
  const [type, setType] = useState<"privacy" | "terms" | "imprint">("privacy");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLegal(type);
  }, [type]);

  const loadLegal = async (legalType: "privacy" | "terms" | "imprint") => {
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
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  if (loading) {
    return <div className="text-mist">Wird geladen...</div>;
  }

  if (error && error !== "Zugriff verweigert") {
    return (
      <div className="p-6 bg-red-900/20 border border-red-500/30 rounded text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-frost mb-2">Rechtstexte</h1>
        <p className="text-mist">Verwalte Datenschutz, AGB und Impressum</p>
      </div>

      {/* Type Selector */}
      <div className="flex gap-2">
        {(["privacy", "terms", "imprint"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              type === t
                ? "bg-electric/20 text-electric"
                : "bg-ink/50 border border-electric/10 text-mist hover:text-frost"
            }`}
          >
            {t === "privacy" ? "Datenschutz" : t === "terms" ? "AGB" : "Impressum"}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="space-y-4">
        {error === "Zugriff verweigert" && (
          <div className="p-6 bg-red-900/20 border border-red-500/30 rounded text-red-300">
            Du hast keine Berechtigung
          </div>
        )}

        {success && (
          <div className="p-6 bg-green-900/20 border border-green-500/30 rounded text-green-300">
            ✓ Gespeichert
          </div>
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full px-4 py-3 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
          disabled={error === "Zugriff verweigert"}
        />

        <button
          onClick={handleSave}
          disabled={saving || error === "Zugriff verweigert"}
          className="btn-primary py-2 disabled:opacity-50"
        >
          {saving ? "Wird gespeichert..." : "Speichern"}
        </button>
      </div>
    </div>
  );
}
