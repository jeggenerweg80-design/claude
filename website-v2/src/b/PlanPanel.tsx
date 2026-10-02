import { useState } from 'react'
import { Link } from 'react-router-dom'
import PricePair from '../components/PricePair'
import IntervalToggle, { type Interval } from '../components/IntervalToggle'
import { BusinessTable } from '../pages/Pricing'
import { consumerPlans, addons, businessKiPoolPerDevice } from '../data/pricing'

/** Angelehnt an die App-Bereiche „Mein Tarif“: Segment-Chips, Key-Value-Zeilen, Listenzeilen. Nur Daten aus dem Produktkanon. */
export default function PlanPanel() {
  const [interval, setInterval] = useState<Interval>('month')
  const [who, setWho] = useState<'privat' | 'business'>('privat')
  const [plan, setPlan] = useState(1)
  const p = consumerPlans[plan]
  return (
    <section className="b-sec" aria-labelledby="b-plan-h">
      <div className="wrap">
        <header className="b-sec-head row">
          <div><p className="b-label">Preise</p><h2 id="b-plan-h">Dein Tarif. Offen und klar.</h2></div>
          <div className="b-toggles">
            <div className="toggle" role="group" aria-label="Kundenart">
              <button type="button" aria-pressed={who === 'privat'} onClick={() => setWho('privat')}>Privat</button>
              <button type="button" aria-pressed={who === 'business'} onClick={() => setWho('business')}>Business</button>
            </div>
            <IntervalToggle value={interval} onChange={setInterval} />
          </div>
        </header>

        {who === 'privat' ? (
          <div className="b-window b-plan">
            <div className="b-plan-main">
              <p className="b-label">SecureApp Tarif</p>
              <div className="b-chips" role="radiogroup" aria-label="SecureApp Tarif">
                {consumerPlans.map((x, n) => (
                  <button key={x.id} type="button" role="radio" aria-checked={plan === n} onClick={() => setPlan(n)}>{x.name}</button>
                ))}
              </div>
              <h3>SecureApp {p.name}</h3>
              <p className="b-tag">{p.tagline}</p>
              <dl className="b-kv">
                <div><dt>Plan</dt><dd>SecureApp {p.name}</dd></div>
                <div><dt>Preis</dt><dd><PricePair price={p.price} interval={interval} /></dd></div>
              </dl>
              <Link className="btn btn-primary" to="/preise">Tarife ansehen</Link>
            </div>
            <div className="b-plan-main b-plan-side">
              <p className="b-label">Add-ons</p>
              <dl className="b-kv">
                {addons.map((a) => <div key={a.id}><dt>{a.name}</dt><dd><PricePair price={a.price} interval={interval} /></dd></div>)}
              </dl>
            </div>
          </div>
        ) : (
          <div className="b-window b-biz">
            <p className="dim b-biz-note">Business PRO Complete und Business KI Complete enthalten Messenger und VPN. Business KI: {businessKiPoolPerDevice} KI-Analysen pro Gerät und Monat als gemeinsamer Unternehmenspool.</p>
            <BusinessTable interval={interval} />
            <p className="b-biz-foot"><Link className="link" to="/geschaeftskunden">Geschäftskunden-Angebot <span className="arrow" aria-hidden="true">→</span></Link></p>
          </div>
        )}
      </div>
    </section>
  )
}
