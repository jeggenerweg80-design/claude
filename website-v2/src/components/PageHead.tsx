import { useEffect, type ReactNode } from 'react'

export default function PageHead({ title, lead, children }: { title: ReactNode; lead?: string; children?: ReactNode }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <header className="phead">
      <div className="wrap">
        <h1 className="ph-title">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  )
}
