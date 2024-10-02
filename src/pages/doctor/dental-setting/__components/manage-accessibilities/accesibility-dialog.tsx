import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

/* ACTIONS */
import {
	createAccessibility,
	deleteAccessibility,
	updateAccessibility,
} from "@/actions";

/* HOOKS */
import { useToast } from "@/hooks/use-toast.ts";

/* CONSTANTS */
import { ERR_INTERNAL } from "@/constants/errors.ts";

/* STATES */
import {
	accessibilitiesAtom,
	accessibilitiesDataAtom,
	userAtom,
	accessbilityDialogAtom,
} from "@/atoms";

/* COMPONENTS */
import { Button } from "@/components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogOverlay,
} from "@/components/ui/dialog.tsx";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

/* ASSETS */
import { ImSpinner9 } from "react-icons/im";

const serviceSchema = z.object({
	name: z.string().min(1, { message: "Name is required!" }),
});

const initialValues = {
	name: "",
};

const AccessibilityDialog = () => {
	const [values, setValues] = useAtom(accessibilitiesDataAtom);
	const [accessibilityState, setAccessiblityState] = useAtom(
		accessbilityDialogAtom
	);
	const [loading, setLoading] = useState(false);
	const setAccessibilities = useSetAtom(accessibilitiesAtom);
	const user = useAtomValue(userAtom);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof serviceSchema>>({
		resolver: zodResolver(serviceSchema),
		defaultValues: values ?? initialValues,
		mode: "all",
		values: values ?? initialValues,
	});

	const viewMode = accessibilityState.mode === "view";
	const createMode = accessibilityState.mode === "create";
	const editMode = accessibilityState.mode === "edit";
	const deleteMode = accessibilityState.mode === "delete";

	const handleClose = (type: "edit" | "create" | "delete") => {
		toast({
			title: `Amenity ${
				type === "edit" ? "updated" : type === "create" ? "created" : "deleted"
			} successfully`,
			description: `Amenity ${
				type === "edit" ? "updated" : type === "create" ? "created" : "deleted"
			} successfully`,
			variant: "default",
			className: "bg-emerald-600 text-white",
			duration: 5000,
		});
		form.reset();
		setAccessiblityState({ open: false });
		setValues(null);
		setLoading(false);
	};

	const onSubmit = async (v: z.infer<typeof serviceSchema>) => {
		try {
			setLoading(true);
			if (createMode) {
				const newAccessiblity = await createAccessibility({
					clinicId: Number(user?.clinicId),
					name: v.name,
				});
				setAccessibilities((params) => [...params, newAccessiblity]);

				return handleClose("create");
			} else if (editMode) {
				const updatedCategory = await updateAccessibility({
					clinicId: Number(values?.clinicId),
					name: v.name,
					id: Number(values?.id),
				});

				setAccessibilities((accessibilities) => {
					return accessibilities.map((a) => {
						if (a.id === updatedCategory.id) return updatedCategory;
						return a;
					});
				});

				return handleClose("edit");
			} else {
				await deleteAccessibility(Number(values?.id));
				setAccessibilities((accessibilities) =>
					accessibilities.filter(
						(accessibility) => accessibility.id !== Number(values?.id)
					)
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
		<Dialog modal open={accessibilityState.open}>
			<DialogOverlay className=" backdrop-blur-lg" />
			<DialogContent removeClose className="">
				<DialogHeader>
					<DialogTitle className="mb-">
						{createMode ? "Create" : editMode ? "Edit" : "Delete"} Accessibility
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{deleteMode
											? "Are you sure to delete this Accessibility?"
											: "Name"}
									</FormLabel>
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
						<div className="flex justify-end gap-x-4">
							<Button
								type="button"
								disabled={loading}
								variant="destructive"
								className="btn-scale transition-1"
								onClick={() => {
									setValues(null);
									form.reset();
									setAccessiblityState({ open: false });
								}}>
								Close
							</Button>
							<Button type="submit">
								{loading && <ImSpinner9 className="animate-spin  mr-2" />}
								{loading
									? "Loading..."
									: createMode
									? "Create"
									: deleteMode
									? "Delete"
									: "Update"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AccessibilityDialog;
