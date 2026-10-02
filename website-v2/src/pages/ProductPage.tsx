import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import MediaSlot from '../components/MediaSlot'
import { getProduct, type ProductId } from '../data/products'
import { addons, consumerPlans } from '../data/pricing'
import PricePair from '../components/PricePair'

export default function ProductPage({ id }: { id: ProductId }) {
  const p = getProduct(id)
  const addon = addons.find((a) => a.id === id)
  return (
    <>
      <PageHead title={<>{p.name}. <span className="grad">{p.headline}</span></>} lead={p.summary}>
        <div className="hero-actions"><Link className="btn btn-primary" to="/preise">Preise ansehen</Link><Link className="btn btn-ghost" to="/downloads">Downloads</Link></div>
      </PageHead>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap prod-page">
          <MediaSlot slot={p.mediaSlot} ratio="16/10"><div className="media-fallback"><span className="prod-glyph" aria-hidden="true">{p.name[0]}</span></div></MediaSlot>
          <div>
            <h2 className="h3">Auf einen Blick</h2>
            <ul className="ticks">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="plan feat" style={{ marginTop: 28 }}>
              {addon ? (<><h3>{p.name} Add-on</h3><PricePair price={addon.price} interval="month" /><PricePair price={addon.price} interval="year" /></>) : id === 'secureapp' ? (
                <><h3>Tarife</h3>{consumerPlans.map((c) => <p key={c.id}>{c.name} · <PricePair price={c.price} interval="month" /></p>)}</>
              ) : (<><h3>Messenger</h3><p className="dim">Enthalten in Business PRO und Business KI.</p></>)}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
