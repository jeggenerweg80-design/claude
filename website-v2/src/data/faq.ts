export interface FaqItem {
  q: string
  a: string
}

export const faq: FaqItem[] = [
  {
    q: 'Was unterscheidet HeidSec von einem klassischen Virenscanner?',
    a: 'HeidSec verbindet mehrere Schutzbereiche in einer Plattform und folgt einem klaren Ablauf: erkennen, erklären, bewerten, handeln. Die KI dient als Assistenzschicht und übersetzt Funde in verständliche Erklärungen und konkrete Handlungsmöglichkeiten.',
  },
  {
    q: 'Welche Tarife gibt es für Privatkunden?',
    a: 'SecureApp gibt es als FREE (0 €), PRO (7,99 € pro Monat oder 79,99 € pro Jahr) und KI (12,99 € pro Monat oder 129,99 € pro Jahr). VPN, MailGuard und Vault sind als Add-ons buchbar.',
  },
  {
    q: 'Kann ich im Messenger Bilder oder Dateien senden?',
    a: 'Nein. Der Messenger bietet sichere Textchats und sichere Voice Calls. Bilder, Dateien, Anhänge, Videos, Video Calls und Sprachnachrichten sind nicht vorgesehen.',
  },
  {
    q: 'Was ist in den Business-Tarifen enthalten?',
    a: 'Business PRO Complete und Business KI Complete enthalten Messenger und VPN. Business KI stellt zusätzlich 20 KI-Analysen pro Gerät und Monat bereit, als gemeinsamer Pool für das gesamte Unternehmen.',
  },
  {
    q: 'Was gilt für mehr als 50 Geräte?',
    a: 'Für mehr als 50 Geräte erstellen wir ein individuelles Angebot. Sprich uns dazu direkt an.',
  },
  {
    q: 'Wie läuft der Kauf ab?',
    a: 'Der Kauf läuft über Stripe Checkout. Eine Zahlung gilt erst dann als erfolgreich, wenn sie serverseitig bestätigt wurde; erst danach schaltet das HeidSec-Backend deine Lizenz frei. Der Online-Kauf wird gerade vorbereitet.',
  },
]
