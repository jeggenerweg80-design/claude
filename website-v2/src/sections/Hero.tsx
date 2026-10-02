import { useRef } from 'react'
import { Link } from 'react-router-dom'
import CommandCenter from '../components/CommandCenter'
import MediaSlot from '../components/MediaSlot'
import { useHeroDepth } from '../hooks/useHeroDepth'

/**
 * Hero in Ebenen (hinten nach vorn): Medienbett (langsam) > Schutzebenen (Subjekt) > Lichtatmosphäre (vorn).
 * Text liegt bei 1x. Kein Verdunkelungs-Overlay: das Medienbett wird per Maske vom Textbereich weggeblendet.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  useHeroDepth(ref)
  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-plane hero-plane--far" aria-hidden="true">
        <MediaSlot slot="hero" ratio="16/9" className="hero-media" posterOnlyOnMobile />
      </div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Security-Plattform</p>
          <h1 id="hero-title" className="hero-title">
            <span>Nicht nur ein Fund.</span>
            <span className="grad">Eine Antwort.</span>
          </h1>
          <p className="lead">HeidSec verbindet Scan, Identität, Kommunikation und Mail und erklärt, was passiert ist und was du tun kannst.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/preise">Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost" to="/secureapp">Plattform entdecken</Link>
          </div>
        </div>
        <div className="hero-plane hero-plane--mid">
          <CommandCenter />
        </div>
      </div>
      <div className="hero-plane hero-plane--near" aria-hidden="true" />
    </section>
  )
}
