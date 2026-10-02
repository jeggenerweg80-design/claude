import { faq } from '../data/faq'

export default function FaqList({ items = faq }: { items?: typeof faq }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p className="dim">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
