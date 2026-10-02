import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MediaSlot from '../components/MediaSlot'

export default function FinalCta() {
  return (
    <section className="section final" aria-labelledby="cta-h">
      <div className="wrap">
        <Reveal className="final-in">
          <MediaSlot slot="cta" className="final-bg" ratio="21/9" />
          <h2 id="cta-h" className="h2">Sicherheit, die du <span className="grad">verstehst</span>.</h2>
          <p className="lead">Starte mit SecureApp FREE oder wähle den Tarif, der zu dir passt.</p>
          <div className="hero-actions center">
            <Link className="btn btn-primary" to="/preise">Jetzt starten <span className="arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost" to="/geschaeftskunden">Für Unternehmen</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
