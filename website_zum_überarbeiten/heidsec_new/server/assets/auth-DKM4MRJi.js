const API_BASE = "";
let memoryCsrfToken = null;
let memoryAccessToken = null;
function readCookie(name) {
  if (typeof document === "undefined") return null;
  const prefix = name + "=";
  const parts = document.cookie.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.indexOf(prefix) === 0) {
      return decodeURIComponent(trimmed.substring(prefix.length));
    }
  }
  return null;
}
function captureCsrf(data) {
  if (data && typeof data === "object" && data.csrfToken) {
    memoryCsrfToken = String(data.csrfToken);
  }
}
function captureAccessToken(data) {
  if (data && typeof data === "object" && typeof data.accessToken === "string") {
    memoryAccessToken = data.accessToken;
  }
}
function currentCsrf() {
  return memoryCsrfToken || readCookie("csrfToken") || readCookie("CSRF-TOKEN") || readCookie("XSRF-TOKEN");
}
async function apiRequest(method, path, body, useCsrf, useBearer = false) {
  const headers = { Accept: "application/json" };
  if (body !== null && body !== void 0) headers["Content-Type"] = "application/json";
  if (useCsrf) {
    const token = currentCsrf();
    if (token) headers["X-CSRF-Token"] = token;
  }
  if (useBearer && memoryAccessToken) {
    headers["Authorization"] = `Bearer ${memoryAccessToken}`;
  }
  const response = await fetch(API_BASE + path, {
    method,
    credentials: "include",
    headers,
    body: body !== null && body !== void 0 ? JSON.stringify(body) : void 0
  });
  const data = await response.json().catch(() => ({}));
  captureCsrf(data);
  captureAccessToken(data);
  return { status: response.status, ok: response.ok, data };
}
function apiPost(path, body, useCsrf = false, useBearer = false) {
  return apiRequest("POST", path, body ?? {}, useCsrf, useBearer);
}
function apiGet(path, useCsrf = false, useBearer = false) {
  return apiRequest("GET", path, null, useCsrf, useBearer);
}
function apiPut(path, body, useCsrf = false, useBearer = false) {
  return apiRequest("PUT", path, body ?? {}, useCsrf, useBearer);
}
function apiDelete(path, useCsrf = false, useBearer = false) {
  return apiRequest("DELETE", path, null, useCsrf, useBearer);
}
function normalizeUser(data, fallbackEmail) {
  if (!data || typeof data !== "object") {
    return fallbackEmail ? { email: fallbackEmail } : null;
  }
  const user = data.user || data.account || null;
  if (user) return user;
  if (data.email) return { email: data.email };
  return fallbackEmail ? { email: fallbackEmail } : null;
}
async function loginUser(email, password) {
  try {
    const result = await apiPost("/api/auth/web/login", { email, password });
    captureAccessToken(result.data);
    if (!result.ok) {
      return {
        success: false,
        error: result.data?.error || "Login failed",
        code: result.data?.code || ""
      };
    }
    const user = normalizeUser(result.data, email);
    if (!user) {
      return { success: false, error: "Session could not be established" };
    }
    return { success: true, user };
  } catch {
    return { success: false, error: "Network error" };
  }
}
async function registerUser(email, password, name, licenseKey) {
  try {
    const payload = { email, password };
    if (name) payload.name = name;
    if (licenseKey) payload.licenseKey = licenseKey;
    const result = await apiPost("/api/auth/register", payload);
    captureAccessToken(result.data);
    if (!result.ok) {
      return {
        success: false,
        error: result.data?.error || "Registration failed",
        code: result.data?.code || ""
      };
    }
    const user = normalizeUser(result.data, email);
    return { success: true, user: user ?? void 0, requiresVerification: true };
  } catch {
    return { success: false, error: "Network error" };
  }
}
async function bootstrapCsrfFromSession() {
  try {
    const boot = await apiPost("/api/auth/web/session/bootstrap", {}, false);
    return boot.ok && !!memoryCsrfToken;
  } catch {
    return false;
  }
}
async function bootstrapSession() {
  try {
    if (!currentCsrf()) {
      await bootstrapCsrfFromSession();
    }
    const refreshed = await apiPost("/api/auth/web/refresh", {}, true);
    if (!refreshed.ok) {
      return { authenticated: false };
    }
    let user = normalizeUser(refreshed.data, null);
    if (!user) {
      const me = await apiGet("/api/auth/me", true);
      if (me.ok) user = normalizeUser(me.data, null);
    }
    return user ? { authenticated: true, user, accessToken: memoryAccessToken ?? void 0 } : { authenticated: false };
  } catch {
    return { authenticated: false };
  }
}
async function logoutUser() {
  try {
    await apiPost("/api/auth/web/logout", {}, true);
  } catch {
  }
  memoryCsrfToken = null;
  return { success: true };
}
async function verifyEmail(token) {
  try {
    const result = await apiRequest("POST", "/api/auth/verify-email", { token }, false);
    if (!result.ok) {
      return { success: false, error: result.data?.error || "Verification failed" };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Network error" };
  }
}
async function resetPassword(token, newPassword) {
  try {
    const result = await apiRequest("POST", "/api/auth/reset-password", { token, newPassword }, false);
    if (!result.ok) {
      return {
        success: false,
        error: result.data?.error || (result.status === 401 ? "Der Reset-Link ist ungültig oder abgelaufen. Bitte fordere einen neuen Link an." : "Reset failed"),
        status: result.status
      };
    }
    return { success: true, status: result.status };
  } catch {
    return { success: false, error: "Network error" };
  }
}
async function resendVerificationEmail(email) {
  try {
    const result = await apiPost("/api/auth/verify-email/resend", { email }, true);
    if (!result.ok) {
      return { success: false, error: result.data?.error || "Resend failed" };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Network error" };
  }
}
async function requestPasswordReset(email) {
  try {
    const result = await apiPost("/api/auth/forgot-password", { email });
    if (!result.ok) {
      return { success: false, error: result.data?.error || "Request failed" };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Network error" };
  }
}
async function changePassword(newPassword) {
  try {
    const result = await apiPost("/api/auth/change-password", { newPassword }, true);
    if (!result.ok) {
      return { success: false, error: result.data?.error || "Password change failed" };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Network error" };
  }
}
function getAccessToken() {
  return memoryAccessToken ?? "";
}
function clearAccessToken() {
  memoryCsrfToken = null;
  memoryAccessToken = null;
}
async function refreshAccessToken() {
  const result = await bootstrapSession();
  return result.authenticated ? { success: true, accessToken: memoryAccessToken ?? void 0 } : { success: false };
}
export {
  API_BASE as A,
  loginUser as a,
  bootstrapSession as b,
  clearAccessToken as c,
  changePassword as d,
  registerUser as e,
  resetPassword as f,
  getAccessToken as g,
  resendVerificationEmail as h,
  apiGet as i,
  apiPost as j,
  apiDelete as k,
  logoutUser as l,
  apiPut as m,
  requestPasswordReset as n,
  refreshAccessToken as r,
  verifyEmail as v
};
