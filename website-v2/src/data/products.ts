// Produktbeschreibungen bewusst knapp und ohne zusätzliche Funktionsversprechen.
export type ProductId = 'secureapp' | 'messenger' | 'vpn' | 'mailguard' | 'vault'

export interface Product {
  id: ProductId
  name: string
  path: string
  kicker: string
  headline: string
  summary: string
  points: string[]
  addon?: boolean
  mediaSlot: string
}

export const products: Product[] = [
  {
    id: 'secureapp',
    name: 'SecureApp',
    path: '/secureapp',
    kicker: 'Das Herz der Plattform',
    headline: 'Sicherheit, die dir erklärt, was sie tut.',
    summary:
      'SecureApp erkennt Auffälliges auf deinem Gerät und zeigt es nicht nur an: Mit den KI-Stufen wird aus einem Fund eine verständliche Erklärung und eine konkrete Handlungsempfehlung.',
    points: ['Tarife FREE, PRO und KI', 'KI-Sicherheitsassistenz im KI-Tarif', 'Gleiches HeidSec-Konto für App und Portal'],
    mediaSlot: 'product-secureapp',
  },
  {
    id: 'messenger',
    name: 'Messenger',
    path: '/messenger',
    kicker: 'Kommunikation',
    headline: 'Sicher schreiben. Sicher sprechen.',
    summary: 'Der HeidSec Messenger ist bewusst schlank: sichere Textchats und sichere Voice Calls – ohne Medien- und Dateiversand.',
    points: ['Sichere Textchats', 'Sichere Voice Calls', 'Kein Bilder-, Datei- oder Videoversand'],
    mediaSlot: 'product-messenger',
  },
  {
    id: 'vpn',
    name: 'VPN',
    path: '/vpn',
    kicker: 'Add-on · Verbindung',
    headline: 'Eine geschützte Verbindung, wenn du sie brauchst.',
    summary: 'Das VPN ergänzt SecureApp als Add-on und ist in Business PRO und Business KI bereits enthalten.',
    points: ['Add-on für Privatkunden', 'Enthalten in Business PRO & KI'],
    addon: true,
    mediaSlot: 'product-vpn',
  },
  {
    id: 'mailguard',
    name: 'MailGuard',
    path: '/mailguard',
    kicker: 'Add-on · E-Mail',
    headline: 'Dein Postfach unter Aufsicht.',
    summary: 'MailGuard erweitert den Schutz auf E-Mails und fügt sich als Add-on in dieselbe Plattform ein.',
    points: ['Add-on für Privatkunden', 'Teil der gemeinsamen Sicherheitsplattform'],
    addon: true,
    mediaSlot: 'product-mailguard',
  },
  {
    id: 'vault',
    name: 'Vault',
    path: '/vault',
    kicker: 'Add-on · Schutz sensibler Daten',
    headline: 'Ein geschützter Platz für das, was zählt.',
    summary: 'Vault ist das Add-on für den besonders geschützten Umgang mit sensiblen Inhalten – verknüpft mit deinem HeidSec-Konto.',
    points: ['Add-on für Privatkunden', 'Gleiches HeidSec-Konto'],
    addon: true,
    mediaSlot: 'product-vault',
  },
]

export const getProduct = (id: ProductId) => products.find((p) => p.id === id)!
