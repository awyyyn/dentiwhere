 
import { SignUpUser } from "@/types"
import { db } from "@/utils/supabase"

export const signUp = async (user: SignUpUser) => {

    const { data, error } = await db.auth.signUp({
        email: user.email,
        password: user.password!,
        phone: user.phone,
        options: {
            data: { 
                username: user.username,
                fullName: user.fullName,
                phone: user.phone,
                email: user.email,
                role: user.role
            }
        }
    })

    if(error){
        console.log(error)
    }


    return data

}