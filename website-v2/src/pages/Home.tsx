import Hero from '../sections/Hero'
import Story from '../sections/Story'
import Platform from '../sections/Platform'
import Audience from '../sections/Audience'
import Trust from '../sections/Trust'
import PricingPreview from '../sections/PricingPreview'
import FaqPreview from '../sections/FaqPreview'
import FinalCta from '../sections/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Platform />
      <Audience />
      <PricingPreview />
      <Trust />
      <FaqPreview />
      <FinalCta />
    </>
  )
}
