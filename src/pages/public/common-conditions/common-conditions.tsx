import SectionHeader from "../home/__components/section-header/section-header";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";
import Back from "../__components/back/back";
import { useTranslation } from "react-i18next";

/* ASSETS */
import Diastema from "@/assets/images/conditions/condition-1.png";
import Malocclusion from "@/assets/images/conditions/condition-2.png";
import ToothAgenesis from "@/assets/images/conditions/condition-3.png";
import Periodontal from "@/assets/images/conditions/condition-4.png";
import ToothDecay from "@/assets/images/conditions/condition-5.png";
import CrackedToothSyndrome from "@/assets/images/conditions/condition-6.png";

export default function CommonConditions() {
	const { t } = useTranslation();

	const conditions = [
		{
			title: "Diastema",
			description: t("diastemaDesc"),
			// This condition is usually a cosmetic concern, but sometimes, it’s related to gum disease. Diastema treatments include dental bonding, porcelain veneers and braces.
			img: Diastema,
		},
		{
			title: "Malocclusion",
			description: t("malocclusionDesc"),
			/* 
            This can lead to oral health complications if left untreated. 
                - It may also be referred to as:
                - crowded teeth
                - crossbite
                - overbite
                - underbite
                - open bite
            Your teeth may not perform vital functions well, like chewing, if they’re misaligned. Learn more about this condition and how it may be treated to protect your overall oral and digestive health.
         */
			img: Malocclusion,
		},
		{
			title: "Tooth agenesis",
			description: t("toothAgenesisDesc"),
			// This can range in severity from hypodontia, in which five or fewer teeth are missing, to oligodontia, when six or more permanent teeth are missing in action — this is uncommon, but often associated with genetic syndromes like Down syndrome, Van Der Woude syndrome, Reiger syndrome and ectodermal dysplasia. Anodontia is a rare recessive genetic disorder in which someone just doesn't get permanent teeth — it's also often associated with conditions like ectodermal dysplasia.
			img: ToothAgenesis,
		},
		{
			title: "Periodontal (gum) disease",
			description: t("periodontalDiseaseDesc"),
			// It's typically caused by poor brushing and flossing habits that allow plaque—a sticky film of bacteria—to build up on the teeth and harden. It starts with swollen, red, and bleeding gums. If left untreated, it can spread to the bones surrounding the gums, making it painful to chew. In the worst cases, teeth may become loose or need to be removed.
			img: Periodontal,
		},
		{
			title: "Tooth decay",
			description: t("tootDecayDesc"),
			/* 
            Unfortunately, tooth decay is very prevalent in the United States. According to the Centers for Disease Control and Prevention (CDC), more than 1 in 4 adults have untreated tooth decay.1 Knowing the signs and symptoms of tooth decay can lead to treatment to restore healthy teeth and gums. It’s also crucial to learn how to maintain good oral hygiene to ward off tooth decay.
        */
			img: ToothDecay,
		},
		{
			title: "Cracked tooth syndrome (CTS)",
			description: t("crackedToothDesc"),
			/* 
            The symptoms are very variable, making it a notoriously difficult condition to diagnose.

            Cracked tooth syndrome could be considered a type of dental trauma and also one of the possible causes of dental pain. One definition of cracked tooth syndrome is "a fracture plane of unknown depth and direction passing through tooth structure that, if not already involving, may progress to communicate with the pulp and/or periodontal ligament."
        */
			img: CrackedToothSyndrome,
		},
	];

	return (
		<div className="py-5">
			<Back />
			<div className="w-11/12 mx-auto md:w-10/12 space-y-10">
				<header className="space-y-7">
					<SectionHeader
						title={t("commonConditions")}
						description={t("commonConditionsDescription")}
					/>
				</header>
				<main>
					<div className="space-y-14">
						{conditions.map((condition, indx) => (
							<div
								key={`${condition}-container-${indx}`}
								className="flex gap-5 md:gap-10 items-center lg:flex-row flex-col">
								<AsyncImage
									src={condition.img}
									alt={condition.title}
									Transition={(props) => <Blur radius={20} {...props} />}
									className="shadow-2xl rounded-2xl w-full  md:max-w-[285px] lg:min-w-[400px] xl:min-w-[400px] h-64 sm:h-80 md:h-60 lg:h-72"
								/>
								{/* <img src={condition.img} alt={condition.title}  className="shadow-lg rounded-3xl"/>  */}
								<div className="">
									<p className="text-lg xl:text-xl tracking-wider leading-10">
										<span className="font-bold italic">
											{condition.title}&nbsp;
										</span>
										{condition.description}
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
