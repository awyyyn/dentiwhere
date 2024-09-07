import { Button } from '@/components/ui/button' 
import Card from '../card/card'
import { conditions } from '@/constants/conditions'

export default function Conditions() {
  return (
    <section className='w-full'>
      <div className='mx-auto  w-11/12 md:w-10/12 py-10 space-y-5 md:space-y-10'> 
        <div className='flex justify-between items-center flex-row'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl leading-tight'>Common Conditions</h1>
          <Button className='btn-2'>
            View All
          </Button>
        </div> 
        <div className=''>
          <p className='text-p md:pl-12 font-light'>
            Easily access doctors treating these conditions 
          </p>
        </div> 
        {/* <div className='grid gap-12 md:grid-cols-2 xl:grid-cols-3 grid-flow-row bg-red-500   '> */}
        <div className='flex flex-wrap justify-between gap-y-12'>  
          {conditions.map((condition, indx) => 
            // <div key={`${condition.title}-${indx}`} className='w-full  justify-center'>
              <Card card={condition} key={`${condition.title}-${indx}`} />
          )}
        </div>
      </div>
    </section>
  )
}
