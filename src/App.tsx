import {
    createBrowserRouter, 
    RouterProvider, 
} from "react-router-dom";
import Login from "./pages/auth/login/login";
import AuthLayout from "./layouts/auth-layout";
import SignUp from "./pages/auth/sign-up/sign-up";   
import Home from "./pages/public/home/home";

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
            element: <Home />
        }
    ]);

    return (
        <div className=""> 
            <RouterProvider router={router} />
        </div>
    )
}
