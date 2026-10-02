import { Link } from 'react-router-dom'
import BHead from './BHead'
import { addons, consumerPlans, formatEur } from '../../data/pricing'
import { modules, steps } from '../modules'

const planFor: Record<string, string> = {
  free: 'Zum Kennenlernen von SecureApp.',
  pro: 'Für den dauerhaften Schutz deines Geräts.',
  ki: 'Für alle, die Funde erklärt bekommen und konkrete Schritte erhalten wollen.',
}
const stepText = [
  'SecureApp prüft Apps und Verbindungen und meldet Auffälliges.',
  'Die KI übersetzt den Fund in verständliche Sprache.',
  'Du siehst, wie ernst die Lage ist und was auf dem Spiel steht.',
  'Du erhältst konkrete Handlungsmöglichkeiten.',
]

export default function PrivatePage() {
  return (
    <>
      <BHead title="HeidSec für Privatkunden" lead="Ein Sicherheitssystem für dein Smartphone: erkennt Auffälliges, erklärt es verständlich, bewertet das Risiko und zeigt, was du tun kannst.">
        <Link className="btn btn-primary" to="/preise">Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link>
        <Link className="btn btn-ghost" to="/secureapp">App entdecken</Link>
      </BHead>

      <section className="bp-sec" aria-labelledby="pv-1">
        <div className="wrap">
          <header className="b-sec-head"><p className="b-label">Mehr als ein Scanner</p><h2 id="pv-1">Erkennen. Erklären. Bewerten. Handeln.</h2></header>
          <ol className="bp-flow">
            {steps.map((s, n) => <li key={s.key}><b>{s.label}</b><span>{stepText[n]}</span></li>)}
          </ol>
          <p className="bp-note dim">Erklären und Handeln übernimmt die KI-Sicherheitsassistenz im KI-Tarif.</p>
        </div>
      </section>

      <section className="bp-sec" aria-labelledby="pv-2">
        <div className="wrap">
          <header className="b-sec-head"><p className="b-label">Was HeidSec schützt</p><h2 id="pv-2">Sechs Bausteine, ein Konto</h2></header>
          <ul className="bp-rows two">
            {modules.map((m) => (
              <li key={m.id}>
                <span className="bp-ic" aria-hidden="true">{m.icon}</span>
                <span className="bp-row-tx"><b>{m.label}</b><small>{m.role}</small></span>
                {m.badge && <span className="chip info">{m.badge}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bp-sec" aria-labelledby="pv-3">
        <div className="wrap">
          <header className="b-sec-head"><p className="b-label">Welcher Tarif passt</p><h2 id="pv-3">Drei Tarife für SecureApp</h2></header>
          <ul className="bp-rows">
            {consumerPlans.map((p) => (
              <li key={p.id}>
                <span className={`bp-plan ${p.id}`}>{p.name}</span>
                <span className="bp-row-tx"><b>{planFor[p.id]}</b></span>
                <span className="bp-price end">
                  <span className="bp-main"><strong>{formatEur(p.price.month)}</strong>{p.price.month !== 0 && <small className="bp-unit">/ Monat</small>}</span>
                  {p.price.year !== 0 && <em>{formatEur(p.price.year)} / Jahr</em>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bp-sec" aria-labelledby="pv-4">
        <div className="wrap">
          <header className="b-sec-head"><p className="b-label">Zusatzmodule</p><h2 id="pv-4">Separat buchbar</h2></header>
          <ul className="bp-rows">
            {addons.map((a) => {
              const m = modules.find((x) => x.id === a.id)!
              return (
                <li key={a.id}>
                  <span className="bp-ic" aria-hidden="true">{m.icon}</span>
                  <span className="bp-row-tx"><b>{a.name}</b><small>{m.role}</small></span>
                  <span className="bp-price end"><span className="bp-main"><strong>{formatEur(a.price.month)}</strong><small className="bp-unit">/ Monat</small></span><em>{formatEur(a.price.year)} / Jahr</em></span>
                </li>
              )
            })}
          </ul>
          <p className="bp-note dim">Zusatzmodule werden einzeln gebucht und sind unabhängig vom gewählten Tarif.</p>
        </div>
      </section>

      <section className="bp-sec bp-end">
        <div className="wrap">
          <div className="b-cta">
            <div><h2>Alle Preise im Detail</h2><p className="dim">Monatlich oder jährlich, Tarife und Zusatzmodule im Vergleich.</p></div>
            <div className="b-actions"><Link className="btn btn-primary" to="/preise">Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link><Link className="btn btn-ghost" to="/secureapp">App entdecken</Link></div>
          </div>
        </div>
      </section>
    </>
  )
}
