# HeidSec – Landingpage 2.0 (Entwurf)

Eigenständige, statische Landingpage. Keine Build-Schritte, keine externen Requests.

- `index.html` – komplette Seite (HTML, CSS und ~80 Zeilen Vanilla-JS inline)
- `assets/img/` – optimierte WebP-Varianten (800/1600 px) der bestehenden Marken-Plates, Logo, Favicons
- `assets/media/hero-loop.mp4` – Hero-Loop (1 MB, wird nur ohne „reduzierte Bewegung“/Datensparmodus geladen)
- `assets/fonts/` – Inter, Inter Display, JetBrains Mono (lokal, Latin-Subset, SIL OFL 1.1)

Lokale Vorschau:

```bash
cd landing-2 && python3 -m http.server 8792 --bind 127.0.0.1
# http://127.0.0.1:8792/
```

Links auf `/register/`, `/login/`, `/legal/...` usw. sind wurzelrelativ und funktionieren erst auf www.heidsec.de.
`og:image`/`twitter:image` zeigen auf `https://www.heidsec.de/assets/img/og-image.jpg` – setzt voraus, dass die Seite im Web-Root liegt.

## Inhaltsquellen

- Privattarife, Module, Zusatzgerät: verbindliche Owner-Preistabelle (Monat/Jahr).
- Kombipakete (nur Monatspreise bestätigt): PRO+VPN 12,98 €, PRO+MailGuard 10,98 €, PRO+Vault 10,98 €, PRO+MailGuard+Vault 13,97 €.
- Kinderschutz in PRO und KI, KI-Sicherheitsassistenz nur KI (20 KI-Analysen/Monat): owner-bestätigte Matrix (`claude/website-v2-concept-b`, 92bdb9b).
- Business PRO/KI Complete (10–50 Geräte, Messenger + VPN, KI-Pool 20/Gerät/Monat): Produktkanon `website-v2/src/data/pricing.ts`.
- Messenger: Textchat + Voice Calls, ohne Dateien/Medien/Videoanrufe; nur Business-Pakete, keinem Privattarif zugeordnet.
- Aussagen zu „ausschließlich lokaler“ KI-Verarbeitung wurden entfernt: im Repository nicht durch Architektur belegt
  (monatliche KI-Kontingente und ein unternehmensweiter KI-Pool sprechen gegen rein lokale Verarbeitung).
- Gerätelimits der Privattarife sind nicht festgelegt und werden nicht genannt.
