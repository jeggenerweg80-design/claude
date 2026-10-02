import { useEffect, useState } from "react";
import {
  acceptAllCookies,
  acceptNecessaryOnly,
  shouldShowBanner,
  loadConsentFromBackend,
  COOKIE_CATEGORIES,
  getStoredPreferences,
} from "../lib/cookie-consent";
import { CookiePreferences } from "../lib/cookie-consent";

interface CookieBannerProps {
  onPreferencesOpen?: () => void;
}

export function CookieBanner({ onPreferencesOpen }: CookieBannerProps) {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load consent status on mount
  useEffect(() => {
    const initializeBanner = async () => {
      const shouldShow = await shouldShowBanner();
      setShow(shouldShow);
      setLoading(false);
    };
    initializeBanner();
  }, []);

  if (loading) return null;
  if (!show) return null;

  const handleAcceptAll = async () => {
    await acceptAllCookies();
    setShow(false);
  };

  const handleAcceptNecessary = async () => {
    await acceptNecessaryOnly();
    setShow(false);
  };

  const handlePreferences = () => {
    setShowDetails(true);
    onPreferencesOpen?.();
  };

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-7xl px-5 py-4 md:px-8 md:py-6">
        <div className="rounded-lg bg-ink/95 border border-electric/20 backdrop-blur-sm shadow-2xl p-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-frost mb-2">
                Cookie-Einstellungen
              </h3>
              <p className="text-sm text-mist leading-relaxed">
                Wir verwenden Cookies für wesentliche Funktionen, Analytik und Marketing. Du kannst diese Auswahl jederzeit anpassen.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={handlePreferences}
              className="px-4 py-2 text-sm font-medium text-electric border border-electric/30 rounded hover:bg-electric/5 transition-colors"
            >
              Einstellungen
            </button>
            <button
              onClick={handleAcceptNecessary}
              className="px-4 py-2 text-sm font-medium text-mist bg-ink/50 border border-electric/10 rounded hover:bg-ink/70 transition-colors"
            >
              Nur notwendig
            </button>
            <button
              onClick={handleAcceptAll}
              className="btn-primary px-4 py-2 text-sm"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Dialog */}
      {showDetails && (
        <CookiePreferencesDialog
          onClose={() => setShowDetails(false)}
          onBannerClose={() => setShow(false)}
        />
      )}
    </>
  );
}

interface CookiePreferencesDialogProps {
  onClose: () => void;
  onBannerClose: () => void;
}

function CookiePreferencesDialog({
  onClose,
  onBannerClose,
}: CookiePreferencesDialogProps) {
  const { savePreferences } = require("../lib/cookie-consent");
  const [saving, setSaving] = useState(false);

  // Initialize with existing preferences or defaults
  const existingPrefs = getStoredPreferences();
  const [preferences, setPreferences] = useState<CookiePreferences>(
    existingPrefs || {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: 1,
      source: "localStorage",
    }
  );

  const handleSave = async () => {
    setSaving(true);
    await savePreferences(preferences);
    setSaving(false);
    onClose();
    onBannerClose();
  };

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: 1,
      source: "localStorage",
    });
  };

  const handleAcceptNecessary = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: 1,
      source: "localStorage",
    });
  };

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === "necessary") return; // Can't toggle necessary
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-45 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 bg-graphite border border-electric/20 rounded-lg shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-graphite border-b border-electric/10 px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-frost">
            Cookie-Einstellungen
          </h2>
          <button
            onClick={onClose}
            className="text-mist hover:text-frost transition-colors text-2xl leading-none"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-6 space-y-6">
          <p className="text-sm text-mist leading-relaxed">
            Wähle die Cookie-Kategorien, die auf dieser Website verwendet werden dürfen. Du kannst deine Auswahl jederzeit ändern.
          </p>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAcceptNecessary}
              className="flex-1 px-3 py-2 text-sm font-medium text-mist bg-ink/50 border border-electric/10 rounded hover:bg-ink/70 transition-colors"
            >
              Nur notwendig
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 btn-primary px-3 py-2 text-sm"
            >
              Alle akzeptieren
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {(["necessary", "analytics", "marketing"] as const).map((cat) => (
              <div
                key={cat}
                className="p-4 bg-ink/30 border border-electric/10 rounded"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-frost">
                        {COOKIE_CATEGORIES[cat].name}
                      </h3>
                      {COOKIE_CATEGORIES[cat].always && (
                        <span className="text-xs text-electric bg-electric/10 px-2 py-1 rounded">
                          Erforderlich
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-mist mb-3">
                      {COOKIE_CATEGORIES[cat].description}
                    </p>
                    <div className="text-xs text-mist/70">
                      <p className="font-medium mb-1">Beispiele:</p>
                      <ul className="list-inside space-y-1">
                        {COOKIE_CATEGORIES[cat].examples.map((ex) => (
                          <li key={ex}>• {ex}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <label className="ml-4 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences[cat]}
                      onChange={() =>
                        toggleCategory(
                          cat as keyof Omit<CookiePreferences, "timestamp">
                        )
                      }
                      disabled={cat === "necessary"}
                      className="w-5 h-5 accent-electric cursor-pointer disabled:opacity-50"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-graphite border-t border-electric/10 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 px-4 py-2 text-sm font-medium text-mist border border-electric/10 rounded hover:bg-ink/50 transition-colors disabled:opacity-50"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 btn-primary px-4 py-2 text-sm disabled:opacity-50"
          >
            {saving ? "Wird gespeichert..." : "Einstellungen speichern"}
          </button>
        </div>
      </div>
    </>
  );
}
