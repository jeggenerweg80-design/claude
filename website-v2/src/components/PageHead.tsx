import { useEffect, type ReactNode } from 'react'

export default function PageHead({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: string; children?: ReactNode }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <header className="phead">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="ph-title">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  )
}
