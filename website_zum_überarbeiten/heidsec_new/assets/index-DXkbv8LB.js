import { N as reactExports, U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import { u as useNavigate, L as Link } from "./router-lSCE4rBE.js";
import { b as bootstrapSession, l as logoutUser } from "./auth-DKM4MRJi.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
async function getCmsPublicFaqs() {
  try {
    const response = await fetch("/api/cms/faqs", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5e3)
    });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return (data.faqs || []).filter((f) => f.published).sort((a, b) => a.position - b.position);
  } catch {
    return [];
  }
}
async function getCmsPublicAnnouncements() {
  try {
    const response = await fetch("/api/cms/announcements", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5e3)
    });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    const now = /* @__PURE__ */ new Date();
    return (data.announcements || []).filter((a) => {
      if (!a.published) return false;
      if (a.expiresAt && new Date(a.expiresAt) < now) return false;
      return true;
    }).sort((a, b) => a.position - b.position);
  } catch {
    return [];
  }
}
const COOKIE_CONSENT_KEY = "heidsec_cookie_consent";
const CONSENT_VERSION = 1;
const API_TIMEOUT = 3e3;
function getStoredPreferences() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}
async function loadConsentFromBackend() {
  if (typeof window === "undefined") return null;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    const response = await fetch("/api/consent", {
      method: "GET",
      headers: { "Accept": "application/json" },
      credentials: "include",
      // Include auth cookies if logged in
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      if (!data.preferences) {
        return null;
      }
      const prefs = {
        ...data.preferences,
        version: data.version,
        source: "backend"
      };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
      return prefs;
    }
  } catch (error) {
    console.debug("Consent API unavailable, using localStorage fallback");
  }
  const cached = getStoredPreferences();
  if (cached) {
    cached.source = "localStorage";
  }
  return cached;
}
async function savePreferences(preferences) {
  if (typeof window === "undefined") return false;
  preferences.timestamp = Date.now();
  preferences.version = CONSENT_VERSION;
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    const response = await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      // Include auth cookies if logged in
      body: JSON.stringify({
        necessary: preferences.necessary,
        analytics: preferences.analytics,
        marketing: preferences.marketing,
        version: CONSENT_VERSION
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      console.warn("Failed to sync consent to backend");
    }
  } catch (error) {
    console.debug("Could not sync consent to backend, using localStorage");
  }
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: preferences })
  );
  return true;
}
async function acceptAllCookies() {
  const prefs = {
    necessary: true,
    analytics: true,
    marketing: true,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
    source: "localStorage"
  };
  await savePreferences(prefs);
}
async function acceptNecessaryOnly() {
  const prefs = {
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
    source: "localStorage"
  };
  await savePreferences(prefs);
}
async function shouldShowBanner() {
  if (typeof window === "undefined") return false;
  const prefs = await loadConsentFromBackend();
  return !prefs;
}
const COOKIE_CATEGORIES = {
  necessary: {
    name: "Notwendig",
    description: "Erforderlich für die Grundfunktionen der Website",
    examples: ["Session-Verwaltung", "Sicherheit", "Spracheinstellungen"],
    always: true
    // Can't be disabled
  },
  analytics: {
    name: "Analyse",
    description: "Hilft uns zu verstehen, wie Besucher die Website nutzen",
    examples: ["Google Analytics", "Seiten-Aufrufe", "Verweildauer"],
    always: false
  },
  marketing: {
    name: "Marketing",
    description: "Verwendet für gezielte Werbung und Remarketing",
    examples: ["Werbepixel", "Besucherverfolgung", "Zielgruppen-Segmentierung"],
    always: false
  }
};
const cookieConsent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  COOKIE_CATEGORIES,
  acceptAllCookies,
  acceptNecessaryOnly,
  getStoredPreferences,
  loadConsentFromBackend,
  savePreferences,
  shouldShowBanner
}, Symbol.toStringTag, { value: "Module" }));
function CookieBanner({ onPreferencesOpen }) {
  const [show, setShow] = reactExports.useState(false);
  const [showDetails, setShowDetails] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-7xl px-5 py-4 md:px-8 md:py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-ink/95 border border-electric/20 backdrop-blur-sm shadow-2xl p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 md:flex-row md:items-start md:justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-frost mb-2", children: "Cookie-Einstellungen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist leading-relaxed", children: "Wir verwenden Cookies für wesentliche Funktionen, Analytik und Marketing. Du kannst diese Auswahl jederzeit anpassen." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handlePreferences,
            className: "px-4 py-2 text-sm font-medium text-electric border border-electric/30 rounded hover:bg-electric/5 transition-colors",
            children: "Einstellungen"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleAcceptNecessary,
            className: "px-4 py-2 text-sm font-medium text-mist bg-ink/50 border border-electric/10 rounded hover:bg-ink/70 transition-colors",
            children: "Nur notwendig"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleAcceptAll,
            className: "btn-primary px-4 py-2 text-sm",
            children: "Alle akzeptieren"
          }
        )
      ] })
    ] }) }),
    showDetails && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CookiePreferencesDialog,
      {
        onClose: () => setShowDetails(false),
        onBannerClose: () => setShow(false)
      }
    )
  ] });
}
function CookiePreferencesDialog({
  onClose,
  onBannerClose
}) {
  const { savePreferences: savePreferences2 } = require("../lib/cookie-consent");
  const [saving, setSaving] = reactExports.useState(false);
  const existingPrefs = getStoredPreferences();
  const [preferences, setPreferences] = reactExports.useState(
    existingPrefs || {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: 1,
      source: "localStorage"
    }
  );
  const handleSave = async () => {
    setSaving(true);
    await savePreferences2(preferences);
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
      source: "localStorage"
    });
  };
  const handleAcceptNecessary = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: 1,
      source: "localStorage"
    });
  };
  const toggleCategory = (category) => {
    if (category === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-45 bg-ink/70 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 bg-graphite border border-electric/20 rounded-lg shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-graphite border-b border-electric/10 px-6 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-frost", children: "Cookie-Einstellungen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "text-mist hover:text-frost transition-colors text-2xl leading-none",
            "aria-label": "Schließen",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-6 py-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist leading-relaxed", children: "Wähle die Cookie-Kategorien, die auf dieser Website verwendet werden dürfen. Du kannst deine Auswahl jederzeit ändern." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleAcceptNecessary,
              className: "flex-1 px-3 py-2 text-sm font-medium text-mist bg-ink/50 border border-electric/10 rounded hover:bg-ink/70 transition-colors",
              children: "Nur notwendig"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleAcceptAll,
              className: "flex-1 btn-primary px-3 py-2 text-sm",
              children: "Alle akzeptieren"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["necessary", "analytics", "marketing"].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-4 bg-ink/30 border border-electric/10 rounded",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-frost", children: COOKIE_CATEGORIES[cat].name }),
                  COOKIE_CATEGORIES[cat].always && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-electric bg-electric/10 px-2 py-1 rounded", children: "Erforderlich" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist mb-3", children: COOKIE_CATEGORIES[cat].description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-mist/70", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Beispiele:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-inside space-y-1", children: COOKIE_CATEGORIES[cat].examples.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                    "• ",
                    ex
                  ] }, ex)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-4 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: preferences[cat],
                  onChange: () => toggleCategory(
                    cat
                  ),
                  disabled: cat === "necessary",
                  className: "w-5 h-5 accent-electric cursor-pointer disabled:opacity-50"
                }
              ) })
            ] })
          },
          cat
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 bg-graphite border-t border-electric/10 px-6 py-4 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            disabled: saving,
            className: "flex-1 px-4 py-2 text-sm font-medium text-mist border border-electric/10 rounded hover:bg-ink/50 transition-colors disabled:opacity-50",
            children: "Abbrechen"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSave,
            disabled: saving,
            className: "flex-1 btn-primary px-4 py-2 text-sm disabled:opacity-50",
            children: saving ? "Wird gespeichert..." : "Einstellungen speichern"
          }
        )
      ] })
    ] })
  ] });
}
const blockedScripts = [];
function loadBlockedScripts(category) {
  blockedScripts.filter((script) => script.type === category).forEach((script) => {
    if (script.src) {
      loadExternalScript(script.id, script.src);
    } else if (script.inline) {
      loadInlineScript(script.id, script.inline);
    }
  });
}
function loadExternalScript(id, src) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}
function loadInlineScript(id, content) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.textContent = content;
  document.head.appendChild(script);
}
function useScriptBlockingListener() {
  reactExports.useEffect(() => {
    const initializeScripts = async () => {
      const { loadConsentFromBackend: loadConsentFromBackend2 } = await Promise.resolve().then(() => cookieConsent);
      const prefs = await loadConsentFromBackend2();
      if (prefs) {
        if (prefs.analytics) loadBlockedScripts("analytics");
        if (prefs.marketing) loadBlockedScripts("marketing");
      }
    };
    initializeScripts();
    const handleConsentChange = (event) => {
      const prefs = event.detail;
      if (prefs.analytics) loadBlockedScripts("analytics");
      if (prefs.marketing) loadBlockedScripts("marketing");
    };
    window.addEventListener("cookie-consent-changed", handleConsentChange);
    return () => {
      window.removeEventListener("cookie-consent-changed", handleConsentChange);
    };
  }, []);
}
const API_BASE = "";
const CHAT_API_ENDPOINT = `${API_BASE}/api/chat`;
const CHAT_TIMEOUT = 6e4;
const CONVERSATION_ID_KEY = "heidsec_chat_conversation_id";
function getStoredConversationId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONVERSATION_ID_KEY);
}
function saveConversationId(id) {
  if (typeof window === "undefined" || !id) return;
  localStorage.setItem(CONVERSATION_ID_KEY, id);
}
function clearConversation() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONVERSATION_ID_KEY);
}
class ConversationNotFoundError extends Error {
  constructor() {
    super("Unterhaltung nicht gefunden. Starten Sie einen neuen Chat.");
    this.name = "ConversationNotFoundError";
  }
}
async function sendChatMessage(message, conversationId, onChunk, signal) {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty");
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT);
  const mergedSignal = signal || controller.signal;
  try {
    try {
      return await attemptChat(trimmed, conversationId, onChunk, mergedSignal);
    } catch (error) {
      if (error instanceof ConversationNotFoundError) {
        clearConversation();
        return await attemptChat(trimmed, void 0, onChunk, mergedSignal);
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request cancelled");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
async function attemptChat(trimmed, conversationId, onChunk, signal) {
  const storedId = getStoredConversationId();
  const id = conversationId || storedId || void 0;
  const request = id ? { conversationId: id, message: trimmed } : { message: trimmed };
  if (onChunk) {
    try {
      return await sendViaSSE(request, onChunk, signal);
    } catch (sseError) {
      if (sseError instanceof Error && sseError.name === "AbortError") {
        throw sseError;
      }
      if (sseError instanceof ConversationNotFoundError) {
        throw sseError;
      }
      return await sendViaJSON(request, onChunk, signal);
    }
  }
  return await sendViaJSON(request, void 0, signal);
}
async function sendViaSSE(request, onChunk, signal) {
  const response = await fetch(CHAT_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    },
    body: JSON.stringify(request),
    signal
  });
  handleHttpErrors(response);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/event-stream") || !response.body) {
    throw new Error("SSE not available");
  }
  return await handleSSEStream(response, onChunk, request.conversationId);
}
async function sendViaJSON(request, onChunk, signal) {
  const response = await fetch(CHAT_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(request),
    signal
  });
  handleHttpErrors(response);
  const data = await response.json();
  const content = data.reply || data.message || data.response || data.text || data.content || "";
  if (!content) {
    throw new Error("No message in response");
  }
  saveConversationId(data.conversationId || request.conversationId);
  onChunk?.(content);
  return {
    conversationId: data.conversationId || request.conversationId || "",
    content,
    done: true
  };
}
function handleHttpErrors(response) {
  if (response.status === 429) {
    throw new Error("Zu viele Anfragen. Bitte warten Sie einen Moment.");
  }
  if (response.status === 404) {
    throw new ConversationNotFoundError();
  }
  if (response.status === 403) {
    throw new Error("Zugriff verweigert. Bitte versuchen Sie es später erneut.");
  }
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
}
async function handleSSEStream(response, onChunk, conversationId) {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response body for streaming");
  }
  const decoder = new TextDecoder();
  let buffer = "";
  let assistantContent = "";
  let isDone = false;
  let finalConversationId = conversationId || "";
  const processLine = (line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith(":")) return;
    if (!trimmedLine.startsWith("data: ")) return;
    const data = trimmedLine.slice(6);
    if (data === "[DONE]") {
      isDone = true;
      return;
    }
    try {
      const parsed = JSON.parse(data);
      if (parsed.conversationId) {
        finalConversationId = parsed.conversationId;
      }
      const chunk = parsed.text ?? parsed.token ?? parsed.content;
      if (chunk && typeof chunk === "string") {
        assistantContent += chunk;
        onChunk(chunk);
      }
      if (parsed.type === "done" || parsed.done || parsed.finished) {
        isDone = true;
      }
    } catch {
    }
  };
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      for (let i = 0; i < lines.length - 1; i++) {
        processLine(lines[i]);
      }
      buffer = lines[lines.length - 1];
      if (isDone) break;
    }
    if (buffer) {
      processLine(buffer);
    }
  } finally {
    reader.releaseLock();
  }
  if (!assistantContent) {
    throw new Error("No response received from streaming");
  }
  saveConversationId(finalConversationId);
  return { conversationId: finalConversationId, content: assistantContent, done: true };
}
function ChatWidget() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isStreaming, setIsStreaming] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const abortControllerRef = reactExports.useRef(null);
  const isMobileRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  reactExports.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setError(null);
    const userMsg = {
      role: "user",
      content: userMessage,
      timestamp: Date.now()
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setIsStreaming(true);
    let assistantContent = "";
    try {
      abortControllerRef.current = new AbortController();
      const conversationId = getStoredConversationId() || void 0;
      const response = await sendChatMessage(
        userMessage,
        conversationId,
        (chunk) => {
          assistantContent += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            if (updated[updated.length - 1]?.role === "assistant") {
              updated[updated.length - 1].content = assistantContent;
            } else {
              updated.push({
                role: "assistant",
                content: assistantContent,
                timestamp: Date.now()
              });
            }
            return updated;
          });
        },
        abortControllerRef.current.signal
      );
      if (assistantContent) {
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.role === "assistant") {
            updated[updated.length - 1].content = assistantContent;
          } else {
            updated.push({
              role: "assistant",
              content: assistantContent,
              timestamp: Date.now()
            });
          }
          return updated;
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ein Fehler ist aufgetreten.";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${errorMessage}`,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
    setIsStreaming(false);
  };
  const handleNewChat = () => {
    clearConversation();
    setMessages([]);
    setError(null);
    setInput("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric to-electric/80 text-frost shadow-lg hover:shadow-xl hover:shadow-electric/50 transition-all active:scale-95 md:bottom-8 md:right-8",
        "aria-label": "Chat öffnen",
        title: "HeidSec AI Chat",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "h-6 w-6",
            fill: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChatPanel,
      {
        messages,
        input,
        isLoading,
        isStreaming,
        error,
        onInput: setInput,
        onSend: handleSendMessage,
        onStop: handleStopStreaming,
        onNewChat: handleNewChat,
        onClose: () => setIsOpen(false),
        onKeyDown: handleKeyDown,
        messagesEndRef,
        isMobile: isMobileRef.current
      }
    )
  ] });
}
function ChatPanel({
  messages,
  input,
  isLoading,
  isStreaming,
  error,
  onInput,
  onSend,
  onStop,
  onNewChat,
  onClose,
  onKeyDown,
  messagesEndRef,
  isMobile
}) {
  const panelClasses = isMobile ? "fixed inset-0 bottom-0 z-40 flex flex-col bg-ink md:hidden" : "fixed bottom-24 right-6 z-40 w-96 h-[600px] flex flex-col bg-ink rounded-lg border border-electric/20 shadow-2xl hidden md:flex";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-35 bg-ink/50 md:hidden",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: panelClasses, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-electric/10 bg-gradient-to-r from-ink to-ink/95 px-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-frost", children: "HeidSec AI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onNewChat,
              className: "text-xs text-mist hover:text-frost transition-colors",
              title: "Neuer Chat",
              children: "✕ Neu"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onClose,
              className: "text-2xl leading-none text-mist hover:text-frost transition-colors",
              "aria-label": "Schließen",
              children: "×"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto space-y-4 p-4", children: messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-frost", children: "Willkommen bei HeidSec AI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist leading-relaxed", children: "Stelle Fragen zu Sicherheit, Datenschutz oder HeidSec Produkten." })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        messages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChatMessage, { message: msg }, idx)),
        isLoading && !isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-electric/10 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-20 rounded bg-electric/20 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-32 rounded bg-electric/20 animate-pulse" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }) }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mb-3 p-3 rounded bg-red-900/20 border border-red-500/30 text-red-300 text-sm", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onSend, className: "border-t border-electric/10 bg-ink/50 p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: input,
              onChange: (e) => onInput(e.target.value),
              onKeyDown,
              placeholder: "Nachricht eingeben... (Shift+Enter = Zeilenumbruch)",
              rows: 2,
              disabled: isLoading,
              className: "flex-1 bg-ink/50 border border-electric/20 rounded px-3 py-2 text-sm text-frost placeholder:text-mist/50 focus:outline-none focus:border-electric/50 transition-colors disabled:opacity-50 resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: isStreaming ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onStop,
              className: "h-10 w-10 flex items-center justify-center rounded bg-red-900/20 border border-red-500/30 text-red-300 hover:bg-red-900/30 transition-colors text-sm font-medium",
              title: "Stoppen",
              children: "⏹"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: !input.trim() || isLoading,
              className: "h-10 w-10 flex items-center justify-center rounded bg-electric/20 text-electric hover:bg-electric/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm",
              title: "Senden",
              children: "→"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist/50", children: isStreaming ? "⏳ Antwortet..." : "Bereit" })
      ] })
    ] })
  ] });
}
function ChatMessage({ message }) {
  const isUser = message.role === "user";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${isUser ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `max-w-xs rounded-lg px-4 py-2 text-sm ${isUser ? "bg-electric/20 text-frost" : "bg-ink/50 border border-electric/10 text-mist"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words", children: message.content })
    }
  ) });
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
function useScrollReveal() {
  reactExports.useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px"
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function useVideoManager(reduced) {
  reactExports.useEffect(() => {
    const videos = Array.from(document.querySelectorAll("video[data-autopause]"));
    if (reduced) {
      videos.forEach((v) => v.pause());
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const v = entry.target;
        if (entry.isIntersecting) {
          void v.play().catch(() => void 0);
        } else {
          v.pause();
        }
      }
    }, {
      threshold: 0.15
    });
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [reduced]);
}
function useLazyVideoLoader() {
  reactExports.useEffect(() => {
    const lazyVideos = Array.from(document.querySelectorAll("video[data-lazy-load]"));
    if (!("IntersectionObserver" in window)) {
      lazyVideos.forEach((v) => v.dataset.loaded === "true" || (v.dataset.loaded = "true"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const v = entry.target;
        if (entry.isIntersecting && v.dataset.loaded !== "true") {
          v.dataset.loaded = "true";
          void v.load();
          void v.play().catch(() => void 0);
          io.unobserve(v);
        }
      }
    }, {
      rootMargin: "200px 0px",
      threshold: 0
    });
    lazyVideos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);
}
function Loader({
  onDone,
  reduced
}) {
  const [fading, setFading] = reactExports.useState(false);
  const finished = reactExports.useRef(false);
  const videoRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => void 0);
    }
  }, [reduced]);
  reactExports.useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setFading(true);
      window.setTimeout(onDone, 750);
    };
    const video = videoRef.current;
    video?.addEventListener("ended", finish);
    const safety = window.setTimeout(finish, 6500);
    const skip = () => finish();
    window.addEventListener("pointerdown", skip, {
      once: true
    });
    return () => {
      video?.removeEventListener("ended", finish);
      window.clearTimeout(safety);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone, reduced]);
  if (reduced) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `loader-overlay ${fading ? "is-fading" : ""}`, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, className: "h-full w-full object-cover", src: "/assets/video-loader.mp4", poster: "/assets/support-seam-macro.webp", autoPlay: true, muted: true, playsInline: true, preload: "auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow absolute bottom-10 left-1/2 -translate-x-1/2 opacity-70", children: "HeidSec wird initialisiert" })
  ] });
}
const NAV_ITEMS = [{
  href: "#core",
  label: "Core"
}, {
  href: "#secapp",
  label: "SecApp"
}, {
  href: "#mailguard",
  label: "MailGuard"
}, {
  href: "#vault",
  label: "Vault"
}, {
  href: "#vpn",
  label: "VPN"
}, {
  href: "#suite",
  label: "Suite"
}];
function Nav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [authUser, setAuthUser] = reactExports.useState(null);
  const [authChecked, setAuthChecked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    let cancelled = false;
    bootstrapSession().then((result) => {
      if (cancelled) return;
      setAuthUser(result.authenticated && result.user ? result.user : null);
      setAuthChecked(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const handleLogout = async () => {
    await logoutUser();
    setAuthUser(null);
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-electric/15 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec Logo", className: "h-7 w-7" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline font-display text-lg font-semibold tracking-[0.22em] text-frost", children: "HEIDSEC" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-7 lg:flex", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.href, className: "text-sm font-medium text-mist transition-colors hover:text-electric", children: item.label }, item.href)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:gap-4", children: [
      authChecked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 sm:gap-4", children: authUser ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "text-sm font-medium text-mist transition-colors hover:text-electric", children: "Mein Konto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "text-sm font-medium text-mist transition-colors hover:text-electric", children: "Abmelden" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.assign("/api/auth/web/login?provider=google"), className: "text-sm font-medium text-electric bg-electric/10 border border-electric rounded px-3 py-1 hover:bg-electric/20 transition-colors", "aria-label": "Mit Google anmelden", children: "Google" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.assign("/api/auth/web/login?provider=microsoft"), className: "text-sm font-medium text-electric bg-indigo/10 border border-indigo/20 rounded px-3 py-1 hover:bg-indigo/20 transition-colors", "aria-label": "Mit Microsoft anmelden", children: "Microsoft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-sm font-medium text-mist transition-colors hover:text-electric", children: "Anmelden" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "text-sm font-medium text-mist transition-colors hover:text-electric", children: "Konto erstellen" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#suite", className: "btn-primary header-cta px-5! py-2! text-sm", children: "Suite sichern" })
    ] })
  ] }) });
}
function Hero() {
  const videoRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const play = () => video.play().catch(() => void 0);
    play();
    video.addEventListener("loadedmetadata", play);
    return () => video.removeEventListener("loadedmetadata", play);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "top", className: "relative flex min-h-svh items-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, "data-autopause": true, className: "absolute inset-0 h-full w-full object-cover", src: "/assets/video-hero.mp4", poster: "/assets/hero-still.webp", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow reveal", style: {
        "--reveal-delay": "0ms"
      }, children: "HeidSec Security Suite" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "reveal mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.04] tracking-tight text-frost md:text-7xl", style: {
        "--reveal-delay": "120ms"
      }, children: [
        "Sicherheit ist",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-electric text-glow", children: "kein Zufall." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "reveal mt-7 max-w-xl text-lg leading-relaxed text-mist", style: {
        "--reveal-delay": "240ms"
      }, children: "HeidSec bündelt SecApp, MailGuard, Vault und VPN in einer Plattform — entwickelt für Menschen, die ihre Daten nicht dem Zufall überlassen." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal mt-10 flex flex-wrap items-center gap-4", style: {
        "--reveal-delay": "360ms"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#suite", className: "btn-primary", children: "Suite entdecken" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#core", className: "btn-ghost", children: "Produkte ansehen" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-1/2 z-10 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-[3px] animate-scroll-hint rounded-full bg-electric/80" }) })
  ] });
}
function CoreSection() {
  const videoRef = reactExports.useRef(null);
  const points = [{
    title: "Eine Engine",
    text: "HeidSec Core bewertet jede Bedrohung zentral — einmal erkannt, überall abgewehrt."
  }, {
    title: "Vier Schutzschichten",
    text: "Gerät, Posteingang, Ablage und Verbindung arbeiten als ein System zusammen."
  }, {
    title: "Null Lärm",
    text: "Keine Alarmflut, keine Fachchinesisch. Nur klare Entscheidungen, wenn sie zählen."
  }];
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const play = () => video.play().catch(() => void 0);
    play();
    video.addEventListener("loadedmetadata", play);
    return () => video.removeEventListener("loadedmetadata", play);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "core", className: "relative mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-10 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow reveal", children: "HeidSec Core" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "reveal mt-5 font-display text-4xl font-bold tracking-tight text-frost md:text-5xl", children: [
        "Eine Engine.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Vier Schutzschichten."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "reveal mt-6 max-w-lg text-lg leading-relaxed text-mist", children: "Im Zentrum von HeidSec arbeitet eine Analyse-Engine, die jedes Signal einmal bewertet und die Erkenntnis sofort in alle Produkte speist — vom Smartphone bis zum verschlüsselten Tunnel." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-6", children: points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal flex gap-4", style: {
        "--reveal-delay": `${i * 110}ms`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-8 w-[3px] shrink-0 animate-seam-pulse rounded-full bg-electric" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 leading-relaxed text-mist", children: p.text })
        ] })
      ] }, p.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reveal video-frame", children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, "data-autopause": true, "data-lazy-load": true, className: "aspect-video w-full object-cover", src: "/assets/video-core.mp4", poster: "/assets/plate-core.webp", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "none" }) })
  ] }) });
}
const PRODUCTS = [{
  id: "secapp",
  eyebrow: "SecApp",
  title: "Dein Sicherheitszentrum in der Tasche.",
  text: "SecApp scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich, bevor aus einem Klick ein Problem wird.",
  bullets: ["Echtzeit-Scan aller Apps", "Sofortige Warnung bei Auffälligkeiten", "Status auf einen Blick"],
  video: "/assets/video-secapp.mp4",
  poster: "/assets/plate-secapp.webp",
  cutout: "/assets/cutout-secapp-phone.png",
  cutoutAlt: "SecApp Smartphone",
  reverse: false
}, {
  id: "mailguard",
  eyebrow: "MailGuard",
  title: "Dein Posteingang, befreit.",
  text: "MailGuard hält Phishing, Betrug und schädliche Anhänge fern — bevor sie deinen Posteingang erreichen. Verdächtiges landet lautlos in Quarantäne.",
  bullets: ["Erkennung von Phishing und Betrug", "Lautlose Quarantäne", "Schutz für alle deine Postfächer"],
  video: "/assets/video-mailguard.mp4",
  poster: "/assets/plate-mailguard.webp",
  reverse: true
}, {
  id: "vault",
  eyebrow: "Vault",
  title: "Dein Tresor. Nur deiner.",
  text: "Vault legt Dokumente, Zugänge und Geheimnisse in einen verschlüsselten Raum, zu dem nur du den Schlüssel hältst — auf all deinen Geräten.",
  bullets: ["Verschlüsselte Ablage", "Zugriff nur mit deinem Schlüssel", "Synchron über alle Geräte"],
  video: "/assets/video-vault.mp4",
  poster: "/assets/plate-vault.webp",
  cutout: "/assets/cutout-vault-core.png",
  cutoutAlt: "Vault Kernmechanik",
  reverse: false
}, {
  id: "vpn",
  eyebrow: "VPN",
  title: "Dein verschlüsselter Tunnel.",
  text: "HeidSec VPN kapselt deine Verbindung und macht deinen Standort unsichtbar — im Hotel-WLAN genauso wie zu Hause.",
  bullets: ["Gekapselte Verbindung", "Standort bleibt privat", "Ein Klick — überall geschützt"],
  video: "/assets/video-vpn.mp4",
  poster: "/assets/plate-vpn.webp",
  reverse: true
}];
function ProductSection({
  product
}) {
  const videoRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const play = () => video.play().catch(() => void 0);
    play();
    video.addEventListener("loadedmetadata", play);
    return () => video.removeEventListener("loadedmetadata", play);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: product.id, className: "relative mx-auto max-w-7xl scroll-mt-24 px-5 py-16 md:px-8 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid items-center gap-8 lg:grid-cols-2 ${product.reverse ? "lg:[&>*:first-child]:order-2" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "video-frame", children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, "data-autopause": true, "data-lazy-load": true, className: "aspect-video w-full object-cover", src: product.video, poster: product.poster, autoPlay: true, muted: true, loop: true, playsInline: true, preload: "none" }) }),
      product.cutout && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.cutout, alt: product.cutoutAlt ?? "", loading: "lazy", className: "pointer-events-none absolute -bottom-10 -right-4 w-36 drop-shadow-[0_24px_50px_rgba(46,155,255,0.35)] md:-right-8 md:w-48" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow reveal", children: product.eyebrow }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "reveal mt-5 font-display text-4xl font-bold tracking-tight text-frost md:text-5xl", children: product.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "reveal mt-6 max-w-lg text-lg leading-relaxed text-mist", children: product.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3", children: product.bullets.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "reveal flex items-center gap-3 text-frost/90", style: {
        "--reveal-delay": `${i * 90}ms`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[3px] w-6 rounded-full bg-electric shadow-[0_0_12px_rgba(46,155,255,0.7)]" }),
        b
      ] }, b)) })
    ] })
  ] }) });
}
function SuiteSection() {
  const videoRef = reactExports.useRef(null);
  const cards = [{
    img: "/assets/support-phone-detail.webp",
    name: "SecApp",
    href: "#secapp",
    line: "Mobile Schutzschicht"
  }, {
    img: "/assets/support-tunnel-particles.webp",
    name: "MailGuard",
    href: "#mailguard",
    line: "Posteingang unter Kontrolle"
  }, {
    img: "/assets/support-vault-detail.webp",
    name: "Vault",
    href: "#vault",
    line: "Verschlüsselter Raum"
  }, {
    img: "/assets/support-seam-macro.webp",
    name: "VPN",
    href: "#vpn",
    line: "Privater Tunnel"
  }];
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const play = () => video.play().catch(() => void 0);
    play();
    video.addEventListener("loadedmetadata", play);
    return () => video.removeEventListener("loadedmetadata", play);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "suite", className: "relative scroll-mt-24 overflow-hidden py-20 md:py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, "data-autopause": true, "data-lazy-load": true, className: "absolute inset-0 h-full w-full object-cover opacity-45", src: "/assets/video-suite.mp4", poster: "/assets/plate-suite.webp", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-5 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow reveal", children: "HeidSec Suite Ultimate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "reveal mt-5 font-display text-4xl font-bold tracking-tight text-frost md:text-5xl", children: "Alles. In einem Abo." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "reveal mt-6 text-lg leading-relaxed text-mist", children: "Vier Produkte, ein Konto, alle deine Geräte. Die Suite Ultimate verbindet SecApp, MailGuard, Vault und VPN zur vollständigen Schutzschicht — ohne Konfiguration, ohne Lücken." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: cards.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: c.href, className: "card reveal group block overflow-hidden", style: {
        "--reveal-delay": `${i * 100}ms`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: c.name, loading: "lazy", className: "aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-mist", children: c.line })
        ] })
      ] }, c.name)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reveal mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#cta", className: "btn-primary", children: "Suite Ultimate sichern" }) })
    ] })
  ] });
}
function CtaSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "cta", className: "relative scroll-mt-24 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/plate-cta.webp", alt: "", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-ink/55" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center md:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow reveal", children: "Bereit, wenn du es bist" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "reveal mt-6 font-display text-4xl font-bold tracking-tight text-frost md:text-6xl", children: [
        "Mach Sicherheit",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "zur ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-electric text-glow", children: "Gewohnheit." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "reveal mt-6 max-w-xl text-lg leading-relaxed text-mist", children: "Starte heute mit der HeidSec Suite Ultimate und decke Gerät, Posteingang, Ablage und Verbindung mit einer einzigen Entscheidung ab." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reveal mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#top", className: "btn-primary px-9! py-4! text-base", children: "Jetzt Suite sichern" }) })
    ] })
  ] });
}
function AnnouncementsBanner({
  announcements
}) {
  if (!announcements.length) return null;
  const ann = announcements[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `sticky top-0 z-30 px-5 py-3 text-center text-sm font-medium ${ann.type === "warning" ? "bg-yellow-900/20 text-yellow-300" : ann.type === "success" ? "bg-green-900/20 text-green-300" : "bg-blue-900/20 text-blue-300"}`, children: [
    ann.title,
    ": ",
    ann.content
  ] });
}
function FaqSection({
  faqs
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "faq", className: "relative mx-auto max-w-4xl px-5 py-20 md:px-8 scroll-mt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-frost mb-8", children: "Häufig gestellte Fragen" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: faqs.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "p-4 bg-ink/50 border border-electric/10 rounded", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer font-medium text-frost", children: faq.question }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-mist text-sm", children: faq.answer })
    ] }, faq.id)) })
  ] });
}
const FAQ_DATA = [{
  id: "1",
  question: "Ist HeidSec kostenlos?",
  answer: "Ja, die Basisversion ist kostenlos. Pro und KI bieten zusätzliche Features.",
  published: true,
  position: 0,
  category: "General"
}, {
  id: "2",
  question: "Welche Geräte werden unterstützt?",
  answer: "HeidSec funktioniert auf Android-Geräten ab Version 8.0.",
  published: true,
  position: 1,
  category: "Support"
}];
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/plate-footer.webp", alt: "", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-ink/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-between gap-10 md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec Logo", className: "h-8 w-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-[0.22em] text-frost", children: "HEIDSEC" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-wrap items-center gap-x-7 gap-y-3", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.href, className: "text-sm text-mist transition-colors hover:text-electric", children: item.label }, item.href)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "hairline mt-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col items-start justify-between gap-3 text-sm text-mist/70 md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2026 HeidSec. Alle Rechte vorbehalten." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "hover:text-frost transition-colors", children: "Anmelden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mein-konto", className: "hover:text-frost transition-colors", children: "Mein Konto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/kuendigen", className: "hover:text-frost transition-colors", children: "Verträge hier kündigen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/widerruf", className: "hover:text-frost transition-colors", children: "Widerruf (§ 356a)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/legal/impressum", className: "hover:text-frost transition-colors", children: "Impressum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/legal/datenschutz", className: "hover:text-frost transition-colors", children: "Datenschutz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/legal/agb", className: "hover:text-frost transition-colors", children: "AGB" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/support", className: "hover:text-frost transition-colors", children: "Support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            const {
              resetConsent
            } = require("../lib/cookie-consent");
            resetConsent();
            window.location.reload();
          }, className: "hover:text-frost transition-colors", children: "Cookie-Einstellungen" })
        ] })
      ] })
    ] })
  ] });
}
function Index() {
  const reduced = usePrefersReducedMotion();
  const [loaderDone, setLoaderDone] = reactExports.useState(false);
  const [announcements, setAnnouncements] = reactExports.useState([]);
  const [faqs, setFaqs] = reactExports.useState([]);
  const [showCookiePrefs, setShowCookiePrefs] = reactExports.useState(false);
  useScrollReveal();
  useVideoManager(reduced);
  useLazyVideoLoader();
  useScriptBlockingListener();
  reactExports.useEffect(() => {
    Promise.all([getCmsPublicAnnouncements(), getCmsPublicFaqs()]).then(([ann, faq]) => {
      setAnnouncements(ann);
      setFaqs(faq);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    !loaderDone && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { onDone: () => setLoaderDone(true), reduced }),
    announcements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementsBanner, { announcements }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CookieBanner, { onPreferencesOpen: () => setShowCookiePrefs(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CoreSection, {}),
      PRODUCTS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSection, { product: p }, p.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SuiteSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CtaSection, {})
    ] }),
    faqs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaqSection, { faqs }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaqSection, { faqs: FAQ_DATA }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChatWidget, {})
  ] });
}
export {
  Index as component
};
