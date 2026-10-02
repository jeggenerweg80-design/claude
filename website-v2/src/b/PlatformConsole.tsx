import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MediaSlot from '../components/MediaSlot'
import { modules } from './modules'
import type { MediaSlotDef } from '../media/slots'

/** Alle sechs Bausteine in einer App-Oberfläche: Seitenleiste links, Detailfläche rechts. */
export default function PlatformConsole() {
  const [i, setI] = useState(0)
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const m = modules[i]
  const go = (n: number) => { const k = (n + modules.length) % modules.length; setI(k); refs.current[k]?.focus() }

  const def: MediaSlotDef = { sources: m.video ? [{ src: m.video, type: 'video/mp4' }] : [], poster: m.poster, alt: `${m.label} Produktloop`, maxHeight: 720 }

  return (
    <section className="b-sec" id="plattform" aria-labelledby="b-plat-h">
      <div className="wrap">
        <header className="b-sec-head">
          <p className="b-label">Plattform</p>
          <h2 id="b-plat-h">Sechs Bausteine, eine Oberfläche.</h2>
        </header>
        <div className="b-window">
          <div className="b-window-bar" aria-hidden="true"><i /><i /><i /><span>HeidSec</span></div>
          <div className="b-window-body">
            <div className="b-side" role="tablist" aria-orientation="vertical" aria-label="HeidSec Bausteine">
              {modules.map((x, n) => (
                <button key={x.id} ref={(el) => { refs.current[n] = el }} role="tab" id={`b-tab-${x.id}`} aria-selected={i === n} aria-controls="b-pane" tabIndex={i === n ? 0 : -1}
                  onClick={() => setI(n)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) }
                    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) }
                    if (e.key === 'Home') { e.preventDefault(); go(0) }
                    if (e.key === 'End') { e.preventDefault(); go(modules.length - 1) }
                  }}>
                  <span className="b-side-ic">{x.icon}</span>
                  <span className="b-side-tx"><b>{x.label}</b><small>{x.role}</small></span>
                </button>
              ))}
            </div>
            <div className="b-pane" id="b-pane" role="tabpanel" aria-labelledby={`b-tab-${m.id}`}>
              <MediaSlot key={m.id} slot={m.id} def={def} ratio="16/9" className="b-pane-media" posterOnlyOnMobile />
              <div className="b-pane-copy" key={`c-${m.id}`}>
                <p className="b-pane-role">{m.role}</p>
                <h3>{m.label}</h3>
                <p>{m.summary}</p>
                <ul className="ticks">{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <Link className="link" to={m.to}>{m.linkLabel} <span className="arrow" aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
