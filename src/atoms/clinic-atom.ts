import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { userAtom } from "./user-atom";
import { db } from "@/utils/supabase";
import { Clinic } from "@/types/types"; 


export const clinicEditDataAtom = atom<Clinic>()

export const asyncClinicAtom = atom<Promise<Clinic | null>>(async (get): Promise<Clinic | null> => {

    const user = get(userAtom);

    if(user === null) return null
  
    const response = await db
        .from("clinics")
        .select(`*, services ( img, name, rate, description, active, category_id, clinic_id, created_at, updated_at, id )`)
        .eq("doctor_id", typeof user.id === "number" ? user.id : 0)
        .maybeSingle()
    
    if(response.error) throw new Error(response.error.message)

    if(response.data === null) return null
  
    return { 
        website: response.data.website || "",
        address: response.data.address || "",
        email: response.data.email,
        img: response.data.img,
        id: response.data.id,
        boosted: response.data.boosted,
        name: response.data.name,
        contacts: response.data.contacts || [],
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at!,
        doctorId: response.data.doctor_id,
        archive: response.data.archive,
        services: response.data.services.map((service) => ({
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