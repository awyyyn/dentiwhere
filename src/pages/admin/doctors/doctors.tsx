import { useEffect, useState } from "react";
import { useAtom } from "jotai";

/* ACTIONS */
import { getAllDoctors } from "@/actions";

/* STATES */
import { doctorsAtom } from "@/atoms";

/* COMPONENTS */
import DataTable from "../__components/doctors-table";

/* ASSETS */
import { ImSpinner2 } from "react-icons/im";
import { useTranslation } from "react-i18next";

export default function Doctors() {
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();
	const [doctors, setDoctors] = useAtom(doctorsAtom);

	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				setLoading(true);
				const doctors = await getAllDoctors();
				setDoctors(doctors);
				setLoading(false);
			} catch {
				setLoading(false);
			}
		};

		fetchDoctors();
	}, []);

	return (
		<div className="p-2 md:p-5 lg:p-10 xl:p-14   space-y-5">
			<section className="md:space-y-2">
				<h1 className="text-2xl lg:text-5xl font-bold">{t("doctors")}</h1>
				<p className="text-gray-600 md:text-lg">{t("manageDoctors")}</p>
			</section>
			<section>
				<div className="bg-white/0">
					{loading ? (
						<div className="w-full p-2 h-[50vh] flex justify-center items-center flex-col bg-white rounded-lg shadow-xl">
							<ImSpinner2 className="animate-spin" size={50} />
							<h1>Fetching Data</h1>
						</div>
					) : (
						<DataTable doctors={doctors} />
					)}
				</div>
			</section>
		</div>
	);
}
