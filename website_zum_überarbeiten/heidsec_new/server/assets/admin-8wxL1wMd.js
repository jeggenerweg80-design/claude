import { b as bootstrapSession, r as refreshAccessToken, c as clearAccessToken, g as getAccessToken } from "./auth-DKM4MRJi.js";
async function adminRequest(url, method = "GET", body) {
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
        "Accept": "application/json"
      },
      body: body ? JSON.stringify(body) : void 0
    });
    if (response.status === 403) {
      return { error: "Forbidden", forbidden: true };
    }
    if (response.status === 401) {
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success && refreshResult.accessToken) {
        token = refreshResult.accessToken;
        response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          },
          body: body ? JSON.stringify(body) : void 0
        });
      } else {
        clearAccessToken();
        return { error: "Unauthorized", unauthorized: true };
      }
    }
    if (response.status === 403) {
      return { error: "Forbidden", forbidden: true };
    }
    if (!response.ok) {
      const data2 = await response.json().catch(() => ({}));
      return { error: data2.error || "Request failed" };
    }
    const data = await response.json();
    return { data };
  } catch (err) {
    return { error: "Network error" };
  }
}
async function checkAdminAuth() {
  try {
    const bootstrap = await bootstrapSession();
    if (!bootstrap.authenticated || !bootstrap.user) {
      return { authenticated: false, isAdmin: false };
    }
    const isAdmin = bootstrap.user.role === "admin" || bootstrap.user.role === "editor";
    return {
      authenticated: true,
      isAdmin,
      user: bootstrap.user,
      accessToken: bootstrap.accessToken
    };
  } catch {
    return { authenticated: false, isAdmin: false };
  }
}
async function getSections() {
  const result = await adminRequest("/api/admin/cms/sections");
  return {
    sections: result.data?.sections,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function updateSection(id, updates) {
  const result = await adminRequest(`/api/admin/cms/sections/${id}`, "PUT", updates);
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function getFaqs() {
  const result = await adminRequest("/api/admin/cms/faqs");
  return {
    faqs: result.data?.faqs,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function updateFaq(id, updates) {
  const result = await adminRequest(`/api/admin/cms/faqs/${id}`, "PUT", updates);
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function getAnnouncements() {
  const result = await adminRequest("/api/admin/cms/announcements");
  return {
    announcements: result.data?.announcements,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function createAnnouncement(data) {
  const result = await adminRequest("/api/admin/cms/announcements", "POST", data);
  return {
    announcement: result.data,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function updateAnnouncement(id, updates) {
  const result = await adminRequest(`/api/admin/cms/announcements/${id}`, "PUT", updates);
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function deleteAnnouncement(id) {
  const result = await adminRequest(`/api/admin/cms/announcements/${id}`, "DELETE");
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function getLegalText(type) {
  const result = await adminRequest(`/api/admin/cms/legal/${type}`);
  return {
    content: result.data?.content,
    error: result.error,
    forbidden: result.forbidden
  };
}
async function updateLegalText(type, content) {
  const result = await adminRequest(`/api/admin/cms/legal/${type}`, "PUT", { content });
  return {
    success: !result.error,
    error: result.error,
    forbidden: result.forbidden
  };
}
export {
  createAnnouncement as a,
  getFaqs as b,
  checkAdminAuth as c,
  deleteAnnouncement as d,
  updateFaq as e,
  getLegalText as f,
  getAnnouncements as g,
  updateLegalText as h,
  getSections as i,
  updateSection as j,
  updateAnnouncement as u
};
