import { Link, useParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import NotFound from './NotFound'
import { legalDocs } from '../content/legal'

const PLACEHOLDER = /(\[MUSS VOR VERÖFFENTLICHUNG EINGETRAGEN WERDEN[^\]]*\])/g

export default function Legal() {
  const { slug } = useParams()
  const doc = legalDocs.find((d) => d.slug === slug)
  if (!doc) return <NotFound />
  const html = doc.html.replace(PLACEHOLDER, '<mark>$1</mark>')
  return (
    <>
      <PageHead eyebrow="Rechtliches" title={doc.title} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow legal">
          {html.includes('<mark>') && (
            <p className="notice" role="note">Hinweis: Markierte Platzhalter müssen vor Veröffentlichung ausgefüllt werden.</p>
          )}
          <article dangerouslySetInnerHTML={{ __html: html }} />
          <ul className="legal-nav" aria-label="Weitere rechtliche Dokumente">
            {legalDocs.filter((d) => d.slug !== slug).map((d) => <li key={d.slug}><Link to={`/legal/${d.slug}`}>{d.title}</Link></li>)}
          </ul>
        </div>
      </section>
    </>
  )
}
