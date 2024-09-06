import { db } from "@/utils/supabase"

export const logout = async () => {
    const { error } = await db.auth.signOut()
    if (error) {
        console.log(error)
    }
    
}