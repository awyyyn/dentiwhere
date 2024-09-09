import { Button } from "@/components/ui/button";
import { useEffect, useLayoutEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from 'react-scroll-up'
import { SlArrowUp } from "react-icons/sl";
import Footer from "@/components/shared/footer/footer";
import { Toaster } from "@/components/ui/toaster"
import { useAtom } from "jotai";
import { userAtom } from "@/states/user-state";
import { Role } from "@/types/types";
import LogoutButton from "@/components/shared/logout-button/logout-button";
import { db } from "@/utils/supabase";

export default function CommonLayout () {

    const [user, setUser] = useAtom(userAtom)
    const location = useLocation()
    const navigate = useNavigate();

    useLayoutEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);
  
    useEffect(() => {

        (async() => { 

            const { data, error } = await db.auth.getSession()

            if(error){
                console.log(error)
            } 

            if(data && data.session) { 
                const userData = await db.from("user").select("*").eq("auth_id", data.session.user.id).maybeSingle();

                if(userData.error) console.log(userData.error)
                
                if(userData === null) {
                    localStorage.clear()
                    return setUser(null)
                }

                setUser(userData.data)
                return navigate("/")
            } 
            localStorage.clear()
            setUser(null) 

        })()

    }, [])
 

    return (
        <div className="gradient-landing-page py-10  "> 
            <div className="flex flex-row justify-end w-11/12 mx-auto md:w-10/12 absolute -translate-x-[50%] left-[50%] z-30">
                {user !== null ?
                    <div className="flex space-x-4" >
                        <NavLink to={user.role === Role.doctor ? 'clinic' : 'dashboard'}>
                            <Button className="transition-all duration-300 bg-1 hover:bg-1 hover:shadow-md"  > 
                                {user.role === Role.doctor ? "Clinic" : "Dashboard"}
                            </Button>
                        </NavLink>
                        <LogoutButton size="default" className="hover:shadow-md"  />
                    </div>
                    :
                    <Link to={'login'}>
                        <Button className="transition-all duration-300">
                            Create Account / Log in
                        </Button>
                    </Link>
                }
            </div>
            <main>
                <Outlet />  
            </main>
            <Footer />
            <ScrollToTop 
                showUnder={150}
                duration={900}
            >
                <Button className="bg-white text-black   hover:bg-white hover:shadow-md shadow-lg transition-all duration-500 hover:scale-105 rounded-full p-4 space-x-3">
                    <span className="font-light">Back to Top</span>
                    <SlArrowUp strokeWidth={100} />
                </Button>
            </ScrollToTop>
            <Toaster />
        </div>
    )
}