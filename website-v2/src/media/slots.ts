/**
 * Austauschbare Media-Slots. Später Higgsfield-Loops einsetzen: Dateien nach public/media/ legen
 * und hier eintragen. Kein Text im generierten Video – Überschriften, Preise, CTAs bleiben HTML.
 * Hero: 1080p. Produkt-Loops: 720p. Poster als .webp/.jpg für Fallback und Reduced Motion.
 */
export interface MediaSource {
  src: string
  type: 'video/mp4' | 'video/webm'
}
export interface MediaSlotDef {
  sources: MediaSource[]
  poster?: string
  alt: string
  maxHeight: 720 | 1080
}

export const slots: Record<string, MediaSlotDef> = {
  hero: { sources: [], alt: 'Atmosphärische Hintergrundanimation der HeidSec-Plattform', maxHeight: 1080 },
  'product-secureapp': { sources: [], alt: 'SecureApp Produktloop', maxHeight: 720 },
  'product-messenger': { sources: [], alt: 'Messenger Produktloop', maxHeight: 720 },
  'product-vpn': { sources: [], alt: 'VPN Produktloop', maxHeight: 720 },
  'product-mailguard': { sources: [], alt: 'MailGuard Produktloop', maxHeight: 720 },
  'product-vault': { sources: [], alt: 'Vault Produktloop', maxHeight: 720 },
}
