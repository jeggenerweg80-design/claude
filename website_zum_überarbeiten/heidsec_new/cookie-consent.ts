// Cookie consent management
// Stores user preferences in localStorage
// Blocks non-essential scripts until consent given

export type CookieCategory = "necessary" | "analytics" | "marketing";

export interface CookiePreferences {
  necessary: boolean; // Always true, required for site function
  analytics: boolean; // Google Analytics, heatmaps, etc.
  marketing: boolean; // Remarketing, ads, behavioral tracking
  timestamp: number; // When preference was set
}

export interface CookieConsent {
  preferences: CookiePreferences;
  consentGiven: boolean;
}

const COOKIE_CONSENT_KEY = "heidsec_cookie_consent";
const COOKIE_BANNER_DISMISSED_KEY = "heidsec_cookie_banner_dismissed";

// Get stored preferences or return defaults
export function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as CookiePreferences;
    } catch {
      return null;
    }
  }
  return null;
}

// Save preferences to localStorage
export function savePreferences(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  preferences.timestamp = Date.now();
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
  localStorage.setItem(COOKIE_BANNER_DISMISSED_KEY, "true");

  // Trigger consent change event for scripts to listen to
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: preferences })
  );
}

// Accept all cookies
export function acceptAllCookies(): void {
  savePreferences({
    necessary: true,
    analytics: true,
    marketing: true,
    timestamp: Date.now(),
  });
}

// Accept only necessary
export function acceptNecessaryOnly(): void {
  savePreferences({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
  });
}

// Check if banner should be shown
export function shouldShowBanner(): boolean {
  if (typeof window === "undefined") return false;
  const dismissed = localStorage.getItem(COOKIE_BANNER_DISMISSED_KEY);
  return !dismissed;
}

// Reset consent (for testing or user request)
export function resetConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  localStorage.removeItem(COOKIE_BANNER_DISMISSED_KEY);
  window.dispatchEvent(new CustomEvent("cookie-consent-reset"));
}

// Check if a category is allowed
export function isConsentGiven(category: CookieCategory): boolean {
  const prefs = getStoredPreferences();
  if (!prefs) return category === "necessary"; // Necessary is implicit
  return prefs[category];
}

// Load analytics scripts only if consent given
export function loadAnalyticsIfConsented(): void {
  if (!isConsentGiven("analytics")) return;

  // Example: Google Analytics
  // This would be called by a utility function or inline script
  // gtag("consent", "update", { analytics_storage: "granted" });
}

// Load marketing scripts only if consent given
export function loadMarketingIfConsented(): void {
  if (!isConsentGiven("marketing")) return;

  // Example: Facebook Pixel, Google Ads, etc.
  // Would be called dynamically
}

// Cookie category descriptions
export const COOKIE_CATEGORIES = {
  necessary: {
    name: "Notwendig",
    description: "Erforderlich für die Grundfunktionen der Website",
    examples: ["Session-Verwaltung", "Sicherheit", "Spracheinstellungen"],
    always: true, // Can't be disabled
  },
  analytics: {
    name: "Analyse",
    description: "Hilft uns zu verstehen, wie Besucher die Website nutzen",
    examples: ["Google Analytics", "Seiten-Aufrufe", "Verweildauer"],
    always: false,
  },
  marketing: {
    name: "Marketing",
    description: "Verwendet für gezielte Werbung und Remarketing",
    examples: ["Werbepixel", "Besucherverfolgung", "Zielgruppen-Segmentierung"],
    always: false,
  },
};
