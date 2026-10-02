# HeidSec — Website (finaler Stand)

Premium-One-Pager der HeidSec Security Suite (SecApp, MailGuard, Vault, VPN).
React 19 + TanStack Start, serverseitig gerendert (SSR), Tailwind CSS v4.
Alle Bilder und Videos sind echte, eigens erzeugte Marken-Assets (siehe `refs/MEDIA-IDS.md`).

## Inhalt

```
src/routes/index.tsx     Die komplette Seite (Loader, Nav, Hero, Core,
                         SecApp, MailGuard, Vault, VPN, Suite, CTA, Footer)
src/routes/__root.tsx    HTML-Grundgerüst + Metadaten/OG/Favicon-Verdrahtung
src/routes/robots[.]txt.ts, sitemap[.]xml.ts
src/styles.css           Marken-Theme (Tailwind v4) + Animationen
src/app-meta.json        Titel/Beschreibung/OG-Bild/Favicon
src/lib/                 Server-/Fehler-Plumbing
public/assets/           Alle Medien: Videos (H.264 MP4), Plates/Stills (PNG+WebP),
                         Cutouts (RGBA), Logo (SVG), Favicon-/Icon-Set, OG-Cover,
                         site.webmanifest
refs/                    Die 9 freigegebenen Referenz-Boards + MEDIA-IDS.md
                         (Dokumentation aller Generierungs-IDs)
migrations/              (leer/unbenutzt — kein DB-Binding aktiv)
package.json, tsconfig.json, vite.config.ts, wrangler.jsonc, app.manifest.json
```

## Lokal bauen

Voraussetzung: [Bun](https://bun.sh) (empfohlen) oder Node.js ≥ 20.

```bash
bun install        # oder: npm install
bun run dev        # Entwicklung (http://localhost:3000)
bun run build      # Produktions-Build (TypeScript-Check + Vite SSR-Build)
bun run preview    # Gebaute Seite lokal ansehen
```

Der Build erzeugt:
- `dist/client/` — statische Assets (JS/CSS-Bundles, gehasht)
- `dist/server/` — Server-Bundle (`server.js`, `export default { fetch }`)

## Auf eigenem Webspace bereitstellen

Die Seite rendert serverseitig pro Request (SSR). Zwei Wege:

1. **Node/Bun-Server:** `dist/server/server.js` als Fetch-Handler betreiben
   (z. B. hinter einem beliebigen Node-/Bun-HTTP-Server) und `dist/client/`
   sowie `public/` als statische Dateien ausliefern.
2. **Cloudflare Workers:** Build ist worker-kompatibel (`wrangler.jsonc`
   liegt bei); `npx wrangler deploy` mit eigener Cloudflare-Konfiguration.

Hinweis: Schriften (Inter, Space Grotesk) werden über das Google-Fonts-CDN
geladen — für volle Offline-Eigenständigkeit die beiden WOFF2-Dateien selbst
hosten und den `<link>` in `src/routes/__root.tsx` durch `@font-face` ersetzen.

## Assets

- Videos: H.264, 1080p, stumm (Web-Loops; `video-hero.mp4` 30 s, `video-loader.mp4` 5 s,
  Produkt-Loops je 10 s).
- `*.webp`-Dateien sind die optimierten Poster/Standbilder zu den Videos und Plates.
- Alle Generierungs-Job-IDs und Zuordnungen: `refs/MEDIA-IDS.md`.
