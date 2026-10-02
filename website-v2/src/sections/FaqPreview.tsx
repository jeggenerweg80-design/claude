import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import FaqList from './FaqList'
import { faq } from '../data/faq'

export default function FaqPreview() {
  return (
    <section className="section" aria-labelledby="faq-h">
      <div className="wrap faq-grid">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-h" className="h2">Kurz beantwortet.</h2>
          <p style={{ marginTop: 20 }}><Link className="link" to="/faq">Alle Fragen <span className="arrow" aria-hidden="true">→</span></Link></p>
        </Reveal>
        <Reveal delay={100}><FaqList items={faq.slice(0, 4)} /></Reveal>
      </div>
    </section>
  )
}
