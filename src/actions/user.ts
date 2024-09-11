import { ERR_INTERNAL, ERR_USER_ALREADY_REGISTERED } from "@/constants/errors" 
import { DBUser, Role, User } from "@/types/types"
import { db } from "@/utils/supabase" 


export const transformUser = (user: DBUser): User => {

    const role = user.role === "DOCTOR" ? Role.doctor : user.role === "ADMIN" ? Role.admin : Role.superAdmin

    return {
        id: user.id,
        authId: user.auth_id,
        email: user.email,
        name: user.name,
        contacts: user.contacts ?? [],
        role: role,
        boost: user.boost,
        img: user.img!,
        licenseNumber: user.license_number,
        verified: user.verified,
        clinicId: user.clinic_id ?? 0,
        createdAt: user.created_at ?? "",
        updatedAt: user.updated_at ?? "",
        address: user.address ?? "",
        birthDate: user.birth_date ?? "",
    }
}


export const getOne = async (id: string) => {
    const { data, error } = await db.from("user").select().eq("id", id).or(`auth_id.eq.${id}`)
    
    if(error) {
        console.log(error)
    }

    if(data === null || (data && data?.length === 0)) return null
  
    return transformUser(data[0])
}


export const getOneByAuthID = async (id: string) => {
    const { data, error } = await db.from("user").select().eq("auth_id", id).maybeSingle()
    
    if(error) {
        console.log(error)
    }

    if(data === null) return null
  
    return transformUser(data)
}

export const getAll = async () => {
    const { data, error } = await db.from("user").select('*')
    
    if(error) {
        console.log(error)
    }

    return data ? data?.map(user => transformUser(user)) : []
}

export const create = async (user: any): Promise<User> => { 
 
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
        
        auth_id: data.user.id.toString(), 
        email: user.email,
        license_number: user.licenseNumber,
        name: user.name,
        contacts: user.contacts,
        role: user.role,
        verified: false, 

    }).select()

    if(insertToUserTable.error) throw new Error(insertToUserTable.error.message);
 
    return transformUser(insertToUserTable.data[0])
}

