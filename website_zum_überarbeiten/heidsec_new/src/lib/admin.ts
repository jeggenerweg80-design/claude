// Admin utilities — WEB-06 CMS API with Bearer auth
// Uses AccessToken from auth.ts
// Admin endpoints require admin role from /api/auth/web/session/bootstrap

import { getAccessToken, refreshAccessToken, clearAccessToken, bootstrapSession } from "./auth";

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role: "admin" | "editor" | "viewer";
  verified: boolean;
  createdAt: string;
}

export interface AdminSession {
  authenticated: boolean;
  isAdmin: boolean;
  user?: AdminUser;
  accessToken?: string;
}

export interface CmsSection {
  id: string;
  slug: string;
  title: string;
  content: string;
  published: boolean;
  draftContent?: string;
  position: number;
  updatedAt: string;
  updatedBy: string;
}

export interface CmsFaq {
  id: string;
  question: string;
  answer: string;
  published: boolean;
  draftAnswer?: string;
  position: number;
  category: string;
  updatedAt: string;
}

export interface CmsAnnouncement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success";
  published: boolean;
  expiresAt?: string;
  position: number;
  updatedAt: string;
}

// Helper: Make admin API request with Bearer token and 401 handling
async function adminRequest<T>(
  url: string,
  method: string = "GET",
  body?: any
): Promise<{ data?: T; error?: string; forbidden?: boolean; unauthorized?: boolean }> {
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

    // Handle 403 Forbidden (not admin)
    if (response.status === 403) {
      return { error: "Forbidden", forbidden: true };
    }

    // Handle 401 Unauthorized (token expired)
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

    // Handle 403 after potential refresh
    if (response.status === 403) {
      return { error: "Forbidden", forbidden: true };
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

// Check if user is admin
export async function checkAdminAuth(): Promise<AdminSession> {
  try {
    const bootstrap = await bootstrapSession();
    if (!bootstrap.authenticated || !bootstrap.user) {
      return { authenticated: false, isAdmin: false };
    }

    // Check if user has admin role (determined by backend)
    const isAdmin = (bootstrap.user as any).role === "admin" || (bootstrap.user as any).role === "editor";

    return {
      authenticated: true,
      isAdmin,
      user: bootstrap.user as AdminUser,
      accessToken: bootstrap.accessToken,
    };
  } catch {
    return { authenticated: false, isAdmin: false };
  }
}

// WEB-06 Admin CMS API: GET /api/admin/cms/sections
export async function getSections(): Promise<{ sections?: CmsSection[]; error?: string; forbidden?: boolean }> {
  const result = await adminRequest<{ sections: CmsSection[] }>("/api/admin/cms/sections");
  return {
    sections: result.data?.sections,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: GET /api/admin/cms/sections/:id
export async function getSection(id: string): Promise<{ section?: CmsSection; error?: string; forbidden?: boolean }> {
  const result = await adminRequest<CmsSection>(`/api/admin/cms/sections/${id}`);
  return {
    section: result.data,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: PUT /api/admin/cms/sections/:id
export async function updateSection(
  id: string,
  updates: Partial<CmsSection>
): Promise<{ success: boolean; error?: string; forbidden?: boolean }> {
  const result = await adminRequest(`/api/admin/cms/sections/${id}`, "PUT", updates);
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: GET /api/admin/cms/faqs
export async function getFaqs(): Promise<{ faqs?: CmsFaq[]; error?: string; forbidden?: boolean }> {
  const result = await adminRequest<{ faqs: CmsFaq[] }>("/api/admin/cms/faqs");
  return {
    faqs: result.data?.faqs,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: PUT /api/admin/cms/faqs/:id
export async function updateFaq(
  id: string,
  updates: Partial<CmsFaq>
): Promise<{ success: boolean; error?: string; forbidden?: boolean }> {
  const result = await adminRequest(`/api/admin/cms/faqs/${id}`, "PUT", updates);
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: GET /api/admin/cms/announcements
export async function getAnnouncements(): Promise<{ announcements?: CmsAnnouncement[]; error?: string; forbidden?: boolean }> {
  const result = await adminRequest<{ announcements: CmsAnnouncement[] }>("/api/admin/cms/announcements");
  return {
    announcements: result.data?.announcements,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: POST /api/admin/cms/announcements
export async function createAnnouncement(
  data: Omit<CmsAnnouncement, "id" | "updatedAt">
): Promise<{ announcement?: CmsAnnouncement; error?: string; forbidden?: boolean }> {
  const result = await adminRequest<CmsAnnouncement>("/api/admin/cms/announcements", "POST", data);
  return {
    announcement: result.data,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: PUT /api/admin/cms/announcements/:id
export async function updateAnnouncement(
  id: string,
  updates: Partial<CmsAnnouncement>
): Promise<{ success: boolean; error?: string; forbidden?: boolean }> {
  const result = await adminRequest(`/api/admin/cms/announcements/${id}`, "PUT", updates);
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: DELETE /api/admin/cms/announcements/:id
export async function deleteAnnouncement(id: string): Promise<{ success: boolean; error?: string; forbidden?: boolean }> {
  const result = await adminRequest(`/api/admin/cms/announcements/${id}`, "DELETE");
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: GET /api/admin/cms/legal/:type
export async function getLegalText(type: "privacy" | "terms" | "imprint"): Promise<{ content?: string; error?: string; forbidden?: boolean }> {
  const result = await adminRequest<{ content: string }>(`/api/admin/cms/legal/${type}`);
  return {
    content: result.data?.content,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Admin CMS API: PUT /api/admin/cms/legal/:type
export async function updateLegalText(type: "privacy" | "terms" | "imprint", content: string): Promise<{ success: boolean; error?: string; forbidden?: boolean }> {
  const result = await adminRequest(`/api/admin/cms/legal/${type}`, "PUT", { content });
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden,
  };
}

// WEB-06 Public CMS API: GET /api/cms/sections (for preview)
export async function getPublicSections(): Promise<{ sections?: CmsSection[]; error?: string }> {
  try {
    const response = await fetch("/api/cms/sections", {
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      return { error: "Failed to fetch" };
    }

    const data = await response.json();
    return { sections: data.sections };
  } catch {
    return { error: "Network error" };
  }
}
