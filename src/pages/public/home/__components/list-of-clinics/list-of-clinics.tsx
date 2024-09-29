import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

/* STATES */
import { clinicsLoadable } from "@/atoms";
import { Button } from "@/components/ui/button";
import SectionHeader from "../section-header/section-header";
import Clinic from "./card";

/* COMPONENTS */
import ClinicSkeleton from "./clinic-skeleton";

export default function ListOfClinics() {
	const clinicsLoadableAtom = useAtomValue(clinicsLoadable);
	const navigate = useNavigate();

	return (
		<div className="mx-auto  w-11/12 md:w-10/12 py-10 sm:py-20 space-y-5 md:space-y-10">
			<SectionHeader
				title="Dental Clinics Available"
				description="We have Doctors in these hospitals who are ready to serve you!"
				buttonLabel="List Your Dental Clinic"
				showButton
				buttonAction={() => navigate("/dental-setting")}
			/>

			<div className="space-y-12 flex flex-col">
				{clinicsLoadableAtom.state === "loading" ? (
					[1, 2, 3].map((_, indx) => <ClinicSkeleton key={indx} />)
				) : clinicsLoadableAtom.state === "hasError" ? (
					<h1>Error</h1>
				) : (
					clinicsLoadableAtom.data.map((clinic, indx) => (
						<Clinic
							key={`${clinic.name}-card-${indx}`}
							clinic={{
								img: clinic.img,
								id: clinic.id,
								contact: `+63 ${clinic.contacts[0].slice(1)}`,
								location: clinic.address,
								name: clinic.name,
							}}
						/>
					))
				)}
				<div className="self-center">
					<Button
						onClick={() => navigate("/clinics")}
						className=" bg-[#58D4E8] hover:bg-[#58D4E8] rounded-full text-white hover:shadow-lg hover:shadow-gray-300  transition-all duration-300 font-extrabold tracking-wide"
						size={"lg"}>
						View more Dental Clinic
					</Button>
				</div>
			</div>
		</div>
	);
}
