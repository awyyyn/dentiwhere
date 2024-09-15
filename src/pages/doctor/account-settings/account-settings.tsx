import { useEffect, useRef, useState } from "react";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { db } from "@/utils/supabase";
import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";
import { clinicAtom } from "@/atoms/clinic-atom";
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
const userForm = z.object({
	fist_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "First name is required" }),
	email: z.string().email(),
	contact: z
		.string()
		.min(10, { message: "Please enter a valid phone number" })
		.max(10, { message: "Please enter a valid phone number" })
		.refine((val) => Number(val[0]) === 9, {
			message: "Please enter a valid phone number.",
		}),
	gender: z.string(),
	verified_id: z.string().min(1, { message: "First name is required" }),
	postal_id: z.string().min(1, { message: "First name is required" }),
	id: z.string().min(1, { message: "First name is required" }),
	address: z.string().min(1, { message: "First name is required" }),
});

export default function AccountSettings() {
	const avatarRef = useRef<DropzoneRef>(null!);
	const frontIdRef = useRef<DropzoneRef>(null!);
	const backIdRef = useRef<DropzoneRef>(null!);
	const [user, setUser] = useAtom(userAtom);
	const [clinic, setClinic] = useAtom(clinicAtom);
	const [editing, setEditing] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [placeholder, setPlaceholder] = useState(
		editing && clinic?.img ? clinic.img : ""
	);
	const [frontId, setFrontId] = useState(
		editing ? user.licenseId.frontImg : ""
	);
	const [backId, setBackId] = useState(editing ? user.licenseId.backImg : "");

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
			verified_id: user?.verifiedId ?? "",
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
				return console.log("No data");
			}

			const response = await db.storage
				.from("profiles")
				.getPublicUrl(data.path);

			if (response.data.publicUrl === null) {
				setUploading(false);
				return console.log("No data");
			}
			if (type === "frontId") {
				setFrontId(response.data.publicUrl);
			} else if (type === "backId") {
				setBackId(response.data.publicUrl);
			} else {
				setPlaceholder(response.data.publicUrl);
			}
			setUploading(false);
		} catch (error) {
			console.log(error);
			setPlaceholder("");
			setUploading(false);
		}
	};

	useEffect(() => {
		if (user.id !== 0) {
			setLoading(true);
			form.setValue("fist_name", user.firstName);
			form.setValue("last_name", user.lastName);
			form.setValue("email", user.email);
			form.setValue(
				"contact",
				user?.contacts[0] ? user?.contacts[0].slice(1) : ""
			);
			form.setValue("address", user.address ?? "");
			form.setValue("gender", user.gender);
			form.setValue("postal_id", user.postalId);
			form.setValue("verified_id", user.verifiedId);
			setFrontId(user.licenseId.frontImg);
			setBackId(user.licenseId.backImg);
			setPlaceholder(user.img);
			setLoading(false);
		}
	}, [setUser, user]);

	const handleSubmit = () => {};

	console.log(form.getValues());

	return (
		<section className="">
			<Form {...form}>
				<form
					className=" p-1 sm:px-10 pb-20"
					onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="grid  grid-cols-1 lg:grid-cols-4   gap-y-8 lg:gap-y-0 ">
						<div className="flex order-2 lg:order-1 md:w-full flex-col lg:flex-row  items-center lg:col-span-3 lg:space-x-10 xl:space-x-20 ">
							<Dropzone
								disabled={!editing}
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
								<Button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										console.log(avatarRef.current);
										avatarRef.current?.open();
									}}
									className="w-48 mx-auto text-md lg:max-w-min lg:mx-0    xl:text-2xl bg-1 hover:text-black text-black p-6 shadow-lg hover:bg-1 shadow-gray-700/50 hover:shadow-lg active:scale-90 transition-all duration-300">
									Upload Now
								</Button>
								<Button className="w-48 mx-auto text-md lg:max-w-min lg:mx-0    xl:text-2xl p-6 bg-white text-black shadow-md shadow-gray-700/50 hover:text-black hover:bg-white hover:shadow-lg active:scale-90 transition-all duration-300">
									Delete Avatar
								</Button>
							</div>
						</div>
						<div className="scale-75 lg:scale-100 order-1 lg:order-2 justify-self-center">
							<LogoWithText />
						</div>
					</div>

					<div className=" grid grid-cols-1 lg:grid-cols-4 grid-flow-row-dense mt-8 lg:mt-10 lg:gap-y-0 ">
						<div className="flex w-full   flex-col flex-wrap lg:grid  place-content-start lg:-space-y-0 lg:grid-flow-row lg:grid-cols-2 md:gap-8 md:col-span-4  lg:col-span-4 xl:col-span-3 lg:gap-x-10 pr-5 ">
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
														readOnly={editing || loading || uploading}
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
									render={() => (
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
														disabled={!editing || loading || uploading}
														className="flex md:ml-2 ">
														<div
															onClick={() => form.setValue("gender", "male")}
															className="flex items-center space-x-2 bg-white rounded-lg px-6 py-3">
															<RadioGroupItem value="male" id="male" />
															<Label
																htmlFor="male"
																className=" text-lg text-gray-400 font-light">
																Male
															</Label>
														</div>
														<div
															onClick={() => form.setValue("gender", "female")}
															className="flex items-center space-x-2 bg-white rounded-lg px-6 py-3">
															<RadioGroupItem value="female" id="female" />
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
								name="verified_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Verified ID
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
								name="id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											ID Number <span className="text-destructive">*</span>
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
									<Label>Front ID</Label>
									<Dropzone
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
													className="absolute h-full z-10 object-cover w-full transition-all duration-300"
												/>
											</div>
										)}
									</Dropzone>
									<div className="flex w-full justify-center gap-y-2 lg:gap-y-2 lg:space-x-4 flex-wrap ">
										<Button
											onClick={() => frontIdRef.current.open()}
											className="w-full lg:max-w-min bg-gray-300/90 shadow-lg text-[#1D4968]">
											{frontId ? "Change" : "Upload"}
										</Button>
										<Button className="w-full lg:max-w-min text-destructive hover:bg-gray-300 bg-gray-300/90 shadow-lg">
											Remove
										</Button>
									</div>
								</div>
								<div className="space-y-3">
									<Label>Back ID</Label>
									<Dropzone
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
															{frontId ? "Replace Image" : "Upload Image"}
														</p>
													)}
												</div>
												<img
													src={
														backId
															? backId
															: "https://www.wibits.com/wp-content/themes/wibits-theme/images/sample.jpg"
													}
													className="absolute h-full z-10 object-cover w-full transition-all duration-300"
												/>
											</div>
										)}
									</Dropzone>
									<div className="flex  w-full justify-center gap-y-2 lg:gap-y-2 lg:space-x-4 flex-wrap ">
										<Button
											onClick={() => backIdRef.current?.open()}
											className="w-full lg:max-w-min bg-gray-300/90 shadow-lg text-[#1D4968]">
											{backId ? "Change" : "Upload"}
										</Button>
										<Button className="w-full lg:max-w-min text-destructive hover:bg-gray-300 bg-gray-300/90 shadow-lg">
											Remove
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:col-span-4 mt-5 flex items-center flex-wrap gap-4 h-20">
						{!editing ? (
							<Button
								onClick={() => setEditing(true)}
								type="button"
								className="bg-1 w-full md:max-w-min hover:bg-1 text-gray-800 shadow-lg">
								Edit Profile
							</Button>
						) : (
							<>
								<Button
									onClick={() => setEditing(false)}
									type="button"
									className={`bg-white w-full md:max-w-min hover:bg-white text-gray-800 shadow-lg ${
										editing ?? "hidden"
									}`}>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-1 w-full md:max-w-min hover:bg-1 text-gray-800 shadow-lg">
									Save Changes
								</Button>
							</>
						)}
					</div>
				</form>
			</Form>
		</section>
	);
}
