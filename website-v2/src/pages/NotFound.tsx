import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

export default function NotFound() {
  return <PageHead eyebrow="404" title="Seite nicht gefunden.">
    <p><Link className="btn btn-primary" to="/">Zur Startseite</Link></p>
  </PageHead>
}
