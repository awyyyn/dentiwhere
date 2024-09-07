import { services } from "@/constants/services";
import SectionHeader from "../home/__components/section-header/section-header";



export default function CommonServices() {
  return (
    <div className="py-5">
      <div className="w-11/12 mx-auto md:w-10/12 space-y-10"> 
        <header className='space-y-7'>
          <SectionHeader
              title="Common Services"
              description="Easily access doctors offering these services"
              buttonLabel="View All"
          />  
        </header>
        <main>
          <div className='space-y-14'>
            {services.map((service, indx) => (
              <div key={`${service}-container-${indx}`} className='flex gap-5 md:gap-10 items-center lg:flex-row flex-col'>  
                <img src={service.img} alt={service.title} className="shadow-lg rounded-3xl" /> 
                <div className=''>
                  <p className='text-lg xl:text-xl tracking-wider leading-10'>
                    <span className='font-bold italic'>
                      {service.title}&nbsp;
                    </span>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
