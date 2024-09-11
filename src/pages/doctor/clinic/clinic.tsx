import { asyncClinicAtom } from '@/atoms/clinic-atom' 
import {   useAtomValue } from 'jotai' 
import { AsyncImage } from 'loadable-image';
import { CiLocationOn } from 'react-icons/ci';
import { PiPhoneLight } from 'react-icons/pi';
import { Blur } from 'transitions-kit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import About from './__components/about';
import Services from './__components/services';
import Reviews from './__components/reviews'; 
import ClinicEditModal from './__components/service-dialog';
import { Suspense } from 'react'; 
import CategoryDialog from './__components/category-dialog';

export default function Clinic() { 

    const clinic = useAtomValue(asyncClinicAtom); 

    return (
        <div className=''>
            <section className='w-full shadow-[]'>
                <div className='py-10 flex flex-col md:flex-row items-center md:space-x-10'>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <div> 
                            <AsyncImage 
                                src={clinic.img}
                                alt={clinic.name}
                                Transition={props => <Blur radius={20} {...props}/>}
                                className='shadow-lg w-60 h-60 lg:h-72 lg:w-72 rounded-full'
                            /> 
                        </div>
                        <div className='self space-y-2'>
                            <h1 className='lg:text-5xl md:text-3xl text-xl font-extrabold tracking-wider'>
                                {clinic.name}
                            </h1>
                            <div className='flex space-x-2'>
                                <CiLocationOn size={30} strokeWidth={1} />
                                <p className='md:text-xl text-lg'>{clinic.address}</p>
                            </div>
                            {clinic.contacts.length > 0 && 
                                <div className='flex space-x-2'>
                                    <PiPhoneLight size={30} strokeWidth={1} />
                                    <p className='md:text-xl text-lg'>{clinic.contacts.join(" / ")}</p>
                                </div>
                            }
                        </div>
                    </Suspense>
                </div>
            </section>
 
            <Tabs defaultValue="services" className=""> 
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
                        About
                    </TabsTrigger>
                    <TabsTrigger 
                        value="reviews" 
                        className=" w-[33.3%] scale-100 hover:scale-100 data-[state=active]:shadow-lg lg:text-xl"
                    >
                        Reviews
                    </TabsTrigger>
                </TabsList> 
                {/* <Separator className='my-5' /> */}
                <TabsContent value="services" className='space-y-5'>
                    <Suspense fallback={<h1>Loading services</h1>}>'
                        <Services />
                    </Suspense>
                </TabsContent>
                <TabsContent value="about">
                    <About />
                </TabsContent>
                <TabsContent value="reviews">
                    <Reviews />
                </TabsContent>
            </Tabs> 


            <ClinicEditModal />
            <CategoryDialog />
        </div>
    )
}
