import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { formatEur } from '../data/pricing'

export default function Audience() {
  return (
    <section className="section split" aria-labelledby="aud-h">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Für wen</p>
          <h2 id="aud-h" className="h2">Für dich. Und für dein Unternehmen.</h2>
        </Reveal>
        <div className="aud">
          <Reveal className="aud-side">
            <h3>Privatkunden</h3>
            <p className="dim">SecureApp in drei Tarifen, erweiterbar um VPN, MailGuard und Vault.</p>
            <p className="aud-price">ab <strong>{formatEur(0)}</strong> <small>FREE</small></p>
            <Link className="link" to="/privatkunden">Privatkunden-Angebot <span className="arrow" aria-hidden="true">→</span></Link>
          </Reveal>
          <Reveal className="aud-side biz" delay={100}>
            <h3>Geschäftskunden</h3>
            <p className="dim">Business PRO Complete und Business KI Complete für 10 bis 50 Geräte – inklusive Messenger und VPN. Darüber hinaus individuell.</p>
            <p className="aud-price">ab <strong>{formatEur(59.9)}</strong> <small>/ Monat · 10 Geräte</small></p>
            <Link className="link" to="/geschaeftskunden">Geschäftskunden-Angebot <span className="arrow" aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
