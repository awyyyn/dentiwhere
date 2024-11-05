import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

/* STATES */
import { clinicsLoadable } from "@/atoms";
import { Button } from "@/components/ui/button";
import SectionHeader from "../section-header/section-header";
import Clinic from "./card";

/* COMPONENTS */
import ClinicSkeleton from "./clinic-skeleton";
import { useTranslation } from "react-i18next";

export default function ListOfClinics() {
	const clinicsLoadableAtom = useAtomValue(clinicsLoadable);
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div className="mx-auto  w-11/12 md:w-10/12 py-10 sm:py-20 space-y-5 md:space-y-10">
			<SectionHeader
				title={t("Dental Clinics Available")}
				description={t("availableClinics")}
				// buttonLabel={t("listYourClinic")}
				// showButton
				// buttonAction={() => navigate("/dental-setting")}
			/>

			<div className="space-y-12 flex flex-col">
				{clinicsLoadableAtom.state === "loading" ? (
					[1, 2, 3].map((_, indx) => <ClinicSkeleton key={indx} />)
				) : clinicsLoadableAtom.state === "hasError" ? (
					<h1>Error</h1>
				) : (
					clinicsLoadableAtom.data.slice(0, 3).map((clinic, indx) => (
						<Clinic
							key={`${clinic.name}-card-${indx}`}
							clinic={{
								img: clinic.img,
								id: clinic.id,
								contact: `+63 ${clinic.contacts[0].slice(1)}`,
								location: clinic.address,
								name: clinic.name,
							}}
						/>
					))
				)}
				<div className="self-center">
					<Button
						onClick={() => navigate("/clinics")}
						className=" bg-[#58D4E8] hover:bg-[#58D4E8] rounded-full text-white hover:shadow-lg hover:shadow-gray-300  transition-all duration-300 font-extrabold tracking-wide"
						size={"lg"}>
						{t("viewMoreClinic")}
					</Button>
				</div>
			</div>
		</div>
	);
}
