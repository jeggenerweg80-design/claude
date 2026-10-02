import { formatEur, type Price } from '../data/pricing'
export default function PricePair({ price, interval }: { price: Price; interval: 'month' | 'year' }) {
  const v = price[interval]
  return (
    <span className="price">
      <strong>{formatEur(v)}</strong>
      {v !== 0 && <small> / {interval === 'month' ? 'Monat' : 'Jahr'}</small>}
    </span>
  )
}
