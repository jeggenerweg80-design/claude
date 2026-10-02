export const siteConfig = {
  name: 'HeidSec',
  // Kontaktadresse wird per Umgebungsvariable gesetzt; keine erfundene Adresse im Code.
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? '',
}

export const contactHref = siteConfig.contactEmail
  ? `mailto:${siteConfig.contactEmail}?subject=HeidSec%20Business%20Anfrage`
  : '/geschaeftskunden#anfrage'
