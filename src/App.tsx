import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* =============================== LAYOUTS =============================== */
import AuthLayout from "./layouts/auth-layout";
import CommonLayout from "./layouts/common-layout";
import DoctorLayout from "./layouts/doctor-layout";
import AdminLayout from "./layouts/admin-layout";
/* =============================== LAYOUTS =============================== */

import Loadable from "./components/shared/loader/loader";
import AccountSettings from "./pages/doctor/account-settings/account-settings";
import Password from "./pages/doctor/password/password";
import Logout from "./pages/doctor/logout/logout";
import Parent from "./layouts/parent";
import DentalSetting from "./pages/doctor/dental-setting/dental-setting";
import Notification from "./pages/doctor/notification/notification";
import Doctors from "./pages/admin/doctors/doctors";
import Doctor from "./pages/admin/doctor/doctor";
import Clinics from "./pages/admin/clinics/clinics";
import Clinic from "./pages/public/clinic/clinic";
import PublicViewClinics from "./pages/public/clinics/clinics";
import { VerifyDoctor } from "@/pages/admin/verify-doctor/verify-doctor.tsx";

const Login = Loadable(lazy(() => import("./pages/auth/login/login")));
const SignUp = Loadable(lazy(() => import("./pages/auth/sign-up/sign-up")));
const Home = Loadable(lazy(() => import("./pages/public/home/home")));
const CommonConditions = Loadable(
	lazy(() => import("./pages/public/common-conditions/common-conditions"))
);
const CommonServices = Loadable(
	lazy(() => import("./pages/public/common-services/common-services"))
);
const Dashboard = Loadable(
	lazy(() => import("./pages/admin/dashboard/dashboard"))
);
const NotFound = Loadable(lazy(() => import("./pages/not-found/not-found")));
const Unauthorized = Loadable(
	lazy(() => import("./pages/unauthorized/unauthorized"))
);

export default function App() {
	const router = createBrowserRouter([
		{
			element: <Parent />,
			path: "/",
			children: [
				{
					element: <AuthLayout />,
					children: [
						{
							path: "login",
							element: <Login />,
						},
						{
							path: "sign-up",
							element: <SignUp />,
						},
					],
				},
				{
					path: "/",
					element: <CommonLayout />,
					children: [
						{
							index: true,
							element: <Home />,
						},
						{
							path: "conditions",
							element: <CommonConditions />,
						},
						{
							path: "services",
							element: <CommonServices />,
						},
						{
							path: "clinics/view/:id",
							element: <Clinic />,
						},
						{
							path: "clinics",
							element: <PublicViewClinics />,
						},
					],
				},
				{
					element: <AdminLayout />,
					path: "dashboard",
					children: [
						{
							index: true,
							element: <Dashboard />,
						},
						{
							path: "doctors",
							element: <Doctors />,
						},
						{
							path: "doctors/view/:id",
							element: <Doctor />,
						},
						{
							path: "doctors/verify/:id",
							element: <VerifyDoctor />,
						},
						{
							path: "clinics",
							element: <Clinics />,
						},
						{
							path: "clinics/view/:id",
							element: <Clinic />,
						},
					],
				},
				{
					element: <DoctorLayout />,
					children: [
						{
							path: "profile",
							element: <AccountSettings />,
						},
						{
							path: "password",
							element: <Password />,
						},
						{
							path: "dental-setting",
							element: <DentalSetting />,
						},
						{
							path: "notification",
							element: <Notification />,
						},
						{
							path: "logout",
							element: <Logout />,
						},
					],
				},
				{
					path: "*",
					element: <NotFound />,
				},
				{
					path: "unauthorized",
					element: <Unauthorized />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
