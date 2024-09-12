import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* =============================== LAYOUTS =============================== */
import AuthLayout from "./layouts/auth-layout";
import CommonLayout from "./layouts/common-layout";
import ProtectedLayout from "./layouts/protected-layout";
import DoctorLayout from "./layouts/doctor-layout";
import AdminLayout from "./layouts/admin-layout";
/* =============================== LAYOUTS =============================== */

import Loadable from "./components/loader/loader";
import AddClinic from "./pages/doctor/add-clinic/add-clinic";

const Clinic = Loadable(lazy(() => import("./pages/doctor/clinic/clinic")));
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
const EditClinic = Loadable(
	lazy(() => import("./pages/doctor/edit-clinic/edit-clinic"))
);
const DoctorProfile = Loadable(
	lazy(() => import("./pages/doctor/profile/profile"))
);
const NotFound = Loadable(lazy(() => import("./pages/not-found/not-found")));
const Unauthorized = Loadable(
	lazy(() => import("./pages/unauthorized/unauthorized"))
);

export default function App() {
	const router = createBrowserRouter([
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
			],
		},
		{
			element: <ProtectedLayout />,
			children: [
				{
					element: <AdminLayout />,
					children: [
						{
							path: "dashboard",
							element: <Dashboard />,
						},
					],
				},
				{
					element: <DoctorLayout />,
					children: [
						{
							path: "clinic",
							element: <Clinic />,
						},
						{
							path: "clinic/add",
							element: <AddClinic />,
						},
						{
							path: "clinic/edit/:clinicId",
							element: <EditClinic />,
						},
						{
							path: "profile",
							element: <DoctorProfile />,
						},
					],
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
	]);

	return (
		<div className="">
			<RouterProvider router={router} />
		</div>
	);
}
