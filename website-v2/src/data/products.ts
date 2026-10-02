// Produkttexte aus dem Bestand der bestehenden Website übernommen (Messenger: Produktkanon).
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
    headline: 'Dein Sicherheitszentrum in der Tasche.',
    summary:
      'SecureApp scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich, bevor aus einem Klick ein Problem wird. Mit dem KI-Tarif wird aus einem Fund eine verständliche Erklärung samt Handlungsempfehlung.',
    points: ['Echtzeit-Scan aller Apps', 'Sofortige Warnung bei Auffälligkeiten', 'Tarife FREE, PRO und KI – ein HeidSec-Konto'],
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
    headline: 'Dein verschlüsselter Tunnel.',
    summary: 'HeidSec VPN kapselt deine Verbindung und macht deinen Standort unsichtbar – im Hotel-WLAN genauso wie zu Hause. Als Add-on zu SecureApp, in Business PRO und KI enthalten.',
    points: ['Gekapselte Verbindung', 'Standort bleibt privat', 'Enthalten in Business PRO & KI'],
    addon: true,
    mediaSlot: 'product-vpn',
  },
  {
    id: 'mailguard',
    name: 'MailGuard',
    path: '/mailguard',
    kicker: 'Add-on · E-Mail',
    headline: 'Dein Posteingang, befreit.',
    summary: 'MailGuard hält Phishing, Betrug und schädliche Anhänge fern – bevor sie deinen Posteingang erreichen. Verdächtiges landet lautlos in Quarantäne.',
    points: ['Erkennung von Phishing und Betrug', 'Lautlose Quarantäne', 'Schutz für alle deine Postfächer'],
    addon: true,
    mediaSlot: 'product-mailguard',
  },
  {
    id: 'vault',
    name: 'Vault',
    path: '/vault',
    kicker: 'Add-on · Schutz sensibler Daten',
    headline: 'Dein Tresor. Nur deiner.',
    summary: 'Vault legt Dokumente, Zugänge und Geheimnisse in einen verschlüsselten Raum, zu dem nur du den Schlüssel hältst – auf all deinen Geräten.',
    points: ['Verschlüsselte Ablage', 'Zugriff nur mit deinem Schlüssel', 'Synchron über alle Geräte'],
    addon: true,
    mediaSlot: 'product-vault',
  },
]

export const getProduct = (id: ProductId) => products.find((p) => p.id === id)!
