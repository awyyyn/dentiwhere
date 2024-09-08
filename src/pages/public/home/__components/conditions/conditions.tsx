import Card from '../card/card'
import { conditions } from '@/constants/conditions'
import SectionHeader from '../section-header/section-header'
import { useNavigate } from 'react-router-dom';

export default function Conditions() {

  const navigate = useNavigate();
  
  return (
    <section className='w-full'>
      <div className='mx-auto  w-11/12 md:w-10/12 py-10 space-y-5 md:space-y-10'> 
        <SectionHeader
          title="Common Conditions"
          description="Easily access doctors treating these conditions"
          showButton
          buttonLabel="View All"
          buttonAction={() => navigate('conditions')}
        /> 
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
