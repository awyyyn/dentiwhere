import { Button } from "@/components/ui/button";
import { AsyncImage } from "loadable-image";
import Dental from "@/assets/images/dental.webp";
import { Link } from "react-router-dom";
import Back from "../__components/back/back";
import { useTranslation } from "react-i18next";

export default function About() {
	const { t } = useTranslation();

	return (
		<div className="py-5">
			<Back />
			<div className="w-11/12 mx-auto md:w-10/12 space-y-10">
				<div className="flex flex-col items-center mb-12  ">
					<h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
						{t("aboutDentiwhere")}
					</h1>
					<p className="text-xl text-center text-muted-foreground mb-8">
						{t("discover")}
					</p>
					<AsyncImage
						src={Dental}
						srcSet={Dental}
						alt="Dentiwhere hero image"
						className="rounded-lg h-[300px] md:h-[500px] w-full max-w-3xl shadow-lg"
					/>
				</div>

				<div className="max-w-3xl mx-auto space-y-8 pb-14">
					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("welcome")}</h2>
						<p className="text-muted-foreground">{t("description1")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("ourPriority")}</h2>
						<p className="text-muted-foreground">{t("description2")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							{t("supportingDental")}
						</h2>
						<p className="text-muted-foreground">{t("description3")}</p>
					</section>

					<div className="text-center my-12">
						<h3 className="text-xl font-semibold mb-4">
							{t("findYourDentalCare")}
						</h3>
						<Link to="/">
							<Button size="lg">{t("getStarted")}</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
