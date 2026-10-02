import { i as apiGet, j as apiPost, k as apiDelete, m as apiPut } from "./auth-DKM4MRJi.js";
async function getProfile() {
  const result = await apiGet("/api/customer/profile", false, true);
  if (!result.ok) return { error: "Failed to load profile" };
  return { data: result.data?.profile ?? void 0 };
}
async function getSubscription() {
  const result = await apiGet("/api/customer/subscription", false, true);
  if (!result.ok) return { error: "Failed to load subscription" };
  return { data: result.data?.subscription ?? void 0 };
}
async function getAccountData() {
  const [profileResult, subscriptionResult, devicesResult] = await Promise.all([
    getProfile(),
    getSubscription(),
    getDeviceList()
  ]);
  return {
    data: {
      profile: profileResult.data,
      subscription: subscriptionResult.data,
      devices: devicesResult.devices ?? []
    }
  };
}
async function cancelSubscription() {
  const result = await apiPost(
    "/api/customer/subscription/cancel",
    { confirm: true, idempotencyKey: newIdempotencyKey() },
    false,
    true
  );
  if (!result.ok) {
    if (result.status === 404) {
      return {
        success: false,
        notCancelable: true,
        error: result.data?.error || "Kein kündbarer Vertrag vorhanden."
      };
    }
    return { success: false, error: result.data?.error || "Die Kündigung konnte nicht übermittelt werden." };
  }
  return { success: true };
}
async function submitWithdrawal(input) {
  const result = await apiPost(
    "/api/customer/subscription/withdrawal",
    { ...input, confirm: true, idempotencyKey: newIdempotencyKey() },
    false,
    true
  );
  if (!result.ok) {
    if (result.status === 404) {
      return {
        success: false,
        notWithdrawable: true,
        error: result.data?.error || "Kein widerrufbarer Vertrag vorhanden."
      };
    }
    return { success: false, error: result.data?.error || "Der Widerruf konnte nicht übermittelt werden." };
  }
  return { success: true, confirmationId: result.data?.confirmationId };
}
function newIdempotencyKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function isGooglePlaySubscription(subscription) {
  if (!subscription) return false;
  const markers = [
    subscription.provider,
    subscription.source,
    subscription.payment_provider,
    subscription.channel,
    subscription.origin
  ].filter(Boolean).join(" ").toLowerCase();
  if (!markers) return false;
  return /google|play|android/.test(markers);
}
function normalizeDevice(d) {
  return {
    id: d.id,
    name: d.name ?? d.device_name,
    type: d.type ?? d.deviceType ?? d.device_type,
    deviceType: d.deviceType ?? d.device_type,
    status: d.status,
    pairedAt: d.pairedAt ?? d.paired_at,
    createdAt: d.createdAt ?? d.created_at,
    updatedAt: d.updatedAt ?? d.updated_at,
    lastActive: d.lastActiveAt ?? d.last_active_at ?? d.lastActive ?? d.last_seen,
    lastActiveAt: d.lastActiveAt ?? d.last_active_at ?? null,
    lastSeenAt: d.lastSeenAt ?? d.last_seen_at ?? null,
    presence: d.presence,
    snapshotAt: d.snapshotAt ?? d.snapshot_at ?? null,
    overLimit: d.overLimit ?? false
  };
}
async function getDeviceList() {
  const result = await apiGet("/api/devices", false, true);
  if (!result.ok) return { devices: [] };
  const data = result.data;
  const list = Array.isArray(data) ? data : data?.devices ?? [];
  return { devices: list.map(normalizeDevice) };
}
async function createDevicePairingCode() {
  const result = await apiPost(
    "/api/devices/pairing-codes",
    {},
    false,
    true
  );
  if (!result.ok || !result.data?.pairingCode?.code) {
    return { error: "Pairing code could not be generated" };
  }
  return { code: result.data.pairingCode.code, expiresAt: result.data.pairingCode.expiresAt };
}
async function getDevicePairingCodes() {
  const result = await apiGet("/api/devices/pairing-codes", false, true);
  if (!result.ok || !Array.isArray(result.data?.pairingCodes)) return { codes: [] };
  return { codes: result.data.pairingCodes };
}
async function revokePairingCode(codeId) {
  const result = await apiDelete(`/api/devices/pairing-codes/${codeId}`, false, true);
  return result.ok ? { success: true } : { success: false, error: "Revocation failed" };
}
async function pairDevice(code, deviceName, deviceType) {
  const result = await apiPost(
    "/api/devices/pairing-codes/validate",
    { code, deviceName, deviceType },
    false,
    false
  );
  if (!result.ok) {
    return { error: result.data?.error || "Invalid pairing code" };
  }
  const data = result.data;
  return { device: normalizeDevice(data?.device ?? data) };
}
async function unpairDevice(deviceId) {
  const result = await apiDelete(`/api/devices/${deviceId}`, false, true);
  return result.ok ? { success: true } : { success: false, error: "Device removal failed" };
}
async function renameDevice(deviceId, name) {
  const result = await apiPut(`/api/devices/${deviceId}`, { name }, false, true);
  return result.ok ? { success: true } : { success: false, error: "Rename failed" };
}
async function getDeviceTelemetry(deviceId) {
  const result = await apiGet(
    `/api/devices/${deviceId}/telemetry`,
    false,
    true
  );
  if (!result.ok) {
    const data = result.data;
    return { error: data?.error || "Telemetry unavailable", unavailable: result.status === 404 };
  }
  return { data: result.data };
}
async function getDeviceTelemetryEvents(deviceId, page = 0, limit = 50) {
  const result = await apiGet(
    `/api/devices/${deviceId}/telemetry/events?page=${page}&limit=${limit}`,
    false,
    true
  );
  if (!result.ok) {
    const data = result.data;
    const unavailable = result.status === 404;
    return {
      events: [],
      unavailable,
      error: unavailable ? "Telemetry events unavailable" : data?.error || "Event history unavailable"
    };
  }
  return { events: result.data?.events ?? [], overLimit: result.data?.overLimit };
}
export {
  getDeviceList as a,
  getDeviceTelemetry as b,
  cancelSubscription as c,
  getDevicePairingCodes as d,
  createDevicePairingCode as e,
  revokePairingCode as f,
  getAccountData as g,
  getDeviceTelemetryEvents as h,
  isGooglePlaySubscription as i,
  pairDevice as p,
  renameDevice as r,
  submitWithdrawal as s,
  unpairDevice as u
};
