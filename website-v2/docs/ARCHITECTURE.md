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

## Offen / zu verifizieren
- Brand-Assets, Logo, rechtliche Texte, Download-Links und Produkttexte aus der bestehenden Website übernehmen (im Repo nicht vorhanden).
- Produkttexte zu VPN, MailGuard, Vault sind bewusst generisch und müssen gegen den Produktkanon geprüft werden.
