import PageHead from '../components/PageHead'

export default function Login() {
  return (
    <>
      <PageHead eyebrow="Login" title={<>Dein <span className="grad">HeidSec-Konto</span>.</>} lead="Das Kundenportal verwendet dasselbe Konto wie die App. Die Anmeldung wird mit dem Backend-Anschluss freigeschaltet." />
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap narrow"><div className="plan"><h3>Anmeldung noch nicht aktiv</h3><p className="dim">Aus Sicherheitsgründen enthält diese Vorschau kein Anmeldeformular ohne Backend.</p></div></div></section>
    </>
  )
}
