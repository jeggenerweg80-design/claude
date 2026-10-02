// Cookie consent management
// Syncs with backend API (/api/consent)
// Falls back to localStorage for offline/anonymous users
// Blocks non-essential scripts until consent given

export type CookieCategory = "necessary" | "analytics" | "marketing";

export interface CookiePreferences {
  necessary: boolean; // Always true, required for site function
  analytics: boolean; // Google Analytics, heatmaps, etc.
  marketing: boolean; // Remarketing, ads, behavioral tracking
  timestamp: number; // When preference was set
  version: number; // Consent config version
  source: "backend" | "localStorage"; // Where preference came from
}

export interface CookieConsent {
  preferences: CookiePreferences;
  consentGiven: boolean;
}

export interface ConsentResponse {
  preferences: CookiePreferences;
  version: number;
  authenticated: boolean;
}

const COOKIE_CONSENT_KEY = "heidsec_cookie_consent";
const CONSENT_VERSION = 1; // Increment when consent form changes
const API_TIMEOUT = 3000; // 3 second timeout for consent API

// Get stored preferences from localStorage (client cache/fallback)
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

// Load consent from backend with fallback to localStorage
export async function loadConsentFromBackend(): Promise<CookiePreferences | null> {
  if (typeof window === "undefined") return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch("/api/consent", {
      method: "GET",
      headers: { "Accept": "application/json" },
      credentials: "include", // Include auth cookies if logged in
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = (await response.json()) as ConsentResponse;
      const prefs = {
        ...data.preferences,
        version: data.version,
        source: "backend" as const,
      };
      // Cache in localStorage as fallback
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
      return prefs;
    }
  } catch (error) {
    // API timeout or network error - fall back to localStorage
    console.debug("Consent API unavailable, using localStorage fallback");
  }

  // Fallback to localStorage cache
  const cached = getStoredPreferences();
  if (cached) {
    cached.source = "localStorage";
  }
  return cached;
}

// Save preferences to backend and localStorage
export async function savePreferences(preferences: CookiePreferences): Promise<boolean> {
  if (typeof window === "undefined") return false;

  preferences.timestamp = Date.now();
  preferences.version = CONSENT_VERSION;

  // Always save to localStorage as fallback
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));

  // Try to sync with backend
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include auth cookies if logged in
      body: JSON.stringify({
        necessary: preferences.necessary,
        analytics: preferences.analytics,
        marketing: preferences.marketing,
        version: CONSENT_VERSION,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn("Failed to sync consent to backend");
    }
  } catch (error) {
    // Network error - preferences still saved locally
    console.debug("Could not sync consent to backend, using localStorage");
  }

  // Trigger consent change event for scripts to listen to
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: preferences })
  );

  return true;
}

// Accept all cookies
export async function acceptAllCookies(): Promise<void> {
  const prefs: CookiePreferences = {
    necessary: true,
    analytics: true,
    marketing: true,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
    source: "localStorage",
  };
  await savePreferences(prefs);
}

// Accept only necessary
export async function acceptNecessaryOnly(): Promise<void> {
  const prefs: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
    source: "localStorage",
  };
  await savePreferences(prefs);
}

// Check if banner should be shown
// Banner shows until user makes an explicit choice (not just dismissed)
export async function shouldShowBanner(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  // Try to load from backend first
  const prefs = await loadConsentFromBackend();

  // Banner only hides if user has made explicit choice (preferences exist)
  return !prefs;
}

// Reset consent (for testing or user request)
export function resetConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(new CustomEvent("cookie-consent-reset"));
}

// Check if a category is allowed
export function isConsentGiven(category: CookieCategory): boolean {
  const prefs = getStoredPreferences();
  if (!prefs) return category === "necessary"; // Necessary is implicit
  return prefs[category];
}

// Get current consent version
export function getConsentVersion(): number {
  return CONSENT_VERSION;
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
