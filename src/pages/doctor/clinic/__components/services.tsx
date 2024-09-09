import { Button } from '@/components/ui/button';
import { loadableCategoriesAtom } from '@/atoms/category-atom'
import { Service } from '@/types/types' 
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RiInformation2Line } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { serviceDialogAtom } from '@/atoms/dialogs-atom';
import ServiceDialog from './service-dialog'; 
import { serviceDataAtom } from '@/atoms/service-atom';

interface ServicesProps {
  services: Service[]
} 

export default function Services({services}: ServicesProps) {

  const setServiceData = useSetAtom(serviceDataAtom)
  const [serviceDialog, setServiceDialog] = useAtom(serviceDialogAtom) 
  const categoriesLoadable = useAtomValue(loadableCategoriesAtom);
  const categories = categoriesLoadable.state === "hasData" ? categoriesLoadable.data : []

  if(categoriesLoadable.state === 'hasError') return <h1>Error: {JSON.stringify(categoriesLoadable.error)}</h1>

  if(categoriesLoadable.state === 'loading') return <h1>Loading...</h1>
 
  return (
    <>
      <div className='flex justify-end pt-5'>
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
      </div>
      <div className='pb-10 grid grid-flow-row sm:grid-cols-2 md:grid-cols-3'>
        
        {
          categories.length > 0 ? 
          categories.map(category => { 
            const servicesByCategory = services.filter(service => service.categoryId === category.id);
            return ( 
              <div className='' key={`${category.id}`}>
                <h1 className='font-extrabold tracking-wide md:text-2xl text-lg'>{category.name}</h1>
                <div className='pl-5 pt-2'>
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
    </>
  )
}
 