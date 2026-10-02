import HeroConsole from './HeroConsole'
import PlatformConsole from './PlatformConsole'
import PlanPanel from './PlanPanel'
import TrustFaq from './TrustFaq'
import CtaBar from './CtaBar'

export default function BHome() {
  return (
    <div className="b-flow">
      <HeroConsole />
      <PlatformConsole />
      <PlanPanel />
      <TrustFaq />
      <CtaBar />
    </div>
  )
}
