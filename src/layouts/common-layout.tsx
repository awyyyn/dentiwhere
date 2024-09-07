import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

  

export default function CommonLayout () {

    const location = useLocation()

    useLayoutEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);
  
    return (
        <div className="gradient-landing-page py-10  "> 
            <Outlet />  
        </div>
    )
}