import { useEffect, useState } from "react";
import ClinicsTable from "../__components/clinics-table";
import { ClinicWithDoctor } from "@/types/types";
import { getAllClinics } from "@/actions/clinic";

export default function Clinics() {
	const [clinics, setClinics] = useState<ClinicWithDoctor[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchClinics = async () => {
			try {
				setLoading(true);
				const data = await getAllClinics();

				setClinics(data);
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
			<ClinicsTable data={clinics ?? []} />
		</div>
	);
}
