import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { productNav } from '../data/nav'

export default function BFooter() {
  return (
    <footer className="b-ftr">
      <div className="wrap b-ftr-in">
        <Link to="/" aria-label="HeidSec Startseite"><Logo /></Link>
        <nav aria-label="Produkte">{productNav.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}</nav>
        <nav aria-label="Rechtliches">
          <Link to="/legal/impressum">Impressum</Link><Link to="/legal/datenschutz">Datenschutz</Link><Link to="/legal/agb">AGB</Link><Link to="/legal/widerruf">Widerruf</Link>
          <Link to="/sicherheit">Sicherheit</Link><Link to="/faq">FAQ</Link><Link to="/downloads">Downloads</Link>
        </nav>
        <span className="b-ftr-c">© {new Date().getFullYear()} HeidSec</span>
      </div>
    </footer>
  )
}
