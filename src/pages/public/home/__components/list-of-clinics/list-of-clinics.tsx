import { Button } from "@/components/ui/button"
import SectionHeader from "../section-header/section-header"
import Clinic from "./card"

const tempClinics = [
    {
        name: "Mendones-Diaz Dental Clinic",
        location: `
            San Jose St., Dunao, Ligao City
            4504 Albay
        `,
        contacts: ['+63 999 517 1237']
    },
    {
        name: "Ligao Ortho-Dental Clinic",
        location: `
            Bonifacio St., Sta. Cruz, Ligao City  
            4504 Albay
        `,
        contacts: ['+63 909 495 0082']
    },
    {
        name: "Icrown Dental Clinic - Ligao Branch",
        location: `
            2nd floor, San Lorenzo St., Guilid, Ligao City
            4504 Albay
        `,
        contacts: ['+63 961 521 7139']
    },
]

export default function ListOfClinics() {


    return ( 
        <div className='mx-auto  w-11/12 md:w-10/12 py-10 sm:py-20 space-y-5 md:space-y-10'> 
            <SectionHeader
                title="Dental Clinics Available"
                description="We have Doctors in these hospitals who are ready to serve you!"
                buttonLabel="List Your Dental Clinic"
                showButton 
            /> 

            <div className='space-y-12 flex flex-col'>  
                {tempClinics.map((clinic, indx) => 
                    <Clinic 
                        key={`${clinic.name}-card-${indx}`}
                        clinic={clinic}
                    />
                )}
                <div className="self-center">
                    <Button 
                        className=" bg-[#58D4E8] hover:bg-[#58D4E8] rounded-full text-white hover:shadow-lg hover:shadow-gray-300  transition-all duration-300 font-extrabold tracking-wide"
                        size={"lg"}
                    >
                        View more Dental Clinic
                    </Button>
                </div>
            </div> 
        </div> 
    )
}
