import { Button } from "@/components/ui/button";
import { CiLocationOn } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";

interface ClinicProps {
    clinic: {
        name: string,
        location: string,
        contacts: string[]
    }
}

export default function Clinic({clinic}: ClinicProps) {
  return (
    <div className='bg-white rounded-xl shadow-xl p-6 md:p-14 space-y-3'>
      <h1 className='text-3xl font-extrabold tracking-wide leading-tight'>
        {clinic.name}
      </h1>
      <div className="flex justify-between gap-y-3 md:gap-y-0 flex-col md:flex-row ">
        <div className="space-y-3">
          <div className='flex space-x-2'>
            <CiLocationOn size={30} strokeWidth={0.3} />
            <p>{clinic.location}</p>
          </div>
          <div className='flex space-x-2'>
            <PiPhoneLight size={30} strokeWidth={0.3} />
            <p>{clinic.contacts.join(', ')}</p>
          </div>
        </div>
        <div className="md:self-end self-center">
          <Button className="btn-1 hover:bg-1 transition-all duration-300 shadow-2xl">View Profile</Button>
        </div>
      </div>
    </div>
  )
}
