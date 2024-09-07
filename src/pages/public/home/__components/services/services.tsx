 
import Card from '../card/card'
import { services } from '@/constants/services'
import SectionHeader from '../section-header/section-header'

export default function Services() {
  return (
    <section className='w-full'>
      <div className='mx-auto  w-11/12 md:w-10/12 py-10 space-y-5 md:space-y-10'> 
        <SectionHeader
            title="Common Services"
            description="Easily access doctors offering these services"
            buttonLabel="View All"
        />  
        {/* <div className='grid gap-12 md:grid-cols-2 xl:grid-cols-3 grid-flow-row bg-red-500   '> */}
        <div className='flex flex-wrap justify-between gap-y-12'>  
          {services.map((service, indx) => 
            // <div key={`${condition.title}-${indx}`} className='w-full  justify-center'>
              <Card card={service} key={`${service.title}-${indx}`} />
          )}
        </div>
      </div>
    </section>
  )
}
