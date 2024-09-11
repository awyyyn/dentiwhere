import {
    createBrowserRouter, 
    RouterProvider, 
} from "react-router-dom";

/* =============================== LAYOUTS =============================== */
import AuthLayout from "./layouts/auth-layout";
import CommonLayout from "./layouts/common-layout";
/* =============================== LAYOUTS =============================== */

/* =============================== AUTH PAGES =============================== */

import Login from "./pages/auth/login/login";
import SignUp from "./pages/auth/sign-up/sign-up";   

/* =============================== AUTH PAGES =============================== */

/* =============================== PUBLIC PAGES =============================== */

import Home from "./pages/public/home/home";
import CommonServices from "./pages/public/common-services/common-services";
import CommonConditions from "./pages/public/common-conditions/common-conditions";

/* =============================== PUBLIC PAGES =============================== */ 

/* =============================== PROTECTED PAGES =============================== */

import ProtectedLayout from "./layouts/protected-layout";

/* ====================== DOCTOR PAGES ======================= */
import DoctorLayout from "./layouts/doctor-layout";
import DoctorProfile from './pages/doctor/profile/profile'
/* ====================== DOCTOR PAGES ======================= */

/* ====================== ADMIN PAGES ======================= */
import Dashboard from "./pages/admin/dashboard/dashboard";
import AdminLayout from "./layouts/admin-layout";
/* ====================== ADMIN PAGES ======================= */

/* =============================== PROTECTED PAGES =============================== */
 


/* =============================== UTIL PAGES =============================== */

import Unauthorized from "./pages/unauthorized/unauthorized";
import NotFound from "./pages/not-found/not-found"; 
import EditClinic from "./pages/doctor/edit-clinic/edit-clinic";
import Loadable from "./components/loader/loader";
import { lazy } from "react";

/* =============================== UTIL PAGES =============================== */

const Clinic = Loadable(lazy(() => import("./pages/doctor/clinic/clinic")));


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
            element: <ProtectedLayout />,
            children: [
                {
                    element: <AdminLayout />,
                    children: [
                        {
                            path: "dashboard",
                            element: <Dashboard />
                        }
                    ]
                },
                {
                    element: <DoctorLayout />,
                    children: [
                        {
                            path: 'clinic',
                            element: <Clinic /> 
                        },
                        {
                            path: 'clinic/add',
                            element: <EditClinic />
                        },
                        {
                            path: 'clinic/edit/:clinic_id',
                            element: <Clinic />
                        },
                        {
                            path: 'profile',
                            element: <DoctorProfile />
                        }
                    ]
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
