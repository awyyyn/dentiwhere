 
import { DBService, Service } from "@/types/types"
import { db } from "@/utils/supabase"

export const transformService = (service: DBService): Service => {
  
    return {
        categoryId: service.category_id,
        clinicId: service.clinic_id,
        description: service.description!,
        rate: service.rate!,
        createdAt: service.created_at,
        updatedAt: service.updated_at!,
        id: service.id,
        active: service.active,
        img: service.img!,
        name: service.name,
    }
}

export const create = async (inputs: Omit<Service, "createdAt" | "updatedAt" | "id">): Promise<Service> => {
    const { data, error } = await db.from("services").insert({
        name: inputs.name,
        description: inputs.description,
        active: inputs.active,
        rate: inputs.rate,
        category_id: inputs.categoryId,
        clinic_id: inputs.clinicId,
    }).select("*").single()

    if(error) throw new Error(error.message)

    if(data === null) throw new Error("Service not created")

    return transformService(data)
}


export const getAllByClinic = async (id: string): Promise<Service[]> => {
    const { data, error } = await db.from("services").select("*").eq("clinic_id", id);

    if(error) throw new Error(error.message)

    if(data && data.length === 0) return []

    return data.map(service => transformService(service))


}