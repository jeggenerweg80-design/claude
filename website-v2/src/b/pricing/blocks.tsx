import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addons, businessKiPoolPerDevice, businessTiers, consumerPlans, formatEur, type Price } from '../../data/pricing'
import type { Interval } from '../../components/IntervalToggle'
import { contactHref } from '../../config/site'
import { moduleById, type ModuleId } from '../modules'

const unit = (i: Interval) => (i === 'month' ? 'Monat' : 'Jahr')
const other = (i: Interval): Interval => (i === 'month' ? 'year' : 'month')

/** Gewählter Zeitraum groß, der andere Kanon-Preis klein darunter. Alle Werte stammen unverändert aus data/pricing.ts. */
export function PriceStack({ price, interval, align = 'start' }: { price: Price; interval: Interval; align?: 'start' | 'end' }) {
  const main = price[interval]
  const alt = price[other(interval)]
  const free = main === 0 && alt === 0
  return (
    <span className={`bp-price ${align === 'end' ? 'end' : ''}`}>
      <span className="bp-main"><strong>{formatEur(main)}</strong>{!free && <small className="bp-unit">/ {unit(interval)}</small>}</span>
      {!free && <em>{formatEur(alt)} / {unit(other(interval))}</em>}
    </span>
  )
}

const Check = ({ label }: { label: string }) => (
  <span className="bp-yes"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" /></svg>{label}</span>
)
const No = () => <span className="bp-no">Nicht enthalten</span>

/** Tarifvergleich FREE / PRO / KI. Tabelle ab Tablet, darunter gestapelte Zeilen je Tarif (kein Querscrollen). */
export function PrivateComparison({ interval }: { interval: Interval }) {
  const rows: Array<{ label: string; cell: (id: 'free' | 'pro' | 'ki') => React.ReactNode }> = [
    { label: 'SecureApp', cell: () => <Check label="Enthalten" /> },
    { label: 'KI-Sicherheitsassistenz', cell: (id) => (id === 'ki' ? <span className="bp-with"><Check label="Enthalten" /><small>20 KI-Analysen / Monat</small></span> : <No />) },
    { label: 'Parental Control', cell: (id) => (id === 'free' ? <No /> : <Check label="Enthalten" />) },
    { label: 'VPN, MailGuard, Vault', cell: () => <span className="bp-dim">Separate Add-ons</span> },
  ]
  return (
    <div className="bp-compare">
      <table className="bp-table">
        <caption className="sr-only">SecureApp Tarife im Vergleich</caption>
        <thead>
          <tr>
            <td />
            {consumerPlans.map((p) => (
              <th scope="col" key={p.id}><span className={`bp-plan ${p.id}`}>{p.name}</span><small>{p.tagline}</small></th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Preis</th>{consumerPlans.map((p) => <td key={p.id}><PriceStack price={p.price} interval={interval} /></td>)}</tr>
          {rows.map((r) => (
            <tr key={r.label}><th scope="row">{r.label}</th>{consumerPlans.map((p) => <td key={p.id}>{r.cell(p.id)}</td>)}</tr>
          ))}
        </tbody>
      </table>

      <div className="bp-stack">
        {consumerPlans.map((p) => (
          <section key={p.id} className="bp-tier" aria-label={`SecureApp ${p.name}`}>
            <header><span className={`bp-plan ${p.id}`}>{p.name}</span><small>{p.tagline}</small></header>
            <dl>
              <div><dt>Preis</dt><dd><PriceStack price={p.price} interval={interval} align="end" /></dd></div>
              {rows.map((r) => <div key={r.label}><dt>{r.label}</dt><dd>{r.cell(p.id)}</dd></div>)}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}

const addonText: Record<string, string> = {
  vpn: 'Verschlüsselte Verbindung, die deinen Standort privat hält.',
  mailguard: 'Schutz vor Phishing, Betrug und schädlichen Anhängen.',
  vault: 'Verschlüsselte Ablage für Dokumente und Zugänge.',
}

/** Zusatzmodule als Listenzeilen, klar getrennt von den Tarifen. */
export function AddonRows({ interval }: { interval: Interval }) {
  return (
    <ul className="bp-rows">
      {addons.map((a) => {
        const m = moduleById(a.id as ModuleId)
        return (
          <li key={a.id}>
            <span className="bp-ic" aria-hidden="true">{m.icon}</span>
            <span className="bp-row-tx"><b>{a.name}</b><small>{addonText[a.id]}</small></span>
            <PriceStack price={a.price} interval={interval} align="end" />
          </li>
        )
      })}
    </ul>
  )
}

type Devices = 10 | 15 | 20 | 30 | 50 | 'more'

/** Business: Geräteanzahl wählen, PRO und KI direkt vergleichen. */
export function BusinessConfigurator({ interval }: { interval: Interval }) {
  const [sel, setSel] = useState<Devices>(10)
  const tier = typeof sel === 'number' ? businessTiers.find((t) => t.devices === sel)! : null
  const common = ['Zentrale Sicherheitsplattform', 'Geräteverwaltung', 'Security-Funktionen', 'Messenger', 'VPN']
  return (
    <div className="bp-biz">
      <div className="bp-devsel" role="radiogroup" aria-label="Anzahl Geräte">
        <span className="bp-devlabel">Geräte</span>
        {([...businessTiers.map((t) => t.devices), 'more'] as Devices[]).map((d) => (
          <button key={d} type="button" role="radio" aria-checked={sel === d} onClick={() => setSel(d)}>{d === 'more' ? 'Mehr als 50' : d}</button>
        ))}
      </div>

      {tier ? (
        <div className="bp-lines">
          <section className="bp-line" aria-label="Business PRO Complete">
            <p className="b-label">Business PRO Complete</p>
            <PriceStack price={tier.pro} interval={interval} />
            <p className="bp-for">{tier.devices} Geräte</p>
            <ul className="ticks">{common.map((c) => <li key={c}>{c}</li>)}</ul>
          </section>
          <section className="bp-line ki" aria-label="Business KI Complete">
            <p className="b-label">Business KI Complete</p>
            <PriceStack price={tier.ki} interval={interval} />
            <p className="bp-for">{tier.devices} Geräte</p>
            <ul className="ticks">
              {common.map((c) => <li key={c}>{c}</li>)}
              <li>Gemeinsames KI-Kontingent: {tier.devices * businessKiPoolPerDevice} KI-Analysen pro Monat</li>
            </ul>
          </section>
        </div>
      ) : (
        <div className="bp-more">
          <div>
            <h3>Mehr als 50 Geräte</h3>
            <p className="dim">Für größere Teams erstellen wir ein individuelles Angebot.</p>
          </div>
          <a className="btn btn-primary" href={contactHref}>Angebot anfragen</a>
        </div>
      )}

      <p className="bp-note dim">KI-Kontingent: {businessKiPoolPerDevice} KI-Analysen pro Gerät und Monat, als gemeinsamer Pool für das gesamte Unternehmen. Beispiel: 10 Geräte = {10 * businessKiPoolPerDevice} KI-Analysen pro Monat.</p>

      <table className="bp-matrix">
        <caption className="sr-only">Business-Preise nach Gerätezahl</caption>
        <thead><tr><th scope="col">Geräte</th><th scope="col">PRO Complete</th><th scope="col">KI Complete</th></tr></thead>
        <tbody>
          {businessTiers.map((t) => (
            <tr key={t.devices} className={sel === t.devices ? 'on' : ''}>
              <th scope="row"><button type="button" onClick={() => setSel(t.devices as Devices)} aria-label={`${t.devices} Geräte auswählen`} aria-pressed={sel === t.devices}>{t.devices}</button></th>
              <td><PriceStack price={t.pro} interval={interval} /></td>
              <td><PriceStack price={t.ki} interval={interval} /></td>
            </tr>
          ))}
          <tr className={sel === 'more' ? 'on' : ''}>
            <th scope="row"><button type="button" onClick={() => setSel('more')} aria-pressed={sel === 'more'}>&gt; 50</button></th>
            <td colSpan={2}><a className="link" href={contactHref}>Individuelles Angebot anfragen</a></td>
          </tr>
        </tbody>
      </table>
      <p className="bp-cta-row"><Link className="link" to="/geschaeftskunden">Mehr zu Business <span className="arrow" aria-hidden="true">→</span></Link></p>
    </div>
  )
}
