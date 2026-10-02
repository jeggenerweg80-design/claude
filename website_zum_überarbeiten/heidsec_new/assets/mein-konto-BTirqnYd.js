import { N as reactExports, U as jsxRuntimeExports } from "./server-BP7qKV95.js";
import { u as useNavigate, L as Link } from "./router-lSCE4rBE.js";
import { g as getAccessToken, r as refreshAccessToken, A as API_BASE, b as bootstrapSession, l as logoutUser, d as changePassword } from "./auth-DKM4MRJi.js";
import { a as getDeviceList, b as getDeviceTelemetry, u as unpairDevice, r as renameDevice, d as getDevicePairingCodes, e as createDevicePairingCode, f as revokePairingCode, p as pairDevice, h as getDeviceTelemetryEvents, g as getAccountData } from "./account-D6Qgmhwo.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const PRESENCE_ONLINE_MS = 18e4;
const PRESENCE_STALE_MS = 15 * 6e4;
const POLL_INTERVAL_MS = 3e4;
function derivePresence(lastSeenAt, now) {
  if (!lastSeenAt) return "unknown";
  const seen = Date.parse(lastSeenAt);
  if (Number.isNaN(seen)) return "unknown";
  const age = now - seen;
  if (age <= PRESENCE_ONLINE_MS) return "online";
  if (age <= PRESENCE_STALE_MS) return "stale";
  return "offline";
}
const PRESENCE_META = {
  online: { label: "Online", dot: "bg-green-400", text: "text-green-300", ring: "border-green-500/40" },
  stale: { label: "Veraltet", dot: "bg-yellow-400", text: "text-yellow-300", ring: "border-yellow-500/40" },
  offline: { label: "Offline", dot: "bg-red-500", text: "text-red-400", ring: "border-red-500/40" },
  unknown: { label: "Unbekannt", dot: "bg-mist", text: "text-mist", ring: "border-electric/20" }
};
function formatRelativeTime(iso, now) {
  if (!iso) return "nie";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "nie";
  const diff = Math.max(0, now - t);
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 1) return "gerade eben";
  if (minutes < 60) return `vor ${minutes} Min.`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `vor ${hours} Std.`;
  const days = Math.floor(hours / 24);
  return `vor ${days} Tagen`;
}
function formatDateTime(iso) {
  if (!iso) return "–";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "–";
  return d.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function deviceTypeLabel(type) {
  switch (type) {
    case "android":
      return "Android";
    case "ios":
      return "iOS";
    case "windows":
      return "Windows";
    case "macos":
      return "macOS";
    case "unknown":
      return "Unbekannt";
    default:
      return type || "Unbekannt";
  }
}
function planDisplayName(subscription) {
  return subscription?.planName || subscription?.plan_key || subscription?.plan || subscription?.code || "HeidSec Free";
}
const VPN_LABELS = {
  connected: "Verbunden",
  connecting: "Verbindet",
  disconnected: "Getrennt"
};
const MAILGUARD_LABELS = {
  active: "Aktiv",
  inactive: "Inaktiv",
  error: "Fehler"
};
const VAULT_LABELS = {
  locked: "Gesperrt",
  unlocked: "Entsperrt",
  unavailable: "Nicht verfügbar"
};
const INTEGRITY_LABELS = {
  trusted: "Vertrauenswürdig",
  elevated: "Erhöht",
  degraded: "Vermindert",
  untrusted: "Nicht vertrauenswürdig"
};
function buildSnapshotView(snapshot, overLimit) {
  if (!snapshot || overLimit) {
    return {
      hasSnapshot: !!snapshot && !overLimit,
      overLimit,
      protectionStatus: "unknown",
      protectionStatusLabel: "Unbekannt",
      appVersion: null,
      osVersion: null,
      platform: null,
      lastScanAt: null,
      findings: null,
      threatsBlocked24h: null,
      scansCompleted24h: null,
      quarantinedItems: null,
      updatesPending: null,
      vpnState: null,
      realtimeProtection: null,
      mailguardState: null,
      vaultState: null,
      deviceIntegrity: null,
      securityPatchAgeDays: null,
      networkClass: null,
      networkTrust: null
    };
  }
  const protection = snapshot.protection ?? {};
  const counters = snapshot.counters ?? {};
  const posture = snapshot.posture ?? {};
  const agent = snapshot.agent ?? {};
  const environment = snapshot.environment ?? {};
  const hasProtectionData = protection.realtimeProtectionEnabled !== void 0 || protection.vpnState !== void 0 || protection.mailguardState !== void 0 || posture.deviceIntegrity !== void 0;
  let protectionStatus = "unknown";
  if (hasProtectionData) {
    const degraded = protection.mailguardState === "error" || posture.deviceIntegrity === "untrusted" || posture.deviceIntegrity === "degraded";
    protectionStatus = degraded ? "attention" : "protected";
  }
  return {
    hasSnapshot: true,
    overLimit: false,
    protectionStatus,
    protectionStatusLabel: protectionStatus === "protected" ? "Geschützt" : protectionStatus === "attention" ? "Aufmerksamkeit nötig" : "Unbekannt",
    appVersion: agent.appVersion ?? null,
    osVersion: agent.osVersion ?? null,
    platform: agent.platform ?? null,
    lastScanAt: protection.lastScanAt ?? null,
    findings: counters.threatsBlocked24h ?? null,
    threatsBlocked24h: counters.threatsBlocked24h ?? null,
    scansCompleted24h: counters.scansCompleted24h ?? null,
    quarantinedItems: counters.quarantinedItems ?? null,
    updatesPending: counters.updatesPending ?? null,
    vpnState: protection.vpnState ?? null,
    realtimeProtection: protection.realtimeProtectionEnabled ?? null,
    mailguardState: protection.mailguardState ?? null,
    vaultState: protection.vaultState ?? null,
    deviceIntegrity: posture.deviceIntegrity ?? null,
    securityPatchAgeDays: posture.securityPatchAgeDays ?? null,
    networkClass: environment.networkClass ?? null,
    networkTrust: environment.networkTrust ?? null
  };
}
function vpnLabel(state) {
  return state ? VPN_LABELS[state] ?? state : "Unbekannt";
}
function mailguardLabel(state) {
  return state ? MAILGUARD_LABELS[state] ?? state : "Unbekannt";
}
function vaultLabel(state) {
  return state ? VAULT_LABELS[state] ?? state : "Unbekannt";
}
function integrityLabel(state) {
  return state ? INTEGRITY_LABELS[state] ?? state : "Unbekannt";
}
const EVENT_TYPE_LABELS = {
  "device.snapshot": "Status-Snapshot",
  "device.heartbeat": "Heartbeat",
  "device.presence_changed": "Präsenz geändert",
  "device.threat_blocked": "Bedrohung blockiert",
  "device.scan_completed": "Scan abgeschlossen",
  "device.protection_changed": "Schutzmodul geändert",
  "device.integrity_changed": "Geräte-Integrität geändert",
  "device.update_available": "Update verfügbar",
  "device.paired": "Gerät verbunden",
  "device.renamed": "Gerät umbenannt",
  "device.removed": "Gerät entfernt"
};
const SEVERITY_META = {
  info: { label: "Info", dot: "bg-electric", text: "text-mist" },
  warning: { label: "Warnung", dot: "bg-yellow-400", text: "text-yellow-300" },
  critical: { label: "Kritisch", dot: "bg-red-500", text: "text-red-400" }
};
const THREAT_CLASS_LABELS = {
  malware: "Schadsoftware",
  phishing: "Phishing",
  network: "Netzwerkangriff",
  tracker: "Tracker",
  unknown: "Unbekannt"
};
const ACTION_LABELS = {
  blocked: "blockiert",
  quarantined: "unter Quarantäne gestellt",
  reported: "gemeldet"
};
const SCAN_TYPE_LABELS = {
  quick: "Schnellscan",
  full: "Vollscan",
  ondemand: "On-Demand-Scan"
};
const CAPABILITY_LABELS = {
  vpn: "VPN",
  mailguard: "MailGuard",
  vault: "Vault",
  realtime: "Echtzeitschutz"
};
const COMPONENT_LABELS = {
  os: "Betriebssystem",
  app: "App"
};
function eventSummary(type, data) {
  if (!type) return "";
  const d = data ?? {};
  switch (type) {
    case "device.threat_blocked": {
      const cls = typeof d.threatClass === "string" ? THREAT_CLASS_LABELS[d.threatClass] ?? d.threatClass : "Bedrohung";
      const action = typeof d.actionTaken === "string" ? ACTION_LABELS[d.actionTaken] ?? d.actionTaken : "blockiert";
      const app = typeof d.sourceApp === "string" ? ` · ${d.sourceApp}` : "";
      return `${cls} ${action}${app}`;
    }
    case "device.scan_completed": {
      const scan = typeof d.scanType === "string" ? SCAN_TYPE_LABELS[d.scanType] ?? d.scanType : "Scan";
      const parts = [scan];
      if (typeof d.itemsScanned === "number") parts.push(`${d.itemsScanned} Elemente`);
      if (typeof d.findings === "number") parts.push(`${d.findings} Funde`);
      return parts.join(" · ");
    }
    case "device.protection_changed": {
      const cap = typeof d.capability === "string" ? CAPABILITY_LABELS[d.capability] ?? d.capability : "Schutzmodul";
      const from = typeof d.from === "string" ? d.from : null;
      const to = typeof d.to === "string" ? d.to : null;
      return from && to ? `${cap}: ${from} → ${to}` : cap;
    }
    case "device.integrity_changed": {
      const from = typeof d.from === "string" ? d.from : null;
      const to = typeof d.to === "string" ? d.to : null;
      return from && to ? `Integrität: ${from} → ${to}` : "Integritätsstatus geändert";
    }
    case "device.update_available": {
      const comp = typeof d.component === "string" ? COMPONENT_LABELS[d.component] ?? d.component : "Update";
      return `${comp}-Update verfügbar`;
    }
    case "device.presence_changed": {
      const from = typeof d.from === "string" ? d.from : null;
      const to = typeof d.to === "string" ? d.to : null;
      return from && to ? `${from} → ${to}` : "Präsenzstatus geändert";
    }
    default:
      return EVENT_TYPE_LABELS[type] ?? type;
  }
}
function eventTypeLabel(type) {
  if (!type) return "Ereignis";
  return EVENT_TYPE_LABELS[type] ?? type;
}
function sortEventsByReceivedAt(events) {
  return [...events].sort((a, b) => {
    const ta = a.receivedAt ? Date.parse(a.receivedAt) : a.occurredAt ? Date.parse(a.occurredAt) : NaN;
    const tb = b.receivedAt ? Date.parse(b.receivedAt) : b.occurredAt ? Date.parse(b.occurredAt) : NaN;
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;
    return tb - ta;
  });
}
class SseParser {
  buffer = "";
  currentId = "";
  currentEvent = "message";
  currentData = [];
  retry = 5e3;
  get retryMs() {
    return this.retry;
  }
  push(chunk) {
    this.buffer += chunk;
    const events = [];
    this.buffer = this.buffer.replace(/\r\n/g, "\n");
    let idx;
    while ((idx = this.buffer.indexOf("\n\n")) !== -1) {
      const frame = this.buffer.slice(0, idx);
      this.buffer = this.buffer.slice(idx + 2);
      const ev = this.dispatch(frame);
      if (ev) events.push(ev);
    }
    return events;
  }
  dispatch(frame) {
    if (!frame.trim()) return null;
    const lines = frame.split("\n");
    let dataLineCount = 0;
    let retrySeen = false;
    for (const raw of lines) {
      const line = raw.startsWith(":") ? "" : raw;
      if (!line) continue;
      const colon = line.indexOf(":");
      const field = colon === -1 ? line : line.slice(0, colon);
      const value = colon === -1 ? "" : line.slice(colon + 1).replace(/^ /, "");
      switch (field) {
        case "id":
          this.currentId = value;
          break;
        case "event":
          this.currentEvent = value || "message";
          break;
        case "data":
          this.currentData.push(value);
          dataLineCount++;
          break;
        case "retry": {
          const ms = parseInt(value, 10);
          if (!Number.isNaN(ms) && ms > 0) {
            this.retry = ms;
            retrySeen = true;
          }
          break;
        }
      }
    }
    if (dataLineCount === 0 && !retrySeen) {
      return null;
    }
    const event = {
      id: this.currentId || void 0,
      event: this.currentEvent,
      data: this.currentData.join("\n")
    };
    this.currentId = "";
    this.currentEvent = "message";
    this.currentData = [];
    try {
      event.data = JSON.parse(event.data);
    } catch {
    }
    return event;
  }
}
class DeviceLiveFeed {
  opts;
  fetchImpl;
  now;
  pollIntervalMs;
  reconnectMinMs;
  reconnectMaxMs;
  mode = "stopped";
  controller = null;
  lastEventId = "";
  pollTimer = null;
  reconnectTimer = null;
  reconnectAttempts = 0;
  stopped = false;
  probingSse = false;
  constructor(opts) {
    this.opts = opts;
    this.fetchImpl = opts.fetchImpl ?? fetch.bind(globalThis);
    this.now = opts.now ?? (() => Date.now());
    this.pollIntervalMs = opts.pollIntervalMs ?? POLL_INTERVAL_MS;
    this.reconnectMinMs = opts.reconnectMinMs ?? 5e3;
    this.reconnectMaxMs = opts.reconnectMaxMs ?? 6e4;
  }
  start() {
    if (this.mode !== "stopped") return;
    this.stopped = false;
    this.setMode("connecting");
    void this.openStream();
  }
  stop() {
    this.stopped = true;
    this.controller?.abort();
    this.controller = null;
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.setMode("stopped");
  }
  setMode(mode) {
    if (this.mode === mode) return;
    this.mode = mode;
    this.opts.onModeChange(mode);
  }
  async openStream() {
    if (this.stopped) return;
    this.controller?.abort();
    this.controller = new AbortController();
    const headers = {
      Accept: "text/event-stream",
      "Cache-Control": "no-cache"
    };
    const token = this.opts.getBearerToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (this.lastEventId) headers["Last-Event-ID"] = this.lastEventId;
    try {
      const res = await this.fetchImpl(this.opts.streamUrl, {
        method: "GET",
        headers,
        credentials: "include",
        signal: this.controller.signal
      });
      if (!res.ok) {
        this.enterPollingFallback();
        return;
      }
      if (!res.body) {
        this.enterPollingFallback();
        return;
      }
      this.reconnectAttempts = 0;
      this.setMode("live");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const parser = new SseParser();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        const events = parser.push(text);
        for (const event of events) {
          if (event.event === "resync") {
            this.opts.onResync();
            continue;
          }
          if (event.id) this.lastEventId = event.id;
          this.opts.onEvent(event);
        }
      }
      if (!this.stopped) this.scheduleReconnect();
    } catch (err) {
      if (this.stopped) return;
      if (err instanceof DOMException && err.name === "AbortError") return;
      this.reconnectAttempts++;
      if (this.reconnectAttempts >= 3) {
        this.enterPollingFallback();
      } else {
        this.scheduleReconnect();
      }
    }
  }
  scheduleReconnect() {
    if (this.stopped) return;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    const backoff = Math.min(
      this.reconnectMaxMs,
      this.reconnectMinMs * Math.pow(2, this.reconnectAttempts)
    );
    this.reconnectAttempts++;
    this.setMode("connecting");
    this.reconnectTimer = setTimeout(() => {
      void this.openStream();
    }, backoff);
  }
  enterPollingFallback() {
    if (this.stopped) return;
    this.setMode("polling");
    this.opts.onPollTick();
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = setInterval(() => {
      if (!this.stopped) this.opts.onPollTick();
    }, this.pollIntervalMs);
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      void this.probeSse();
    }, this.pollIntervalMs);
  }
  async probeSse() {
    if (this.stopped || this.probingSse) return;
    this.probingSse = true;
    try {
      const token = this.opts.getBearerToken();
      const headers = { Accept: "text/event-stream" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await this.fetchImpl(this.opts.streamUrl, { method: "GET", headers, credentials: "include" });
      if (res.ok && res.body) {
        if (this.pollTimer) {
          clearInterval(this.pollTimer);
          this.pollTimer = null;
        }
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
        this.lastEventId = "";
        this.reconnectAttempts = 0;
        void this.openStream();
      } else {
        this.reconnectTimer = setTimeout(() => void this.probeSse(), this.pollIntervalMs);
      }
    } catch {
      this.reconnectTimer = setTimeout(() => void this.probeSse(), this.pollIntervalMs);
    } finally {
      this.probingSse = false;
    }
  }
}
const STREAM_URL = `${API_BASE}/api/devices/telemetry/stream`;
const FEED_LABELS = {
  connecting: "Live-Verbindung wird aufgebaut…",
  live: "Live-Status aktiv",
  polling: "Live-Stream nicht verfügbar — Aktualisierung alle 30 s",
  stopped: ""
};
function DevicesDashboard({ subscription }) {
  const [devices, setDevices] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [feedMode, setFeedMode] = reactExports.useState("stopped");
  const [now, setNow] = reactExports.useState(() => Date.now());
  const feedRef = reactExports.useRef(null);
  const devicesRef = reactExports.useRef([]);
  devicesRef.current = devices;
  const removedIdsRef = reactExports.useRef(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 15e3);
    return () => clearInterval(t);
  }, []);
  const loadDevices = reactExports.useCallback(async (opts) => {
    if (!opts?.quiet) setError("");
    const result = await getDeviceList();
    if (!result.devices) {
      if (!opts?.quiet) setError("Geräteliste konnte nicht geladen werden.");
      return [];
    }
    const merged = result.devices.filter((d) => !removedIdsRef.current.has(d.id)).map((d) => {
      const existing = devicesRef.current.find((e) => e.id === d.id);
      return {
        ...d,
        presence: d.presence ?? existing?.presence ?? derivePresence(d.lastSeenAt ?? null, Date.now()),
        telemetry: existing?.telemetry ?? null,
        telemetryUnavailable: existing?.telemetryUnavailable ?? false
      };
    });
    setDevices(merged);
    return merged;
  }, []);
  const loadTelemetry = reactExports.useCallback(async (deviceIds) => {
    for (const id of deviceIds) {
      const result = await getDeviceTelemetry(id);
      setDevices(
        (prev) => prev.map((d) => {
          if (d.id !== id) return d;
          if (result.unavailable) {
            return { ...d, telemetryUnavailable: true };
          }
          return {
            ...d,
            telemetry: result.data ?? d.telemetry,
            presence: result.data?.presence ?? d.presence,
            telemetryUnavailable: false
          };
        })
      );
    }
  }, []);
  const refreshAll = reactExports.useCallback(
    async (opts) => {
      const merged = await loadDevices(opts);
      const ids = merged.map((d) => d.id);
      if (ids.length) await loadTelemetry(ids);
    },
    [loadDevices, loadTelemetry]
  );
  const applySseEvent = reactExports.useCallback((sse) => {
    const payload = sse.data ?? {};
    const deviceId = typeof payload.deviceId === "string" ? payload.deviceId : "";
    if (!deviceId) return;
    const nowMs = Date.now();
    if (sse.event === "device.snapshot") {
      const snapshot = payload.data ?? null;
      const overLimit = payload.overLimit === true;
      const presence = payload.presence || derivePresence(payload.lastSeenAt ?? null, nowMs);
      const lastSeenAt = typeof payload.lastSeenAt === "string" ? payload.lastSeenAt : null;
      setDevices(
        (prev) => prev.map(
          (d) => d.id === deviceId ? {
            ...d,
            presence,
            lastSeenAt,
            telemetry: {
              overLimit,
              snapshot,
              presence,
              lastSeenAt
            },
            telemetryUnavailable: false
          } : d
        )
      );
    } else if (sse.event === "device.presence_changed") {
      const data = payload.data ?? {};
      const presence = data.to || derivePresence(data.lastSeenAt ?? null, nowMs);
      const lastSeenAt = typeof data.lastSeenAt === "string" ? data.lastSeenAt : typeof payload.lastSeenAt === "string" ? payload.lastSeenAt : null;
      setDevices(
        (prev) => prev.map((d) => d.id === deviceId ? { ...d, presence, lastSeenAt } : d)
      );
    } else if (sse.event === "device.removed") {
      setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    } else if (sse.event === "device.renamed" || sse.event === "device.paired") {
      void loadDevices({ quiet: true });
    }
  }, [loadDevices]);
  const handleResync = reactExports.useCallback(() => {
    void refreshAll({ quiet: true });
  }, [refreshAll]);
  const handlePollTick = reactExports.useCallback(() => {
    void refreshAll({ quiet: true });
  }, [refreshAll]);
  reactExports.useEffect(() => {
    let disposed = false;
    (async () => {
      if (!getAccessToken()) {
        await refreshAccessToken();
      }
      await refreshAll();
      if (disposed) return;
      setLoading(false);
      const feed = new DeviceLiveFeed({
        streamUrl: STREAM_URL,
        getBearerToken: () => getAccessToken(),
        onEvent: applySseEvent,
        onModeChange: (mode) => setFeedMode(mode),
        onResync: handleResync,
        onPollTick: handlePollTick
      });
      feedRef.current = feed;
      feed.start();
    })();
    return () => {
      disposed = true;
      feedRef.current?.stop();
      feedRef.current = null;
    };
  }, [applySseEvent, handlePollTick, handleResync, refreshAll]);
  reactExports.useEffect(() => {
    if (!loading && devices.length >= 0) ;
  }, [loading, devices.length]);
  const overLimitCount = devices.filter((d) => d.telemetry?.overLimit).length;
  const plan = planDisplayName(subscription);
  const deviceLimit = subscription?.deviceLimit ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-frost", children: "Verknüpfte Geräte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-mist mt-1", children: [
          devices.length,
          " ",
          devices.length === 1 ? "Gerät" : "Geräte",
          " · Tarif: ",
          plan,
          deviceLimit !== null && deviceLimit !== void 0 ? ` · Gerätelimit: ${deviceLimit}` : "",
          overLimitCount > 0 ? ` · ${overLimitCount} über dem Limit` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PairingPanel, { onPaired: () => void refreshAll() })
    ] }),
    feedMode !== "stopped" && feedMode !== "live" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-2 px-4 py-2 rounded border text-sm ${feedMode === "polling" ? "bg-yellow-900/15 border-yellow-500/30 text-yellow-200" : "bg-electric/5 border-electric/20 text-mist"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `h-2 w-2 rounded-full ${feedMode === "polling" ? "bg-yellow-400 animate-pulse" : "bg-electric animate-pulse"}`
            }
          ),
          FEED_LABELS[feedMode]
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm", children: error }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded text-center text-mist", children: "Geräte werden geladen…" }) : devices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Keine Geräte verbunden." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist/60 mt-1", children: "Erzeuge unten einen Kopplungscode und gib ihn in der HeidSec-App ein." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 lg:grid-cols-2", children: devices.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeviceCard,
      {
        device,
        now,
        onRename: async (name) => {
          const result = await renameDevice(device.id, name);
          if (result.success) {
            await refreshAll({ quiet: true });
          }
          return result;
        },
        onRemove: async () => {
          const result = await unpairDevice(device.id);
          if (result.success) {
            removedIdsRef.current.add(device.id);
            setDevices((prev) => prev.filter((d) => d.id !== device.id));
          }
          return result;
        }
      },
      device.id
    )) })
  ] });
}
function PairingPanel({ onPaired }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const [messageType, setMessageType] = reactExports.useState("success");
  const [pairingCode, setPairingCode] = reactExports.useState("");
  const [expiresAt, setExpiresAt] = reactExports.useState(null);
  const [codes, setCodes] = reactExports.useState([]);
  const loadCodes = reactExports.useCallback(async () => {
    const result = await getDevicePairingCodes();
    setCodes(result.codes);
  }, []);
  const handleGenerate = async () => {
    setLoading(true);
    setMessage("");
    const result = await createDevicePairingCode();
    setLoading(false);
    if (result.code) {
      setPairingCode(result.code);
      setExpiresAt(result.expiresAt ?? null);
      setMessageType("success");
      setMessage("Kopplungscode erzeugt. Gültig für 15 Minuten.");
      void loadCodes();
    } else {
      setMessageType("error");
      setMessage(result.error || "Kopplungscode konnte nicht erzeugt werden.");
    }
  };
  const handleRevoke = async (codeId) => {
    await revokePairingCode(codeId);
    void loadCodes();
  };
  const handleValidate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("pairingInput");
    const code = input.value.trim();
    if (!code) return;
    setLoading(true);
    setMessage("");
    const result = await pairDevice(code);
    setLoading(false);
    if (result.device) {
      setMessageType("success");
      setMessage("Gerät erfolgreich verbunden.");
      input.value = "";
      setPairingCode("");
      setExpiresAt(null);
      onPaired();
    } else {
      setMessageType("error");
      setMessage(result.error || "Ungültiger oder abgelaufener Kopplungscode.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          setExpanded(!expanded);
          if (!expanded) void loadCodes();
        },
        className: "px-4 py-2 bg-electric text-ink font-medium rounded hover:bg-electric/80 transition-colors text-sm",
        children: expanded ? "Kopplung schließen" : "Neues Gerät verbinden"
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-5 bg-ink/50 border border-electric/20 rounded space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleGenerate,
            disabled: loading,
            className: "px-4 py-2 bg-electric/20 text-electric border border-electric/40 rounded text-sm font-medium hover:bg-electric/30 disabled:opacity-50 transition-colors",
            children: loading ? "Wird erzeugt…" : "Kopplungscode erzeugen"
          }
        ),
        pairingCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 bg-electric/10 border border-electric/30 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-mist mb-1", children: [
            "Code (15 Min. gültig",
            expiresAt ? `, bis ${formatDateTime(expiresAt)}` : "",
            "):"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold tracking-widest text-frost select-all", children: pairingCode })
        ] }),
        message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 text-sm ${messageType === "success" ? "text-green-300" : "text-red-300"}`, children: message })
      ] }),
      codes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist mb-2", children: "Offene Codes:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: codes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-frost", children: [
            "••••-",
            c.codeSuffix
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-mist text-xs", children: [
            c.status === "pending" ? "offen" : c.status,
            " · ",
            formatDateTime(c.expiresAt)
          ] }),
          c.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => void handleRevoke(c.id),
              className: "text-red-400 hover:text-red-300 text-xs",
              children: "Widerrufen"
            }
          )
        ] }, c.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-electric/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist mb-2", children: "Oder Code eingeben, um ein bereits gepairtes Gerät zu übernehmen:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleValidate, className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              name: "pairingInput",
              placeholder: "XXXX-XXXX",
              className: "flex-1 px-3 py-2 bg-ink border border-electric/20 rounded text-frost placeholder-mist/50 focus:outline-none focus:border-electric/50 font-mono"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "px-4 py-2 bg-electric text-ink rounded text-sm font-medium hover:bg-electric/80 disabled:opacity-50",
              children: "Verbinden"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function DeviceCard({
  device,
  now,
  onRename,
  onRemove
}) {
  const [renaming, setRenaming] = reactExports.useState(false);
  const [nameDraft, setNameDraft] = reactExports.useState(device.name ?? "");
  const [busy, setBusy] = reactExports.useState(false);
  const [actionError, setActionError] = reactExports.useState("");
  const presence = device.presence ?? derivePresence(device.lastSeenAt ?? null, now);
  const meta = PRESENCE_META[presence];
  const view = reactExports.useMemo(
    () => buildSnapshotView(device.telemetry?.snapshot ?? null, device.telemetry?.overLimit ?? false),
    [device.telemetry]
  );
  const lastSeen = device.lastSeenAt ?? device.lastActiveAt ?? null;
  const pairedAt = device.pairedAt ?? device.createdAt ?? null;
  const overLimit = device.telemetry?.overLimit ?? false;
  const handleRenameSubmit = async (e) => {
    e.preventDefault();
    const name = nameDraft.trim();
    if (!name || name === device.name) {
      setRenaming(false);
      return;
    }
    setBusy(true);
    setActionError("");
    const result = await onRename(name);
    setBusy(false);
    if (result.success) {
      setRenaming(false);
    } else {
      setActionError(
        result.error === "Rename failed" ? "Umbenennen fehlgeschlagen. Hinweis: Das Backend erlaubt PUT derzeit nicht aus dem Browser (CORS) — der Fix ist im Backend-Worktree, aber noch nicht deployed." : result.error || "Umbenennen fehlgeschlagen."
      );
    }
  };
  const handleRemove = async () => {
    if (!confirm(`Gerät „${device.name || "Unbenannt"}“ wirklich trennen? Alle zugehörigen Telemetriedaten werden gelöscht.`)) {
      return;
    }
    setBusy(true);
    setActionError("");
    const result = await onRemove();
    setBusy(false);
    if (!result.success) {
      setActionError(result.error || "Gerät konnte nicht entfernt werden.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-5 bg-ink/50 border rounded ${meta.ring}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        renaming ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRenameSubmit, className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: nameDraft,
              onChange: (e) => setNameDraft(e.target.value),
              className: "flex-1 min-w-0 px-3 py-1.5 bg-ink border border-electric/40 rounded text-frost text-sm focus:outline-none focus:border-electric",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, className: "px-3 py-1.5 bg-electric text-ink rounded text-sm font-medium disabled:opacity-50", children: "OK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setRenaming(false),
              className: "px-3 py-1.5 border border-electric/20 text-mist rounded text-sm",
              children: "Abbrechen"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-frost truncate", children: device.name || "Unbenanntes Gerät" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded bg-electric/10 text-electric text-xs border border-electric/20", children: deviceTypeLabel(device.type ?? device.deviceType) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist mt-1", children: pairedAt ? `Verbunden seit ${formatDateTime(pairedAt)}` : "Verbunden" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2.5 w-2.5 rounded-full ${meta.dot} ${presence === "online" ? "animate-pulse" : ""}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-medium ${meta.text}`, children: meta.label })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-sm text-mist", children: [
      "Zuletzt gesehen: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-frost", children: formatRelativeTime(lastSeen, now) }),
      lastSeen && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-mist/60", children: [
        " · ",
        formatDateTime(lastSeen)
      ] })
    ] }),
    overLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 bg-red-900/20 border border-red-500/40 rounded text-sm text-red-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Gerät über dem Gerätelimit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-300/80 mt-1", children: "Das Gerät ist verbunden und meldet sich, aber Schutzstatus, Scans, VPN und Funde werden für dieses Gerät nicht übertragen. Erhöhe deinen Tarif oder entferne ein anderes Gerät." })
    ] }),
    !overLimit && device.telemetryUnavailable && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-3 bg-mist/5 border border-mist/15 rounded text-sm text-mist", children: "Telemetrie-Endpunkt ist derzeit nicht verfügbar (Backend-Phase 2 noch nicht deployed). Es werden nur Verbindungsdaten angezeigt." }),
    !overLimit && !device.telemetryUnavailable && !device.telemetry?.snapshot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-3 bg-mist/5 border border-mist/15 rounded text-sm text-mist", children: "Noch keine Telemetriedaten. Das Gerät hat sich noch nicht mit einem Schutzstatus gemeldet." }),
    view.hasSnapshot && !overLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center justify-between px-3 py-2 rounded border ${view.protectionStatus === "protected" ? "bg-green-900/15 border-green-500/30 text-green-200" : view.protectionStatus === "attention" ? "bg-yellow-900/15 border-yellow-500/30 text-yellow-200" : "bg-mist/5 border-mist/15 text-mist"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Schutzstatus" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: view.protectionStatusLabel })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Letzter Scan", value: view.lastScanAt ? formatRelativeTime(view.lastScanAt, now) : "Unbekannt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Funde (24 h)", value: view.findings !== null ? String(view.findings) : "Unbekannt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Scans (24 h)", value: view.scansCompleted24h !== null ? String(view.scansCompleted24h) : "Unbekannt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Quarantäne", value: view.quarantinedItems !== null ? String(view.quarantinedItems) : "Unbekannt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "VPN", value: vpnLabel(view.vpnState) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Echtzeitschutz", value: view.realtimeProtection === null ? "Unbekannt" : view.realtimeProtection ? "Aktiv" : "Aus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "MailGuard", value: mailguardLabel(view.mailguardState) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Vault", value: vaultLabel(view.vaultState) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Geräte-Integrität", value: integrityLabel(view.deviceIntegrity) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Stat,
          {
            label: "Sicherheits-Patch",
            value: view.securityPatchAgeDays !== null ? `vor ${view.securityPatchAgeDays} Tagen` : "Unbekannt"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "App-Version", value: view.appVersion ?? "Unbekannt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "OS", value: view.osVersion ? `${view.osVersion}${view.platform === "android" ? " (Android)" : ""}` : "Unbekannt" })
      ] }),
      (view.updatesPending ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-300", children: [
        view.updatesPending,
        " ",
        view.updatesPending === 1 ? "Update" : "Updates",
        " ausstehend"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceEventHistory, { deviceId: device.id, overLimit, telemetryUnavailable: device.telemetryUnavailable }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-electric/10 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setRenaming(true);
            setNameDraft(device.name ?? "");
            setActionError("");
          },
          disabled: busy,
          className: "text-sm text-electric hover:text-electric/80 transition-colors disabled:opacity-50",
          children: "Umbenennen"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleRemove,
          disabled: busy,
          className: "text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50",
          children: "Trennen"
        }
      )
    ] }),
    actionError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-red-300 bg-red-900/10 border border-red-500/20 rounded px-2 py-1.5", children: actionError })
  ] });
}
function DeviceEventHistory({
  deviceId,
  overLimit,
  telemetryUnavailable
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [unavailable, setUnavailable] = reactExports.useState(telemetryUnavailable);
  const [events, setEvents] = reactExports.useState([]);
  const [loadError, setLoadError] = reactExports.useState("");
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setNow(Date.now()), 15e3);
    return () => clearInterval(t);
  }, [open]);
  const load = reactExports.useCallback(async () => {
    if (telemetryUnavailable) {
      setUnavailable(true);
      return;
    }
    setLoading(true);
    setLoadError("");
    const result = await getDeviceTelemetryEvents(deviceId);
    setLoading(false);
    if (result.unavailable) {
      setUnavailable(true);
      return;
    }
    if (result.error && !result.events.length) {
      setLoadError(result.error || "Ereignisverlauf konnte nicht geladen werden.");
      return;
    }
    setUnavailable(false);
    setLoadError("");
    setEvents(sortEventsByReceivedAt(result.events ?? []));
  }, [deviceId, telemetryUnavailable]);
  if (overLimit) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => {
          const next = !open;
          setOpen(next);
          if (next) void load();
        },
        className: "flex items-center gap-2 text-sm text-electric hover:text-electric/80 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `transition-transform ${open ? "rotate-90" : ""}`, children: "▸" }),
          "Ereignisverlauf",
          events.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded bg-electric/10 text-electric text-xs border border-electric/20", children: events.length })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-3 bg-ink/40 border border-electric/10 rounded space-y-2", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist", children: "Ereignisse werden geladen…" }),
      !loading && unavailable && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist", children: "Ereignisverlauf ist derzeit nicht verfügbar (Backend-Phase 2 noch nicht deployed)." }),
      !loading && loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-300", children: loadError }),
      !loading && !unavailable && !loadError && events.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist", children: "Noch keine Ereignisse für dieses Gerät." }),
      !loading && events.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 max-h-72 overflow-y-auto pr-1", children: events.map((event) => {
        const severity = event.severity ?? "info";
        const sev = SEVERITY_META[severity] ?? SEVERITY_META.info;
        const ts = event.receivedAt ?? event.occurredAt ?? null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${sev.dot}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-frost font-medium", children: eventTypeLabel(event.type) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist text-xs", children: eventSummary(event.type, event.data ?? null) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto shrink-0 text-xs text-mist/60", children: formatRelativeTime(ts, now) })
        ] }, event.eventId ?? `${event.type}-${event.occurredAt}`);
      }) })
    ] })
  ] });
}
function Stat({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-mist", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: value })
  ] });
}
function AccountPortal() {
  const navigate = useNavigate();
  const [user, setUser] = reactExports.useState(null);
  const [accountData, setAccountData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState(() => {
    if (typeof window === "undefined") return "overview";
    const tab = new URLSearchParams(window.location.search).get("tab");
    return tab === "devices" ? "devices" : "overview";
  });
  const [devices, setDevices] = reactExports.useState([]);
  reactExports.useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const sessionResult = await bootstrapSession();
    if (!sessionResult.authenticated || !sessionResult.user) {
      navigate({
        to: "/login",
        search: {
          redirect: "/mein-konto"
        }
      });
      return;
    }
    setUser(sessionResult.user ?? null);
    const accountResult = await getAccountData();
    if (accountResult.data) {
      setAccountData(accountResult.data);
    } else {
      setError(accountResult.error || "Failed to load account data");
    }
    const devicesResult = await getDeviceList();
    if (devicesResult.devices) {
      setDevices(devicesResult.devices);
    }
    setLoading(false);
  };
  const handleLogout = async () => {
    await logoutUser();
    navigate({
      to: "/"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-ink flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-mist", children: "Wird geladen..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-electric/10 bg-ink/95 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 py-4 md:px-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec", className: "h-7 w-7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-[0.22em] text-frost hidden sm:inline", children: "HEIDSEC" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "text-sm text-mist hover:text-frost transition-colors", children: "Abmelden" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-5 py-8 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-bold text-frost mb-2", children: [
          "Willkommen, ",
          user?.name || user?.email
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Verwalte dein HeidSec-Konto und Abonnements" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 border-b border-electric/10 flex gap-1 overflow-x-auto", children: [{
        id: "overview",
        label: "Übersicht"
      }, {
        id: "profile",
        label: "Profil"
      }, {
        id: "subscriptions",
        label: "Abos"
      }, {
        id: "devices",
        label: "Geräte"
      }, {
        id: "downloads",
        label: "Downloads"
      }, {
        id: "support",
        label: "Support"
      }].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab(tab.id), className: `px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? "border-electric text-frost" : "border-transparent text-mist hover:text-frost"}`, children: tab.label }, tab.id)) }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-sm", children: error }),
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, { user, accountData, deviceCount: devices.length }),
      activeTab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, { user, accountData, onUpdate: loadData }),
      activeTab === "subscriptions" && /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionsTab, { accountData }),
      activeTab === "devices" && /* @__PURE__ */ jsxRuntimeExports.jsx(DevicesTab, { subscription: accountData?.subscription }),
      activeTab === "downloads" && /* @__PURE__ */ jsxRuntimeExports.jsx(DownloadsTab, {}),
      activeTab === "support" && /* @__PURE__ */ jsxRuntimeExports.jsx(SupportTab, {})
    ] })
  ] });
}
const LICENSE_LABELS = {
  active: "Aktiv",
  grace: "Zahlung offen",
  expired: "Abgelaufen",
  revoked: "Entzogen",
  inactive: "Nicht aktiv"
};
const PAYMENT_LABELS = {
  paid: "Bezahlt",
  failed: "Fehlgeschlagen",
  pending: "In Bearbeitung",
  refunded: "Erstattet",
  none: "Keine Zahlung"
};
function planName(subscription) {
  return subscription?.plan_key || subscription?.plan || "HeidSec Free";
}
function OverviewTab({
  user,
  accountData,
  deviceCount
}) {
  const subscription = accountData?.subscription;
  const licenseStatus = subscription?.license_status;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-electric/5 border border-electric/20 rounded", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost mb-4", children: "Aktueller Plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-electric mb-2", children: planName(subscription) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist mb-4", children: licenseStatus ? LICENSE_LABELS[licenseStatus] || licenseStatus : "Kein aktives Abo" }),
      (subscription?.license_expires_at || subscription?.current_period_end) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-mist", children: [
        "Läuft ab: ",
        new Date(subscription.license_expires_at || subscription.current_period_end).toLocaleDateString("de-DE")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-frost/5 border border-frost/10 rounded", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost mb-4", children: "Konto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "E-Mail" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: user?.email || "–" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Kundennummer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost", children: accountData?.profile?.customerNumber || accountData?.profile?.customer_number || "–" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Kontostatus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost", children: accountData?.profile?.account_status === "suspended" ? "Gesperrt" : accountData?.profile?.account_status === "closed" ? "Geschlossen" : "Aktiv" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Verbundene Geräte" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: deviceCount })
        ] })
      ] })
    ] })
  ] });
}
function ProfileTab({
  user,
  accountData,
  onUpdate
}) {
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [passwordMessage, setPasswordMessage] = reactExports.useState("");
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage("");
    if (newPassword !== newPasswordConfirm) {
      setPasswordMessage("Passwörter stimmen nicht überein");
      return;
    }
    if (newPassword.length < 12) {
      setPasswordMessage("Passwort muss mindestens 12 Zeichen lang sein");
      return;
    }
    setLoading(true);
    const result = await changePassword(newPassword);
    setLoading(false);
    if (result.success) {
      setPasswordMessage("Passwort erfolgreich geändert");
      setNewPassword("");
      setNewPasswordConfirm("");
      setTimeout(() => setPasswordMessage(""), 3e3);
    } else {
      setPasswordMessage(result.error || "Fehler beim Ändern des Passworts");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: "Profileinformationen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: accountData?.profile?.full_name || accountData?.profile?.name || user?.name || "", disabled: true, className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-mist cursor-not-allowed opacity-50" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "E-Mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: user?.email || "", disabled: true, className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-mist cursor-not-allowed opacity-50" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-mist", children: "Profile-Bearbeitung wird in Kürze verfügbar sein" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleChangePassword, className: "p-6 bg-ink/50 border border-electric/10 rounded space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: "Passwort ändern" }),
      passwordMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded text-sm ${passwordMessage.includes("erfolgreich") ? "bg-green-900/20 border border-green-500/30 text-green-300" : "bg-red-900/20 border border-red-500/30 text-red-300"}`, children: passwordMessage }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Neues Passwort" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-frost mb-2", children: "Passwort wiederholen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: newPasswordConfirm, onChange: (e) => setNewPasswordConfirm(e.target.value), className: "w-full px-4 py-2 bg-ink/50 border border-electric/20 rounded text-frost focus:outline-none focus:border-electric/50 transition-colors", disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary py-2", disabled: loading, children: loading ? "Wird geändert..." : "Passwort ändern" })
    ] })
  ] });
}
function SubscriptionsTab({
  accountData
}) {
  const subscription = accountData?.subscription;
  const licenseStatus = subscription?.license_status;
  const isActive = licenseStatus === "active";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: subscription ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-6 border rounded ${isActive ? "bg-electric/5 border-electric/20" : "bg-mist/5 border-mist/20"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost", children: planName(subscription) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-mist mt-1", children: [
          "Zahlung: ",
          PAYMENT_LABELS[subscription.payment_status || ""] || subscription.payment_status || "–"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-3 py-1 rounded text-xs font-medium ${isActive ? "bg-electric/20 text-electric" : "bg-mist/20 text-mist"}`, children: licenseStatus ? LICENSE_LABELS[licenseStatus] || licenseStatus : "Inaktiv" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Abrechnung" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost font-medium", children: subscription.billing_cycle === "yearly" ? "Jährlich" : subscription.billing_cycle === "monthly" ? "Monatlich" : "Keine Abrechnung" })
      ] }),
      (subscription.license_expires_at || subscription.current_period_end) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-mist", children: "Läuft ab" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-frost", children: new Date(subscription.license_expires_at || subscription.current_period_end).toLocaleDateString("de-DE") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-electric/10 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/kuendigen", className: "text-sm font-medium text-threat hover:text-threat/80 transition-colors", children: "Vertrag kündigen →" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/widerruf", className: "text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors", children: "Widerruf einreichen (§ 356a) →" }) })
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist", children: "Für dieses Konto besteht kein kostenpflichtiges Abonnement. HeidSec Free ist dauerhaft nutzbar." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#suite", className: "btn-primary mt-4 inline-block", children: "Upgrade durchführen" })
  ] }) });
}
function DownloadsTab() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: [{
    name: "HeidSec Suite",
    version: "1.0.0",
    platform: "Android"
  }, {
    name: "HeidSec SecApp",
    version: "2.1.3",
    platform: "Android"
  }, {
    name: "HeidSec MailGuard",
    version: "1.5.0",
    platform: "Android"
  }, {
    name: "HeidSec Vault",
    version: "1.2.1",
    platform: "Android"
  }].map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-ink/50 border border-electric/10 rounded", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-frost mb-1", children: app.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-mist mb-3", children: [
      "v",
      app.version,
      " • ",
      app.platform
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mist/50", children: "Verfügbar im Google Play Store" })
  ] }, app.name)) }) });
}
function DevicesTab({
  subscription
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DevicesDashboard, { subscription });
}
function SupportTab() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost mb-3", children: "Häufig gestellte Fragen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist text-sm mb-4", children: "Antworten zu Produkten, Abos und Kontoverwaltung." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#faq", className: "text-electric text-sm hover:text-electric/80 transition-colors", children: "FAQ ansehen →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-ink/50 border border-electric/10 rounded", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-frost mb-3", children: "Kontakt" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-mist text-sm mb-4", children: "Schreib uns an, wenn du Fragen oder Probleme hast." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@heidsec.de", className: "text-electric text-sm hover:text-electric/80 transition-colors", children: "support@heidsec.de →" })
    ] })
  ] }) });
}
export {
  AccountPortal as component
};
