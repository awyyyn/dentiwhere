import SocialLinks from "@/components/shared/social-links/social-links";
import Back from "../__components/back/back";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy({
	hideBackButton = false,
}: {
	hideBackButton?: boolean;
}) {
	const { t } = useTranslation();
	return (
		<div className="py-5">
			{!hideBackButton && <Back />}
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

				<div className="max-w-3xl mx-auto space-y-8">
					<section>
						<p className="text-lg">{t("atDentiwhere")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("privacy1")}</h2>
						<p>{t("weMayCollect")}</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>{t("personalInformation")}</strong>{" "}
								{t("personalInformationDesc")}
							</li>
							<li>
								<strong>{t("locationData")}</strong>
								{t("locationDataDesc")}
							</li>
							<li>
								<strong>{t("usagedata")}</strong> {t("usageDataDesc")}
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("privacy2")}</h2>
						<p>{t("weUseTheInformation")}</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>{t("weUseTheInformation1")}</li>
							<li>{t("weUseTheInformation2")}</li>
							<li>{t("weUseTheInformation3")}</li>
							<li>{t("weUseTheInformation4")}</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("privacy3")}</h2>
						<p>{t("weDoNotSell")}</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>{t("dentalClinics")}</strong> {t("dentalClinicsDesc")}
							</li>
							<li>
								<strong>{t("serviceProviders")}</strong>{" "}
								{t("serviceProvidersDesc")}
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("privacy4")}</h2>
						<p>{t("weImplementReasonable")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("privacy5")}</h2>
						<p>{t("weUseCookies")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("privacy6")}</h2>
						<p>{t("youHaveTheRight")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("privacy7")}</h2>
						<p>{t("weReserveTheRight")}</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">{t("privacy8")}</h2>
						<p>{t("ifYouHaveQuestions")}</p>
						<div className="mt-3">
							<SocialLinks />
						</div>
					</section>

					<section>
						<p className="text-lg font-semibold">{t("byUsingPlatform")}</p>
					</section>
				</div>
			</div>
		</div>
	);
}
