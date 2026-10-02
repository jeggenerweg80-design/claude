import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../components/Logo'
import { primaryNav } from '../data/nav'

export default function BHeader() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])
  const close = () => setOpen(false)
  return (
    <header className={`b-hdr ${open ? 'open' : ''}`}>
      <div className="wrap b-hdr-in">
        <Link to="/" aria-label="HeidSec Startseite" onClick={close}><Logo /></Link>
        <nav className="b-nav" aria-label="Hauptnavigation">
          {primaryNav.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
        </nav>
        <div className="b-hdr-cta">
          <Link className="btn btn-ghost btn-sm b-login" to="/login">Login</Link>
          <Link className="btn btn-primary btn-sm" to="/preise">Tarife ansehen</Link>
          <button type="button" className="b-menu" aria-expanded={open} aria-controls="b-drawer" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} onClick={() => setOpen((o) => !o)}><span /></button>
        </div>
      </div>
      <div className="b-drawer" id="b-drawer" aria-hidden={!open}>
        <nav className="wrap" aria-label="Mobile Navigation" onClick={(e) => (e.target as HTMLElement).closest('a') && close()}>
          {primaryNav.map((n) => <Link key={n.to} to={n.to} tabIndex={open ? 0 : -1}>{n.label}</Link>)}
          <Link to="/faq" tabIndex={open ? 0 : -1}>FAQ</Link>
          <Link to="/downloads" tabIndex={open ? 0 : -1}>Downloads</Link>
          <Link to="/login" tabIndex={open ? 0 : -1}>Login</Link>
        </nav>
      </div>
    </header>
  )
}
