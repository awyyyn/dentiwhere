import { clinicWithDoctorAtom } from "@/atoms/clinic-atom";
import { useAtom, useSetAtom } from "jotai";
import { AsyncImage } from "loadable-image";
import { CiLocationOn } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { Blur } from "transitions-kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getClinic } from "@/actions/clinic";
import { TbWorldWww } from "react-icons/tb";
import { Loader } from "@/components/shared/loader/loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BriefcaseMedical, ChevronLeft } from "lucide-react";
import Services from "./__components/services";
import About from "./__components/about";
import Reviews from "./__components/reviews";
import { reviewsAtom } from "@/atoms/review-atom";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/pages/admin/__components/tooltip";
import { isEmpty, isUndefined } from "lodash";

export default function SharedClinic({
	viewOnly = false,
}: {
	viewOnly: boolean;
}) {
	const { state } = useLocation();
	const params = useParams();
	const navigate = useNavigate();
	const [clinic, setClinic] = useAtom(clinicWithDoctorAtom);
	const setReviews = useSetAtom(reviewsAtom);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			if (isEmpty(params.id) || isUndefined(params.id)) {
				setLoading(false);
				return navigate("/clinics", { replace: true });
			} else {
				try {
					const response = await getClinic(parseInt(params.id));
					setReviews(response.reviews ?? []);
					setClinic(response);
					setLoading(false);
				} catch {
					return navigate("/clinics", { replace: true });
				}
			}
		})();
	}, [params.id]);

	if (loading) return <Loader />;

	return (
		<div className="p-1 lg:p-5">
			<section className="w-full shadow-[]">
				{viewOnly && (
					<Tooltip tooltip="Back" side="right" delayDuration={500}>
						<Button
							onClick={() =>
								navigate(state?.navigateToClinics ? "/clinics" : "/")
							}
							variant="ghost"
							className="mb-5">
							<ChevronLeft />
							&nbsp;Back
						</Button>
					</Tooltip>
				)}
				<div className="py-2  px-2 flex flex-col md:flex-row items-start md:items-center md:space-x-10 ">
					<div className="mb-4 md:mb-0 self-center">
						<AsyncImage
							src={clinic?.img ?? ""}
							alt={clinic?.name}
							Transition={(props) => <Blur radius={20} {...props} />}
							className="shadow-lg w-60 h-60 lg:h-72 lg:w-72 rounded-full"
						/>
					</div>
					<div className="self space-y-2 md:space-y-4">
						<h1 className="lg:text-5xl md:text-3xl text-xl font-extrabold tracking-wider">
							{clinic?.name}
						</h1>
						<div className="flex space-x-2">
							<BriefcaseMedical size={30} strokeWidth={1} />
							<p className="md:text-xl text-lg">Dr. {clinic?.doctor}</p>
						</div>
						<div className="flex space-x-2">
							<CiLocationOn size={30} strokeWidth={1} />
							<p className="md:text-xl text-lg">{clinic?.address}</p>
						</div>
						{clinic?.contacts && clinic?.contacts?.length > 0 && (
							<div className="flex space-x-2">
								<PiPhoneLight size={30} strokeWidth={1} />
								<p className="md:text-xl text-lg">
									{clinic?.contacts.join(" / ")}
								</p>
							</div>
						)}
						{clinic?.website && (
							<div className="flex space-x-2">
								<TbWorldWww size={30} strokeWidth={1} />
								<p className="md:text-xl text-lg">{clinic.website}</p>
							</div>
						)}
					</div>
				</div>
			</section>
			<Tabs defaultValue="services" className="mt-4">
				{/* <Separator className='my-5' /> */}
				<TabsList className="w-full flex justify-evenly  rounded-lg bg-transparent space-x-2   py-6">
					<TabsTrigger
						className="w-[33.3%]  data-[state=active]:text-white scale-100 hover:scale-100 data-[state=active]:bg-1 data-[state=active]:shadow-lg lg:text-xl"
						value="services">
						Services
					</TabsTrigger>
					<TabsTrigger
						value="about"
						className="w-[33.3%]  data-[state=active]:text-white scale-100 hover:scale-100 data-[state=active]:bg-1 data-[state=active]:shadow-lg lg:text-xl">
						About
					</TabsTrigger>
					<TabsTrigger
						value="reviews"
						className="w-[33.3%]  data-[state=active]:text-white scale-100 hover:scale-100 data-[state=active]:bg-1 data-[state=active]:shadow-lg lg:text-xl">
						Reviews
					</TabsTrigger>
				</TabsList>
				{/* <Separator className='my-5' /> */}
				<TabsContent value="services" className="space-y-5 mt-5">
					<Services
						categories={clinic?.categories ?? []}
						services={clinic?.services ?? []}
					/>
				</TabsContent>
				<TabsContent value="about">
					<About
						map={clinic?.map && clinic.map}
						description={clinic?.description ?? ""}
						amenities={clinic?.amenities ?? []}
						accessibilities={clinic?.accesibilities ?? []}
					/>
				</TabsContent>
				<TabsContent value="reviews">
					<Reviews doctorId={Number(clinic?.doctorId)} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
