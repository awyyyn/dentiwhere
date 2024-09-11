import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { userAtom } from "./user-atom";
import { db } from "@/utils/supabase";
import { Clinic } from "@/types/types"; 


export const clinicEditDataAtom = atom<Clinic>()

export const asyncClinicAtom = atom(async (get): Promise<Clinic | null> => {

    const user = get(userAtom);
    
    if(!user.clinicId) return null
  
    const response = await db
        .from("clinics")
        .select(`*, services ( img, name, rate, description, active, category_id, clinic_id, created_at, updated_at, id )`)
        .eq("doctor_id", typeof user.id === "number" ? user.id : 0)
         
    
    if(response.error) throw new Error(response.error.message)
 
    return { 
        website: response.data[0]?.website || "",
        address: response.data[0]?.address || "",
        email: response.data[0]?.email,
        img: response.data[0]?.img,
        id: response.data[0]?.id,
        boosted: response.data[0]?.boosted,
        name: response.data[0]?.name,
        contacts: response.data[0]?.contacts || [],
        createdAt: response.data[0]?.created_at,
        updatedAt: response.data[0]?.updated_at as string,
        doctorId: response.data[0]?.doctor_id,
        archive: response.data[0]?.archive,
        services: response.data[0]?.services.map((service) => ({
            img: service.img!,
            name: service.name,
            updated_at: service.id,
            rate: service.rate || "",
            description: service.description || "",
            categoryId: service.category_id,
            clinicId: service.clinic_id,
            createdAt: service.created_at,
            updatedAt: service.updated_at!,
            id: service.id,
            active: service.active
        }))
    } 
})

export const loadableClinicAtom = loadable(asyncClinicAtom)