import PageHead from '../components/PageHead'
import { siteConfig } from '../config/site'

export default function Downloads() {
  return (
    <>
      <PageHead title={<>SecureApp <span className="grad">herunterladen</span>.</>} lead="Die Apps sind aktuell für Android vorgesehen. Download-Links werden nach Freigabe hier veröffentlicht und später über das CMS gepflegt." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <div className="plan"><h3>Noch keine freigegebenen Links</h3><p className="dim">Im Bestand waren nur Platzhalter-Links hinterlegt, daher werden hier keine erfunden. Fragen: <a className="link" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a></p></div>
        </div>
      </section>
    </>
  )
}
