import { useEffect, useState } from "react";
import ClinicsTable from "../__components/clinics-table";
import { ClinicWithDoctor } from "@/types/types";
import { getAllClinics } from "@/actions/clinic";
import { ImSpinner2 } from "react-icons/im";
import { useSetAtom } from "jotai";
import { clinicsAtom } from "@/atoms/clinic-atom";

export default function Clinics() {
	const setClinics = useSetAtom<ClinicWithDoctor[]>(clinicsAtom);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchClinics = async () => {
			try {
				setLoading(true);
				const data = await getAllClinics();
				setClinics(data);
				setLoading(false);
			} catch {
				setLoading(false);
			}
		};

		fetchClinics();
	}, []);

	return (
		<div className="p-2 md:p-5 lg:p-10 xl:p-14   space-y-5">
			<section className="md:space-y-2">
				<h1 className="text-2xl lg:text-5xl font-bold">Clinics</h1>
				<p className="text-gray-600 md:text-lg">Manage clinics</p>
			</section>
			{loading ? (
				<div className="w-full p-2 h-[50vh] flex justify-center items-center flex-col bg-white rounded-lg shadow-xl">
					<ImSpinner2 className="animate-spin" size={50} />
					<h1>Fetching Data</h1>
				</div>
			) : (
				<ClinicsTable />
			)}
		</div>
	);
}
