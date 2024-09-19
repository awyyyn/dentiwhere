import { useEffect, useState } from "react";
import DataTable from "../__components/doctors-table";
import { useAtom } from "jotai";
import { doctorsAtom } from "@/atoms/doctors-atom";
import { getAllDoctors } from "@/actions/user";

export default function Doctors() {
	const [loading, setLoading] = useState(false);
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

	console.log(doctors, "doctors qqqq");

	return (
		<div className="p-2 md:p-5 lg:p-10 xl:p-14   space-y-5">
			<section className="md:space-y-2">
				<h1 className="text-2xl lg:text-5xl font-bold">Doctors</h1>
				<p className="text-gray-600 md:text-lg">Manage doctors</p>
			</section>
			<section>
				<div className="bg-white/0">
					<DataTable doctors={doctors} />
				</div>
			</section>
		</div>
	);
}
