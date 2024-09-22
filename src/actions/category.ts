 
import { Category, DBCategory } from "@/types/types";
import { db } from "@/utils/supabase";


export const transformCategory = (category: DBCategory): Category => {
 
    return {
        id: category.id,
        name: category.name,
        clinicId: category.clinic_id,
        createdAt: category.created_at,
        updatedAt: category.updated_at, 
    }
}

export const getAllByClinicId = async (clinicId: number): Promise<Category[]> => {

    const { data, error } = await db.from("category").select("*").eq("clinic_id", clinicId);

    if(error) throw new Error(error.message)

    if(data && data.length === 0) return []

    return data.map(category => transformCategory(category))
}

export const getAll = async (): Promise<Category[]> => {

    const { data, error } = await db.from("category").select("*");

    if(error) throw new Error(error.message)

    if(data && data.length === 0) return []

    return data.map(category => transformCategory(category))
         
}


export const create = async (inputs: Omit<Category, "createdAt" | "updatedAt" | "id">): Promise<Category> => {

    const { data, error } = await db.from("category").insert({
        clinic_id: inputs.clinicId,
        name: inputs.name,
    }).select().maybeSingle()

    if(error) throw new Error(error.message)

    if(data === null) throw new Error("Error on creating category")
        
    return transformCategory(data)
}

export const update = async (inputs: Omit<Category, "createdAt" | "updatedAt">): Promise<Category> => {
    const { data, error } = await db.from("category").update({
        clinic_id: inputs.clinicId,
        name: inputs.name,
    }).eq("id", inputs.id).select().single();

    if(error) throw new Error("Error updating category");

    return transformCategory(data)   
}

export const deleteCategory = async (id: number) => {
    const { error } = await db.from("category").delete().eq("id",id);
    if(error) throw new Error(error.message)
    return true
}