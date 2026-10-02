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
          <div className="stack">
            <p className="eyebrow">Preise</p>
            <h2 id="pp-h" className="h2">Einfach, offen, fair gestaffelt.</h2>
          </div>
          <IntervalToggle value={interval} onChange={setInterval} />
        </Reveal>
        {/* Linierte Tarifreihe statt Kartenraster; der mittlere Tarif trägt die Fläche */}
        <div className="rate">
          {consumerPlans.map((p, n) => (
            <Reveal key={p.id} className={`rate-col ${p.featured ? 'feat' : ''}`} delay={n * 60}>
              <h3>SecureApp {p.name}</h3>
              <PricePair price={p.price} interval={interval} />
              <p className="dim">{p.tagline}</p>
            </Reveal>
          ))}
        </div>
        <ul className="addon-row" aria-label="Add-ons">
          {addons.map((a) => (
            <li key={a.id}><b>{a.name}</b><PricePair price={a.price} interval={interval} /></li>
          ))}
        </ul>
        <p className="after"><Link className="link" to="/preise">Alle Preise inklusive Business <span className="arrow" aria-hidden="true">→</span></Link></p>
      </div>
    </section>
  )
}
