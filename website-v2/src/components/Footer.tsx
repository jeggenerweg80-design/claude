import { Link } from 'react-router-dom'
import Logo from './Logo'
import { productNav } from '../data/nav'

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <Logo />
            <p className="dim" style={{ marginTop: 14, maxWidth: '34ch' }}>Eine Sicherheitsplattform: erkennen, erklären, bewerten, handeln.</p>
          </div>
          <div><h3>Produkte</h3><ul>{productNav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul></div>
          <div><h3>Angebot</h3><ul>
            <li><Link to="/privatkunden">Privatkunden</Link></li>
            <li><Link to="/geschaeftskunden">Geschäftskunden</Link></li>
            <li><Link to="/preise">Preise</Link></li>
            <li><Link to="/downloads">Downloads</Link></li>
          </ul></div>
          <div><h3>Mehr</h3><ul>
            <li><Link to="/sicherheit">Sicherheit &amp; Vertrauen</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul></div>
        </div>
        <div className="ftr-bottom">
          <span>© {new Date().getFullYear()} HeidSec</span>
          <span className="ftr-legal">
            <Link to="/legal/impressum">Impressum</Link>
            <Link to="/legal/datenschutz">Datenschutz</Link>
            <Link to="/legal/agb">AGB</Link>
            <Link to="/legal/widerruf">Widerruf</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
