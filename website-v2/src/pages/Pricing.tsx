import { useState } from 'react'
import PageHead from '../components/PageHead'
import PricePair from '../components/PricePair'
import IntervalToggle, { type Interval } from '../components/IntervalToggle'
import { consumerPlans, addons, businessTiers, businessKiPoolPerDevice } from '../data/pricing'
import { createCheckoutSession, CheckoutNotConfiguredError, type CheckoutRequest } from '../commerce/checkout'
import { contactHref } from '../config/site'

export default function Pricing() {
  const [interval, setInterval] = useState<Interval>('month')
  const [msg, setMsg] = useState('')

  async function buy(req: CheckoutRequest) {
    try {
      window.location.assign(await createCheckoutSession(req))
    } catch (e) {
      setMsg(e instanceof CheckoutNotConfiguredError ? 'Der Online-Kauf ist noch nicht aktiviert. Es wurde keine Zahlung ausgelöst.' : 'Der Checkout konnte nicht gestartet werden.')
    }
  }

  return (
    <>
      <PageHead title={<>Alle Tarife. <span className="grad">Auf einen Blick.</span></>} lead="Privatkunden und Unternehmen, monatlich oder jährlich.">
        <IntervalToggle value={interval} onChange={setInterval} />
        <p className="notice" role="status" aria-live="polite">{msg}</p>
      </PageHead>
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="p-c">
        <div className="wrap">
          <h2 id="p-c" className="h3">Privatkunden · SecureApp</h2>
          <div className="plans">
            {consumerPlans.map((p) => (
              <div key={p.id} className={`plan ${p.featured ? 'feat' : ''}`}>
                <h3>{p.name}</h3><p className="dim">{p.tagline}</p><PricePair price={p.price} interval={interval} />
                <button className="btn btn-ghost btn-sm" onClick={() => buy({ kind: 'consumer', plan: p.id, addons: [], interval })}>Auswählen</button>
              </div>
            ))}
          </div>
          <h3 className="h3 mt">Add-ons</h3>
          <div className="plans">
            {addons.map((a) => (
              <div key={a.id} className="plan"><h3>{a.name}</h3><PricePair price={a.price} interval={interval} /></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="p-b">
        <div className="wrap">
          <h2 id="p-b" className="h3">Geschäftskunden</h2>
          <p className="dim">Business PRO Complete und Business KI Complete enthalten Messenger und VPN. Business KI: {businessKiPoolPerDevice} KI-Analysen pro Gerät und Monat als gemeinsamer Unternehmenspool.</p>
          <BusinessTable interval={interval} onBuy={(plan, devices) => buy({ kind: 'business', plan, devices, interval })} />
          <p className="dim mt">Mehr als 50 Geräte: individuell, <a className="link" href={contactHref}>Kontakt aufnehmen</a></p>
        </div>
      </section>
    </>
  )
}

export function BusinessTable({ interval, onBuy }: { interval: Interval; onBuy?: (plan: 'pro' | 'ki', devices: 10 | 15 | 20 | 30 | 50) => void }) {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <caption className="sr-only">Business-Preise nach Gerätezahl</caption>
        <thead><tr><th scope="col">Geräte</th><th scope="col">Business PRO Complete</th><th scope="col">Business KI Complete</th></tr></thead>
        <tbody>
          {businessTiers.map((t) => (
            <tr key={t.devices}>
              <th scope="row">{t.devices} Geräte</th>
              {(['pro', 'ki'] as const).map((k) => (
                <td key={k}>
                  <PricePair price={t[k]} interval={interval} />
                  {onBuy && <button className="btn btn-ghost btn-sm" onClick={() => onBuy(k, t.devices as 10 | 15 | 20 | 30 | 50)}>Wählen</button>}
                </td>
              ))}
            </tr>
          ))}
          <tr><th scope="row">&gt; 50 Geräte</th><td colSpan={2}>Individuell / Kontakt</td></tr>
        </tbody>
      </table>
    </div>
  )
}
