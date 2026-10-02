import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MediaSlot from '../components/MediaSlot'
import { getProduct, type Product } from '../data/products'

const more = (p: Product) => (
  <Link className="link" to={p.path}>Mehr zu {p.name} <span className="arrow" aria-hidden="true">→</span></Link>
)
const ticks = (p: Product) => <ul className="ticks">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
const glyph = (p: Product) => <div className="media-fallback"><span className="prod-glyph" aria-hidden="true">{p.name[0]}</span></div>

/**
 * Fünf Produkte in vier verschiedenen Layout-Familien (nie dieselbe zweimal in Folge):
 * Bühne (SecureApp) > Typo-Statement (Messenger) > Zickzack (MailGuard, Vault) > Bandszene (VPN).
 */
export default function Platform() {
  const app = getProduct('secureapp'), msg = getProduct('messenger'), mail = getProduct('mailguard'), vault = getProduct('vault'), vpn = getProduct('vpn')
  return (
    <section className="section platform" aria-labelledby="plat-h">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2 id="plat-h" className="h2">Fünf Bausteine. <span className="grad">Ein Konto.</span></h2>
        </Reveal>

        {/* 1 Bühne: breites Medium, Text spaltenweise am Rand, Medium zur Textseite hin maskiert */}
        <Reveal as="article" className="stage">
          <MediaSlot slot={app.mediaSlot} ratio="21/10" className="stage-media">{glyph(app)}</MediaSlot>
          <div className="stage-copy">
            <h3 className="prod-h"><span className="prod-name">{app.name}</span>{app.headline}</h3>
            <p className="dim">{app.summary}</p>
            {ticks(app)}
            {more(app)}
          </div>
        </Reveal>

        {/* 2 Typo-Statement: nur Schrift auf Raum, Messenger hat kein Videomaterial */}
        <Reveal as="article" className="statement">
          <h3 className="statement-h"><span className="prod-name">{msg.name}</span>{msg.headline}</h3>
          <div className="statement-side">
            <p className="dim">{msg.summary}</p>
            {ticks(msg)}
            {more(msg)}
          </div>
        </Reveal>

        {/* 3 Zickzack, maximal zweimal */}
        <div className="zig">
          {[mail, vault].map((p, n) => (
            <Reveal key={p.id} as="article" className={`prod ${n ? 'flip' : ''}`}>
              <MediaSlot slot={p.mediaSlot} ratio="4/3" className="prod-media">{glyph(p)}</MediaSlot>
              <div className="prod-copy">
                <h3 className="prod-h"><span className="prod-name">{p.name}</span>{p.headline}</h3>
                <p className="dim">{p.summary}</p>
                {ticks(p)}
                {more(p)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 4 Bandszene: volle Breite, Medium als Boden, Text führend links */}
      <Reveal as="article" className="band">
        <MediaSlot slot={vpn.mediaSlot} ratio="21/9" className="band-media">{glyph(vpn)}</MediaSlot>
        <div className="wrap band-in">
          <div className="band-copy">
            <h3 className="prod-h"><span className="prod-name">{vpn.name}</span>{vpn.headline}</h3>
            <p className="dim">{vpn.summary}</p>
            {ticks(vpn)}
            {more(vpn)}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
