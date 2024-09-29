import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

/* ACTIONS */
import { createAmenity, deleteAmenity, updateAmenity } from "@/actions";

/* HOOKS */
import { useToast } from "@/hooks/use-toast.ts";

/* CONSTANTS */
import { ERR_INTERNAL } from "@/constants/errors.ts";

/* STATES */
import {
	amenitiesAtom,
	amenityDataAtom,
	userAtom,
	amenitiesDialogAtom,
} from "@/atoms";

/* COMPONENTS */
import { Button } from "@/components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
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
	name: z.string().min(2, { message: "Name is too short!" }),
});

const initialValues = {
	name: "",
};

const AmenityDialog = () => {
	const [values, setValues] = useAtom(amenityDataAtom);
	const [amenityState, setAmenityState] = useAtom(amenitiesDialogAtom);
	const [loading, setLoading] = useState(false);
	const setAmenities = useSetAtom(amenitiesAtom);
	const user = useAtomValue(userAtom);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof serviceSchema>>({
		resolver: zodResolver(serviceSchema),
		defaultValues: values ?? initialValues,
		mode: "all",
		values: values ?? initialValues,
	});

	const createMode = amenityState.mode === "create";
	const editMode = amenityState.mode === "edit";
	const deleteMode = amenityState.mode === "delete";

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
		setAmenityState({ open: false });
		setValues(null);
		setLoading(false);
	};

	const onSubmit = async (v: z.infer<typeof serviceSchema>) => {
		try {
			setLoading(true);
			if (createMode) {
				const newAmenity = await createAmenity({
					clinicId: Number(user?.clinicId),
					name: v.name,
				});
				setAmenities((params) => [...params, newAmenity]);
				toast({
					title: "Amenity created",
					description: "Amenity has been created successfully",
					variant: "default",
					className: "bg-emerald-600 text-white",
					duration: 5000,
				});

				return handleClose("create");
			} else if (editMode) {
				const updatedAmenity = await updateAmenity({
					clinicId: Number(user?.clinicId),
					name: v.name,
					id: Number(values?.id),
				});

				setAmenities((amenities) => {
					return amenities.map((amenity) => {
						if (amenity.id === updatedAmenity.id) return updatedAmenity;
						return amenity;
					});
				});

				return handleClose("edit");
			} else {
				await deleteAmenity(Number(values?.id));
				setAmenities((amenities) =>
					amenities.filter((amenity) => amenity.id !== Number(values?.id))
				);
				return handleClose("delete");
			}
		} catch (error) {
			setLoading(false);
			if (error instanceof Error) {
				toast({
					title: "Amenity creation error",
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
		<Dialog modal open={amenityState.open}>
			<DialogContent removeClose className="">
				<DialogHeader>
					<DialogTitle className="mb-">
						{editMode ? "Edit" : createMode ? "Add" : "Delete"} Amenity
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
											? "Are you sure to delete this amenity?"
											: "Name"}
									</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || deleteMode}
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
									setAmenityState({ open: false });
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

export default AmenityDialog;
