import { useState } from 'react'

const layers = [
  { id: 'scan', label: 'Scan', sub: 'SecureApp' },
  { id: 'comm', label: 'Kommunikation', sub: 'Messenger · VPN' },
  { id: 'mail', label: 'Mail', sub: 'MailGuard' },
  { id: 'identity', label: 'Identität', sub: 'Vault' },
]

/** Hero-Visual: HeidSec als geschichtetes Schutzsystem (CSS 3D, reines HTML/CSS, keine Zahlen). */
export default function CommandCenter() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <div className="cc" role="group" aria-label="Schutzebenen der HeidSec-Plattform">
      <div className="cc-stage" aria-hidden="true">
        <div className="cc-halo" />
        <div className="cc-stack">
          {layers.map((l, i) => (
            <div key={l.id} className={`cc-layer ${active === l.id ? 'is-active' : ''}`} style={{ ['--i' as string]: i }}>
              <i className="cc-grid" />
              {i === 0 && <i className="cc-sweep" />}
              <i className="cc-node n1" /><i className="cc-node n2" /><i className="cc-node n3" />
            </div>
          ))}
        </div>
        <div className="cc-core"><span>KI</span></div>
      </div>
      <ul className="cc-legend">
        {layers.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(l.id)} onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(l.id)} onBlur={() => setActive(null)}
              className={active === l.id ? 'on' : ''}
            >
              <b>{l.label}</b><small>{l.sub}</small>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
