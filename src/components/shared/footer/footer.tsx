import { Link } from "react-router-dom";
import SocialLinks from "../social-links/social-links";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";
import { isEmpty } from "lodash";

export default function Footer() {
	const { t } = useTranslation();
	const { authId } = useAtomValue(userAtom);

	const patientLinks = [
		{ path: "/", name: "" },
		{ path: "conditions", name: t("conditions") },
		{ path: "services", name: t("services") },
	];

	const generalLinks = [
		{ path: "about-us", name: t("aboutUs") },
		{ path: "terms-and-conditions", name: t("termsAndConditions") },
		{ path: "privacy-policy", name: t("privacyPolicy") },
	];

	const doctorsLinks = [
		{
			path: "dental-setting",
			name: t("listYourDentalClinic"),
			isDisplay: true,
		},
		{ path: "sign-up", name: t("createAccount"), isDisplay: isEmpty(authId) },
		{ path: "login", name: t("logIn"), isDisplay: isEmpty(authId) },
	];

	return (
		<footer className="bg-[#D9D9D9] py-20 shadow-2xl mb-10">
			<div className="w-11/12 mx-auto md:w-10/12 gap-y-5 sm:gap-10 grid sm:grid-cols-3   ">
				<div className="flex flex-col gap-y-5 sm:gap-y-none justify-between h-full   ">
					<div className="space-y-3">
						<h1 className="text-lg font-bold sm:text-2xl">{t("general")}</h1>
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
					<h1 className="text-lg font-bold sm:text-2xl">{t("forPatients")}</h1>
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
					<h1 className="text-lg font-bold sm:text-2xl">{t("forDoctors")}</h1>
					<div className="space-y-3 sm:pl-10 pl-5">
						{doctorsLinks.map(
							({ name, path, isDisplay }, indx) =>
								isDisplay && (
									<Link
										to={path}
										key={`doctor-link-${path}-${indx}`}
										className="block">
										{name}
									</Link>
								)
						)}
					</div>
				</div>
			</div>
		</footer>
	);
}
