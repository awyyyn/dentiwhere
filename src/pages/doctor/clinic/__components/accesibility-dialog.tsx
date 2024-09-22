import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogOverlay,
} from "@/components/ui/dialog";
import { z } from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ImSpinner9 } from "react-icons/im";

import { accessbilityDialogAtom } from "@/atoms/dialogs-atom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ERR_INTERNAL } from "@/constants/errors";
import { createAccessibility, updateAccessibility } from "@/actions";
import { userAtom } from "@/atoms/user-atom";
import {
	accessibilitiesAtom,
	accessibilitiesDataAtom,
} from "@/atoms/accessibility-atom";

const serviceSchema = z.object({
	name: z.string().min(3, { message: "Name is too short!" }),
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

	const onSubmit = async (v: z.infer<typeof serviceSchema>) => {
		try {
			setLoading(true);
			if (viewMode) {
				setAccessiblityState((p) => ({ ...p, mode: "edit" }));
				return setLoading(false);
			} else if (createMode) {
				const newAccessiblity = await createAccessibility({
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
				const updatedCategory = await updateAccessibility({
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
				//
				return setLoading(false);
			}
		} catch (error) {
			setLoading(false);

			console.log(error);
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
					<DialogTitle className="mb-">Accessibility</DialogTitle>
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
						<div className="flex justify-end gap-x-4">
							<Button
								type="button"
								disabled={loading}
								variant="destructive"
								className="btn-scale transition-1"
								onClick={() => {
									if (editMode) {
										setAccessiblityState((p) => ({ ...p, mode: "view" }));
										form.reset();
										return;
									}
									setValues(null);
									form.reset();
									setAccessiblityState({ open: false });
								}}>
								{editMode ? "Cancel" : "Close"}
							</Button>
							<Button type="submit">
								{loading && <ImSpinner9 className="animate-spin " />}
								{loading
									? "Loading..."
									: viewMode
									? "Edit"
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
};

export default AccessibilityDialog;
