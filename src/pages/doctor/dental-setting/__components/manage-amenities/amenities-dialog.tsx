import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

/* ACTIONS */
import { createAmenity, deleteAmenity, updateAmenity } from "@/actions";

/* HOOKS */
import { useToast } from "@/hooks/use-toast.ts";

/* CONSTANTS */
import { amenities } from "@/constants/amenities";
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

/* ASSETS */
import { ImSpinner9 } from "react-icons/im";
import { useTranslation } from "react-i18next";

const serviceSchema = z.object({
	name: z.string().min(1, { message: "Name is required!" }),
});

const initialValues = {
	name: "",
};

const AmenityDialog = () => {
	const [values, setValues] = useAtom(amenityDataAtom);
	const [amenityState, setAmenityState] = useAtom(amenitiesDialogAtom);
	const [loading, setLoading] = useState(false);
	const [amenitiesD, setAmenities] = useAtom(amenitiesAtom);
	const user = useAtomValue(userAtom);
	const { toast } = useToast();
	const { t } = useTranslation();

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
						{editMode
							? `${t("delete")} ${t("the")}`
							: createMode
							? t("create")
							: `${t("delete")} ${t("the")}`}
						Amenity
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
										{deleteMode ? t("amenityDeleteConfirmation") : t("name")}
									</FormLabel>
									<FormControl>
										{/* <Input
											autoComplete="off"
											autoFocus={false}
											readOnly={loading || deleteMode}
											className="first-letter:uppercase"
											placeholder={t("name")}
											{...field}
										/> */}
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger>
												<SelectValue placeholder="Select Amenity" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Amenity</SelectLabel>
													{amenities.map((am) => (
														<SelectItem
															disabled={amenitiesD
																.map((a) => a.name)
																.includes(am)}
															key={am}
															value={am}>
															{am}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
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
								{t("close")}
							</Button>
							<Button type="submit">
								{loading && <ImSpinner9 className="animate-spin  mr-2" />}
								{loading
									? "Loading..."
									: createMode
									? `${t("add")} Amenity`
									: deleteMode
									? t("delete")
									: t("edit")}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AmenityDialog;
