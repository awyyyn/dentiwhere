import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ACTIONS */
import { createUser } from "@/actions";

/* STATES */
import { userAtom } from "@/atoms";

/* HOOKS */
import { useToast } from "@/hooks/use-toast";

/* TYPES */
import { Role } from "@/types/types";

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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

/* CONSTANTS */
import { ERR_INTERNAL } from "@/constants/errors";

/* ASSETS */
import { ImSpinner2 } from "react-icons/im";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import TermsAndConditions from "@/pages/public/terms-and-conditions/terms-and-conditions";
import PrivacyPolicy from "@/pages/public/privacy-policy/privacy-policy";
import { Separator } from "@/components/ui/separator";

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
	const [agree, setAgree] = useState(false);
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
			const user = await createUser({
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
					<div>
						<TermsAndConditionsAndPrivacyPolicy
							agree={agree}
							handleAgree={(v) => setAgree(v)}
						/>
					</div>
					<Button
						disabled={loading || !agree}
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

function TermsAndConditionsAndPrivacyPolicy({
	agree,
	handleAgree,
}: {
	agree: boolean;
	handleAgree: (v: boolean) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<div
					className="flex items-start   gap-2
				">
					<Checkbox
						className="checked:bg-1 mt-1  "
						onClick={() => (agree ? handleAgree(false) : setOpen(true))}
						checked={agree}
					/>
					<p className="text-sm">
						By creating an account, you agree to the `
						<b>Terms and conditions</b>` of service and `<b>Privacy Policy</b>`
					</p>
				</div>
			</DialogTrigger>
			<DialogContent
				suppressHydrationWarning
				removeClose
				className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Privacy Policy and Terms and Conditions</DialogTitle>
					<DialogDescription>
						Doctors are required to agree to the terms and conditions before
						proceeding.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="max-h-[300px] h-[300px]    ">
					<PrivacyPolicy />
					<Separator />
					<TermsAndConditions />
					<Button
						onClick={() => {
							handleAgree(true);
							setOpen(false);
						}}
						type="submit"
						className="bg-1 -mt-5 text-black w-full hover:text-black hover:bg-1">
						Accept
					</Button>
				</ScrollArea>
				<DialogFooter className="gap-2">
					<Button onClick={() => setOpen(false)} className="">
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
