import { Link } from 'react-router-dom'
import FaqList from '../sections/FaqList'
import { faq } from '../data/faq'

const items = [
  ['Klare Grenzen', 'Der Messenger bietet Textchats und Voice Calls, bewusst ohne Dateien, Medien oder Videoanrufe.'],
  ['Offene Preise', 'Alle Tarife und Add-ons stehen auf der Preisseite. Keine versteckten Stufen.'],
  ['Zahlung nur serverseitig bestätigt', 'Ein Kauf zählt erst, wenn er serverseitig bestätigt ist. Der Browser schaltet nie selbst frei.'],
  ['Ein Konto, ein Backend', 'Benutzer, Geräte, Lizenzen und Berechtigungen laufen zentral im HeidSec-Backend.'],
  ['KI als Assistenz', 'Die KI erklärt und empfiehlt. Du behältst die Entscheidung.'],
]

export default function TrustFaq() {
  return (
    <section className="b-sec" aria-labelledby="b-trust-h">
      <div className="wrap b-duo">
        <div>
          <header className="b-sec-head"><p className="b-label">Prinzipien</p><h2 id="b-trust-h">Nur was HeidSec wirklich ist.</h2></header>
          <ul className="b-rows">
            {items.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ul>
        </div>
        <div>
          <header className="b-sec-head"><p className="b-label">FAQ</p><h2>Kurz beantwortet.</h2></header>
          <FaqList items={faq.slice(0, 4)} />
          <p className="after"><Link className="link" to="/faq">Alle Fragen <span className="arrow" aria-hidden="true">→</span></Link></p>
        </div>
      </div>
    </section>
  )
}
