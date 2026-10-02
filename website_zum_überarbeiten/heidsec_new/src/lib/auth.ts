// Authentication — WEB-01 Canonical Contract Integration
// AccessToken stored ONLY in memory, never in localStorage
// RefreshToken in HttpOnly Secure Cookie

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  verified: boolean;
  createdAt: string;
}

export interface SessionBootstrap {
  authenticated: boolean;
  user?: AuthUser;
  accessToken?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  accessToken?: string;
  error?: string;
  requiresVerification?: boolean;
}

// In-memory access token storage
let memoryAccessToken: string = "";

export function getAccessToken(): string {
  return memoryAccessToken;
}

export function setAccessToken(token: string): void {
  memoryAccessToken = token;
}

export function clearAccessToken(): void {
  memoryAccessToken = "";
}

// Canonical WEB-01: POST /api/auth/web/session/bootstrap
export async function bootstrapSession(): Promise<SessionBootstrap> {
  try {
    const response = await fetch("/api/auth/web/session/bootstrap", {
      method: "POST",
      credentials: "include", // For refresh cookie
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    const data = await response.json();
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }
    return data;
  } catch {
    return { authenticated: false };
  }
}

// Canonical WEB-01: POST /api/auth/web/register
export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/web/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // For refresh cookie
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        success: false,
        error: data.error || "Registration failed",
        requiresVerification: data.requiresVerification,
      };
    }

    const data = await response.json();
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }
    return {
      success: true,
      user: data.user,
      accessToken: data.accessToken,
      requiresVerification: data.requiresVerification,
    };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

// Canonical WEB-01: POST /api/auth/web/login
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/web/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // For refresh cookie
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        success: false,
        error: data.error || "Login failed",
        requiresVerification: data.requiresVerification,
      };
    }

    const data = await response.json();
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }
    return {
      success: true,
      user: data.user,
      accessToken: data.accessToken,
      requiresVerification: data.requiresVerification,
    };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

// Canonical WEB-01: POST /api/auth/web/refresh
export async function refreshAccessToken(): Promise<{ success: boolean; accessToken?: string }> {
  try {
    const response = await fetch("/api/auth/web/refresh", {
      method: "POST",
      credentials: "include", // For refresh cookie
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      clearAccessToken();
      return { success: false };
    }

    const data = await response.json();
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      return { success: true, accessToken: data.accessToken };
    }
    return { success: false };
  } catch {
    clearAccessToken();
    return { success: false };
  }
}

// Canonical WEB-01: POST /api/auth/verify-email
export async function verifyEmail(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { success: false, error: data.error || "Verification failed" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

// Canonical WEB-01: POST /api/auth/verify-email/resend
export async function resendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/auth/verify-email/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { success: false, error: data.error || "Resend failed" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

// Canonical WEB-01: POST /api/auth/web/forgot-password (or similar)
export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { success: false, error: data.error || "Request failed" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

// Canonical WEB-01: POST /api/auth/reset-password
export async function resetPassword(token: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { success: false, error: data.error || "Reset failed" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

// Canonical WEB-01: POST /api/auth/web/logout
export async function logoutUser(): Promise<{ success: boolean }> {
  try {
    clearAccessToken();
    const response = await fetch("/api/auth/web/logout", {
      method: "POST",
      credentials: "include",
    });

    return { success: response.ok };
  } catch {
    return { success: false };
  }
}

// Check if user is authenticated
export async function checkAuth(): Promise<AuthResponse> {
  try {
    const bootstrap = await bootstrapSession();
    if (bootstrap.authenticated && bootstrap.user) {
      return { success: true, user: bootstrap.user, accessToken: bootstrap.accessToken };
    }
    return { success: false };
  } catch {
    return { success: false };
  }
}

// Helper: Retry request after token refresh
export async function retryWithRefresh<T>(
  originalRequest: () => Promise<T>,
  onUnauthorized?: () => void
): Promise<T | null> {
  try {
    return await originalRequest();
  } catch (err: any) {
    if (err.status === 401) {
      // Try to refresh token
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success) {
        // Retry original request
        try {
          return await originalRequest();
        } catch {
          if (onUnauthorized) onUnauthorized();
          return null;
        }
      } else {
        // Refresh failed, need to login
        if (onUnauthorized) onUnauthorized();
        return null;
      }
    }
    throw err;
  }
}
