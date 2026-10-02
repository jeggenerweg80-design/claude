// Autoritativer HeidSec-Produktkanon (Preise in EUR, brutto wie angegeben). Nicht ändern ohne Freigabe.
export interface Price {
  month: number | null
  year: number | null
}

export interface ConsumerPlan {
  id: 'free' | 'pro' | 'ki'
  name: string
  price: Price
  tagline: string
  featured?: boolean
}

export const consumerPlans: ConsumerPlan[] = [
  { id: 'free', name: 'FREE', price: { month: 0, year: 0 }, tagline: 'Der Einstieg in SecureApp.' },
  { id: 'pro', name: 'PRO', price: { month: 7.99, year: 79.99 }, tagline: 'Der volle SecureApp-Schutz.', featured: true },
  { id: 'ki', name: 'KI', price: { month: 12.99, year: 129.99 }, tagline: 'SecureApp mit KI-Sicherheitsassistenz.' },
]

export interface Addon {
  id: 'vpn' | 'mailguard' | 'vault'
  name: string
  price: Price
}

export const addons: Addon[] = [
  { id: 'vpn', name: 'VPN', price: { month: 4.99, year: 49.99 } },
  { id: 'mailguard', name: 'MailGuard', price: { month: 2.99, year: 29.99 } },
  { id: 'vault', name: 'Vault', price: { month: 2.99, year: 29.99 } },
]

export interface BusinessTier {
  devices: number
  pro: Price
  ki: Price
}

export const businessTiers: BusinessTier[] = [
  { devices: 10, pro: { month: 59.9, year: 599 }, ki: { month: 89.9, year: 899 } },
  { devices: 15, pro: { month: 79.9, year: 799 }, ki: { month: 119.9, year: 1199 } },
  { devices: 20, pro: { month: 99.9, year: 999 }, ki: { month: 149.9, year: 1499 } },
  { devices: 30, pro: { month: 139.9, year: 1399 }, ki: { month: 209.9, year: 2099 } },
  { devices: 50, pro: { month: 199.9, year: 1999 }, ki: { month: 299.9, year: 2999 } },
]

export const businessKiPoolPerDevice = 20

const eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
const eurRound = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export function formatEur(value: number | null): string {
  if (value === null) return '–'
  return Number.isInteger(value) && value >= 100 ? eurRound.format(value) : eur.format(value)
}
