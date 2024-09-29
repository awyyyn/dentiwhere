import { clinicsLoadable } from "@/atoms/clinic-atom";
import { useAtomValue } from "jotai";
import SectionHeader from "../home/__components/section-header/section-header";
import ClinicCard from "../home/__components/list-of-clinics/card";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/pages/admin/__components/tooltip";

export default function Clinics() {
	const clinicsLoadableAtom = useAtomValue(clinicsLoadable);
	const clinics =
		clinicsLoadableAtom.state === "hasData" ? clinicsLoadableAtom.data : [];
	const navigate = useNavigate();

	return (
		<div className="mx-auto  w-11/12 md:w-10/12 py-5 pb-32">
			<Tooltip tooltip="Back" side="right" delayDuration={500}>
				<Button onClick={() => navigate("/")} variant="ghost" className="mb-5">
					<ChevronLeft />
					&nbsp;Back
				</Button>
			</Tooltip>
			<div className="space-y-5 md:space-y-10">
				<SectionHeader
					title="Dental Clinics Available"
					description="We have Doctors in these hospitals who are ready to serve you!"
					buttonLabel="List Your Dental Clinic"
				/>

				<div className="space-y-12 flex flex-col">
					{clinics.map((clinic) => (
						<ClinicCard
							navigateToRoot
							clinic={{
								contact: `+63${clinic.contacts[0].slice(1)}`,
								id: clinic.id,
								name: clinic.name,
								location: clinic.address,
								img: clinic.img,
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
