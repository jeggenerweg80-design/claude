import { useEffect, type ReactNode } from 'react'

export default function BHead({ title, lead, children }: { title: ReactNode; lead: string; children?: ReactNode }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <header className="bp-head">
      <div className="wrap">
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children && <div className="b-actions">{children}</div>}
      </div>
    </header>
  )
}
