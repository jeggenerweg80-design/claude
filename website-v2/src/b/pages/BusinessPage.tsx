import { useState } from 'react'
import { Link } from 'react-router-dom'
import BHead from './BHead'
import IntervalToggle, { type Interval } from '../../components/IntervalToggle'
import { BusinessConfigurator } from '../pricing/blocks'
import { contactHref } from '../../config/site'
import { businessKiPoolPerDevice } from '../../data/pricing'

const facts: Array<[string, string]> = [
  ['Zentrale Sicherheitsplattform', 'Ein Konto und eine Oberfläche für alle Geräte im Unternehmen.'],
  ['Geräteverwaltung', 'Geräte werden gemeinsam verwaltet, nicht einzeln pro Mitarbeiter.'],
  ['Klare Paketstruktur', 'Business PRO Complete und Business KI Complete, jeweils für 10, 15, 20, 30 oder 50 Geräte.'],
  ['Messenger und VPN', 'In beiden Paketen enthalten.'],
  ['Security-Funktionen', 'Schutz und Auswertung für alle verwalteten Geräte.'],
  ['Gemeinsames KI-Kontingent', `Nur Business KI: ${businessKiPoolPerDevice} KI-Analysen pro Gerät und Monat, als gemeinsamer Unternehmenspool.`],
]

export default function BusinessPage() {
  const [interval, setInterval] = useState<Interval>('month')
  return (
    <>
      <BHead title="HeidSec für Unternehmen" lead="Eine zentrale Sicherheitsplattform für alle Geräte im Team. Klare Pakete, planbare Kosten, Messenger und VPN inklusive. Geeignet für kleine und mittlere Unternehmen.">
        <Link className="btn btn-primary" to="/preise?kunde=business">Business-Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link>
        <a className="btn btn-ghost" href={contactHref}>Angebot anfragen</a>
      </BHead>

      <section className="bp-sec" aria-labelledby="bz-1">
        <div className="wrap">
          <header className="b-sec-head"><p className="b-label">Leistungsumfang</p><h2 id="bz-1">Was Unternehmen bekommen</h2></header>
          <ul className="bp-rows two">
            {facts.map(([t, d]) => <li key={t}><span className="bp-row-tx"><b>{t}</b><small>{d}</small></span></li>)}
          </ul>
        </div>
      </section>

      <section className="bp-sec" aria-labelledby="bz-2">
        <div className="wrap">
          <header className="b-sec-head row">
            <div><p className="b-label">Preise</p><h2 id="bz-2">Gerätezahl wählen, Pakete vergleichen</h2></div>
            <IntervalToggle value={interval} onChange={setInterval} />
          </header>
          <BusinessConfigurator interval={interval} />
        </div>
      </section>

      <section className="bp-sec bp-end">
        <div className="wrap">
          <div className="b-cta">
            <div><h2>Mehr als 50 Geräte?</h2><p className="dim">Wir erstellen ein individuelles Angebot. Der Online-Kauf ist noch nicht aktiv.</p></div>
            <div className="b-actions"><a className="btn btn-primary" href={contactHref}>Angebot anfragen</a><a className="btn btn-ghost" href={contactHref}>Kontakt aufnehmen</a></div>
          </div>
        </div>
      </section>
    </>
  )
}
