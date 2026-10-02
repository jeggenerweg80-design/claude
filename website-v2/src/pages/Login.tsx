import PageHead from '../components/PageHead'
import { siteConfig } from '../config/site'

export default function Login() {
  return (
    <>
      <PageHead title={<>Dein <span className="grad">HeidSec-Konto</span>.</>} lead="Das Kundenportal verwendet dasselbe Konto wie die App. Die Anmeldung läuft über das bestehende HeidSec-Backend." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow plans">
          <div className="plan feat"><h3>Anmelden</h3><p className="dim">Zum bestehenden Kundenkonto.</p><a className="btn btn-primary btn-sm" href={siteConfig.accountUrl}>Zum Login</a></div>
          <div className="plan"><h3>Neu bei HeidSec?</h3><p className="dim">Konto anlegen und Tarif wählen.</p><a className="btn btn-ghost btn-sm" href={siteConfig.registerUrl}>Registrieren</a></div>
          <div className="plan"><h3>Mein Konto</h3><p className="dim">Abos, Geräte, Downloads, Support.</p><a className="btn btn-ghost btn-sm" href={siteConfig.portalUrl}>Zum Kundenportal</a></div>
        </div>
      </section>
    </>
  )
}
