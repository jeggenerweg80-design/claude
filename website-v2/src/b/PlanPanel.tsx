import { useState } from 'react'
import { Link } from 'react-router-dom'
import PricePair from '../components/PricePair'
import IntervalToggle, { type Interval } from '../components/IntervalToggle'
import { BusinessTable } from '../pages/Pricing'
import { consumerPlans, addons, businessKiPoolPerDevice } from '../data/pricing'

/** Angelehnt an „Konto / Mein Tarif“: ein Panel statt Tarifkarten. */
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
            <div className="b-plan-list" role="radiogroup" aria-label="SecureApp Tarif">
              {consumerPlans.map((x, n) => (
                <button key={x.id} type="button" role="radio" aria-checked={plan === n} className={plan === n ? 'on' : ''} onClick={() => setPlan(n)}>
                  <span><b>SecureApp {x.name}</b><small>{x.tagline}</small></span>
                  <PricePair price={x.price} interval={interval} />
                </button>
              ))}
            </div>
            <div className="b-plan-side">
              <p className="b-pane-role">Ausgewählt</p>
              <h3>SecureApp {p.name}</h3>
              <PricePair price={p.price} interval={interval} />
              <p className="b-sub">Add-ons</p>
              <ul className="b-addons">
                {addons.map((a) => <li key={a.id}><span>{a.name}</span><PricePair price={a.price} interval={interval} /></li>)}
              </ul>
              <Link className="btn btn-primary" to="/preise">Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link>
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
