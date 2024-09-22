import { userAtom } from "@/atoms/user-atom";
import { useAtomValue } from "jotai";
import Layout from "./layout";
import NotVerified from "./not-verified";
import NoRecord from "./no-record";
import { useState } from "react";
import { Status } from "@/types/types";
import AddEditClinicForm from "../shared/add-edit-clinic-form";
import { clinicAtom } from "@/atoms/clinic-atom";
import AddClinic from "./add-clinic";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ManageCategories from "./manage-categories";
import ManageServices from "./manage-services";
import ManageAccesibility from "./manage-accesibility";
import ManageAmenities from "./manage-amenities";
import { Tooltip } from "@/pages/admin/__components/tooltip";
import { MdCategory, MdMedicalInformation } from "react-icons/md";
import { TbDental } from "react-icons/tb";
import { Accessibility, Building } from "lucide-react";

type Manage =
	| "clinic"
	| "categories"
	| "services"
	| "accessibility"
	| "amenities";

export default function DentalSetting() {
	const user = useAtomValue(userAtom);
	const [adding, setAdding] = useState(false);
	const [editing, setEditing] = useState(false);
	const [manage, setManage] = useState<Manage>("clinic");
	const clinic = useAtomValue(clinicAtom);

	if (user.status === Status.unverified) return <NotVerified />;
	if (user.status !== Status.verified && !adding)
		return <NoRecord handleAdd={() => setAdding(true)} />;
	if (user.status === Status.verified && user.clinicId === 0)
		return <AddClinic />;

	const toggleGroupItemStyle =
		"data-[state=on]:bg-white/80 p-4 py-6 md:py-0 data-[state=off]:bg-white/30 hover:data-[state=off]:text-black  hover:data-[state=off]:bg-white/50 transition-all duration-300 data-[state=on]:shadow-lg data-[state=off]:shadow-none";

	return (
		<>
			<Layout>
				<div className="">
					<div>
						<h1 className="text-3xl font-bold">Dental Setting</h1>
					</div>
					<div className="flex">
						<ToggleGroup
							type="single"
							value={manage}
							className="flex justify-start flex-wrap flex-1 mt-4 md:max-w-fit"
							onValueChange={(value) => {
								if (value) {
									setManage(value as Manage);
								}
							}}>
							<ToggleGroupItem className={toggleGroupItemStyle} value="clinic">
								<Tooltip
									className="block translate-y-2 lg:hidden"
									tooltip="Manage Clinic Information"
									side="bottom"
									delayDuration={300}>
									<p>
										<MdMedicalInformation size={30} className="md:hidden" />
										<span className="hidden md:block">
											Manage Clinic Information
										</span>
									</p>
								</Tooltip>
							</ToggleGroupItem>
							<ToggleGroupItem
								className={toggleGroupItemStyle}
								value="categories">
								<Tooltip
									className="block translate-y-2 lg:hidden"
									tooltip="Manage Categories"
									side="bottom"
									delayDuration={300}>
									<p>
										<MdCategory size={30} className="md:hidden" />
										<span className="hidden md:block">Manage Categories</span>
									</p>
								</Tooltip>
							</ToggleGroupItem>
							<ToggleGroupItem
								className={toggleGroupItemStyle}
								value="services">
								<Tooltip
									className="block translate-y-2 lg:hidden"
									tooltip="Manage Services"
									side="bottom"
									delayDuration={300}>
									<p>
										<TbDental size={30} className="md:hidden" />
										<span className="hidden md:block">Manage Services</span>
									</p>
								</Tooltip>
							</ToggleGroupItem>
							<ToggleGroupItem
								className={toggleGroupItemStyle}
								value="accessibility">
								<Tooltip
									className="block translate-y-2 lg:hidden"
									tooltip="Manage Accessibility"
									side="bottom"
									delayDuration={300}>
									<p>
										<Accessibility size={30} className="md:hidden" />
										<span className="hidden md:block">
											Manage Accessibility
										</span>
									</p>
								</Tooltip>
							</ToggleGroupItem>
							<ToggleGroupItem
								className={toggleGroupItemStyle}
								value="amenities">
								<Tooltip
									className="block translate-y-2 lg:hidden"
									tooltip="Manage Amenities"
									side="bottom"
									delayDuration={300}>
									<p>
										<Building size={30} className="md:hidden" />
										<span className="hidden md:block">Manage Amenities</span>
									</p>
								</Tooltip>
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</div>
				{manage === "clinic" && <AddEditClinicForm edit clinic={clinic} />}
				{manage === "categories" && <ManageCategories />}
				{manage === "services" && <ManageServices />}
				{manage === "accessibility" && <ManageAccesibility />}
				{manage === "amenities" && <ManageAmenities />}
			</Layout>
		</>
	);
}
