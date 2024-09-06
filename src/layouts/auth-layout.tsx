 
import { Outlet, useNavigate } from "react-router-dom";
import dentist from "@/assets/images/dentist.png"
import { userAtom } from "@/states/user-state";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { db } from "@/utils/supabase"; 
import { User } from '../types/user';
 
export default function AuthLayout ( ) {

    const [_, setUserState] = useAtom(userAtom);
    
    const navigate = useNavigate();


    useEffect(() => {
        (async() => { 

            const { data, error } = await db.auth.getSession()

            if(error){
                console.log(error)
            } 
            if(data && data.session) { 
                setUserState(data.session.user.user_metadata as User)
                return navigate("/")
            }
            
            setUserState(null) 

        })()

    }, [])



    return (
        <div className="h-full flex justify-center items-center gradient-auth-page">
            <div className="w-11/12 bg-[#BCF0F9] p-5 flex flex-row">
                <div className="hidden md:flex items-center w-[50%] relative justify-center ">
                    <img
                        src={dentist} 
                        alt="dentist"  
                        className="object-contain"
                    />
                </div>
                <div className="w-full md:w-[50%] flex justify-center items-center">
                    <div className="w-[80%] md:w-[90%] lg:w-[80%]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}