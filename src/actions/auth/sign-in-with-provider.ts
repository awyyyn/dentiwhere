import { environment } from "@/environments/envronment.dev";
import { db } from "@/utils/supabase"; 
import { redirectDocument } from "react-router-dom";

export async function signInWithProvider(provider:   "google" | "facebook" ) {
    const { data, error } = await db.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: environment.providersCallBackUrl[provider]
        }
    })

    if (data !== undefined && data.url) return redirectDocument(data.url) 
        
    console.log(error);
        
    return null
}


export async function signUpWithProvider(provider:   "google" | "facebook" ) {
    const { data, error } = await db.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: environment.providersCallBackUrl[provider],
        }
    })

    if (data !== undefined && data.url) return redirectDocument(data.url) 
        
    console.log(error);
        
    return null
}