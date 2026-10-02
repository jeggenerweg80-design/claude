# HeidSec Website V2 – Architektur (Phase 1)

Eigenständiges Projekt (Vite + React + TypeScript), isoliert unter `website-v2/`. Keine Abhängigkeit zur alten Website.

- `src/design/` – Designsystem (Tokens, Base, Komponenten, Home, Pages)
- `src/components/` – UI (Header, Footer, MediaSlot, CommandCenter, Reveal, …)
- `src/sections/` – Homepage-Sektionen
- `src/pages/` – Public-Seiten
- `src/data/` – **Produktkanon** (Preise, Produkte, FAQ) – einzige Quelle für Preise
- `src/media/slots.ts` – Media-Slots (Hero 1080p, Produkt-Loops 720p); Dateien nach `public/media/`
- `src/commerce/checkout.ts` – Checkout-Schnittstelle: Stripe Checkout → serverseitiger Webhook → Backend → Entitlements. Der Client autorisiert nie Zahlungen.
- `src/areas/{customer,business,admin}` – vorbereitete Bereiche (Customer Portal, Business/Fleet Portal, CMS/Admin), noch ohne Funktionen

Umgebungsvariablen (optional): `VITE_CONTACT_EMAIL`, `VITE_CHECKOUT_SESSION_URL`.
Skripte: `npm run dev | build | typecheck | lint`.

## Quellen (Phase 2)
Referenz: `website_zum_überarbeiten/heidsec_new/` (unverändert). Übernommen: Logo/Favicons/OG (`public/brand`), Videos und Poster (`public/media`),
Produkttexte (SecureApp, MailGuard, Vault, VPN), Rechtstexte (`src/content/legal`), Kontaktadressen (`src/config/site.ts`).
Kein Layout, keine Komponenten, kein CSS übernommen.

## Offen / zu klären
- Rechtstexte enthalten Platzhalter „[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN …]“ (Firma, Anschrift, Register, USt-ID) – im Bestand ungefüllt, hier markiert.
- Der Skill `cool-website` ist im Repo nur ein leerer Submodule-Verweis (Commit 3e6fc28…, kein `.gitmodules`) – Inhalt nicht verfügbar.
- Download-Links: im Bestand nur Platzhalter. Messenger: kein Bestandsmaterial/Video.
- Der Bestand erwähnt Parental Control/Kinderschutz (AGB, Video) – nicht im Produktkanon, daher nicht auf V2 gezeigt.
- Backend-Anbindung (Login, Checkout-Session, Stripe-Webhook) folgt; Login verlinkt vorerst auf das bestehende Konto.
