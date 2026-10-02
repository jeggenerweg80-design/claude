import Reveal from '../components/Reveal'

const items = [
  ['Klare Grenzen', 'Der Messenger bietet Textchats und Voice Calls – bewusst ohne Dateien, Medien oder Videoanrufe.'],
  ['Transparente Preise', 'Alle Tarife und Add-ons stehen offen auf der Preisseite. Keine versteckten Stufen.'],
  ['Zahlung nur serverseitig bestätigt', 'Ein Kauf zählt erst, wenn er serverseitig bestätigt ist. Der Browser entscheidet nie selbst über eine Freischaltung.'],
  ['Ein Konto, ein Backend', 'Benutzer, Geräte, Lizenzen und Berechtigungen laufen zentral im HeidSec-Backend – App und Portal teilen dasselbe Konto.'],
  ['KI als Assistenz', 'Die KI erklärt und empfiehlt. Du behältst die Entscheidung.'],
]

export default function Trust() {
  return (
    <section className="section trust" aria-labelledby="trust-h">
      <div className="wrap trust-grid">
        <Reveal>
          <p className="eyebrow">Vertrauen</p>
          <h2 id="trust-h" className="h2">Prinzipien statt Superlative.</h2>
          <p className="lead" style={{ marginTop: 20 }}>Wir behaupten nur, was HeidSec tatsächlich ist und kann.</p>
        </Reveal>
        <ul className="trust-list">
          {items.map(([t, d], n) => (
            <Reveal as="li" key={t} delay={n * 60}>
              <h3>{t}</h3><p className="dim">{d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
