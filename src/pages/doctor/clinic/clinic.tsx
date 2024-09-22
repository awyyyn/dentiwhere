import { clinicAtom } from "@/atoms/clinic-atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AsyncImage } from "loadable-image";
import { CiLocationOn } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { Blur } from "transitions-kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "./__components/about";
import Reviews from "./__components/reviews";
import ClinicEditModal from "./__components/service-dialog";
import CategoryDialog from "./__components/category-dialog";
import Services from "./__components/services";
import { useEffect, useState } from "react";
import { getClinic } from "@/actions";
import { userAtom } from "@/atoms/user-atom";
import { TbWorldWww } from "react-icons/tb";
import { Loader } from "@/components/shared/loader/loader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { accessibilitiesAtom } from "@/atoms/accessibility-atom";
import { amenitiesAtom } from "@/atoms/amenity-atom";
import { categoriesAtom } from "@/atoms/category-atom";
import { servicesAtom } from "@/atoms/service-atom";

export default function Clinic() {
	const user = useAtomValue(userAtom);
	const [clinic, setClinic] = useAtom(clinicAtom);
	const setAccessiblities = useSetAtom(accessibilitiesAtom);
	const setAmenities = useSetAtom(amenitiesAtom);
	const setCategories = useSetAtom(categoriesAtom);
	const setServices = useSetAtom(servicesAtom);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await getClinic(user.id);
			setClinic(response);
			setAccessiblities(response.accesibilities ?? []);
			setCategories(response.categories ?? []);
			setServices(response.services ?? []);
			setAmenities(response.amenities ?? []);
			setLoading(false);
		})();
	}, [user.id]);

	if (loading) return <Loader />;

	return (
		<div className="pb-10">
			<section className="w-full shadow-[]">
				<div className="py-10 flex flex-col md:flex-row items-start md:items-center md:space-x-10 ">
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

						<div className="flex space-x-2">
							<Button
								className="bg-1 text-white"
								size="lg"
								onClick={() => {
									navigate(`/clinic/edit/${clinic?.id}`, {
										state: { clinic: clinic },
									});
								}}>
								Edit
							</Button>
						</div>
					</div>
				</div>
			</section>

			<Tabs defaultValue="services" className="">
				{/* <Separator className='my-5' /> */}
				<TabsList className="w-full flex justify-evenly bg-white space-x-2 border-t border-b rounded-none py-8">
					<TabsTrigger
						className="w-[33.3%] scale-100 hover:scale-100 data-[selected]:bg-red-200 data-[state=active]:shadow-lg lg:text-xl"
						value="services">
						Services
					</TabsTrigger>
					<TabsTrigger
						value="about"
						className=" w-[33.3%] scale-100 hover:scale-100 data-[state=active]:shadow-lg lg:text-xl">
						About
					</TabsTrigger>
					<TabsTrigger
						value="reviews"
						className=" w-[33.3%] scale-100 hover:scale-100 data-[state=active]:shadow-lg lg:text-xl">
						Reviews
					</TabsTrigger>
				</TabsList>
				{/* <Separator className='my-5' /> */}
				<TabsContent value="services" className="space-y-5 mt-5">
					<Services />
				</TabsContent>
				<TabsContent value="about">
					<About />
				</TabsContent>
				<TabsContent value="reviews">
					<Reviews />
				</TabsContent>
			</Tabs>

			<ClinicEditModal />
			<CategoryDialog />
		</div>
	);
}
