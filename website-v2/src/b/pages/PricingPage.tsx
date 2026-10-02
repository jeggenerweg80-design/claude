import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BHead from './BHead'
import IntervalToggle, { type Interval } from '../../components/IntervalToggle'
import { AddonRows, BusinessConfigurator, PrivateComparison } from '../pricing/blocks'
import { contactHref } from '../../config/site'

export default function PricingPage() {
  const [params, setParams] = useSearchParams()
  const kunde = params.get('kunde') === 'business' ? 'business' : 'privat'
  const [interval, setInterval] = useState<Interval>('month')
  const setKunde = (k: 'privat' | 'business') => setParams(k === 'business' ? { kunde: 'business' } : {}, { replace: true })

  return (
    <>
      <BHead title="Preise" lead="Alle Tarife auf einen Blick. Preise in Euro, monatlich oder jährlich.">
        <div className="toggle" role="group" aria-label="Kundenart">
          <button type="button" aria-pressed={kunde === 'privat'} onClick={() => setKunde('privat')}>Privatkunden</button>
          <button type="button" aria-pressed={kunde === 'business'} onClick={() => setKunde('business')}>Geschäftskunden</button>
        </div>
        <IntervalToggle value={interval} onChange={setInterval} />
      </BHead>

      {kunde === 'privat' ? (
        <>
          <section className="bp-sec" aria-labelledby="bp-a">
            <div className="wrap">
              <header className="b-sec-head"><p className="b-label">A · Tarife</p><h2 id="bp-a">SecureApp für Privatkunden</h2></header>
              <PrivateComparison interval={interval} />
            </div>
          </section>
          <section className="bp-sec" aria-labelledby="bp-b">
            <div className="wrap">
              <header className="b-sec-head"><p className="b-label">B · Zusatzmodule</p><h2 id="bp-b">Separat buchbar</h2></header>
              <AddonRows interval={interval} />
              <p className="bp-note dim">Zusatzmodule werden einzeln gebucht und sind unabhängig vom gewählten Tarif.</p>
            </div>
          </section>
        </>
      ) : (
        <section className="bp-sec" aria-labelledby="bp-c">
          <div className="wrap">
            <header className="b-sec-head"><p className="b-label">C · Geschäftskunden</p><h2 id="bp-c">Business Complete nach Gerätezahl</h2></header>
            <BusinessConfigurator interval={interval} />
          </div>
        </section>
      )}

      <section className="bp-sec bp-end">
        <div className="wrap">
          <div className="b-cta">
            <div>
              <h2>{kunde === 'privat' ? 'Mit SecureApp starten' : 'Angebot für dein Team'}</h2>
              <p className="dim">Der Online-Kauf ist noch nicht aktiv. Wir ergänzen ihn, sobald er bereitsteht.</p>
            </div>
            <div className="b-actions">
              {kunde === 'privat'
                ? <><Link className="btn btn-primary" to="/secureapp">App entdecken</Link><Link className="btn btn-ghost" to="/privatkunden">Mehr für Privatkunden</Link></>
                : <><a className="btn btn-primary" href={contactHref}>Angebot anfragen</a><Link className="btn btn-ghost" to="/geschaeftskunden">Mehr für Unternehmen</Link></>}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
