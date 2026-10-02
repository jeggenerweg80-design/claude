/**
 * Media-Slots. Dateien liegen in public/media/ (aus dem HeidSec-Bestand übernommen: H.264-Loops ohne eingebrannten Text,
 * WebP-Poster). Austausch später (z. B. Higgsfield-Loops, Hero 1080p, Produkt-Loops 720p): Datei ablegen, hier eintragen.
 * Überschriften, Preise und CTAs bleiben immer HTML.
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
  cutout?: string
}

const mp4 = (name: string): MediaSource[] => [{ src: `/media/${name}.mp4`, type: 'video/mp4' }]

export const slots: Record<string, MediaSlotDef> = {
  hero: { sources: mp4('video-hero'), poster: '/media/hero-still.webp', alt: '', maxHeight: 1080 },
  'product-secureapp': { sources: mp4('video-secapp'), poster: '/media/plate-secapp.webp', alt: 'SecureApp Produktloop', maxHeight: 720 },
  'product-messenger': { sources: [], poster: '/media/support-seam-macro.webp', alt: 'Messenger Produktloop', maxHeight: 720 },
  'product-vpn': { sources: mp4('video-vpn'), poster: '/media/plate-vpn.webp', alt: 'VPN Produktloop', maxHeight: 720 },
  'product-mailguard': { sources: mp4('video-mailguard'), poster: '/media/plate-mailguard.webp', alt: 'MailGuard Produktloop', maxHeight: 720 },
  'product-vault': { sources: mp4('video-vault'), poster: '/media/plate-vault.webp', alt: 'Vault Produktloop', maxHeight: 720, cutout: '/media/cutout-vault-core.webp' },
  cta: { sources: [], poster: '/media/plate-cta.webp', alt: '', maxHeight: 1080 },
}
