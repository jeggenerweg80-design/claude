import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PricePair from '../components/PricePair'
import IntervalToggle, { type Interval } from '../components/IntervalToggle'
import { consumerPlans, addons } from '../data/pricing'

export default function PricingPreview() {
  const [interval, setInterval] = useState<Interval>('month')
  return (
    <section className="section" aria-labelledby="pp-h">
      <div className="wrap">
        <Reveal className="sec-head row">
          <div>
            <p className="eyebrow">Preise</p>
            <h2 id="pp-h" className="h2">Einfach. Offen. Fair gestaffelt.</h2>
          </div>
          <IntervalToggle value={interval} onChange={setInterval} />
        </Reveal>
        <div className="plans">
          {consumerPlans.map((p) => (
            <Reveal key={p.id} className={`plan ${p.featured ? 'feat' : ''}`}>
              <h3>SecureApp {p.name}</h3>
              <p className="dim">{p.tagline}</p>
              <PricePair price={p.price} interval={interval} />
            </Reveal>
          ))}
        </div>
        <ul className="addon-row" aria-label="Add-ons">
          {addons.map((a) => (
            <li key={a.id}><b>{a.name}</b><PricePair price={a.price} interval={interval} /></li>
          ))}
        </ul>
        <p style={{ marginTop: 28 }}><Link className="link" to="/preise">Alle Preise inkl. Business <span className="arrow" aria-hidden="true">→</span></Link></p>
      </div>
    </section>
  )
}
