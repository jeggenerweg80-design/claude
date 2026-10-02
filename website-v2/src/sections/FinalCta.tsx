import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MediaSlot from '../components/MediaSlot'

/** Abschluss: Text führend links, Medium rechts und zum Text hin ausgeblendet. Löst auf und hält. */
export default function FinalCta() {
  return (
    <section className="final" aria-labelledby="cta-h">
      <MediaSlot slot="cta" className="final-bg" ratio="21/9" />
      <div className="wrap final-in">
        <Reveal className="final-copy">
          <h2 id="cta-h" className="h2">Sicherheit, die du <span className="grad">verstehst</span>.</h2>
          <p className="lead">Starte mit SecureApp FREE oder wähle den Tarif, der zu dir passt.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/preise">Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost" to="/geschaeftskunden">Für Unternehmen</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
