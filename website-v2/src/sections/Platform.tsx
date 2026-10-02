import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MediaSlot from '../components/MediaSlot'
import { products } from '../data/products'

export default function Platform() {
  return (
    <section className="section" aria-labelledby="plat-h">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Eine Plattform</p>
          <h2 id="plat-h" className="h2">Fünf Bausteine. <span className="grad">Ein Konto.</span></h2>
        </Reveal>
        <div className="prod-list">
          {products.map((p, n) => (
            <Reveal key={p.id} as="article" className={`prod ${n % 2 ? 'flip' : ''}`}>
              <div className="prod-copy">
                <p className="eyebrow">{p.kicker}</p>
                <h3 className="prod-h"><span className="prod-name">{p.name}</span> {p.headline}</h3>
                <p className="dim">{p.summary}</p>
                <ul className="ticks">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                <Link className="link" to={p.path}>Mehr zu {p.name} <span className="arrow" aria-hidden="true">→</span></Link>
              </div>
              <MediaSlot slot={p.mediaSlot} ratio="4/3" className="prod-media">
                <div className="media-fallback"><span className="prod-glyph" aria-hidden="true">{p.name[0]}</span></div>
              </MediaSlot>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
