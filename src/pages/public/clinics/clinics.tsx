import { useAtomValue } from "jotai";

/* STATES */
import { clinicsLoadable } from "@/atoms";

/* COMPONENTS */
import SectionHeader from "../home/__components/section-header/section-header";
import ClinicCard from "../home/__components/list-of-clinics/card";

/* ASSETS */
import Back from "../__components/back/back";
import { useTranslation } from "react-i18next";

export default function Clinics() {
	const clinicsLoadableAtom = useAtomValue(clinicsLoadable);
	const clinics =
		clinicsLoadableAtom.state === "hasData" ? clinicsLoadableAtom.data : [];
	const { t } = useTranslation();

	return (
		<div className="mx-auto  w-11/12 md:w-10/12 py-5 pb-32">
			<Back toRoot />
			<div className="space-y-5 md:space-y-10">
				<SectionHeader
					title={t("availableClinics")}
					description={t("weHaveDoctors")}
					buttonLabel={t("listYourDentalClinic")}
				/>

				<div className="space-y-12 flex flex-col">
					{clinics.map((clinic) => (
						<ClinicCard
							navigateTo="/clinics"
							clinic={{
								contact: `+63${clinic.contacts[0].slice(1)}`,
								id: clinic.id,
								name: clinic.name,
								location: clinic.address,
								img: clinic.img,
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
