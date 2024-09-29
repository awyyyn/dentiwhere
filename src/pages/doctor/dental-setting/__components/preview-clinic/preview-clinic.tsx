import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";

/* ACTIONS */
import { getClinic } from "@/actions";

/* STATES */
import { reviewsAtom, clinicWithDoctorAtom } from "@/atoms";

/* COMPONENTS */
import Reviews from "@/components/shared/clinic/__components/reviews";
import { Loader } from "@/components/shared/loader/loader";
import About from "@/components/shared/clinic/__components/about";
import Services from "@/components/shared/clinic/__components/services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ASSETS */
import { BriefcaseMedical } from "lucide-react";
import { TbWorldWww } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";

export default function PreviewClinic({ id }: { id: number }) {
	const [clinic, setClinic] = useAtom(clinicWithDoctorAtom);
	const setReviews = useSetAtom(reviewsAtom);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await getClinic(id);
			setReviews(response.reviews ?? []);
			setClinic(response);
			setLoading(false);
		})();
	}, [id]);

	if (loading) return <Loader />;

	return (
		<div className="p-1 lg:p-5">
			<section className="w-full shadow-[]">
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
									{clinic?.contacts
										.map((contact) => `+63 ${contact.slice(1)}`)
										.join(" / ")}
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
						description={clinic?.description ?? ""}
						amenities={clinic?.amenities ?? []}
						accessibilities={clinic?.accesibilities ?? []}
						map={clinic?.map && clinic.map}
					/>
				</TabsContent>
				<TabsContent value="reviews">
					<Reviews doctorId={Number(clinic?.doctorId)} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
