// Account and subscription utilities — WEB-01 Canonical Customer API
// Uses Authorization: Bearer <accessToken> header
// AccessToken from memory (never localStorage)

import { getAccessToken, refreshAccessToken, clearAccessToken } from "./auth";

export interface Subscription {
  id: string;
  product: "free" | "pro" | "ki";
  status: "active" | "canceled" | "expired";
  startDate: string;
  endDate?: string;
  renewalDate?: string;
  price: number;
  currency: string;
}

export interface License {
  id: string;
  product: string;
  deviceId: string;
  activatedAt: string;
  expiresAt?: string;
}

export interface AccountData {
  user: {
    id: string;
    email: string;
    name?: string;
    verified: boolean;
    createdAt: string;
  };
  subscriptions: Subscription[];
  licenses: License[];
}

// Helper: Make API request with token and 401 handling
async function customerRequest<T>(
  url: string,
  method: string = "GET",
  body?: any
): Promise<{ data?: T; error?: string; unauthorized?: boolean }> {
  let token = getAccessToken();
  if (!token) {
    return { error: "No access token", unauthorized: true };
  }

  try {
    let response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Handle 401 by refreshing token and retrying once
    if (response.status === 401) {
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success && refreshResult.accessToken) {
        token = refreshResult.accessToken;
        response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });
      } else {
        clearAccessToken();
        return { error: "Unauthorized", unauthorized: true };
      }
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { error: data.error || "Request failed" };
    }

    const data = await response.json();
    return { data };
  } catch (err) {
    return { error: "Network error" };
  }
}

// Canonical WEB-01: GET /api/customer/profile
export async function getAccountData(): Promise<{ data?: AccountData; error?: string; unauthorized?: boolean }> {
  return customerRequest<AccountData>("/api/customer/profile");
}

// Canonical WEB-01: PUT /api/customer/profile
export async function updateProfile(
  name: string,
  email: string
): Promise<{ success: boolean; error?: string; unauthorized?: boolean }> {
  const result = await customerRequest("/api/customer/profile", "PUT", { name, email });
  return {
    success: !result.error,
    error: result.error,
    unauthorized: result.unauthorized,
  };
}

// Canonical WEB-01: POST /api/customer/password
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string; unauthorized?: boolean }> {
  const result = await customerRequest("/api/customer/password", "POST", {
    currentPassword,
    newPassword,
  });
  return {
    success: !result.error,
    error: result.error,
    unauthorized: result.unauthorized,
  };
}

// Canonical WEB-01: GET /api/customer/invoices
export async function getInvoices(): Promise<{ invoices?: Array<{ id: string; date: string; amount: number; status: string }>; error?: string; unauthorized?: boolean }> {
  const result = await customerRequest<{ invoices: Array<{ id: string; date: string; amount: number; status: string }> }>("/api/customer/invoices");
  return {
    invoices: result.data?.invoices || [],
    error: result.error,
    unauthorized: result.unauthorized,
  };
}

// Canonical WEB-01: GET /api/customer/downloads
export async function getDownloads(): Promise<{ downloads?: Array<{ id: string; name: string; version: string; url: string }>; error?: string; unauthorized?: boolean }> {
  const result = await customerRequest<{ downloads: Array<{ id: string; name: string; version: string; url: string }> }>("/api/customer/downloads");
  return {
    downloads: result.data?.downloads || [],
    error: result.error,
    unauthorized: result.unauthorized,
  };
}
