import { db } from "@/utils/supabase"

export const signIn = async () => {

    const {} = await db.auth.signInWithPassword({
        email: "", 
        password: "",
        phone: "",
    })
}