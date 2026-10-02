import { Link } from 'react-router-dom'

export default function CtaBar() {
  return (
    <section className="b-sec b-cta-sec" aria-labelledby="b-cta-h">
      <div className="wrap">
        <div className="b-cta">
          <div><h2 id="b-cta-h">Sicherheit, die du verstehst.</h2><p className="dim">Starte mit SecureApp FREE oder wähle den Tarif, der zu dir passt.</p></div>
          <div className="b-actions">
            <Link className="btn btn-primary" to="/preise">Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost" to="/geschaeftskunden">Für Unternehmen</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
