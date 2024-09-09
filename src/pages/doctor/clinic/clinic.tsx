import { loadableClinicAtom } from '@/states/clinic-state' 
import {   useAtomValue } from 'jotai' 
import { AsyncImage } from 'loadable-image';
import { CiLocationOn } from 'react-icons/ci';
import { PiPhoneLight } from 'react-icons/pi';
import { Blur } from 'transitions-kit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import About from './__components/about';
import Services from './__components/services';
import Reviews from './__components/reviews';
import { Separator } from '@/components/ui/separator';


export default function Clinic() {

    const clinicLoadable = useAtomValue(loadableClinicAtom);
    const clinic = clinicLoadable.state === "hasData" ? clinicLoadable.data : null  

    if(clinicLoadable.state === "hasError") { 
        return <div>Error</div>
    }

    if(clinicLoadable.state === "loading") return <div>Loading...</div>
    
    if(clinic === null) return <h1>add your clinic</h1>
 

    return (
        <div className=''>
            <section className='w-full shadow-[]'>
                <div className='py-10 flex flex-col md:flex-row items-center md:space-x-10'>
                    <div> 
                        <AsyncImage 
                            src={clinic.img}
                            alt={clinic.name}
                            Transition={props => <Blur radius={20} {...props}/>}
                            className='shadow-lg w-60 h-60 lg:h-72 lg:w-72 rounded-full'
                        /> 
                    </div>
                    <div className='self'>
                        <h1>
                            {clinic.name}
                        </h1>
                        <div className='flex space-x-2'>
                            <CiLocationOn size={30} strokeWidth={0.3} />
                            <p>{clinic.address}</p>
                        </div>
                        <div className='flex space-x-2'>
                            <PiPhoneLight size={30} strokeWidth={0.3} />
                            <p>{JSON.parse(clinic.contacts)}</p>
                        </div>
                    </div>
                </div>
            </section>
 
            <Tabs defaultValue="about" className=""> 
                {/* <Separator className='my-5' /> */}
                <TabsList className='w-full flex justify-evenly bg-white space-x-2 border-t border-b rounded-none py-8'>
                    <TabsTrigger 
                        className='w-[33.3%] scale-100 hover:scale-100 data-[selected]:bg-red-200 data-[state=active]:shadow-lg lg:text-xl' 
                        value="services"
                    >
                        Services
                    </TabsTrigger>
                    <TabsTrigger 
                        value="about" 
                        className=" w-[33.3%] scale-100 hover:scale-100 data-[state=active]:shadow-lg lg:text-xl"
                    >
                        Accounts
                    </TabsTrigger>
                    <TabsTrigger 
                        value="reviews" 
                        className=" w-[33.3%] scale-100 hover:scale-100 data-[state=active]:shadow-lg lg:text-xl"
                    >
                        Reviews
                    </TabsTrigger>
                </TabsList> 
                {/* <Separator className='my-5' /> */}
                <TabsContent value="services">
                    <Services />
                </TabsContent>
                <TabsContent value="about">
                    <About />
                </TabsContent>
                <TabsContent value="reviews">
                    <Reviews />
                </TabsContent>
            </Tabs> 
        </div>
    )
}
