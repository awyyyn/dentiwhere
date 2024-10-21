import SocialLinks from "@/components/shared/social-links/social-links";
import Back from "../__components/back/back";
import { useTranslation } from "react-i18next";

export default function TermsAndConditions({
	hideBackButton = false,
}: {
	hideBackButton?: boolean;
}) {
	const { t } = useTranslation();
	return (
		<div className="py-5">
			{!hideBackButton && <Back />}
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Terms and Conditions
				</h1>

				<div className="max-w-3xl mx-auto space-y-8">
					<section>
						<p className="text-lg">{t("welcome2")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term1")}</h2>
						<p>{t("termDesc")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term2")}</h2>
						<p>{t("term2Desc")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term3")}</h2>
						<p>{t("term3Desc")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term4")}</h2>
						<p>{t("term4Desc")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term5")}</h2>
						<p>{t("term5Desc")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term6")}</h2>
						<p>{t("term6Desc")}</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>{t("term6Desc1")}</li>
							<li>{t("term6Desc2")}</li>
							<li>{t("term6Desc3")}</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term7Desc")}</h2>
						<ul className="list-disc pl-6 space-y-2">
							<li>{t("term7Desc")}</li>
							<li>{t("term7Desc1")}</li>
							<li>{t("term7Desc2")}</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term8")}</h2>
						<p>{t("term8Desc")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term9")}</h2>
						<p>{t("term9Desc")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term10")}</h2>
						<p>{t("term10Desc")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("term11")}</h2>
						<p>{t("term11Desc")}</p>
						<div className="flex space-x-4 mt-4">
							<SocialLinks />
						</div>
					</section>

					<section>
						<p className="text-lg font-semibold">{t("byUsingPlatform2")}</p>
					</section>
				</div>
			</div>
		</div>
	);
}
