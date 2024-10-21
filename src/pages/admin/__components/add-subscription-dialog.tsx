import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAtom, useSetAtom } from "jotai";

/* ACTIONS */
import {
	createSubscription,
	deleteSubscription,
	updateSubscription,
} from "@/actions";

/* STATES */
import {
	subscriptionDialogAtom,
	subscriptionDataAtom,
	subscriptionsAtom,
} from "@/atoms";

/* HOOKS */
import { useToast } from "@/hooks/use-toast";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "@/components/ui/form";

/* ASSETS */
import { ImSpinner9 } from "react-icons/im";

/* CONSTANTS */
import { ERR_INTERNAL } from "@/constants/errors";
import { useTranslation } from "react-i18next";

const subscriptionSchema = z.object({
	name: z.string().min(1, { message: "Name is required!" }),
	description: z.string(),
	price: z.string().min(1, { message: "Price is required!" }),
	months: z.string().min(1, { message: "Months is required!" }),
});

const initialValues = {
	name: "",
	description: "",
	price: "",
	months: "",
};

export function AddSubscriptionDialog() {
	const { t } = useTranslation();
	const [dialog, setDialog] = useAtom(subscriptionDialogAtom);
	const setSubscriptions = useSetAtom(subscriptionsAtom);
	const [values, setValues] = useAtom(subscriptionDataAtom);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof subscriptionSchema>>({
		resolver: zodResolver(subscriptionSchema),
		defaultValues:
			values !== null
				? {
						...values,
						price: values.price.toString(),
						months: values.months.toString(),
				  }
				: initialValues,
		mode: "all",
		values:
			values !== null
				? {
						...values,
						price: values.price.toString(),
						months: values.months.toString(),
				  }
				: initialValues,
	});

	const viewMode = dialog.mode === "delete";
	const createMode = dialog.mode === "create";
	const editMode = dialog.mode === "edit";

	const handleClose = (type: "edit" | "create" | "delete") => {
		toast({
			title: `${t("subscriptionToast")} ${
				type === "edit"
					? t("updated")
					: type === "create"
					? t("created")
					: t("deleted")
			} ${t("successfully")}`,
			description: `${t("subscriptionToast")}  ${
				type === "edit"
					? t("updated")
					: type === "create"
					? t("created")
					: t("deleted")
			} ${t("successfully")}`,
			variant: "default",
			className: "bg-emerald-600 text-white",
			duration: 5000,
		});
		form.reset();
		setDialog({ open: false });
		setValues(null);
		setLoading(false);
	};

	const onSubmit = async (v: z.infer<typeof subscriptionSchema>) => {
		try {
			setLoading(true);
			if (createMode) {
				const newSubscription = await createSubscription({
					...v,
					price: Number(v.price),
					months: Number(v.months),
				});
				setSubscriptions((params) => [...params, newSubscription]);

				return handleClose("create");
			} else if (editMode) {
				const updatedSubscription = await updateSubscription({
					...v,
					price: Number(v.price),
					months: Number(v.months),
					id: Number(values?.id),
				});

				setSubscriptions((subs) => {
					return subs.map((a) => {
						if (a.id === updatedSubscription.id) return updatedSubscription;
						return a;
					});
				});

				return handleClose("edit");
			} else {
				await deleteSubscription(Number(values?.id));
				setSubscriptions((subs) =>
					subs.filter((sub) => sub.id !== Number(values?.id))
				);
				return handleClose("delete");
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
			if (error instanceof Error) {
				toast({
					title: t("accessibilityCreationError"),
					description: error.message,
					variant: "destructive",
				});
			}
			toast({
				title: "Internal Error",
				description: ERR_INTERNAL,
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog open={dialog.open}>
			<DialogContent removeClose className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{editMode
							? t("editSubscription")
							: createMode
							? t("addSubscription")
							: t("deleteSubscription")}
					</DialogTitle>
					{/* <DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription> */}
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("name")}</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || viewMode}
											className="first-letter:uppercase"
											placeholder={t("name")}
											{...field}
										/>
									</FormControl>
									<div className="flex justify-end">
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						{(!values || (values && values.id !== 8)) && (
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("price")}</FormLabel>
										<FormControl>
											<Input
												autoComplete="off"
												autoFocus={false}
												readOnly={loading || viewMode}
												className="first-letter:uppercase"
												placeholder={t("price")}
												{...field}
											/>
										</FormControl>
										<div className="flex justify-end">
											<FormMessage />
										</div>
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name="months"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="capitalize">{t("months")}</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || viewMode}
											className="first-letter:uppercase"
											placeholder={t("months")}
											{...field}
										/>
									</FormControl>
									<div className="flex justify-end">
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("description")}</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || viewMode}
											className="first-letter:uppercase"
											placeholder={t("description")}
											{...field}
										/>
									</FormControl>
									<div className="flex justify-end">
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-x-4">
							<Button
								type="button"
								disabled={loading}
								variant="destructive"
								className="btn-scale transition-1"
								onClick={() => {
									setDialog({ open: false, mode: "edit" });
									/* setValues(null);
									form.reset(); */
								}}>
								{editMode ? t("cancel") : t("close")}
							</Button>
							<Button type="submit">
								{loading && <ImSpinner9 className="animate-spin " />}
								{loading
									? "Loading..."
									: createMode
									? t("createNew")
									: editMode
									? t("edit")
									: t("delete")}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
