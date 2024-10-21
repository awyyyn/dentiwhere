import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

/* ACTIONS */
import { changePassword } from "@/actions";

/* STATES */
import { userAtom } from "@/atoms";

/* HOOKS */
import { useToast } from "@/hooks/use-toast";

/* COMPONENTS */
import InputWithIcon from "@/components/shared/input-with-icon/input-with-icon";
import LogoWithText from "@/components/shared/logo-with-text/logo-with-text";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";

/* ASSETS */
import { RiLockPasswordFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const passwordSchema = z.object({
	oldPassword: z.string(),
	newPassword: z.string().min(8),
	confirmPassword: z.string().min(8),
});

export default function Password() {
	const { t } = useTranslation();
	const { toast } = useToast();
	const user = useAtomValue(userAtom);
	const form = useForm({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		resolver: zodResolver(passwordSchema),
	});

	const handleSubmit = async (v: z.infer<typeof passwordSchema>) => {
		if (v.confirmPassword !== v.newPassword) {
			return form.setError("confirmPassword", {
				type: "*",
				message: "Passwords do not match",
			});
		}
		if (form.formState.errors.confirmPassword) {
			return form.setError("confirmPassword", {
				type: "*",
				message: "Passwords do not match",
			});
		}
		try {
			await changePassword({
				email: user.email,
				password: v.newPassword,
				oldPassword: v.oldPassword,
			});

			toast({
				title: "Password Reset Successful",
				description:
					"Your password has been reset successfully. You can now log in with your new password.",
				variant: "default",
				className: "bg-emerald-500 text-white",
				duration: 5000,
			});
			form.reset();
		} catch (error) {
			toast({
				title: "Error",
				description: (error as Error).message ?? "Something went wrong",
				variant: "destructive",
			});
		}
	};

	return (
		<section>
			<div className="md:px-10 grid grid-cols-1 gap-y-5 lg:grid-cols-4 grid-flow-row mt-8 lg:mt-10 lg:gap-y-0 divide-y-reverse ">
				<div className="order-2 md:order-1 lg:col-span-3 space-y-5">
					<h1 className="font-extrabold  text-5xl tracking-wide">Password</h1>
					<Form {...form}>
						<form
							className="space-y-5 "
							onSubmit={form.handleSubmit(handleSubmit)}>
							<FormField
								control={form.control}
								name="oldPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("oldPassword")}{" "}
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<InputWithIcon
												className=" max-w-[500px] rounded-lg px-2 ml-1 text-lg focus:ring-none bg-white"
												inputProps={{
													...field,
													type: "password",
													placeholder: t("oldPassword"),
												}}
												startIcon={<RiLockPasswordFill />}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("newPassword")}{" "}
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<InputWithIcon
												className="max-w-[500px] rounded-lg px-2 ml-1 text-lg focus:ring-none bg-white"
												inputProps={{
													...field,
													type: "password",
													placeholder: t("newPassword"),
												}}
												startIcon={<RiLockPasswordFill />}
											/>
										</FormControl>
										<FormDescription className=" ml-1">
											{t("min8")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("confirmPassword")}{" "}
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<InputWithIcon
												className="max-w-[500px] rounded-lg px-2 ml-1 text-lg focus:ring-none bg-white"
												inputProps={{
													...field,
													type: "password",
													placeholder: t("confirmPassword"),
													onChange: (e) => {
														if (
															e.target.value !== form.getValues().newPassword
														) {
															form.setError("confirmPassword", {
																type: "*",
																message: "Passwords do not match",
															});
															form.setValue("confirmPassword", e.target.value);
														} else {
															form.clearErrors("confirmPassword");
															form.setValue("confirmPassword", e.target.value);
														}
													},
												}}
												startIcon={<RiLockPasswordFill />}
											/>
										</FormControl>
										<FormDescription className=" ml-1">
											{t("min8")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								className="w-full lg:w-[500px] ml-2 text-xl py-6"
								size="lg">
								{t("changePassword")}{" "}
							</Button>
						</form>
					</Form>
				</div>
				<div className=" order-1 justify-self-center lg:order-2  ">
					<LogoWithText />
				</div>
			</div>
		</section>
	);
}
