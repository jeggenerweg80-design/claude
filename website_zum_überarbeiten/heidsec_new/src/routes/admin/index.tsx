import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-bold text-frost mb-2">Dashboard</h1>
        <p className="text-mist">Verwalte Inhalte der HeidSec Website</p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Seiten"
          description="Bearbeite Website-Sektionen"
          href="/admin/sections"
          icon="📄"
        />
        <DashboardCard
          title="FAQ"
          description="Verwalte häufig gestellte Fragen"
          href="/admin/faqs"
          icon="❓"
        />
        <DashboardCard
          title="Ankündigungen"
          description="Erstelle Nachrichten und Banner"
          href="/admin/announcements"
          icon="📢"
        />
        <DashboardCard
          title="Rechtstexte"
          description="Privacy, Terms, Imprint"
          href="/admin/legal"
          icon="⚖️"
        />
        <DashboardCard
          title="Medien"
          description="Verwaltete Bilder und Videos"
          href="/admin/media"
          icon="🎨"
        />
        <DashboardCard
          title="Einstellungen"
          description="Allgemeine Konfiguration"
          href="/admin/settings"
          icon="⚙️"
        />
      </div>

      {/* Info Section */}
      <div className="p-6 bg-electric/5 border border-electric/20 rounded">
        <h2 className="font-display text-lg font-semibold text-frost mb-2">Willkommen im Admin-Bereich</h2>
        <p className="text-mist text-sm">
          Hier kannst du alle öffentlichen Inhalte der HeidSec-Website verwalten. Alle Änderungen werden sofort
          veröffentlicht, sofern nicht anders markiert.
        </p>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="p-6 bg-ink/50 border border-electric/10 rounded hover:border-electric/30 hover:bg-electric/5 transition-colors group"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-frost group-hover:text-electric transition-colors">
        {title}
      </h3>
      <p className="text-sm text-mist mt-1">{description}</p>
    </a>
  );
}
