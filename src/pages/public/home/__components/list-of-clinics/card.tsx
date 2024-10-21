import { Button } from "@/components/ui/button";
import { AsyncImage } from "loadable-image";
import { useTranslation } from "react-i18next";
import { CiLocationOn } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface ClinicProps {
	clinic: {
		img: string;
		id: number;
		name: string;
		location: string;
		contact: string;
	};
	navigateTo?: string;
}

export default function ClinicCard({ clinic, navigateTo }: ClinicProps) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const handleNavigate = () =>
		navigate(`/clinics/view/${clinic.id}`, {
			state: { navigateToClinics: navigateTo },
		});
	return (
		<div className="bg-white flex gap-4 flex-col md:flex-row  rounded-xl shadow-xl p-6 md:p-14 ">
			<div className="">
				<AsyncImage
					src={clinic.img}
					className="h-40 w-full md:w-40 rounded-lg"
				/>
			</div>
			<div className=" space-y-3   w-full">
				<h1 className="text-3xl font-extrabold tracking-wide leading-tight">
					{clinic.name}
				</h1>
				<div className="flex justify-between gap-y-3 md:gap-y-0 flex-col md:flex-row ">
					<div className="space-y-3">
						<div className="flex space-x-2">
							<CiLocationOn size={30} strokeWidth={0.3} />
							<p>{clinic.location}</p>
						</div>
						<div className="flex space-x-2">
							<PiPhoneLight size={30} strokeWidth={0.3} />
							<p>{clinic.contact}</p>
						</div>
					</div>
					<div className="md:self-end self-center">
						<Button
							onClick={handleNavigate}
							className="btn-1 hover:bg-1 transition-all duration-300 shadow-2xl">
							{t("viewProfile")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
