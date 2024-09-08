import { ERR_INTERNAL, ERR_USER_ALREADY_REGISTERED } from "@/constants/errors" 
import { Tables, TablesInsert, Database } from "@/types/db.types"
import { db } from "@/utils/supabase" 


export const getOne = async (id: string) => {
    const { data, error } = await db.from("user").select('*').eq("id", id).or(`auth_id.eq.${id}`)
    
    if(error) {
        console.log(error)
    }

    return data
}

export const getAll = async () => {
    const { data, error } = await db.from("user").select('*')
    
    if(error) {
        console.log(error)
    }

    return data
}

export const create = async (user): Promise<Database["public"]["Tables"]["user"]["Row"]> => { 
 
    const isExists = await db.from("user").select('*').or(`email.eq.${user.email},license_number.eq.${user.licenseNumber}`) 

    if(isExists.data && isExists.data.length > 0) throw new Error(ERR_USER_ALREADY_REGISTERED)

    const { data, error } = await db.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
            data: {
                ...user,
                password: null
            }
        }
    });

    if(error){
        console.log(error)
        throw new Error(error.message)
    } 

    if(data.user === null) {
        throw new Error(ERR_INTERNAL)
    }
 
    const insertToUserTable = await db.from("user").insert({ 
        ...user.verified,  
        auth_id: data.user.id,
        birth_date: user.birth_date,
        email: data.user.email,
        license_number: user.licenseNumber,
        name: user.fullName,
        address: user.address,
        role: user.role,  
        verified: user.verified,
        contacts: JSON.stringify([user.contact]), 
        boost: false
    }).select('*').single();

    if(insertToUserTable.error) throw new Error(insertToUserTable.error.message);
 
    return insertToUserTable.data
}

