import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { create } from "@/actions/user";
import { Role } from "@/types/types";
import { ERR_INTERNAL } from "@/constants/errors";
import { useToast } from "@/hooks/use-toast";
import { userAtom } from "@/atoms/user-atom";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

const formSchema = z.object({
	licenseNumber: z.string().min(1, {
		message: "Required",
	}),
	firstName: z.string().min(2, { message: "Please enter your first name" }),
	lastName: z.string().min(2, { message: "Please enter your last name" }),
	email: z.string().email({ message: "Please enter a valid email address" }),
	contact: z
		.string()
		.min(11, { message: "Please enter a valid phone number" })
		.max(11, { message: "Please enter a valid phone number" })
		.refine((val) => val[0] === "0" && val[1] === "9", {
			message: "Please enter a valid phone number.",
		}),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export default function SignUpForm() {
	const { toast } = useToast();
	const navigate = useNavigate();
	const setUser = useSetAtom(userAtom);
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			lastName: "",
			firstName: "",
			email: "",
			licenseNumber: "",
			contact: "",
			password: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);
			const user = await create({
				role: Role.doctor,
				verified: false,
				firstName: values.firstName,
				lastName: values.lastName,
				contacts: [values.contact],
				email: values.email,
				licenseNumber: values.licenseNumber,
				password: values.password,
			});

			toast({
				title: "Complete profile setup ",
				description: "Complete your profile setup to get started.",
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
				className: "bg-emerald-500 text-white delay-5000",
				duration: 5000,
			});
			setLoading(false);
			setUser(user);
			navigate("/", { replace: true });
		} catch (error) {
			setLoading(false);

			if (error instanceof Error) {
				toast({
					title: "Error",
					description: error.message,
					variant: "destructive",
				});
			}
			toast({
				title: "Error",
				description: ERR_INTERNAL,
				variant: "destructive",
			});
		}
	};

	return (
		<>
			<div className="flex flex-row items-center space-x-2 justify-center">
				<div className="border-b-2 w-3 border-gray-700" />
				<p className="uppercase text-gray-700 text-sm">OR</p>
				<div className="border-b-2 w-3 border-gray-700" />
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-3 lg:space-y-8">
					<div className="flex flex-col md:flex-row md:justify-between gap-2">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="w-full  lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] "
											placeholder="Full Name"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-600 font-semibold" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="w-full  lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] "
											placeholder="Last Name"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-600 font-semibold" />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="licenseNumber"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
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
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] "
										placeholder="Email Address"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-600 font-semibold" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="contact"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="lg:px-2 border-none  lg:py-4 lg:text-lg xl:px-4 xl:py-6 xl:text-xl bg-[#D9D9D9] "
										placeholder="Phone Number"
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
								<span>Signing up...</span>
							</>
						) : (
							"Sign up"
						)}
					</Button>

					<div className="flex flex-row space-x-1 justify-center mt-5">
						<p>I have an account?</p>
						<Link to={loading ? "#" : "/login"} className="font-bold">
							Sign in
						</Link>
					</div>
				</form>
			</Form>
		</>
	);
}
