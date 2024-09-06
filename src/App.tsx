import {
    createBrowserRouter, 
    RouterProvider, 
} from "react-router-dom";
import Login from "./pages/auth/login/login";
import AuthLayout from "./layouts/auth-layout";
import SignUp from "./pages/auth/sign-up/sign-up";  
import Hero from "./components/shared/hero/hero";

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
            element: <Hero />
        }
    ]);

    return (
        <div className="h-[100dvh] w-[100dvw]"> 
            <RouterProvider router={router} /> 
            {/* <Routes /> */}
        </div>
    )
}
