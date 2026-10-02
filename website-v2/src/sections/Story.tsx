import { useState } from 'react'
import Reveal from '../components/Reveal'

const stages = [
  { k: 'Erkennen', title: 'Etwas Auffälliges taucht auf', body: 'Eine Nachricht enthält einen Link, den HeidSec als verdächtig einstuft.' },
  { k: 'Erklären', title: 'Die KI übersetzt den Fund', body: 'Statt eines Fachbegriffs erhältst du eine Erklärung in normaler Sprache: worum es geht und warum es relevant ist.' },
  { k: 'Bewerten', title: 'Das Risiko wird eingeordnet', body: 'Du siehst, wie ernst die Lage ist – und was auf dem Spiel steht, wenn du nichts tust.' },
  { k: 'Handeln', title: 'Du bekommst konkrete Schritte', body: 'Aus der Bewertung werden Handlungsmöglichkeiten, die du direkt umsetzen kannst.' },
]

export default function Story() {
  const [i, setI] = useState(0)
  const s = stages[i]
  return (
    <section className="section story" id="ki" aria-labelledby="story-h">
      <div className="wrap story-grid">
        <Reveal>
          <p className="eyebrow">KI-Sicherheitsassistenz</p>
          <h2 id="story-h" className="h2">Von der Warnung zur <span className="grad">Entscheidung</span>.</h2>
          <p className="lead" style={{ marginTop: 20 }}>
            Die KI ist bei HeidSec eine Assistenzschicht: Sie zeigt nicht nur, dass etwas gefunden wurde, sondern macht Sicherheitsereignisse verständlich und leitet Handlungsmöglichkeiten ab.
          </p>
          <div className="tabs" role="tablist" aria-label="Ablauf eines Sicherheitsereignisses">
            {stages.map((st, n) => (
              <button key={st.k} role="tab" id={`tab-${n}`} aria-selected={i === n} aria-controls="story-panel" tabIndex={i === n ? 0 : -1}
                onClick={() => setI(n)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') setI((i + 1) % 4)
                  if (e.key === 'ArrowLeft') setI((i + 3) % 4)
                }}>
                <span>{n + 1}</span>{st.k}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="panel" id="story-panel" role="tabpanel" aria-labelledby={`tab-${i}`}>
            <span className="panel-tag">Illustratives Beispiel</span>
            <p className="panel-step">Schritt {i + 1} von 4 · {s.k}</p>
            <h3>{s.title}</h3>
            <p className="dim">{s.body}</p>
            <div className="panel-bar" aria-hidden="true"><i style={{ width: `${(i + 1) * 25}%` }} /></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
