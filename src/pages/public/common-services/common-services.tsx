import SectionHeader from "../home/__components/section-header/section-header";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";
import Back from "../__components/back/back";
import { useTranslation } from "react-i18next";

/* ASSETS */
import Diastema from "@/assets/images/services/service-1.png";
import RootCanal from "@/assets/images/services/service-2.png";
import DentalCrown from "@/assets/images/services/service-3.png";
import ToothFilling from "@/assets/images/services/service-4.png";
import FullDentures from "@/assets/images/services/service-5.png";
import Braces from "@/assets/images/services/service-6.png";

export default function CommonServices() {
	const { t } = useTranslation();

	const services = [
		{
			title: "Tooth extraction",
			description: t("toothExtractionDesc"),
			/* 
            The process begins with a thorough assessment and usually involves taking X-rays to evaluate the tooth and its surrounding structures. Local anesthesia is then administered to numb the area, ensuring the patient is comfortable and pain-free during the procedure. The dentist uses specialized tools to loosen and extract the tooth carefully. Post-procedure, patients may experience swelling or discomfort, which can be managed with prescribed medications and by following aftercare instructions provided by the dentist. Proper care and adherence to these guidelines are crucial for a smooth recovery and to avoid potential complications.
        */
			img: Diastema,
		},
		{
			title: "Root canal",
			description: t("rootCanalDesc"),
			/* 
            The process involves removing the infected or damaged pulp, thoroughly cleaning and disinfecting the root canals, and then filling them with a biocompatible material to seal the space. This procedure helps save the tooth and alleviate pain caused by the infection or damage. After the root canal, the tooth is typically restored with a crown or filling to ensure its strength and functionality. The procedure is generally performed under local anesthesia to ensure patient comfort.
        */
			img: RootCanal,
		},
		{
			title: "Dental crown",
			description: t("dentalCrownDesc"),
			/* 
            The crown covers the entire visible part of the tooth, providing protection and enhancing its function. To place a crown, the dentist first prepares the tooth by removing any damaged or decayed parts and shaping it to fit the crown. An impression of the tooth is then taken to create a custom-fitted crown, which is usually made from materials like porcelain, metal, or a combination of both. Once the crown is ready, it is cemented onto the prepared tooth, restoring its original function and appearance.
        */
			img: DentalCrown,
		},
		{
			title: "Tooth filling",
			description: t("toothFillingDesc"),
			/* 
             The process involves removing the decayed portion of the tooth and then filling the empty space with a material that restores the tooth's structure and function. The filling material, which can be made from materials such as amalgam, composite resin, glass ionomer, or gold, is applied in layers and shaped to match the tooth's natural contours. Once the filling material is in place, it is hardened and polished to ensure a smooth finish. Tooth fillings help prevent further decay and restore the tooth's ability to chew and function normally.
        */
			img: ToothFilling,
		},
		{
			title: "Full dentures",
			description: t("fullDenturesDesc"),
			/* 
            They are removable for cleaning and sleeping. Partial dentures, on the other hand, are used when some natural teeth remain, consisting of artificial teeth attached to a metal or acrylic framework that clasps onto the remaining teeth. Both types of dentures restore oral function, improve speech and appearance, and are custom-made for a comfortable fit.
        */
			img: FullDentures,
		},
		{
			title: "Braces",
			description: t("bracesDesc"),
			/* 
            They consist of metal or ceramic brackets attached to the teeth, connected by wires that apply gentle pressure to gradually shift the teeth into their proper positions. Braces can also include rubber bands or other accessories to assist with alignment. The treatment typically involves regular adjustments by an orthodontist to ensure the teeth move as planned. Braces help address issues such as overcrowding, gaps, and bite problems, leading to a more balanced and attractive smile.
        */
			img: Braces,
		},
	];
	return (
		<div className="py-5">
			<Back />
			<div className="w-11/12 mx-auto md:w-10/12 space-y-10">
				<header className="space-y-7">
					<SectionHeader
						title={t("commonServices")}
						description={t("commonServicesDescription")}
					/>
				</header>
				<main>
					<div className="space-y-14">
						{services.map((service, indx) => (
							<div
								key={`${service}-container-${indx}`}
								className="flex gap-5 md:gap-10 items-center lg:flex-row flex-col">
								<AsyncImage
									src={service.img}
									alt={service.title}
									Transition={(props) => <Blur radius={20} {...props} />}
									className="shadow-2xl rounded-2xl w-full  md:max-w-[285px] lg:min-w-[400px] xl:min-w-[400px] h-64 sm:h-80 md:h-60 lg:h-72"
								/>
								{/* <img src={service.img} alt={service.title} className="shadow-lg rounded-3xl" />  */}
								<div className="">
									<p className="text-lg xl:text-xl tracking-wider leading-10">
										<span className="font-bold italic">
											{service.title}&nbsp;
										</span>
										{service.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
