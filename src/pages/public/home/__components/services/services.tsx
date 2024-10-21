import Card from "../card/card";
import { services } from "@/constants/services";
import SectionHeader from "../section-header/section-header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Services() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<section className="w-full">
			<div className="mx-auto  w-11/12 md:w-10/12 py-10 space-y-5 md:space-y-10">
				<SectionHeader
					title={t("commonServices")}
					description={t("commonServicesDescription")}
					buttonLabel={t("viewAll")}
					buttonAction={() => navigate("services")}
					showButton
				/>
				{/* <div className='grid gap-12 md:grid-cols-2 xl:grid-cols-3 grid-flow-row bg-red-500   '> */}
				<div className="flex flex-wrap justify-between gap-y-12">
					{services.map((service, indx) => (
						// <div key={`${condition.title}-${indx}`} className='w-full  justify-center'>
						<Card card={service} key={`${service.title}-${indx}`} />
					))}
				</div>
			</div>
		</section>
	);
}
