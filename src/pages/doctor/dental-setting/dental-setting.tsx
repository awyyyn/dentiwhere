import { useState } from "react";
import { useAtomValue } from "jotai";
import { formatDate, isEqual, isFuture, isPast } from "date-fns";
import { useNavigate } from "react-router-dom";

/* STATES */
import { userAtom, clinicAtom } from "@/atoms";

/* TYPES */
import { Status } from "@/types/types";

/* COMPONENTS */
import Layout from "./__components/layout.tsx";
import NotVerified from "./__components/not-verified.tsx";
import NoRecord from "./__components/no-record.tsx";
import AddEditClinicForm from "../shared/add-edit-clinic-form";
import AddClinic from "./__components/add-clinic.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ManageCategories from "./__components/manage-categories/manage-categories.tsx";
import ManageServices from "./__components/manage-services/manage-services.tsx";
import ManageAccesibility from "./__components/manage-accessibilities/manage-accesibility.tsx";
import ManageAmenities from "./__components/manage-amenities/manage-amenities.tsx";
import { Tooltip } from "@/components/shared/tooltip/tooltip.tsx";
import PreviewClinic from "./__components/preview-clinic/preview-clinic.tsx";

/* ASSETS */
import { Accessibility, Building } from "lucide-react";
import { MdCategory, MdMedicalInformation } from "react-icons/md";
import { TbDental } from "react-icons/tb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";

type Manage =
	| "view"
	| "clinic"
	| "categories"
	| "services"
	| "accessibility"
	| "amenities";

export default function DentalSetting() {
	const user = useAtomValue(userAtom);
	const [adding, setAdding] = useState(false);
	// const [editing, setEditing] = useState(false);
	const [manage, setManage] = useState<Manage>("clinic");
	const clinic = useAtomValue(clinicAtom);
	const navigate = useNavigate();

	if (user.status === Status.unverified) return <NotVerified />;
	if (user.status !== Status.verified && !adding)
		return <NoRecord handleAdd={() => setAdding(true)} />;
	if (user.status === Status.verified && user.clinicId === 0)
		return <AddClinic />;

	const toggleGroupItemStyle =
		"data-[state=on]:bg-white/80 p-4 py-6 md:py-0 mx-1 font-normal   data-[state=off]:bg-white/30 hover:data-[state=off]:text-black  hover:data-[state=off]:bg-white/50 transition-all duration-300 data-[state=on]:shadow-lg data-[state=off]:shadow-none";

	const isFutureDate =
		isFuture(user.subscriptionEndDate) ||
		isEqual(user.subscriptionEndDate, formatDate(new Date(), "yyyy-MM-dd"));

	const isFreeAccess = isFutureDate && !user.boost;
	const noSubscription = isPast(user.subscriptionEndDate);

	return (
		<>
			<Layout>
				<Alert className="flex justify-between items-center max-w-[96.5%]">
					<div className="space-y-1">
						<AlertTitle className="text-lg font-bold tracking-wider">
							Subscription
						</AlertTitle>
						<AlertDescription className="text-md">
							{isFreeAccess && "You are currently subscribed to the free plan."}
							{noSubscription ? (
								"You do not have an active subscription."
							) : (
								<span>
									You're currently subscribed to
									<b> "{user.subscription.name}"</b>
								</span>
							)}
						</AlertDescription>
						{noSubscription && (
							<Button
								size="sm"
								onClick={() => navigate("/subscribe")}
								className="">
								Subscribe
							</Button>
						)}
					</div>
					<div>
						{isFreeAccess && (
							<Badge className="bg-emerald-500 hover:bg-emerald-500">
								Free
							</Badge>
						)}
						{noSubscription ? (
							<Badge variant="destructive">No Subscription</Badge>
						) : (
							<Badge>{user.subscription.name}</Badge>
						)}
					</div>
				</Alert>
				<div>
					<div>
						<h1 className="text-3xl font-bold">Dental Setting</h1>
					</div>
					<div className="flex">
						<ToggleGroup
							type="single"
							value={manage}
							className="flex justify-start  flex-wrap flex-1 mt-4 md:max-w-fit"
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
										<MdMedicalInformation size={18} className="md:hidden" />
										<span className="hidden md:block">
											Manage Clinic Information
										</span>
									</p>
								</Tooltip>
							</ToggleGroupItem>
							<ToggleGroupItem className={toggleGroupItemStyle} value="view">
								<Tooltip
									className="block translate-y-2 lg:hidden"
									tooltip="Preview Clinic"
									side="bottom"
									delayDuration={300}>
									<p>
										<MdMedicalInformation size={18} className="md:hidden" />
										<span className="hidden md:block">Preview Clinic</span>
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
										<MdCategory size={18} className="md:hidden" />
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
										<TbDental size={18} className="md:hidden" />
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
										<Accessibility size={18} className="md:hidden" />
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
										<Building size={18} className="md:hidden" />
										<span className="hidden md:block">Manage Amenities</span>
									</p>
								</Tooltip>
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</div>
				{manage === "view" && <PreviewClinic id={Number(clinic?.id)} />}
				{manage === "clinic" && <AddEditClinicForm edit clinic={clinic} />}
				{manage === "categories" && <ManageCategories />}
				{manage === "services" && <ManageServices />}
				{manage === "accessibility" && <ManageAccesibility />}
				{manage === "amenities" && <ManageAmenities />}
			</Layout>
		</>
	);
}
