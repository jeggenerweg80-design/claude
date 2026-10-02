/**
 * Commerce-Schnittstelle (Vorbereitung).
 *
 * Zielarchitektur:
 *   heidsec.de -> Stripe Checkout -> serverseitiger Stripe Webhook -> HeidSec Backend -> Entitlements/Lizenz
 *
 * Der Client startet höchstens eine Checkout-Session beim Backend und leitet weiter.
 * Er autorisiert Zahlungen NIE selbst; ein Erfolg wird ausschließlich serverseitig per Webhook festgestellt.
 */
export type Interval = 'month' | 'year'

export type CheckoutRequest =
  | { kind: 'consumer'; plan: 'free' | 'pro' | 'ki'; addons: Array<'vpn' | 'mailguard' | 'vault'>; interval: Interval }
  | { kind: 'business'; plan: 'pro' | 'ki'; devices: 10 | 15 | 20 | 30 | 50; interval: Interval }

export class CheckoutNotConfiguredError extends Error {
  constructor() {
    super('Checkout ist noch nicht aktiviert.')
  }
}

const endpoint = import.meta.env.VITE_CHECKOUT_SESSION_URL as string | undefined

/** Fragt beim Backend eine Stripe-Checkout-Session an und gibt die Redirect-URL zurück. */
export async function createCheckoutSession(req: CheckoutRequest): Promise<string> {
  if (!endpoint) throw new CheckoutNotConfiguredError()
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(req),
  })
  if (!res.ok) throw new Error('Checkout konnte nicht gestartet werden.')
  const data = (await res.json()) as { url?: string }
  if (!data.url) throw new Error('Ungültige Checkout-Antwort.')
  return data.url
}
