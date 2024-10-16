import { Link } from "react-router-dom";
import SocialLinks from "../social-links/social-links";

export default function Footer() {
	const patientLinks = [
		{ path: "/", name: "" },
		{ path: "conditions", name: "Conditions" },
		{ path: "services", name: "Services" },
	];

	const generalLinks = [
		{ path: "about-us", name: "About Us" },
		{ path: "terms-and-conditions", name: "Terms and Conditions" },
		{ path: "privacy-policy", name: "Privacy Policy" },
	];

	const doctorsLinks = [
		{ path: "list-your-dental-clinic", name: "List Your Dental Clinic" },
		{ path: "sign-up", name: "Create an Account" },
		{ path: "login", name: "Log in" },
	];

	return (
		<footer className="bg-[#D9D9D9] py-20 shadow-2xl mb-10">
			<div className="w-11/12 mx-auto md:w-10/12 gap-y-5 sm:gap-10 grid sm:grid-cols-3   ">
				<div className="flex flex-col gap-y-5 sm:gap-y-none justify-between h-full   ">
					<div className="space-y-3">
						<h1 className="text-lg font-bold sm:text-2xl">General</h1>
						<div className="space-y-3  pl-5">
							{generalLinks.map(({ name, path }, indx) => (
								<Link
									to={path}
									key={`general-link-${path}-${indx}`}
									className="block hover:drop-shadow-lg transition-all ">
									{name}
								</Link>
							))}
						</div>
					</div>
					<div className="space-y-3">
						<h1 className="text-lg font-bold sm:text-2xl">Social Media</h1>
						<SocialLinks />
					</div>
				</div>
				<div className="space-y-3 flex flex-col sm:items-center">
					<h1 className="text-lg font-bold sm:text-2xl">For Patients</h1>
					<div className="space-y-3 sm:pl-10 pl-5">
						{patientLinks.map(({ name, path }, indx) => (
							<Link
								to={path}
								key={`patient-link-${path}-${indx}`}
								className="block">
								{name}
							</Link>
						))}
					</div>
				</div>
				<div className="space-y-3  flex flex-col sm:items-center">
					<h1 className="text-lg font-bold sm:text-2xl">For Doctors</h1>
					<div className="space-y-3 sm:pl-10 pl-5">
						{doctorsLinks.map(({ name, path }, indx) => (
							<Link
								to={path}
								key={`doctor-link-${path}-${indx}`}
								className="block">
								{name}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
