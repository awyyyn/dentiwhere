 
import { ERR_INVALID_CREDENTIALS, ERR_USER_NOT_REGISTERED } from "@/constants/errors";
import { Database } from "@/types/db.types";
import { db } from "@/utils/supabase";

export const login = async (user: any): Promise<Database["public"]["Tables"]["user"]["Row"]> => {

    const ifExists = await db.from("user").select("*").or(`email.eq.${user.email},license_number.${user.license_number}`).single()

    if(ifExists.error) throw new Error(ifExists.error.message)

    if(ifExists.data === null) throw new Error(ERR_USER_NOT_REGISTERED)

    if(ifExists.data.license_number !== user.license_number) throw new Error(ERR_INVALID_CREDENTIALS)

    const result = await db.auth.signInWithPassword({
        email: user.email,
        password: user.password,
    });

    if(result.error) throw new Error(result.error.message)
    
    return ifExists.data
}