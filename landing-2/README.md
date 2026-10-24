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
Preise stammen ausschließlich aus der verbindlichen Preistabelle; Kombipakete sind bewusst nicht enthalten,
da keine bestätigten Paketpreise vorlagen.
