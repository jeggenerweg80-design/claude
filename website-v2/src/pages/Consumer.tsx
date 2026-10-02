import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { consumerPlans, addons } from '../data/pricing'
import PricePair from '../components/PricePair'

export default function Consumer() {
  return (
    <>
      <PageHead title={<>SecureApp für <span className="grad">dein Zuhause</span>.</>} lead="Drei Tarife, drei Add-ons, ein Konto." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="plans">{consumerPlans.map((p) => <div key={p.id} className={`plan ${p.featured ? 'feat' : ''}`}><h3>{p.name}</h3><p className="dim">{p.tagline}</p><PricePair price={p.price} interval="month" /><PricePair price={p.price} interval="year" /></div>)}</div>
          <h2 className="h3 mt">Add-ons</h2>
          <div className="plans">{addons.map((a) => <div key={a.id} className="plan"><h3>{a.name}</h3><PricePair price={a.price} interval="month" /><PricePair price={a.price} interval="year" /></div>)}</div>
          <p className="mt"><Link className="btn btn-primary" to="/preise">Zu den Preisen</Link></p>
        </div>
      </section>
    </>
  )
}
