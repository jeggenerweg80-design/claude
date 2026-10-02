import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
// Page metadata (browser <title>/favicon + social og: tags) committed into the
// repo and read at BUILD time — no runtime fetch.
import appMetaJson from "../app-meta.json";

const DEFAULT_TITLE = "HeidSec";
const DEFAULT_DESCRIPTION = "HeidSec — Sicherheit ist kein Zufall.";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

const APP_HOST_ZONES = ["higgsfield.app", "higgsfield-dev.app"];

function toOwnAssetUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const u = new URL(value);
    const isAppHost = APP_HOST_ZONES.some(
      (zone) => u.hostname === zone || u.hostname.endsWith(`.${zone}`),
    );
    if (isAppHost) return u.pathname + u.search;
    return value;
  } catch {
    return value;
  }
}

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = toOwnAssetUrl(meta.og_image_url);
  const favicon = toOwnAssetUrl(meta.favicon_url);
  const ogVideo = toOwnAssetUrl(meta.og_video_url);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "HeidSec" },
      { name: "theme-color", content: "#05070B" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "HeidSec" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
      ...(ogVideo ? [{ property: "og:video", content: ogVideo }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: favicon ?? "/assets/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/assets/favicon.ico" },
      { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png" },
      { rel: "manifest", href: "/assets/site.webmanifest" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
      <img src="/assets/logo-monogram.svg" alt="HeidSec" className="h-10 w-10 opacity-80" />
      <p className="font-display text-2xl font-semibold text-frost">404 — Seite nicht gefunden</p>
      <Link to="/" className="btn-ghost">
        Zur Startseite
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
      <p className="font-display text-2xl font-semibold text-frost">Diese Seite konnte nicht geladen werden</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="btn-primary"
        >
          Erneut versuchen
        </button>
        <a href="/" className="btn-ghost">
          Zur Startseite
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de" style={{ colorScheme: "dark" }}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-ink text-frost">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
