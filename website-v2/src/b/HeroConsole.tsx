import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MediaSlot from '../components/MediaSlot'
import { moduleById, steps, type ModuleId } from './modules'

type NodeId = Exclude<ModuleId, 'secureapp'>
/** Knotenpositionen in % der Bühne (Mittelpunkt). Das Telefon (SecureApp) sitzt bei 50/52. */
const nodes: Array<{ id: NodeId; x: number; y: number; status: string }> = [
  { id: 'vault', x: 17, y: 60, status: 'Sichere Ablage' },
  { id: 'vpn', x: 27, y: 82, status: 'Netzwerkschutz' },
  { id: 'mailguard', x: 83, y: 24, status: 'Mail-Schutz' },
  { id: 'messenger', x: 87, y: 50, status: 'Text und Voice' },
  { id: 'ki', x: 76, y: 78, status: 'Erklären und Handeln' },
]
const CX = 50, CY = 52

export default function HeroConsole() {
  const [step, setStep] = useState(0)
  const [hover, setHover] = useState<ModuleId | null>(null)
  const [playing, setPlaying] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!playing || paused || hover || !visible) return
    const t = window.setInterval(() => setStep((s) => (s + 1) % steps.length), 4800)
    return () => window.clearInterval(t)
  }, [playing, paused, hover, visible])

  const cur = steps[step]
  const focusIds: ModuleId[] = hover ? [hover] : cur.focus === 'all' ? ['secureapp', 'ki', 'messenger', 'mailguard', 'vpn', 'vault'] : cur.focus
  const hovered = hover ? moduleById(hover) : null

  return (
    <section ref={root} className="b-hero" aria-labelledby="b-h1" onMouseLeave={() => setHover(null)}>
      <div className="b-hero-bg" aria-hidden="true">
        <MediaSlot slot="hero" ratio="16/9" className="b-hero-media" posterOnlyOnMobile />
      </div>

      <div className="b-stage">
        {/* Verbindungslinien: alle Module laufen in SecureApp zusammen */}
        <svg className="b-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {nodes.map((n) => {
            const mx = (n.x + CX) / 2, my = Math.min(n.y, CY) - 8
            return (
              <path key={n.id} d={`M${n.x} ${n.y} Q${mx} ${my} ${CX} ${CY}`} vectorEffect="non-scaling-stroke"
                className={`b-link ${focusIds.includes(n.id) ? 'on' : ''} ${n.id === 'mailguard' && step === 0 && !hover ? 'alert' : ''}`} />
            )
          })}
        </svg>

        <div className="b-copy">
          <h1 id="b-h1">Sicherheit als <span>System</span>.</h1>
          <p>HeidSec verbindet SecureApp, MailGuard, Vault, VPN und Messenger zu einer Plattform. Die KI erklärt, was passiert ist, und zeigt, was du tun kannst.</p>
          <div className="b-actions">
            <Link className="btn btn-primary" to="/preise">Tarife ansehen <span className="arrow" aria-hidden="true">→</span></Link>
            <a className="btn btn-ghost" href="#plattform">Plattform ansehen</a>
          </div>
        </div>

        <div className={`b-device ${focusIds.includes('secureapp') ? 'on' : ''}`}>
          <i className="b-ring r1" /><i className="b-ring r2" />
          <img src="/media/phone-secureapp.webp" alt="SecureApp auf dem Smartphone" width="434" height="1176" decoding="async" />
          <span className="b-device-tag">SecureApp</span>
        </div>

        {nodes.map((n) => {
          const m = moduleById(n.id)
          const on = focusIds.includes(n.id)
          return (
            <button key={n.id} type="button" className={`b-node ${on ? 'on' : ''} ${n.id === 'mailguard' && step === 0 && !hover ? 'alert' : ''}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              onMouseEnter={() => setHover(n.id)} onFocus={() => setHover(n.id)} onBlur={() => setHover(null)}
              onClick={() => document.getElementById('plattform')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label={`${m.label}: ${n.status}`}>
              <span className="b-node-ic">{m.icon}</span>
              <span className="b-node-tx"><b>{m.label}</b><small>{n.status}</small></span>
            </button>
          )
        })}
      </div>

      <div className="wrap b-rail-wrap">
        <div className="b-rail" onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ol className="b-steps" aria-label="So arbeitet HeidSec">
            {steps.map((s, n) => (
              <li key={s.key}>
                <button type="button" className={n === step ? 'on' : n < step ? 'done' : ''} aria-current={n === step ? 'step' : undefined}
                  onClick={() => { setStep(n); setHover(null) }}>
                  <i aria-hidden="true" />{s.label}
                </button>
              </li>
            ))}
          </ol>
          <div className="b-readout" aria-live="polite">
            {hovered ? (
              <>
                <p className="b-readout-k">{hovered.role}</p>
                <p className="b-readout-t">{hovered.label}</p>
                <p className="b-readout-d">{hovered.summary}</p>
              </>
            ) : (
              <>
                <p className="b-readout-k">Beispielereignis · Schritt {step + 1} von {steps.length} <span className={`chip ${cur.chip.tone}`}>{cur.chip.label}</span></p>
                <p className="b-readout-t">{cur.title}</p>
                <p className="b-readout-d">{cur.text}</p>
              </>
            )}
          </div>
          <button type="button" className="b-play" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing} aria-label={playing ? 'Beispielablauf anhalten' : 'Beispielablauf abspielen'}>
            {playing ? 'Pause' : 'Abspielen'}
          </button>
        </div>
      </div>
    </section>
  )
}
