import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import ImgDialog from "@/pages/admin/__components/img-dialog.tsx";
import { Status } from "@/types/types.ts";
import { useState } from "react";
import { VerifyDialog } from "@/pages/admin/__components/verify-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { doctorAtom } from "@/atoms/doctors-atom";

interface SharedClinicProps {
	verify?: boolean;
}

export const ViewVerifyDoctor = ({ verify = false }: SharedClinicProps) => {
	const doctor = useAtomValue(doctorAtom);
	const [open, setOpen] = useState(false);

	return (
		<div className="p-2 md:p-5 lg:p-10 xl:p-14 pb-10 ">
			<section className="md:space-y-2">
				<h1 className="text-2xl lg:text-5xl font-bold">Doctor details</h1>
				<p className="text-gray-600 md:text-lg"></p>
			</section>
			<section className="mt-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 grid-flow-row">
					<div className="flex flex-col items-center">
						<Label className="self-start">Profile</Label>
						<img
							src={doctor?.img}
							alt="Avatar"
							className="h-40 w-40 shadow-lg ring ring-white ring-offset-4 lg:w-60 lg:h-60 rounded-full object-cover"
						/>
					</div>
					<div className="space-y-5">
						<div>
							<Label>First Name</Label>
							<Input value={doctor?.firstName} readOnly className="bg-white" />
						</div>
						<div>
							<Label>Last Name</Label>
							<Input value={doctor?.lastName} readOnly className="bg-white" />
						</div>
						<div>
							<Label>Contact Number</Label>
							<Input
								value={`+63${doctor?.contacts[0].slice(1)}`}
								readOnly
								className="bg-white"
							/>
						</div>
					</div>
					<div>
						<Label>Clinic</Label>
						<Input
							value={
								doctor?.clinicName === "" ? "No Clinic" : doctor?.clinicName
							}
							readOnly
							className="bg-white"
						/>
					</div>
					<div>
						<Label>Email</Label>
						<Input value={doctor?.email} readOnly className="bg-white" />
					</div>
					<div>
						<Label>License Number</Label>
						<Input
							value={doctor?.licenseNumber}
							readOnly
							className="bg-white"
						/>
					</div>
					<div>
						<Label>Postal ID</Label>
						<Input value={doctor?.postalId} readOnly className="bg-white" />
					</div>
					<div>
						<Label>Account Status</Label>
						<Input value={doctor?.status} readOnly className="bg-white" />
					</div>
					<div>
						<Label>Address</Label>
						<Input value={doctor?.address} readOnly className="bg-white" />
					</div>
					<div className="lg:col-span-2">
						<h1 className="font-bold text-xl">License Pictures</h1>
					</div>
					<div className="space-y-2 p-1">
						<h1 className="font-semibold">Front Image</h1>
						<div
							onClick={() =>
								doctor?.licenseId.frontImg &&
								doctor?.licenseId.backImg &&
								setOpen(true)
							}
							className="relative overflow-hidden cursor-pointer h-72 w-full  ring  ring-white  shadow-lg group">
							{doctor?.licenseId.frontImg && doctor?.licenseId.backImg && (
								<div className=" opacity-0 absolute h-full w-full top-0 left-0 grid place-content-center backdrop-blur-sm bg-white/30 z-50 group-hover:opacity-100 translate-y-full  group-hover:translate-y-0 transition-all duration-300">
									<h1 className="font-bold tracking-wider">View Image</h1>
								</div>
							)}
							<img
								src={doctor?.licenseId.frontImg}
								alt="License ID, Back Image"
								className="h-full w-full absolute object-cover z-40"
							/>
						</div>
					</div>
					<div className="space-y-2 p-1">
						<h1 className="font-semibold">Back Image</h1>
						<div
							onClick={() =>
								doctor?.licenseId.frontImg &&
								doctor?.licenseId.backImg &&
								setOpen(true)
							}
							className="relative overflow-hidden cursor-pointer h-72 w-full  ring  ring-white  shadow-lg group">
							{doctor?.licenseId.frontImg && doctor?.licenseId.backImg && (
								<div className=" opacity-0 absolute h-full w-full top-0 left-0 grid place-content-center backdrop-blur-sm bg-white/30 z-50 group-hover:opacity-100 translate-y-full  group-hover:translate-y-0 transition-all duration-300">
									<h1 className="font-bold tracking-wider">View Image</h1>
								</div>
							)}
							<img
								alt="License ID, Back Picture"
								src={doctor?.licenseId.backImg}
								className="h-full w-full absolute object-cover z-40"
							/>
						</div>
					</div>
				</div>
			</section>
			{doctor?.status === Status.PENDING && verify && (
				<div className="flex gap-2 mt-5">
					<Link to={"/dashboard/doctors"}>
						<Button>Back</Button>
					</Link>
					<VerifyDialog />
				</div>
			)}
			{doctor?.licenseId.frontImg && doctor?.licenseId.backImg && (
				<ImgDialog
					handleClose={() => setOpen(false)}
					isOpen={open}
					imgs={[doctor?.licenseId.frontImg, doctor?.licenseId.backImg]}
				/>
			)}
		</div>
	);
};
