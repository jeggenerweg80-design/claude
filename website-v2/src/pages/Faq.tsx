import PageHead from '../components/PageHead'
import FaqList from '../sections/FaqList'

export default function Faq() {
  return (
    <>
      <PageHead eyebrow="FAQ" title={<>Häufige <span className="grad">Fragen</span>.</>} />
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap narrow"><FaqList /></div></section>
    </>
  )
}
