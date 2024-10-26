import Layout from "./layout.tsx";
import { PiSealWarningFill } from "react-icons/pi";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotVerified() {
	const { t } = useTranslation();
	return (
		<Layout>
			<div className=" text-center items-center h-full flex  flex-col gap-y-2 ">
				<PiSealWarningFill size={200} />
				<h1 className="font-bold text-3xl">{t("notVerified")}</h1>
				<p className="text-gray-700 text-lg">{t("notVerified1")}</p>
				<Link to={"/profile"}>
					<Button className="mt-2">{t("completeInformation")}</Button>
				</Link>
			</div>
		</Layout>
	);
}
