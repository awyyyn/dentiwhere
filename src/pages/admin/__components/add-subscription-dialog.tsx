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
			title: `Subscription ${
				type === "edit" ? "updated" : type === "create" ? "created" : "deleted"
			} successfully`,
			description: `Subscription ${
				type === "edit" ? "updated" : type === "create" ? "created" : "deleted"
			} successfully`,
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
					title: "Accessibility creation error",
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
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{editMode ? "Edit" : createMode ? "Add" : "Delete"} Subscription
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
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || viewMode}
											className="first-letter:uppercase"
											placeholder="Name"
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
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || viewMode}
											className="first-letter:uppercase"
											placeholder="Price"
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
							name="months"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Months</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || viewMode}
											className="first-letter:uppercase"
											placeholder="Months"
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
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || viewMode}
											className="first-letter:uppercase"
											placeholder="Description"
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
									if (editMode) {
										setDialog((p) => ({ ...p, mode: "view" }));
										form.reset();
										return;
									}
									setValues(null);
									form.reset();
									setDialog({ open: false });
								}}>
								{editMode ? "Cancel" : "Close"}
							</Button>
							<Button type="submit">
								{loading && <ImSpinner9 className="animate-spin " />}
								{loading
									? "Loading..."
									: createMode
									? "Create"
									: editMode
									? "Update"
									: "Delete"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
