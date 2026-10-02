// Public CMS API — Fetch published content for website
// Graceful fallbacks if API unavailable

export interface CmsContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  position: number;
  visible: boolean;
  published: boolean;
  updatedAt: string;
}

export interface CmsFaq {
  id: string;
  question: string;
  answer: string;
  published: boolean;
  position: number;
  category: string;
}

export interface CmsAnnouncement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success";
  published: boolean;
  position: number;
  expiresAt?: string;
}

export interface CmsDownload {
  id: string;
  name: string;
  version: string;
  url: string;
  published: boolean;
}

// GET /api/cms/sections - Get all published sections
export async function getCmsPublicSections(): Promise<CmsContent[]> {
  try {
    const response = await fetch("/api/cms/sections", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return (data.sections || [])
      .filter((s: any) => s.published && s.visible !== false)
      .sort((a: any, b: any) => a.position - b.position);
  } catch {
    return [];
  }
}

// GET /api/cms/sections/:slug - Get specific section by slug
export async function getCmsPublicSection(slug: string): Promise<CmsContent | null> {
  try {
    const response = await fetch(`/api/cms/sections/${slug}`, {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.published && data.visible !== false) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

// GET /api/cms/faqs - Get all published FAQs
export async function getCmsPublicFaqs(): Promise<CmsFaq[]> {
  try {
    const response = await fetch("/api/cms/faqs", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return (data.faqs || [])
      .filter((f: any) => f.published)
      .sort((a: any, b: any) => a.position - b.position);
  } catch {
    return [];
  }
}

// GET /api/cms/announcements - Get all active announcements
export async function getCmsPublicAnnouncements(): Promise<CmsAnnouncement[]> {
  try {
    const response = await fetch("/api/cms/announcements", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const now = new Date();
    return (data.announcements || [])
      .filter((a: any) => {
        if (!a.published) return false;
        if (a.expiresAt && new Date(a.expiresAt) < now) return false;
        return true;
      })
      .sort((a: any, b: any) => a.position - b.position);
  } catch {
    return [];
  }
}

// GET /api/cms/downloads - Get all published downloads
export async function getCmsPublicDownloads(): Promise<CmsDownload[]> {
  try {
    const response = await fetch("/api/cms/downloads", {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return (data.downloads || [])
      .filter((d: any) => d.published);
  } catch {
    return [];
  }
}

// GET /api/cms/legal/:type - Get published legal text
export async function getCmsPublicLegal(type: "privacy" | "terms" | "imprint"): Promise<string | null> {
  try {
    const response = await fetch(`/api/cms/legal/${type}`, {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.content || null;
  } catch {
    return null;
  }
}

// Combine multiple API calls with timeout
export async function getCmsPublicContent() {
  const [sections, faqs, announcements, downloads] = await Promise.all([
    getCmsPublicSections(),
    getCmsPublicFaqs(),
    getCmsPublicAnnouncements(),
    getCmsPublicDownloads(),
  ]);

  return {
    sections,
    faqs,
    announcements,
    downloads,
  };
}
