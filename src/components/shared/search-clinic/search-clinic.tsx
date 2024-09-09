
import {
    Dialog,
    DialogContent,  
    DialogHeader,
    DialogTitle,
    DialogOverlay, 
} from "@/components/ui/dialog"
import { searchClinicDialog } from "@/atoms/dialogs-atom"
import { useAtom } from "jotai"
import InputWithIcon from "../input-with-icon/input-with-icon"
import { RiCloseLargeLine } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import { FaSearch } from "react-icons/fa";
  

export default function SearchClinic() {

  const [isOpen, setIsOpen] = useAtom(searchClinicDialog)

  return (
    <Dialog open={isOpen} modal > 
        <DialogOverlay className="opacity-30 bg-none backdrop-blur-sm"/> 
        <DialogContent removeCloseIcon className="bg-white top-40 lg:bg-red-200 md:min-w-[900px] xl:min-w-[1200px] ">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2">
            <RiCloseLargeLine size={25} />    
          </Button>
          <DialogHeader >
              <DialogTitle>Search Clinic</DialogTitle>
              {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
              </DialogDescription> */}
          </DialogHeader>
          <div>
            <InputWithIcon 
              className="py-4 rounded-[7px] bg-white"
              startIcon={<FaSearch size={25} />} 
              inputProps={{ 
                  placeholder: "Search...", 
              }}  
            />
          </div>
        </DialogContent>  
    </Dialog>
  
  )
}
