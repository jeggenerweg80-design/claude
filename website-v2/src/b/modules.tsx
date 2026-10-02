import type { ReactNode } from 'react'

export type ModuleId = 'secureapp' | 'ki' | 'messenger' | 'mailguard' | 'vpn' | 'vault'

export interface BModule {
  id: ModuleId
  label: string
  role: string
  summary: string
  points: string[]
  to: string
  linkLabel: string
  video?: string
  poster: string
  icon: ReactNode
  badge?: string
}

const i = (d: string) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)

/** Inhalte aus dem Produktkanon und den Bestandstexten. Keine zusätzlichen Funktionsversprechen. */
export const modules: BModule[] = [
  {
    id: 'secureapp', label: 'SecureApp', role: 'Zentrale der Plattform',
    summary: 'SecureApp scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich, bevor aus einem Klick ein Problem wird.',
    points: ['Echtzeit-Scan aller Apps', 'Sofortige Warnung bei Auffälligkeiten', 'Tarife FREE, PRO und KI mit einem Konto'],
    to: '/secureapp', linkLabel: 'SecureApp ansehen', video: '/media/video-secapp.mp4', poster: '/media/plate-secapp.webp',
    icon: i('M12 3l8 3v6c0 4.4-3.2 7.6-8 9-4.8-1.4-8-4.6-8-9V6l8-3zM9 12l2.2 2.2L15.5 10'),
  },
  {
    id: 'ki', label: 'KI-Assistenz', role: 'Erklärung und Handlung',
    summary: 'Die KI zeigt nicht nur einen Fund an. Sie macht Sicherheitsereignisse verständlich und leitet konkrete Handlungsmöglichkeiten ab.',
    points: ['Verständliche Erklärung statt Fachbegriff', 'Handlungsmöglichkeiten für jeden Fund', 'Enthalten im KI-Tarif'],
    to: '/preise', badge: 'KI-Tarif', linkLabel: 'KI-Tarif ansehen', video: '/media/video-core.mp4', poster: '/media/plate-core.webp',
    icon: i('M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18'),
  },
  {
    id: 'messenger', label: 'Messenger', role: 'Sichere Kommunikation',
    summary: 'Bewusst schlank: sichere Textchats und sichere Voice Calls, ohne Medien- und Dateiversand.',
    points: ['Sichere Textchats', 'Sichere Voice Calls', 'Kein Bilder-, Datei- oder Videoversand'],
    to: '/messenger', linkLabel: 'Messenger ansehen', poster: '/media/support-seam-macro.webp',
    icon: i('M4 5h16v11H9l-5 4V5z'),
  },
  {
    id: 'mailguard', label: 'MailGuard', role: 'Mail-Schutz',
    summary: 'MailGuard hält Phishing, Betrug und schädliche Anhänge fern, bevor sie deinen Posteingang erreichen. Verdächtiges landet lautlos in Quarantäne.',
    points: ['Erkennung von Phishing und Betrug', 'Lautlose Quarantäne', 'Schutz für alle deine Postfächer'],
    to: '/mailguard', badge: 'Add-on', linkLabel: 'MailGuard ansehen', video: '/media/video-mailguard.mp4', poster: '/media/plate-mailguard.webp',
    icon: i('M3 6h18v12H3V6zm0 1l9 6 9-6'),
  },
  {
    id: 'vpn', label: 'VPN', role: 'Netzwerkschutz',
    summary: 'HeidSec VPN kapselt deine Verbindung und macht deinen Standort unsichtbar, im Hotel-WLAN genauso wie zu Hause.',
    points: ['Gekapselte Verbindung', 'Standort bleibt privat', 'Enthalten in Business PRO und KI'],
    to: '/vpn', badge: 'Add-on', linkLabel: 'VPN ansehen', video: '/media/video-vpn.mp4', poster: '/media/plate-vpn.webp',
    icon: i('M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z'),
  },
  {
    id: 'vault', label: 'Vault', role: 'Datenschutz und Ablage',
    summary: 'Vault legt Dokumente, Zugänge und Geheimnisse in einen verschlüsselten Raum, zu dem nur du den Schlüssel hältst, auf all deinen Geräten.',
    points: ['Verschlüsselte Ablage', 'Zugriff nur mit deinem Schlüssel', 'Synchron über alle Geräte'],
    to: '/vault', badge: 'Add-on', linkLabel: 'Vault ansehen', video: '/media/video-vault.mp4', poster: '/media/plate-vault.webp',
    icon: i('M5 11h14v9H5v-9zM8 11V8a4 4 0 118 0v3'),
  },
]

export const moduleById = (id: ModuleId) => modules.find((m) => m.id === id)!

export interface Step {
  key: string
  label: string
  title: string
  text: string
  focus: ModuleId[] | 'all'
  chip: { tone: 'warn' | 'info' | 'ok'; label: string }
}

/** Beispielereignis (illustrativ, ohne Zahlen): Mail mit verdächtigem Link. */
export const steps: Step[] = [
  { key: 'detect', label: 'Erkennen', title: 'Eine Mail mit verdächtigem Link', text: 'Die Plattform erkennt Auffälliges und meldet das Ereignis.', focus: ['mailguard'], chip: { tone: 'warn', label: 'Auffällig' } },
  { key: 'explain', label: 'Erklären', title: 'Die KI übersetzt den Fund', text: 'Du siehst in normaler Sprache, worum es geht und warum es relevant ist.', focus: ['ki'], chip: { tone: 'info', label: 'Erklärt' } },
  { key: 'rate', label: 'Bewerten', title: 'SecureApp ordnet das Risiko ein', text: 'Du siehst, wie ernst die Lage ist und was auf dem Spiel steht.', focus: ['secureapp'], chip: { tone: 'info', label: 'Bewertet' } },
  { key: 'act', label: 'Handeln', title: 'Konkrete Schritte statt Rätselraten', text: 'Aus der Bewertung werden Handlungsmöglichkeiten, die du direkt umsetzt.', focus: 'all', chip: { tone: 'ok', label: 'Handlungsfähig' } },
]
