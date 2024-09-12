import { Accessibility, DBAccessibility } from '@/types/types';
import { db } from "@/utils/supabase"  


const transformAccessibility = (accessibility: DBAccessibility): Accessibility => {
    return {
        id: accessibility.id,
        name: accessibility.name,
        clinicId: accessibility.clinic_id,
        createdAt: accessibility.created_at,
        updatedAt: accessibility.updated_at
    }
}

export const createMany = async (inputs: {clinic_id: number, name: string}[]): Promise<Accessibility[]> => {
    const { data, error } = await db.from("accessibility").insert(inputs).select(); 
    if(error || (data && data.length === 0)) throw new Error("Failed to create accessibilities"); 
    return data.map(accessibility => transformAccessibility(accessibility))
}


export const update = async (inputs: {clinic_id: number, name: string, id: string}) => {

    const { id, ...toUpdate } = inputs

    const { data, error } = await db.from("accessibility").upsert(toUpdate).eq('id', id).maybeSingle();

    if(error || data === null) throw new Error("Failed to update Accessibility"); 

    return transformAccessibility(data)

}