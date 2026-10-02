// Rechtstexte aus dem Bestand (HTML-Fragmente, repo-eigener vertrauenswürdiger Inhalt).
// Platzhalter "[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN …]" bleiben sichtbar markiert und müssen vor Livegang ausgefüllt werden.
const modules = import.meta.glob('./*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export const legalDocs = [
  { slug: 'impressum', title: 'Impressum' },
  { slug: 'datenschutz', title: 'Datenschutzerklärung' },
  { slug: 'app-datenschutz', title: 'Datenschutz Mobile App' },
  { slug: 'agb', title: 'Allgemeine Geschäftsbedingungen' },
  { slug: 'widerruf', title: 'Widerrufsrecht & Muster-Widerrufsformular' },
  { slug: 'nutzungsbedingungen', title: 'Nutzungsbedingungen' },
  { slug: 'lizenzbedingungen', title: 'Lizenzbedingungen' },
  { slug: 'ki-bedingungen', title: 'KI-Bedingungen' },
  { slug: 'vpn-bedingungen', title: 'VPN-Bedingungen' },
].map((d) => ({ ...d, html: modules[`./${d.slug}.html`] ?? '' }))
