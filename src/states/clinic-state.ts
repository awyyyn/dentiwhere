import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { userAtom } from "./user-state";
import { db } from "@/utils/supabase";


export const asyncClinicAtom = atom(async (get) => {

    const user = get(userAtom);
  
    const response = await db.from("clinics").select(`*, services( id, name, img, description, rate )`).eq("doctor_id", Number(user.id)).maybeSingle()
    
    if(response.error) throw new Error(response.error.message)

    if(response.data === null) return null

    console.log(response.data, 'qqqq data')

    return {
        ...response.data,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
        doctorId: response.data.doctor_id,
    } 
})

export const loadableClinicAtom = loadable(asyncClinicAtom)