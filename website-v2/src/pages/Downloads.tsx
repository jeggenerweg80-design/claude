import PageHead from '../components/PageHead'

export default function Downloads() {
  return (
    <>
      <PageHead eyebrow="Downloads" title={<>SecureApp <span className="grad">herunterladen</span>.</>} lead="Die Download-Links werden aus dem Bestand übernommen, sobald sie freigegeben sind." />
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap narrow"><div className="plan"><h3>Noch keine Links hinterlegt</h3><p className="dim">Dieser Bereich wird später vom CMS (Downloads) gespeist.</p></div></div></section>
    </>
  )
}
