import Conditions from './__components/conditions/conditions'
import Hero from './__components/hero/hero'
import QrLink from './__components/qr-link/qr-link'
import Services from './__components/services/services'


export default function Home() {
  return (
    <> 
      <Hero />   
      <QrLink /> 
      <Conditions />
      <Services />
    </>
  )
}
