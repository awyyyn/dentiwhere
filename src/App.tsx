import {
    createBrowserRouter, 
    RouterProvider, 
} from "react-router-dom";

/* =============================== LAYOUTS =============================== */
import AuthLayout from "./layouts/auth-layout";
import CommonLayout from "./layouts/common-layout";

/* =============================== PAGES =============================== */
import Login from "./pages/auth/login/login";
import SignUp from "./pages/auth/sign-up/sign-up";   
import Home from "./pages/public/home/home";
import CommonServices from "./pages/public/common-services/common-services";
import CommonConditions from "./pages/public/common-conditions/common-conditions";
import Unauthorized from "./pages/unauthorized/unauthorized";
import NotFound from "./pages/not-found/not-found";

export default function App() {

    const router = createBrowserRouter([ 
        { 
            element: <AuthLayout />,
            children: [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "sign-up",
                    element: <SignUp />
                }
            ]
        },
        {
            path: "/", 
            element: <CommonLayout />,
            children: [ 
                {
                    index: true,
                    element: <Home />
                }, 
                {
                    path: "conditions", 
                    element: <CommonConditions />
                },
                {
                    path: "services", 
                    element: <CommonServices />
                },
            ]
        },
        {
            path: "*",
            element: <NotFound />   
        },
        {
            path: "unauthorized",
            element: <Unauthorized />
        }
    ]);

    return (
        <div className=""> 
            <RouterProvider router={router} />
        </div>
    )
}
