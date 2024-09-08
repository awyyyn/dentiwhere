import { Button } from "@/components/ui/button";
import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from 'react-scroll-up'
import { SlArrowUp } from "react-icons/sl";
import Footer from "@/components/shared/footer/footer";
import { Toaster } from "@/components/ui/toaster"

export default function CommonLayout () {

    const location = useLocation()

    useLayoutEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);
  
    return (
        <div className="gradient-landing-page py-10  "> 
            <Outlet />  
            <Footer />
            <ScrollToTop 
                showUnder={150} 

                duration={900}
            >
                <Button className="bg-white hover:bg-white hover:shadow-md shadow-lg transition-all duration-500 hover:scale-105 rounded-full p-4 space-x-3">
                    <span className="font-light">Back to Top</span>
                    <SlArrowUp strokeWidth={100} />
                </Button>
            </ScrollToTop>
            <Toaster />
        </div>
    )
}