import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { primaryNav } from '../data/nav'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  return (
    <header className={`hdr ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="wrap hdr-in">
        <Link to="/" aria-label="HeidSec Startseite"><Logo /></Link>
        <nav className="nav" aria-label="Hauptnavigation">
          {primaryNav.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
        </nav>
        <div className="hdr-cta">
          <Link className="btn btn-ghost btn-sm" to="/login">Login</Link>
          <Link className="btn btn-primary btn-sm" to="/preise">Tarife ansehen</Link>
          <button className="menu-btn" aria-expanded={open} aria-controls="drawer" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} onClick={() => setOpen((o) => !o)}>
            <span />
          </button>
        </div>
      </div>
      <div className="drawer" id="drawer" aria-hidden={!open}>
        <nav className="drawer-in" aria-label="Mobile Navigation" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
          {primaryNav.map((n) => <Link key={n.to} to={n.to} tabIndex={open ? 0 : -1}>{n.label}</Link>)}
          <Link to="/faq" tabIndex={open ? 0 : -1}>FAQ</Link>
          <Link to="/downloads" tabIndex={open ? 0 : -1}>Downloads</Link>
          <Link to="/login" tabIndex={open ? 0 : -1}>Login</Link>
          <Link className="btn btn-primary" to="/preise" tabIndex={open ? 0 : -1}>Tarife ansehen</Link>
        </nav>
      </div>
    </header>
  )
}
