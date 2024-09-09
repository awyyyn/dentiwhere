 
import { Category, DBCategory } from "@/types/types";
import { db } from "@/utils/supabase"
import { PostgrestSingleResponse } from "@supabase/supabase-js";


export const transformCategory = (data: PostgrestSingleResponse<DBCategory>): Category => {

    if(data === null || typeof data === "undefined" || data.data === null) throw new Error("");

    const category = data.data
    
    return {
        id: category.id,
        name: category.name,
        createdAt: category.created_at,
        updatedAt: category.update_at!, 
    }
}

export const getAll = async (): Promise<Category[]> => {

    const { data, error } = await db.from("category").select("*");

    if(error) throw new Error(error.message)

    return data.map(category => ({
        id: category.id,
        name: category.name,
        createdAt: category.created_at,
        updatedAt: category.update_at!, 
    }))

}
