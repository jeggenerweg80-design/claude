import { useState } from 'react'
import PageHead from '../components/PageHead'
import IntervalToggle, { type Interval } from '../components/IntervalToggle'
import { BusinessTable } from './Pricing'
import { businessKiPoolPerDevice } from '../data/pricing'
import { contactHref } from '../config/site'

export default function Business() {
  const [interval, setInterval] = useState<Interval>('month')
  return (
    <>
      <PageHead eyebrow="Geschäftskunden" title={<>Eine Plattform für <span className="grad">jedes Gerät im Unternehmen</span>.</>} lead="Business PRO Complete und Business KI Complete – jeweils inklusive Messenger und VPN, für 10 bis 50 Geräte.">
        <IntervalToggle value={interval} onChange={setInterval} />
      </PageHead>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <BusinessTable interval={interval} />
          <div className="plans mt">
            <div className="plan"><h3>Business PRO Complete</h3><p className="dim">Enthält Messenger und VPN.</p></div>
            <div className="plan feat"><h3>Business KI Complete</h3><p className="dim">Enthält Messenger und VPN sowie {businessKiPoolPerDevice} KI-Analysen pro Gerät und Monat als gemeinsamer Unternehmenspool.</p></div>
          </div>
          <div id="anfrage" className="plan mt">
            <h3>Mehr als 50 Geräte?</h3>
            <p className="dim">Dafür erstellen wir ein individuelles Angebot.</p>
            <a className="btn btn-primary btn-sm" href={contactHref}>Anfrage stellen</a>
          </div>
        </div>
      </section>
    </>
  )
}
