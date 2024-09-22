import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogOverlay,
} from "@/components/ui/dialog.tsx";
import { z } from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

import { ImSpinner9 } from "react-icons/im";

import { accessbilityDialogAtom } from "@/atoms/dialogs-atom.ts";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast.ts";
import { ERR_INTERNAL } from "@/constants/errors.ts";
import { create, deleteAccessibility, update } from "@/actions/accessibilities.ts";
import { userAtom } from "@/atoms/user-atom.ts";
import {
	accessibilitiesAtom,
	accessibilitiesDataAtom,
} from "@/atoms/accessibility-atom.ts";

const serviceSchema = z.object({
	name: z.string().min(2, { message: "Name is too short!" }),
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

	const onSubmit = async (v: z.infer<typeof serviceSchema>) => {
		try {
			setLoading(true);
		  	if (createMode) {
				const newAccessiblity = await create({
					clinicId: Number(user?.clinicId),
					name: v.name,
				});
				setAccessibilities((params) => [...params, newAccessiblity]);
				toast({
					title: "Accessibility created successfully",
					description: "Accessibility has been created successfully",
					variant: "default",
					className: "bg-emerald-600 text-white",
					duration: 5000,
				});

				form.reset();
				setAccessiblityState({ open: false });
				setValues(null);
				return setLoading(false);
			} else if (editMode) {
				const updatedCategory = await update({
					clinicId: Number(values?.clinicId),
					name: v.name,
					id: Number(values?.id),
				});
				toast({
					title: "Accessibility updated successfully",
					description: "Accessibility has been updated successfully",
					variant: "default",
					className: "bg-emerald-600 text-white",
					duration: 5000,
				});

				setAccessibilities((accessibilities) => {
					return accessibilities.map((a) => {
						if (a.id === updatedCategory.id) return updatedCategory;
						return a;
					});
				});

				form.reset();

				setValues(null);

				setAccessiblityState({ open: false });

				return setLoading(false);
			} else {
				await deleteAccessibility(Number(values?.id))
				setAccessibilities(accessibilities => accessibilities.filter(accessibility => accessibility.id !== Number(values?.id)))
				setValues(null)
				setAccessiblityState({ open: false });
				toast({
					title: "Accessibility deleted successfully",
					description: "Accessibility has been deleted successfully",
					variant: "default",
					className: "bg-emerald-600 text-white",
					duration: 5000,
				});
				return setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
			if (error instanceof Error) {
				toast({
					title: "Error in creating service",
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
					<DialogTitle className="mb-">{createMode ? "Create" : editMode ? "Edit" : "Delete"} Accessibility</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{deleteMode ? "Are you sure to delete this Accessibility?" : "Name"}</FormLabel>
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
								{loading && <ImSpinner9 className="animate-spin " />}
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
