import PageHead from '../components/PageHead'
import Trust from '../sections/Trust'

export default function Security() {
  return (
    <>
      <PageHead eyebrow="Sicherheit & Vertrauen" title={<>Was wir zusagen – <span className="grad">und was nicht</span>.</>} lead="Detaillierte Sicherheitsaussagen, Zertifizierungen und Datenschutzinformationen werden ergänzt, sobald sie aus dem freigegebenen Bestand übernommen wurden." />
      <Trust />
    </>
  )
}
