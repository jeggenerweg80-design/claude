import { Link } from 'react-router-dom'
import CommandCenter from '../components/CommandCenter'
import MediaSlot from '../components/MediaSlot'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <MediaSlot slot="hero" ratio="16/9" className="hero-media" posterOnlyOnMobile />
        <div className="hero-veil" />
      </div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Security-Plattform</p>
          <h1 id="hero-title" className="hero-title">
            Nicht nur ein Fund.
            <span className="grad"> Eine Antwort.</span>
          </h1>
          <p className="lead">
            HeidSec verbindet Scan, Identität, Kommunikation und Mail in einer Plattform – und erklärt dir verständlich, was passiert ist und was du jetzt tun kannst.
          </p>
          <ol className="steps" aria-label="So arbeitet HeidSec">
            <li>Erkennen</li><li>Erklären</li><li>Bewerten</li><li>Handeln</li>
          </ol>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/preise">Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost" to="/secureapp">Plattform entdecken</Link>
          </div>
        </div>
        <CommandCenter />
      </div>
    </section>
  )
}
