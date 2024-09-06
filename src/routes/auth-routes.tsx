import AuthLayout from "@/layouts/auth-layout"
import Login from "@/pages/auth/login/login"
import SignUp from "@/pages/auth/sign-up/sign-up"

const AuthRoutes = {
    path: "/",
    element: <AuthLayout />,
    children: [
        {
            path: "log-in",
            element: <Login />,
        },
        {
            path: "sign-up",
            element: <SignUp />,
        },
    ]
}

export default AuthRoutes