import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/media")({
  component: MediaManagement,
});

function MediaManagement() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-frost mb-2">Medien</h1>
        <p className="text-mist">Verwaltete Bilder und Videos</p>
      </div>

      <div className="p-6 bg-ink/50 border border-electric/10 rounded text-center">
        <p className="text-mist">Medienbibliothek wird in Kürze verfügbar sein</p>
      </div>
    </div>
  );
}
