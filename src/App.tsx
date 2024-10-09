import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* =============================== LAYOUTS =============================== */
import AuthLayout from "./layouts/auth-layout";
import CommonLayout from "./layouts/common-layout";
import DoctorLayout from "./layouts/doctor-layout";
import AdminLayout from "./layouts/admin-layout";
/* =============================== LAYOUTS =============================== */

/* =============================== COMPONENTS =============================== */
import Loadable from "./components/shared/loader/loader";
/* =============================== COMPONENTS =============================== */

/* =============================== PAGES =============================== */
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
const AccountSettings = Loadable(
	lazy(() => import("./pages/doctor/account-settings/account-settings"))
);
const Password = Loadable(
	lazy(() => import("./pages/doctor/password/password"))
);
const Logout = Loadable(lazy(() => import("./pages/doctor/logout/logout")));
const Parent = Loadable(lazy(() => import("./layouts/parent")));
const DentalSetting = Loadable(
	lazy(() => import("./pages/doctor/dental-setting/dental-setting"))
);
const Notification = Loadable(
	lazy(() => import("./pages/doctor/notification/notification"))
);
const Doctors = Loadable(lazy(() => import("./pages/admin/doctors/doctors")));
const Doctor = Loadable(lazy(() => import("./pages/admin/doctor/doctor")));
const Clinics = Loadable(lazy(() => import("./pages/admin/clinics/clinics")));
const Clinic = Loadable(lazy(() => import("./pages/public/clinic/clinic")));
const PublicViewClinics = Loadable(
	lazy(() => import("./pages/public/clinics/clinics"))
);
const VerifyDoctor = Loadable(
	lazy(() => import("./pages/admin/verify-doctor/verify-doctor"))
);
const Subscriptions = Loadable(
	lazy(() => import("./pages/admin/subscription/subscription"))
);
const Subscription = Loadable(
	lazy(() => import("./pages/doctor/subscription/subscription"))
);
const Transactions = Loadable(
	lazy(() => import("./pages/admin/transactions/transactions"))
);
const FAQs = Loadable(lazy(() => import("./pages/public/faqs/faqs")));
const About = Loadable(lazy(() => import("./pages/public/about/about")));
const PrivacyPolicy = Loadable(
	lazy(() => import("./pages/public/privacy-policy/privacy-policy"))
);
const TermsAndConditions = Loadable(
	lazy(() => import("./pages/public/terms-and-conditions/terms-and-conditions"))
);
/* =============================== PAGES =============================== */

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
							path: "faqs",
							element: <FAQs />,
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
						{
							path: "about-us",
							element: <About />,
						},
						{
							path: "privacy-policy",
							element: <PrivacyPolicy />,
						},
						{
							path: "terms-and-conditions",
							element: <TermsAndConditions />,
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
						{
							path: "subscriptions",
							element: <Subscriptions />,
						},
						{
							path: "transactions",
							element: <Transactions />,
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
							path: "subscribe",
							element: <Subscription />,
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
