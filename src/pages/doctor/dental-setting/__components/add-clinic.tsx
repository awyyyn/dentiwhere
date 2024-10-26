import { useAtomValue } from "jotai";

/* STATES */
import { userAtom } from "@/atoms";

/* LAYOUTS */
import Layout from "./layout.tsx";

/* COMPONENTS */
import AddEditClinicForm from "../../shared/add-edit-clinic-form.tsx";
import { useTranslation } from "react-i18next";

export default function AddClinic() {
	const user = useAtomValue(userAtom);
	const { t } = useTranslation();
	return (
		<>
			<Layout>
				<div className="bg-[#D9D9D9]/90 mix-blend-multiply p-5 rounded-lg">
					<h1 className="text-3xl">
						{t("welcome0")},{" "}
						<b className="capitalize">
							{user.firstName} {user.lastName}!
						</b>
					</h1>
					<p>{t("welcome0Desc")}</p>
				</div>
				<AddEditClinicForm />
			</Layout>
		</>
	);
}
