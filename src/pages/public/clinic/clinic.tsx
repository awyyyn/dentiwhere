import SharedClinic from "@/components/shared/clinic/shared-clinic";
import { useLocation } from "react-router-dom";

export default function Clinic() {
	const location = useLocation();
	const viewOnly = location.pathname.includes("dashboard");

	return (
		<div className="py-5">
			<div className="w-11/12 mx-auto md:w-10/12 space-y-10">
				<SharedClinic viewOnly={!viewOnly} />
			</div>
		</div>
	);
}
