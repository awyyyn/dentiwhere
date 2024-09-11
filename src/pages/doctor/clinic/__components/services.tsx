import { Button } from '@/components/ui/button';
import { categoriesAtom, categoryDataAtom } from '@/atoms/category-atom'
import {  useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RiInformation2Line } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { categoryDialogDialog, serviceDialogAtom } from '@/atoms/dialogs-atom'; 
import {   serviceDataAtom, servicesAtom } from '@/atoms/service-atom';
import { Suspense, useEffect } from 'react';
import { getAllByClinic as getServicesByClinicId } from '@/actions/service';
import { getAllByClinicId as getCategoriesByClinicId } from '@/actions/category'
import { userAtom } from '@/atoms/user-atom';
import { FiEdit } from "react-icons/fi";

 

export default function Services() { 
  const setServiceData = useSetAtom(serviceDataAtom)
  const setCategoryData = useSetAtom(categoryDataAtom)
  const [services, setServices] = useAtom(servicesAtom)
  const user = useAtomValue(userAtom)
  const setServiceDialog = useSetAtom(serviceDialogAtom) 
  const setCategoryDialog = useSetAtom(categoryDialogDialog) 
  const [categories, setCategories] = useAtom(categoriesAtom);

  useEffect(() => {
      (async() => {
        setServices(await getServicesByClinicId(user.clinicId?.toString() as string))
        if(typeof user.clinicId === "number"){
          setCategories(await getCategoriesByClinicId(user.clinicId))
        }
      })()
  }, [setServices, user.clinicId, setCategories])
   
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className='flex justify-end  space-x-3'>
          <Button 
            className='transition-all duration-300'
            onClick={() => {  
              setServiceDialog({
                mode: "create",
                open: true, 
              })
            }} 
          >
            Add Service
          </Button>
          <Button 
            className='transition-all duration-300'
            onClick={() => {  
              setCategoryDialog({
                mode: "create",
                open: true, 
              })
            }} 
          >
            Add Category
          </Button>
        </div>
        <div className='pb-10 grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 gap-3'>
        
            {
              categories ? 
              categories.map(category => { 
                const servicesByCategory = services.filter(service => service.categoryId === category.id);
                return ( 
                  <div className='' key={`${category.id}`}>
                    <div className='flex flex-row justify-between p-2 bg-gray-100/90'>
                      <h1 className='font-extrabold tracking-wide md:text-2xl text-lg'>{category.name}</h1>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger 
                            className='transition-all duration-300 hover:shadow-sm' 
                            onClick={() => { 
                              setCategoryData(category)
                              setCategoryDialog({
                                mode: "view",
                                open: true, 
                              })
                            }}   
                          > 
                            <FiEdit size={20} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Detail</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider> 
                    </div>
                    <div className='px-5 pt-2 border'>
                      {servicesByCategory.map(service => (
                        <div key={service.id} className='flex justify-between items-center'>
                          <h1 className='text-lg md:text-xl font-semibold capitalize'>{service.name}</h1>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger 
                                className='transition-all duration-300 hover:shadow-sm' 
                                onClick={() => { 
                                  setServiceData(service)
                                  setServiceDialog({
                                    mode: "view",
                                    open: true, 
                                  })
                                }}   
                              > 
                                <RiInformation2Line size={20} /> 
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider> 
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
              : <h1>Zero</h1>
            }
        </div>  
      </Suspense>
    </>
  )
}
 