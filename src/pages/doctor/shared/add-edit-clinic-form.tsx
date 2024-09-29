import { db } from "@/utils/supabase";
import { v4 as uuid } from "uuid";
import { memo, useState } from "react";
import Dropzone from "react-dropzone";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoMdAdd } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	createClinic,
	updateClinic,
	createBulkAmenity,
	createBulkAccessibility,
} from "@/actions";
import { useAtom, useSetAtom } from "jotai";
import { userAtom } from "@/atoms/user-atom";
import { useToast } from "@/hooks/use-toast";
import { clinicAtom } from "@/atoms/clinic-atom";
import { updateUserClinic } from "@/actions/user";
import { Accessibility, Amenities, Clinic } from "@/types/types";
import { amenitiesAtom } from "@/atoms/amenity-atom";
import { accessibilitiesAtom } from "@/atoms/accessibility-atom";
import { isEmpty } from "lodash";
import { Map as MapIcon } from "lucide-react";
import { Tooltip } from "@/pages/admin/__components/tooltip";
import Map from "@/components/shared/map/map";

const formSchema = z.object({
	name: z.string().min(1, { message: "Please enter your clinic name!" }),
	email: z
		.string()
		.email({ message: "Please enter a valid email address!" })
		.optional(),
	contact: z
		.string()
		.min(11, { message: "Please enter a valid phone number" })
		.max(11, { message: "Please enter a valid phone number" })
		.refine((val) => val[0] === "0" && val[1] === "9", {
			message: "Please enter a valid phone number.",
		}),
	contact2: z.string().optional(),
	/* .min(11, {message: "Please enter a valid phone number"})
        .max(11, {message: "Please enter a valid phone number"})
        .refine(val => (val[0] === "0" && val[1] === "9"), {message: "Please enter a valid phone number."}) */
	address: z.string().min(1, { message: "Please enter your clinic address!" }),
	website: z.string().optional(),
	description: z.string().optional(),
	map: z
		.object({
			lat: z.number(),
			lng: z.number(),
		})
		.optional(),
});

const AddClinic = ({
	edit = false,
	clinic,
}: {
	edit?: boolean;
	clinic?: Clinic;
}) => {
	const { toast } = useToast();
	const setClinic = useSetAtom(clinicAtom);
	const [openMap, setOpenMap] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useAtom(userAtom);
	const setAmenities = useSetAtom(amenitiesAtom);
	const setAccessibilities = useSetAtom(accessibilitiesAtom);
	const [amenitiesForm, setAmenitiesForm] = useState<string[]>(["amenity1"]);
	const [accessibilityForm, setAccessibilityForm] = useState<string[]>([
		"accessiblity1",
	]);
	const [amenitiesValues, setAmenitiesValues] = useState<string[]>([""]);
	const [accessibilityValues, setAccessibilityValues] = useState<string[]>([
		"",
	]);
	const [errors, setErrors] = useState({
		amenity: !edit,
		accessibility: !edit,
	});

	const editDefaultValues = {
		name: clinic?.name ?? "",
		email: clinic?.email ?? "",
		contact: clinic?.contacts[0] ?? "",
		contact2: clinic?.contacts[1] ?? "",
		address: clinic?.address ?? "",
		website: clinic?.website ?? "",
		description: clinic?.description ?? "",
		map: clinic?.map && clinic.map,
	};

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: !edit
			? {
					name: "",
					email: "",
					contact: "",
					contact2: "",
					address: "",
					website: "",
					description: "",
			  }
			: editDefaultValues,
	});

	const [uploading, setUploading] = useState(false);
	const [placeholder, setPlaceholder] = useState(
		edit && clinic?.img ? clinic.img : ""
	);

	const handleDropImage = async (e: any) => {
		try {
			setUploading(true);
			const name = `${e[0].name}-${uuid()}`;

			const { data } = await db.storage.from("profiles").upload(name, e[0], {
				cacheControl: "3600",
				upsert: false,
			});

			if (data === null) {
				setUploading(false);
				return console.error("No data");
			}

			const response = await db.storage
				.from("profiles")
				.getPublicUrl(data.path);

			if (response.data.publicUrl === null) {
				setUploading(false);
				return console.error("No data");
			}

			setPlaceholder(response.data.publicUrl);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setPlaceholder("");
			setUploading(false);
		}
	};

	const handleAddInput = (type: "amenity" | "accessibility") => {
		if (type === "amenity") {
			setAmenitiesForm([...amenitiesForm, `${amenitiesForm.length + 100}`]);
			if (amenitiesValues.length === amenitiesForm.length)
				return setErrors((err) => ({ ...err, amenity: true }));
		} else {
			setAccessibilityForm([
				...accessibilityForm,
				`${accessibilityForm.length + 100}`,
			]);
			if (accessibilityValues.length === accessibilityForm.length)
				return setErrors((err) => ({ ...err, accessibility: true }));
		}
	};

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		setLoading(true);
		if (edit && clinic) {
			const info = JSON.stringify(data) !== JSON.stringify(editDefaultValues);

			if (info || placeholder !== clinic.img) {
				try {
					const updatedData = await updateClinic({
						address: data.address,
						archive: clinic.archive,
						boosted: clinic.boosted,
						contacts: data.contact2
							? [data.contact, data.contact2]
							: [data.contact],
						description: data.description,
						email: data.email ?? "",
						website: data.website,
						map: data.map,
						name: data.name,
						img: placeholder,
						id: Number(clinic.id),
					});
					setClinic(updatedData);
				} catch (error) {
					console.error(error);
					setLoading(false);
					return toast({
						title: "Failed to update your clinic information",
						description: "An error occured while updating your clinic",
						variant: "destructive",
					});
				}
			}
			setLoading(false);
			toast({
				title: "Created successfully",
				description: "Your clinic has been created successfully",
				variant: "default",
				className: "bg-emerald-600 text-white",
			});
		} else {
			try {
				const newClinic = await createClinic({
					address: data.address,
					contacts:
						data?.contact2 && data?.contact
							? [data.contact, data.contact2]
							: [data.contact],
					doctorId: Number(user.id),
					email: data.email ?? "",
					img: placeholder,
					map: data.map,
					name: data.name,
					description: data.description,
				});

				let amenitiesResponse: Amenities[] = [];
				let accessibilitiesResponse: Accessibility[] = [];

				if (amenitiesValues.length > 0 && !isEmpty(amenitiesValues[0])) {
					amenitiesResponse = await createBulkAmenity(
						amenitiesValues.map((amenity) => ({
							clinic_id: newClinic.id,
							name: amenity,
						}))
					);
				}

				if (
					accessibilityValues.length > 0 &&
					!isEmpty(accessibilityValues[0])
				) {
					accessibilitiesResponse = await createBulkAccessibility(
						accessibilityValues.map((accessibility) => ({
							clinic_id: newClinic.id,
							name: accessibility,
						}))
					);
				}

				const updatedUser = await updateUserClinic({
					clinicId: newClinic.id,
					id: user.id,
				});
				setClinic(newClinic);
				setUser(updatedUser);
				setAmenities(amenitiesResponse);
				setAccessibilities(accessibilitiesResponse);
				form.reset();
				setAmenitiesValues([""]);
				setAccessibilityValues([""]);
				setAmenitiesForm(["amenity1"]);
				setAccessibilityForm(["accessiblity1"]);
				setPlaceholder("");
				setLoading(false);
				toast({
					title: "Created successfully",
					description: "Your clinic has been created successfully",
					variant: "default",
					className: "bg-emerald-600 text-white",
				});
			} catch (error) {
				setLoading(false);

				const err = error as Error;

				if (err.message.includes("clinic")) {
					return toast({
						title: "Error",
						description: "An error occured while creating your clinic",
						variant: "destructive",
					});
				}

				if (err.message.includes("amenities")) {
					toast({
						title: "Failed to create amenities",
						description:
							"An error occured while creating your clinic amenities",
						variant: "destructive",
					});

					setAmenitiesForm((pre) => pre);
					setAmenitiesValues((pre) => pre);
				}
				if (err.message.includes("accessibilities")) {
					toast({
						title: "Failed to create accessibilities",
						description:
							"An error occured while creating your clinic accessibilities",
						variant: "destructive",
					});

					setAccessibilityForm((pre) => pre);
					setAccessibilityValues((pre) => pre);
				}
			}
		}
	};

	const SelectAddressOnMap = ({ add }: { add?: string }) => (
		<div className="space-y-2">
			<div>
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem className="w-full  ">
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input
									id="mapAddress"
									className="bg-white focus-visible:ring-0 text-lg py-5 px-3  "
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="map.lat"
					render={({ field }) => (
						<FormItem className="w-full hidden ">
							<FormLabel>Map Lat</FormLabel>
							<FormControl>
								<Input
									readOnly
									className="bg-white focus-visible:ring-0 text-lg py-5 px-3  "
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="map.lng"
					render={({ field }) => (
						<FormItem className="w-full hidden ">
							<FormLabel>Map Lng</FormLabel>
							<FormControl>
								<Input
									readOnly
									className="bg-white focus-visible:ring-0 text-lg py-5 px-3  "
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<Map
				showMarker
				pinning
				handleChange={(val, place) => {
					form.setValue("map.lat", val.lat);
					form.setValue("map.lng", val.lng);
					if (!isEmpty(place)) form.setValue("address", place);
				}}
			/>
			<div className="flex justify-end gap-3">
				<Button
					type="button"
					onClick={() => {
						setOpenMap(false);
						form.resetField("map");
						if (typeof add !== "undefined") {
							form.setValue("address", add);
						}
					}}
					variant="destructive">
					Cancel
				</Button>
				<Button
					onClick={() => setOpenMap(false)}
					type="button"
					className="bg-emerald-500 hover:bg-emerald-500">
					Save
				</Button>
			</div>
		</div>
	);

	return (
		<div className="py-10 sm:px-3 lg:px-10">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-4 md:space-y-8">
					{edit ?? "editing"}
					{openMap ? (
						<SelectAddressOnMap add={form.getValues("address") ?? undefined} />
					) : (
						<>
							<div className="flex items-center  gap-5  lg:flex-wrap mb-4 xl:flex-nowrap flex-col md:flex-row">
								<Dropzone onDrop={handleDropImage}>
									{({ getRootProps, getInputProps }) => (
										<div
											className="shadow-md   mx-auto rounded-full md:mb-4 md:mb-0 min-h-[200px] md:min-h-[300px] max-w-[200px] md:max-h-[300px] min-w-[200px] md:min-w-[300px] hover:cursor-pointer overflow-hidden relative hover:shadow-xl transition-all duration-300 group"
											{...getRootProps()}>
											<input {...getInputProps()} disabled={uploading} />
											<div
												className={`absolute rounded-full w-full h-full items-center justify-center backdrop-blur-sm flex-wrap bg-black  z-50 bg-opacity-20 hover:opacity-100 ${
													uploading || loading
														? "opacity-100 cursor-wait"
														: "opacity-0"
												} flex transition-all duration-300`}>
												{uploading || loading ? (
													<ImSpinner2 className="animate-spin" size={30} />
												) : (
													<p className="transition-all duration-300 text-white font-bold">
														{placeholder ? "Replace Image" : "Upload Image"}
													</p>
												)}
											</div>
											<img
												src={
													placeholder
														? placeholder
														: "https://www.wibits.com/wp-content/themes/wibits-theme/images/sample.jpg"
												}
												className="absolute h-full z-10 object-cover transition-all duration-300"
												alt="clinic profile"
											/>
										</div>
									)}
								</Dropzone>
								<div className="w-full flex flex-col justify-center space-y-3 ">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem className="ful">
												<FormLabel>Clinic Name</FormLabel>
												<FormControl>
													<Input
														readOnly={loading || uploading}
														className="text-lg py-5 px-3 bg-white"
														placeholder="Enter your clinic name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Clinic Address</FormLabel>
												<FormControl>
													<div className="flex gap-2 items-center">
														<Input
															readOnly={loading || uploading}
															className="text-lg py-5 px-3 bg-white w-11/12"
															placeholder="Enter your clinic address"
															{...field}
														/>
														<Tooltip
															tooltip="Map"
															delayDuration={500}
															side="bottom">
															<Button
																onClick={() => setOpenMap(true)}
																type="button"
																className="min-h-max"
																variant="secondary"
																size="default">
																<MapIcon />
															</Button>
														</Tooltip>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input
														readOnly={loading || uploading}
														className="text-lg py-5 px-3 bg-white"
														placeholder="Enter your clinic email address"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex sm:space-x-4 flex-col sm:flex-row">
									<FormField
										control={form.control}
										name="contact"
										render={({ field }) => (
											<FormItem className="w-full sm:w-[50%]">
												<FormLabel>Contact</FormLabel>
												<FormControl>
													<Input
														readOnly={loading || uploading}
														className="text-lg py-5 px-3 bg-white"
														placeholder="Enter you clinic contact"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="contact2"
										render={({ field }) => (
											<FormItem className="w-full sm:w-[50%]">
												<FormLabel>Alternative Contact</FormLabel>
												<FormControl>
													<Input
														readOnly={loading || uploading}
														className="text-lg py-5 px-3 bg-white"
														placeholder="Enter you clinic contact"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="map.lat"
									render={({ field }) => (
										<FormItem className="w-full hidden ">
											<FormLabel>Map Lat</FormLabel>
											<FormControl>
												<Input
													readOnly
													className="bg-white focus-visible:ring-0 text-lg py-5 px-3  "
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="map.lng"
									render={({ field }) => (
										<FormItem className="w-full hidden ">
											<FormLabel>Map Lng</FormLabel>
											<FormControl>
												<Input
													readOnly
													className="bg-white focus-visible:ring-0 text-lg py-5 px-3  "
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="website"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Website</FormLabel>
											<FormControl>
												<Input
													readOnly={loading || uploading}
													className="text-lg py-5 px-3 bg-white"
													placeholder="Enter you clinic website"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl className="min-h-fit">
												<Textarea
													className="text-lg py-3 px-3 bg-white "
													placeholder="Clinic Description...."
													rows={Math.max(
														Math.min(
															form.getValues("description").length / 10,
															10
														)
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{!edit && (
									<div className="flex  flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
										<div className="w-full sm:w-[50%] ">
											<h1 className="font-bold text-xl sm:mb-3">
												Accessibility
											</h1>
											<div className="space-y-5">
												{accessibilityForm.map((acc, indx) => {
													return (
														<Input
															readOnly={loading || uploading}
															key={acc}
															name={acc}
															value={accessibilityValues[indx]}
															placeholder="Add clinic accessibility"
															className={`text-lg py-5 px-3 bg-white`}
															onChange={(e) => {
																setAccessibilityValues((prevValues) => {
																	if (e.target.value !== "") {
																		setErrors((err) => ({
																			...err,
																			accessibility: false,
																		}));
																	} else {
																		setErrors((err) => ({
																			...err,
																			accessibility: true,
																		}));
																	}
																	const updatedValues = [...prevValues];
																	updatedValues[indx] = e.target.value;
																	return updatedValues;
																});
															}}
														/>
													);
												})}
											</div>
											<Button
												type="button"
												disabled={errors.accessibility}
												className="w-full space-x-5 mt-2"
												size="sm"
												onClick={() => handleAddInput("accessibility")}>
												<IoMdAdd />
												Add Amenity
											</Button>
										</div>
										<div className="w-full sm:w-[50%]  ">
											<h1 className="font-bold text-xl  sm:mb-3">Amenities</h1>
											<div className={`space-y-5 group `}>
												{amenitiesForm.map((ame, indx) => {
													return (
														<Input
															readOnly={loading || uploading}
															key={ame}
															name={ame}
															value={amenitiesValues[indx]}
															placeholder="Add clinic amenity"
															className={`text-lg py-5 sm:px-3 bg-white`}
															onChange={(e) => {
																setAmenitiesValues((prevValues) => {
																	if (e.target.value !== "") {
																		setErrors((err) => ({
																			...err,
																			amenity: false,
																		}));
																	} else {
																		setErrors((err) => ({
																			...err,
																			amenity: true,
																		}));
																	}
																	const updatedValues = [...prevValues];
																	updatedValues[indx] = e.target.value;
																	return updatedValues;
																});
															}}
														/>
													);
												})}
											</div>
											<Button
												type="button"
												disabled={errors.amenity}
												className="w-full space-x-5 mt-2"
												size="sm"
												onClick={() => handleAddInput("amenity")}>
												<IoMdAdd />
												Add Amenity
											</Button>
										</div>
									</div>
								)}
								<div className="flex justify-end space-x-3 mt-5">
									<Button type="reset" onClick={() => form.reset()}>
										Reset form
									</Button>
									<Button
										// disabled={}
										className="bg-1/70 text-gray-800 hover:bg-1/100 hover:text-gray-700"
										type={"submit"}>
										{edit ? "Save changes" : "Submit"}
									</Button>
								</div>
							</div>
						</>
					)}
				</form>
			</Form>
		</div>
	);
};

export default memo(AddClinic);
