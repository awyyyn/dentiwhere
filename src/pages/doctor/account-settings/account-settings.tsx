import { useEffect, useRef, useState } from "react";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { db } from "@/utils/supabase";
import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import LogoWithText from "@/components/shared/logo-with-text/logo-with-text";
import { userAtom } from "@/atoms/user-atom";
import { Skeleton } from "@/components/ui/skeleton";
import { updateUser, sendNotification } from "@/actions";
import { Status } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import CustomDatePicker from "@/components/shared/date-picker/date-picker";

const userForm = z.object({
	fist_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
	email: z.string().email(),
	contact: z
		.string()
		.min(10, { message: "Please enter a valid phone number" })
		.max(10, { message: "Please enter a valid phone number" })
		.refine((val) => Number(val[0]) === 9, {
			message: "Please enter a valid phone number.",
		}),
	gender: z.string(),
	postal_id: z.string().min(1, { message: "Postal ID is required" }),
	birth_date: z.date(),
	license_id: z.string().min(1, { message: "License ID Number is required" }),
	address: z.string().min(1, { message: "Address is required" }),
});

export default function AccountSettings() {
	const { toast } = useToast();
	const avatarRef = useRef<DropzoneRef>(null!);
	const frontIdRef = useRef<DropzoneRef>(null!);
	const backIdRef = useRef<DropzoneRef>(null!);
	const [user, setUser] = useAtom(userAtom);
	const [editing, setEditing] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [placeholder, setPlaceholder] = useState(
		editing && user?.img ? user.img : ""
	);
	const [frontId, setFrontId] = useState(
		editing ? user.licenseId.frontImg : ""
	);
	const [backId, setBackId] = useState(editing ? user.licenseId.backImg : "");
	const [errors, setErrors] = useState({ frontImg: false, backImg: false });

	const form = useForm<z.infer<typeof userForm>>({
		resolver: zodResolver(userForm),
		defaultValues: {
			fist_name: user?.firstName ?? "",
			last_name: user?.lastName ?? "",
			email: user?.email ?? "",
			contact: user?.contacts[0] ? user?.contacts[0].slice(1) : "",
			address: user?.address ?? "",
			gender: user?.address ?? "",
			postal_id: user?.address ?? "",
			license_id: user?.licenseNumber ?? "",
		},
	});

	const handleDropImage = async (
		e: any,
		type: "frontId" | "backId" | "avatar"
	) => {
		try {
			setUploading(true);
			const name = `${e[0].name}-${uuid()}`;

			const { data } = await db.storage.from("profiles").upload(name, e[0], {
				cacheControl: "3600",
				upsert: false,
			});

			if (data === null) {
				setUploading(false);
				return;
			}

			const response = await db.storage
				.from("profiles")
				.getPublicUrl(data.path);

			if (response.data.publicUrl === null) {
				setUploading(false);
				return;
			}
			if (type === "frontId") {
				setFrontId(response.data.publicUrl);
				setErrors((e) => ({ ...e, frontImg: false }));
			} else if (type === "backId") {
				setBackId(response.data.publicUrl);
				setErrors((e) => ({ ...e, backImg: false }));
			} else {
				setPlaceholder(response.data.publicUrl);
			}
			setUploading(false);
		} catch (error) {
			console.error(error);
			setPlaceholder("");
			setUploading(false);
		}
	};

	useEffect(() => {
		if (user.id !== 0) {
			if (sessionStorage.getItem("editProfile") === "true") {
				setEditing(true);
			}
			setLoading(true);
			form.setValue("fist_name", user.firstName);
			form.setValue("last_name", user.lastName);
			form.setValue("email", user.email);
			form.setValue(
				"contact",
				user?.contacts[0] ? user?.contacts[0].slice(1) : ""
			);
			if (user.birthDate) {
				form.setValue("birth_date", new Date(user.birthDate));
			}
			form.setValue("address", user.address ?? "");
			form.setValue("gender", user.gender);
			form.setValue("postal_id", user.postalId);
			form.setValue("license_id", user.licenseNumber);
			setFrontId(user.licenseId.frontImg);
			setBackId(user.licenseId.backImg);
			setPlaceholder(user.img);
			setLoading(false);
		}

		return () => sessionStorage.clear();
	}, [setUser, user]);

	const handleSubmit = async (v: z.infer<typeof userForm>) => {
		setSubmitting(true);
		if (!frontId) setErrors((e) => ({ ...e, frontImg: true }));
		if (!backId) setErrors((e) => ({ ...e, backImg: true }));
		if (!frontId || !backId || errors.backImg || errors.frontImg)
			return setSubmitting(false);

		try {
			const data = await updateUser({
				id: Number(user?.id),
				address: v.address,
				contacts: [`0${v.contact}`],
				email: v.email,
				birth_date: v.birth_date.toISOString(),
				first_name: v.fist_name,
				last_name: v.last_name,
				boost: user?.boost ?? 0,
				verified: user?.verified ?? false,
				license_id: {
					frontImg: frontId,
					backImg: backId,
				},
				img: placeholder,
				postal_id: v.postal_id,
				gender: v.gender,
				license_number: v.license_id,
				role: user?.role ?? "DOCTOR",
				status:
					user.status === Status.verified ? Status.verified : Status.PENDING,
			});

			if (data.status === Status.PENDING) {
				await sendNotification({
					name: `${data.firstName} ${data.lastName}`,
					message: `Dr. ${data.firstName} ${data.lastName}'s data has been submitted for your verification.`,
					title: "Data Verification Required",
					from: data.id,
				});
				toast({
					title: "Profile Updated",
					description: "Please wait for the admin to verify your account",
					className: "bg-emerald-500 text-white",
				});
			} else {
				toast({
					title: "Profile Updated",
					description: "Your profile has been updated successfully",
					className: "bg-emerald-500 text-white",
				});
			}
			setUser(data);
			setEditing(false);
			setSubmitting(false);
		} catch (error) {
			console.error(error);
			toast({
				title: "Error",
				description: "An error occurred while updating your profile",
				variant: "destructive",
			});
			setSubmitting(false);
		}
	};

	return (
		<section className=" ">
			<Form {...form}>
				<form
					className=" p-1 sm:px-10 lg:pb-20"
					onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="grid  grid-cols-1 lg:grid-cols-4   gap-y-8 lg:gap-y-0 ">
						<div className="flex order-2 lg:order-1 md:w-full flex-col lg:flex-row  items-center lg:col-span-3 lg:space-x-10 xl:space-x-20 ">
							<Dropzone
								disabled={!editing || loading || uploading || submitting}
								useFsAccessApi
								ref={avatarRef}
								onDrop={(e) => handleDropImage(e, "avatar")}>
								{({ getRootProps, getInputProps }) => (
									<div
										className="shadow-md rounded-full mb-4 md:mb-0 max-w-[180px] h-[180px] min-w-[180px] sm:min-h-[200px]  sm:max-h-[200px] sm:min-w-[200px] lg:min-h-[250px] lg:max-h-[250px] lg:min-w-[250px] hover:cursor-pointer overflow-hidden relative hover:shadow-xl transition-all duration-300 group"
										{...getRootProps()}>
										<input
											type="file"
											id="avatar"
											className="peer"
											{...getInputProps()}
											disabled={!editing}
										/>
										<div
											className={`absolute  w-full h-full items-center justify-center backdrop-blur-sm flex-wrap bg-black  z-50 bg-opacity-20 hover:opacity-100 ${
												uploading || loading
													? "opacity-100 cursor-wait"
													: "opacity-0"
											} flex transition-all duration-300 peer-disabled:hidden `}>
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
										/>
									</div>
								)}
							</Dropzone>
							<div className=" flex-wrap flex  gap-4  lg:space-y-0 mt-5 lg:mt-0 ">
								{!editing ? (
									<Button
										onClick={() => setEditing(true)}
										type="button"
										className="w-48 mx-auto text-md lg:max-w-min lg:mx-0    xl:text-2xl bg-1 hover:text-black text-black p-6 shadow-lg hover:bg-1 shadow-gray-700/50 hover:shadow-lg active:scale-90 transition-all duration-300">
										Edit Profile
									</Button>
								) : (
									<>
										<Button
											type="button"
											onClick={(e) => {
												e.preventDefault();
												avatarRef.current?.open();
											}}
											className="w-48 mx-auto text-md lg:max-w-min lg:mx-0    xl:text-2xl bg-1 hover:text-black text-black p-6 shadow-lg hover:bg-1 shadow-gray-700/50 hover:shadow-lg active:scale-90 transition-all duration-300">
											Upload Now
										</Button>
										<Button
											onClick={() => {
												setPlaceholder(
													"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
												);
											}}
											type="button"
											className="w-48 mx-auto text-md lg:max-w-min lg:mx-0    xl:text-2xl p-6 bg-white text-black shadow-md shadow-gray-700/50 hover:text-black hover:bg-white hover:shadow-lg active:scale-90 transition-all duration-300">
											Delete Avatar
										</Button>
									</>
								)}
							</div>
						</div>
						<div className="scale-75 lg:scale-100 order-1 lg:order-2 justify-self-center">
							<LogoWithText />
						</div>
					</div>

					<div className=" grid grid-cols-1 lg:grid-cols-4 grid-flow-row-dense mt-8 lg:mt-10 lg:gap-y-0 ">
						<div className="flex w-full   flex-col flex-wrap lg:grid  place-content-start lg:-space-y-0 lg:grid-flow-row lg:grid-cols-2 md:gap-8 md:col-span-4  lg:col-span-4 xl:col-span-3 lg:gap-x-10 pr-5  overflow-y-hidden max-h-full relative">
							<FormField
								control={form.control}
								name="fist_name"
								render={({ field }) => (
									<FormItem className="min-w-full">
										<FormLabel>
											First Name <span className="text-destructive ">*</span>
										</FormLabel>
										<FormControl>
											{loading ? (
												<Skeleton className="w-full h-[3.1rem] " />
											) : (
												<Input
													readOnly={!editing || loading || uploading}
													className="md:ml-2 text-lg py-6 px-3 w-full bg-white"
													placeholder="First Name"
													{...field}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Last Name <span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											{loading ? (
												<Skeleton className="w-full h-[3.1rem]" />
											) : (
												<Input
													readOnly={!editing || loading || uploading}
													className="md:ml-2 text-lg py-6 px-3 bg-white"
													placeholder="Last Name"
													{...field}
												/>
											)}
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
										<FormLabel>
											Email <span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											{loading ? (
												<Skeleton className="w-full h-[3.1rem]" />
											) : (
												<Input
													readOnly={!editing || loading || uploading}
													className="md:ml-2 text-lg py-6 px-3 bg-white"
													placeholder="examples@gmail.com"
													{...field}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="contact"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Phone Number <span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											{loading ? (
												<Skeleton className="w-full h-[3.1rem]" />
											) : (
												<div className="flex space-x-2">
													<Input
														readOnly
														value="+63"
														className="md:ml-2 max-w-16 text-lg py-6 px-3 bg-white"
													/>
													<Input
														{...field}
														readOnly={!editing || loading || uploading}
														className="md:ml-2 text-lg py-6 px-3 bg-white"
														placeholder="9123456789"
													/>
												</div>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex">
								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Gender <span className="text-destructive">*</span>
											</FormLabel>
											<FormControl>
												{loading ? (
													<div className="flex space-x-2">
														<Skeleton className="w-44 h-[3.1rem]" />
														<Skeleton className="w-full h-[3.1rem]" />
													</div>
												) : (
													<RadioGroup
														value={field.value}
														onValueChange={field.onChange}
														className="flex md:ml-2 disabled:opacity-100">
														<div
															onClick={() => form.setValue("gender", "male")}
															className="flex items-center space-x-2 bg-white rounded-lg px-6 py-3">
															<RadioGroupItem
																disabled={!editing || loading || uploading}
																value="male"
																className="disabled:opacity-100 "
																id="male"
															/>
															<Label
																htmlFor="male"
																className=" text-lg text-gray-400 font-light">
																Male
															</Label>
														</div>
														<div
															onClick={() => form.setValue("gender", "female")}
															className="flex items-center space-x-2 bg-white rounded-lg px-6 py-3">
															<RadioGroupItem
																disabled={!editing || loading || uploading}
																className="disabled:opacity-100"
																value="female"
																id="female"
															/>
															<Label
																htmlFor="female"
																className=" text-lg text-gray-400 font-light">
																Female
															</Label>
														</div>
													</RadioGroup>
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="birth_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Birth Date
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl className="block">
											{loading ? (
												<Skeleton className="w-full h-[3.1rem]" />
											) : (
												<CustomDatePicker
													value={field.value}
													handleChange={field.onChange}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="postal_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Postal ID <span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											{loading ? (
												<Skeleton className="w-full h-[3.1rem]" />
											) : (
												<Input
													readOnly={!editing || loading || uploading}
													className="md:ml-2 text-lg py-6 px-3 bg-white"
													placeholder="1234 0000 5566 7890"
													{...field}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="license_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											License ID Number{" "}
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											{loading ? (
												<Skeleton className="w-full h-[3.1rem]" />
											) : (
												<Input
													readOnly={!editing || loading || uploading}
													className="md:ml-2 text-lg py-6 px-3 bg-white"
													placeholder="1234 0000 5566 7890"
													{...field}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>
											Complete Address{" "}
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											{loading ? (
												<Skeleton className="w-full h-[3.1rem]" />
											) : (
												<Input
													readOnly={!editing || loading || uploading}
													className="md:ml-2 text-lg py-6 px-3 bg-white"
													placeholder="House No./Block/Street/District/Town"
													{...field}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className=" mx-auto lg:col-span-1   mt-10 xl:mt-20  space-y-5 ">
							<h1 className="text-xl font-bold">
								Verify your ID <span className="text-destructive">*</span>
							</h1>
							<div className="flex flex-col lg:flex-row xl:flex-col gap-5 md:gap-y-0">
								<div className="  space-y-3">
									<Label>
										Front ID <span className="text-destructive">*</span>
										{errors.frontImg && (
											<span className="text-xs text-destructive ml-2">
												Required
											</span>
										)}
									</Label>
									<Dropzone
										disabled={!editing || loading || uploading || submitting}
										ref={frontIdRef}
										onDrop={(e) => handleDropImage(e, "frontId")}
										key={"frontId"}>
										{({ getRootProps, getInputProps }) => (
											<div
												className="shadow-md rounded-2xl mb-4 md:mb-0 w-[250px] h-[150px] hover:cursor-pointer overflow-hidden relative hover:shadow-xl transition-all duration-300 group"
												{...getRootProps()}>
												<input {...getInputProps()} disabled={uploading} />
												<div
													className={`absolute  w-full h-full items-center justify-center backdrop-blur-sm flex-wrap bg-black  z-50 bg-opacity-20 hover:opacity-100 ${
														uploading || loading
															? "opacity-100 cursor-wait"
															: "opacity-0"
													} flex transition-all duration-300`}>
													{uploading || loading ? (
														<ImSpinner2 className="animate-spin" size={30} />
													) : (
														<p className="transition-all duration-300 text-white font-bold">
															{frontId ? "Replace Image" : "Upload Image"}
														</p>
													)}
												</div>
												<img
													src={
														frontId
															? frontId
															: "https://www.wibits.com/wp-content/themes/wibits-theme/images/sample.jpg"
													}
													alt="front Img id"
													className="absolute h-full z-10 object-cover w-full transition-all duration-300"
												/>
											</div>
										)}
									</Dropzone>
									<div className="flex w-full justify-center gap-y-2 lg:gap-y-2 lg:space-x-4 flex-wrap ">
										<Button
											type="button"
											onClick={() => frontIdRef.current.open()}
											className="w-full lg:max-w-min bg-gray-300/90 shadow-lg text-[#1D4968]">
											{frontId ? "Change" : "Upload"}
										</Button>
										{user.status !== "VERIFIED" && (
											<Button
												onClick={() =>
													setFrontId(
														"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
													)
												}
												type="button"
												className="w-full lg:max-w-min text-destructive hover:bg-gray-300 bg-gray-300/90 shadow-lg">
												Remove
											</Button>
										)}
									</div>
								</div>
								<div className="space-y-3">
									<Label>
										Back ID <span className="text-destructive">*</span>
										{errors.backImg && (
											<span className="text-xs text-destructive ml-2">
												Required
											</span>
										)}
									</Label>
									<Dropzone
										disabled={!editing || loading || uploading || submitting}
										ref={backIdRef}
										onDrop={(e) => handleDropImage(e, "backId")}
										key={"frontId"}>
										{({ getRootProps, getInputProps }) => (
											<div
												className="shadow-md rounded-2xl mb-4 md:mb-0 w-[250px] h-[150px] hover:cursor-pointer overflow-hidden relative hover:shadow-xl transition-all duration-300 group"
												{...getRootProps()}>
												<input {...getInputProps()} disabled={uploading} />
												<div
													className={`absolute  w-full h-full items-center justify-center backdrop-blur-sm flex-wrap bg-black  z-50 bg-opacity-20 hover:opacity-100 ${
														uploading || loading
															? "opacity-100 cursor-wait"
															: "opacity-0"
													} flex transition-all duration-300`}>
													{uploading || loading ? (
														<ImSpinner2 className="animate-spin" size={30} />
													) : (
														<p className="transition-all duration-300 text-white font-bold">
															{backId ? "Replace Image" : "Upload Image"}
														</p>
													)}
												</div>
												<img
													src={
														backId
															? backId
															: "https://www.wibits.com/wp-content/themes/wibits-theme/images/sample.jpg"
													}
													alt="back img id"
													className="absolute h-full z-10 object-cover w-full transition-all duration-300"
												/>
											</div>
										)}
									</Dropzone>
									<div className="flex  w-full justify-center gap-y-2 lg:gap-y-2 lg:space-x-4 flex-wrap ">
										<Button
											type="button"
											onClick={() => backIdRef.current?.open()}
											className="w-full lg:max-w-min bg-gray-300/90 shadow-lg text-[#1D4968]">
											{backId ? "Change" : "Upload"}
										</Button>

										{user.status !== "VERIFIED" && (
											<Button
												onClick={() =>
													setBackId(
														"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
													)
												}
												type="button"
												className="w-full lg:max-w-min text-destructive hover:bg-gray-300 bg-gray-300/90 shadow-lg">
												Remove
											</Button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					{editing && (
						<div className="lg:col-span-4 mt-5 flex items-center flex-wrap gap-4 h-20">
							<Button
								onClick={() => setEditing(false)}
								type="button"
								disabled={submitting}
								className={`bg-white w-full md:max-w-min hover:bg-white text-gray-800 shadow-lg ${
									editing ?? "hidden"
								}`}>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={submitting}
								className="bg-1 w-full md:max-w-min hover:bg-1 text-gray-800 shadow-lg">
								{submitting && <ImSpinner2 className="mr-2 animate-spin" />}
								{submitting ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					)}
				</form>
			</Form>
		</section>
	);
}
