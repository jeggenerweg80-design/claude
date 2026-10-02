import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { logoutUser, bootstrapSession, clearAccessToken } from "../lib/auth";
import { getAccountData, changePassword } from "../lib/account";

export const Route = createFileRoute("/mein-konto")({
  component: AccountPortal,
});

function AccountPortal() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [accountData, setAccountData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "subscriptions" | "downloads" | "support">(
    "overview"
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Bootstrap session first
    const sessionResult = await bootstrapSession();

    if (!sessionResult.authenticated || !sessionResult.user) {
      navigate({ to: "/login", search: { redirect: "/mein-konto" } });
      return;
    }

    setUser(sessionResult.user);

    // Load account data
    const accountResult = await getAccountData();
    if (accountResult.data) {
      setAccountData(accountResult.data);
    } else if (accountResult.unauthorized) {
      // 401 after refresh failed
      clearAccessToken();
      navigate({ to: "/login", search: { redirect: "/mein-konto" } });
      return;
    } else {
      setError(accountResult.error || "Failed to load account data");
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate({ to: "/" });
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-ink flex items-center justify-center">
        <div className="text-mist">Wird geladen...</div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-ink">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-electric/10 bg-ink/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/assets/logo-monogram.svg" alt="HeidSec" className="h-7 w-7" />
            <span className="font-display text-lg font-semibold tracking-[0.22em] text-frost hidden sm:inline">
              HEIDSEC
            </span>
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-mist hover:text-frost transition-colors"
          >
            Abmelden
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-frost mb-2">
            Willkommen, {user?.name || user?.email}
          </h1>
          <p className="text-mist">Verwalte dein HeidSec-Konto und Abonnements</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-electric/10 flex gap-1 overflow-x-auto">
          {[
            { id: "overview", label: "Übersicht" },
            { id: "profile", label: "Profil" },
            { id: "subscriptions", label: "Abos" },
            { id: "downloads", label: "Downloads" },
            { id: "support", label: "Support" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-electric text-frost"
                  : "border-transparent text-mist hover:text-frost"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab accountData={accountData} />}
        {activeTab === "profile" && <ProfileTab user={user} onUpdate={loadData} />}
        {activeTab === "subscriptions" && <SubscriptionsTab accountData={accountData} />}
        {activeTab === "downloads" && <DownloadsTab />}
        {activeTab === "support" && <SupportTab />}
      </main>
    </div>
  );
}

function OverviewTab({ accountData }: { accountData: any }) {
  const subscriptions = accountData?.subscriptions || [];
  const activeSubscription = subscriptions.find((s: any) => s.status === "active");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Current Plan */}
      <div className="p-6 bg-electric/5 border border-electric/20 rounded">
        <h3 className="font-display text-lg font-semibold text-frost mb-4">Aktueller Plan</h3>
        {activeSubscription ? (
          <div>
            <p className="text-4xl font-bold text-electric mb-2">
              {activeSubscription.product.toUpperCase()}
            </p>
            <p className="text-mist mb-4">
              {activeSubscription.price > 0
                ? `€${activeSubscription.price}/Monat`
                : "Kostenlos"}
            </p>
            {activeSubscription.renewalDate && (
              <p className="text-sm text-mist">
                Nächste Abrechnung: {new Date(activeSubscription.renewalDate).toLocaleDateString("de-DE")}
              </p>
            )}
          </div>
        ) : (
          <p className="text-mist">Kein aktives Abo</p>
        )}
      </div>

      {/* Account Info */}
      <div className="p-6 bg-frost/5 border border-frost/10 rounded">
        <h3 className="font-display text-lg font-semibold text-frost mb-4">Konto</h3>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-mist">E-Mail</dt>
            <dd className="text-frost font-medium">{accountData?.user?.email}</dd>
          </div>
          <div>
            <dt className="text-mist">Status</dt>
            <dd className="text-frost">
              {accountData?.user?.verified ? "✓ Bestätigt" : "⚠ Nicht bestätigt"}
            </dd>
          </div>
          <div>
            <dt className="text-mist">Konto erstellt</dt>
            <dd className="text-frost">
              {new Date(accountData?.user?.createdAt).toLocaleDateString("de-DE")}
            </dd>
          </div>
          <div>
            <dt className="text-mist">Lizenzen aktiv</dt>
            <dd className="text-frost font-medium">{accountData?.licenses?.length || 0}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ProfileTab({ user, onUpdate }: { user: any; onUpdate: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setPasswordMessage("");

    if (newPassword !== newPasswordConfirm) {
      setPasswordMessage("Passwörter stimmen nicht überein");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }

    setLoading(true);
    const result = await changePassword(currentPassword, newPassword);
    setLoading(false);

    if (result.success) {
      setPasswordMessage("Passwort erfolgreich geändert");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      setTimeout(() => setPasswordMessage(""), 3000);
    } else if (result.unauthorized) {
      setPasswordMessage("Session abgelaufen. Bitte melden Sie sich erneut an.");
      setTimeout(() => onUpdate(), 3000);
    } else {
      setPasswordMessage(result.error || "Fehler beim Ändern des Passworts");
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="p-6 bg-ink/50 border border-electric/10 rounded space-y-5">
        <h3 className="font-display text-lg font-semibold text-frost">Profileinformationen</h3>

        <div>
          <label className="block text-sm font-medium text-frost mb-2">Name</label>
          <input
            type="text"
            value={user?.name || ""}
            disabled
            className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-mist cursor-not-allowed opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-frost mb-2">E-Mail</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-mist cursor-not-allowed opacity-50"
          />
        </div>

        <p className="text-sm text-mist">Profile-Bearbeitung wird in Kürze verfügbar sein</p>
      </div>

      <form onSubmit={handleChangePassword} className="p-6 bg-ink/50 border border-electric/10 rounded space-y-5">
        <h3 className="font-display text-lg font-semibold text-frost">Passwort ändern</h3>

        {passwordMessage && (
          <div
            className={`p-3 rounded text-sm ${
              passwordMessage.includes("erfolgreich")
                ? "bg-green-900/20 border border-green-500/30 text-green-300"
                : "bg-red-900/20 border border-red-500/30 text-red-300"
            }`}
          >
            {passwordMessage}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-frost mb-2">Aktuelles Passwort</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-frost mb-2">Neues Passwort</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-frost mb-2">Passwort wiederholen</label>
          <input
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            className="w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary py-2" disabled={loading}>
          {loading ? "Wird geändert..." : "Passwort ändern"}
        </button>
      </form>
    </div>
  );
}

function SubscriptionsTab({ accountData }: { accountData: any }) {
  const subscriptions = accountData?.subscriptions || [];

  return (
    <div className="space-y-4">
      {subscriptions.length > 0 ? (
        subscriptions.map((sub: any) => (
          <div
            key={sub.id}
            className={`p-6 border rounded ${
              sub.status === "active"
                ? "bg-electric/5 border-electric/20"
                : "bg-mist/5 border-mist/20"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-frost">
                  {sub.product.toUpperCase()}
                </h3>
                <p className="text-sm text-mist mt-1">
                  Status: <span className="capitalize">{sub.status}</span>
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded text-xs font-medium ${
                  sub.status === "active"
                    ? "bg-electric/20 text-electric"
                    : "bg-mist/20 text-mist"
                }`}
              >
                {sub.status === "active" ? "Aktiv" : "Inaktiv"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-mist">Preis</dt>
                <dd className="text-frost font-medium">
                  €{sub.price}
                  {sub.price > 0 ? "/Monat" : ""}
                </dd>
              </div>
              {sub.renewalDate && (
                <div>
                  <dt className="text-mist">Nächste Abrechnung</dt>
                  <dd className="text-frost">
                    {new Date(sub.renewalDate).toLocaleDateString("de-DE")}
                  </dd>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-6 bg-ink/50 border border-electric/10 rounded text-center">
          <p className="text-mist">Keine aktiven Abos</p>
          <a href="/#suite" className="btn-primary mt-4 inline-block">
            Upgrade durchführen
          </a>
        </div>
      )}
    </div>
  );
}

function DownloadsTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { name: "HeidSec Suite", version: "1.0.0", platform: "Android" },
          { name: "HeidSec SecApp", version: "2.1.3", platform: "Android" },
          { name: "HeidSec MailGuard", version: "1.5.0", platform: "Android" },
          { name: "HeidSec Vault", version: "1.2.1", platform: "Android" },
        ].map((app) => (
          <div key={app.name} className="p-4 bg-ink/50 border border-electric/10 rounded">
            <h4 className="font-medium text-frost mb-1">{app.name}</h4>
            <p className="text-xs text-mist mb-3">
              v{app.version} • {app.platform}
            </p>
            <a href="#" className="text-electric text-sm hover:text-electric/80 transition-colors">
              Download →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-ink/50 border border-electric/10 rounded">
          <h3 className="font-display text-lg font-semibold text-frost mb-3">Häufig gestellte Fragen</h3>
          <p className="text-mist text-sm mb-4">
            Antworten zu Produkten, Abos und Kontoverwaltung.
          </p>
          <a href="#" className="text-electric text-sm hover:text-electric/80 transition-colors">
            FAQ ansehen →
          </a>
        </div>

        <div className="p-6 bg-ink/50 border border-electric/10 rounded">
          <h3 className="font-display text-lg font-semibold text-frost mb-3">Kontakt</h3>
          <p className="text-mist text-sm mb-4">
            Schreib uns an, wenn du Fragen oder Probleme hast.
          </p>
          <a href="mailto:support@heidsec.de" className="text-electric text-sm hover:text-electric/80 transition-colors">
            support@heidsec.de →
          </a>
        </div>
      </div>
    </div>
  );
}
