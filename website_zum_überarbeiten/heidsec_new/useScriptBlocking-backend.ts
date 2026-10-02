// Script blocking utility for cookie consent
// Prevents non-essential scripts from loading until consent given
// Can be used for Google Analytics, Facebook Pixel, etc.

import { useEffect } from "react";
import { getStoredPreferences, isConsentGiven } from "./cookie-consent";

export type ScriptType = "analytics" | "marketing";

interface BlockedScript {
  type: ScriptType;
  id: string;
  src?: string;
  inline?: string;
  element?: HTMLScriptElement;
}

const blockedScripts: BlockedScript[] = [];

// Register a script to be blocked until consent given
export function registerBlockedScript(
  type: ScriptType,
  id: string,
  src: string
): void {
  blockedScripts.push({ type, id, src });
}

// Register inline script content to be blocked
export function registerBlockedInlineScript(
  type: ScriptType,
  id: string,
  content: string
): void {
  blockedScripts.push({ type, id, inline: content });
}

// Load all previously blocked scripts for a category
export function loadBlockedScripts(category: ScriptType): void {
  blockedScripts
    .filter((script) => script.type === category)
    .forEach((script) => {
      if (script.src) {
        loadExternalScript(script.id, script.src);
      } else if (script.inline) {
        loadInlineScript(script.id, script.inline);
      }
    });
}

// Load external script dynamically
function loadExternalScript(id: string, src: string): void {
  if (document.getElementById(id)) return; // Already loaded

  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

// Load inline script dynamically
function loadInlineScript(id: string, content: string): void {
  if (document.getElementById(id)) return; // Already executed

  const script = document.createElement("script");
  script.id = id;
  script.textContent = content;
  document.head.appendChild(script);
}

// Hook: Listen for consent changes and load scripts when needed
export function useScriptBlockingListener(): void {
  useEffect(() => {
    const initializeScripts = async () => {
      // Try to load from backend first, fallback to localStorage
      const { loadConsentFromBackend } = await import("./cookie-consent");
      const prefs = await loadConsentFromBackend();

      if (prefs) {
        // Only load scripts if consent explicitly given for each category
        if (prefs.analytics) loadBlockedScripts("analytics");
        if (prefs.marketing) loadBlockedScripts("marketing");
      }
    };

    initializeScripts();

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      const prefs = event.detail;
      // Strictly follow user selection, not defaults
      if (prefs.analytics) loadBlockedScripts("analytics");
      if (prefs.marketing) loadBlockedScripts("marketing");
    };

    window.addEventListener("cookie-consent-changed", handleConsentChange as EventListener);
    return () => {
      window.removeEventListener("cookie-consent-changed", handleConsentChange as EventListener);
    };
  }, []);
}

// Check if external scripts should be deferred
export function shouldDeferScript(type: ScriptType): boolean {
  return !isConsentGiven(type);
}
