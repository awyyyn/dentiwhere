
import dentist from '@/assets/images/dentist.png'
import InputWithIcon from '../input-with-icon/input-with-icon'
import { FaSearch } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className='flex justify-center items-center h-dvh'> 
        <div className='relative justify-evenly flex items-center w-11/12 md:w-10/12 md:p-4 h-[80dvh]'>
            <div className='hidden md:flex relative w-[30%]'>
                <img src={dentist} alt='Dentist' className='object-contain scale-125 z-0'/>
            </div>
            <div className='md:w-[60%] flex flex-col  z-20'>
                <div className=''>
                    <h1 className='-ml-3 sm:-ml-5 leading-4 text-xl font-semibold' >Find your Dental Doctor</h1>
                    <h1 className='font-bold text-[40px]'>Inquire Now</h1>
                    <InputWithIcon 
                        className="py-4 rounded-[7px] "
                        startIcon={<FaSearch size={25} />} 
                        inputProps={{
                            placeholder: "Search for Dental Clinic..."
                        }} 
                    />
                    <h1 className='text-right text-[#1D4968] drop-shadow-[0_4px_4px_#00000040] text-[30px] my-8'>Need help</h1>
                </div>
                <div className='  md:w-[115%] self-end z-20 bg-blend-soft-light rounded-[20px] p-12 space-y-5'>
                    <p className='  leading-[36.31px] text-[20px] md:text-[30px] font-semibold text-wrap md:max-w-[70%]'>
                        Looking for an immediate Dental advice or {/* <br className='hidden lg:block' /> */}
                        planning to have a dental appointment? 
                    </p>
                    <p className='text-[16px] md:text-[20px]'>We have an available doctor in town!</p>
                    <Button className='bg-[#33DDBB] shadow-lg rounded-xl hover:bg-[#33DDBB]'>Canvas Now!</Button>
                </div>
            </div> 
        </div>

    </section>
  )
}
