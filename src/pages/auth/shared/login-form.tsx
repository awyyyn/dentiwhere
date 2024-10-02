import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

/* ACTIONS */
import { getClinicByDoctor, login } from "@/actions";

/* HOOKS */
import { useToast } from "@/hooks/use-toast";

/* STATES */
import {
	categoriesAtom,
	servicesAtom,
	amenitiesAtom,
	accessibilitiesAtom,
	notificationsAtom,
	userAtom,
	clinicAtom,
} from "@/atoms";

/* TYPES */
import { Status } from "@/types/types";

/* COMPONENTS */
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* ASSETS */
import { ImSpinner2 } from "react-icons/im";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	licenseNumber: z.string().min(1, { message: "Required" }),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters long",
	}),
});

export default function LoginForm() {
	const { toast } = useToast();
	const navigate = useNavigate();
	const setUser = useSetAtom(userAtom);
	const setClinic = useSetAtom(clinicAtom)
	const setNotifications = useSetAtom(notificationsAtom);
	const setCategories = useSetAtom(categoriesAtom);
	const setServices = useSetAtom(servicesAtom);
	const setAmenities = useSetAtom(amenitiesAtom);
	const setAccessibilities = useSetAtom(accessibilitiesAtom);
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			licenseNumber: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);
			const data = await login(values);

			setUser(data);
			setNotifications(data.notifications ?? []);
			if (data.status === Status.unverified) {
				toast({
					title: "Complete Profile Information",
					description: "Please complete your profile information to proceed.",
					variant: "default",
					action: (
						<Button
							variant="ghost"
							className="hover:bg-emerald-500 bg-emerald-500 hover:text-white"
							onClick={() => {
								sessionStorage.setItem("editProfile", "true");
								navigate("/profile");
							}}>
							Setup
						</Button>
					),
					className: "bg-emerald-500 text-white",
					duration: 5000,
				});
			}
			if (data.clinicId !== 0) {
				const clinic = await getClinicByDoctor(data.id);
				setClinic(clinic)
				setCategories(clinic.categories ?? []);
				setServices(clinic.services ?? []);
				setAmenities(clinic.amenities ?? []);
				setAccessibilities(clinic.accesibilities ?? []);
			}
			setLoading(false);
			navigate("/", {
				replace: true,
			});
		} catch {
			setLoading(false);
			toast({
				title: "Login Error",
				description:
					"An error occurred while logging in. Please check your credentials and try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<>
			<div className="flex flex-row items-center space-x-2 justify-center">
				<div className="border-b-[3px] w-3  border-gray-500" />
				<p className="uppercase text-gray-700 text-sm">OR</p>
				<div className="border-b-[3px] w-3  border-gray-500" />
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-3 lg:space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										readOnly={loading}
										className="lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] "
										placeholder="Email address"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-600 font-semibold " />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="licenseNumber"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										readOnly={loading}
										className="lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] "
										placeholder="License Number"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-600 font-semibold" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										readOnly={loading}
										className="lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] "
										placeholder="Password"
										{...field}
										type="password"
									/>
								</FormControl>
								<FormMessage className="text-red-600 font-semibold" />
							</FormItem>
						)}
					/>
					<Button
						disabled={loading}
						type="submit"
						className="rounded-lg w-full hover:bg-[#00000080] bg-[#00000080] text-white">
						{loading ? (
							<>
								<ImSpinner2 className="animate-spin mr-2" />
								<span>Logging in...</span>
							</>
						) : (
							"Log in"
						)}
					</Button>

					<div className="flex flex-row space-x-1 justify-center mt-5">
						<p>Don&apos;t have an account?</p>

						<Link to={loading ? "#" : "/sign-up"} className="font-bold">
							Sign up
						</Link>
					</div>
				</form>
			</Form>
		</>
	);
}
