import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

/* ACTIONS */
import {
	createCategory,
	createService,
	deleteService,
	updateService,
} from "@/actions";

/* HOOKS */
import { useToast } from "@/hooks/use-toast";

/* STATES */
import {
	userAtom,
	serviceDialogAtom,
	categoriesAtom,
	serviceDataAtom,
	servicesAtom,
} from "@/atoms";

/* CONSTANT */
import { ERR_INTERNAL } from "@/constants/errors";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogOverlay,
} from "@/components/ui/dialog";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label.tsx";

/* ASSETS */
import { ImSpinner9 } from "react-icons/im";

const serviceSchema = z.object({
	img: z.string().optional(),
	name: z
		.string()
		.min(1, { message: "Name is required!" }),
	description: z.string().optional(),
	categoryId: z.string().min(1, { message: "Category is required" }),
	rate: z.string().optional(),
	active: z.boolean().default(true),
});

const initialValues = {
	active: true,
	categoryId: "",
	description: "",
	img: "",
	name: "",
	rate: "",
};

const ServiceDialog = () => {
	const [values, setValues] = useAtom(serviceDataAtom);
	const [dialogAtom, setDialogAtom] = useAtom(serviceDialogAtom);
	const [categories, setCategories] = useAtom(categoriesAtom);
	const [loading, setLoading] = useState(false);
	const setServices = useSetAtom(servicesAtom);
	const user = useAtomValue(userAtom);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof serviceSchema>>({
		resolver: zodResolver(serviceSchema),
		defaultValues: values
			? { ...values, categoryId: String(values.categoryId) }
			: initialValues,
		mode: "all",
		values: values
			? { ...values, categoryId: String(values.categoryId) }
			: initialValues,
	});

	const viewMode = dialogAtom.mode === "view";
	const createMode = dialogAtom.mode === "create";
	const editMode = dialogAtom.mode === "edit";
	const deleteMode = dialogAtom.mode === "delete";

	const onSubmit = async (v: z.infer<typeof serviceSchema>) => {
		try {
			setLoading(true);
			if (createMode) {
				const regex = /^\d+$/;

				let categoryId = v.categoryId;

				if (!regex.test(categoryId)) {
					const newService = await createCategory({
						clinicId: Number(user?.clinicId),
						name: v.name,
					});

					setCategories((p) => p.concat(newService));
					categoryId = String(newService.id);
				}
				const newService = await createService({
					...v,
					categoryId: Number(categoryId),
					clinicId: Number(user?.clinicId),
					rate: v.rate ?? "",
					img: v.img ?? "",
				});
				setServices((p) => p.concat(newService));
				toast({
					title: "Service created successfully",
					description: "Service has been created successfully",
					variant: "default",
					className: "bg-emerald-600 text-white",
					duration: 5000,
				});
				form.reset();
				setDialogAtom({ open: false });
				return setLoading(false);
			} else if (editMode) {
				const updatedService = await updateService({
					name: v.name,
					description: v.description,
					active: v.active,
					rate: v.rate,
					categoryId: Number(v.categoryId),
					clinicId: Number(values?.clinicId),
					id: Number(values?.id),
					img: values?.img ?? "",
				});
				toast({
					title: "Service created",
					description: "Service has been updated successfully",
					variant: "default",
					className: "bg-emerald-600 text-white",
					duration: 5000,
				});
				form.reset();
				setDialogAtom({ open: false });
				setServices((services) => {
					return services.map((service) => {
						if (service.id === updatedService.id) return updatedService;
						return service;
					});
				});
				return setLoading(false);
			} else {
				await deleteService(Number(values?.id));
				setServices((services) =>
					services.filter((service) => service.id !== Number(values?.id))
				);
				setValues(null);
				setDialogAtom({ open: false });
				toast({
					title: "Service deleted",
					description: "Service has been deleted successfully",
					variant: "default",
					className: "bg-emerald-600 text-white",
					duration: 5000,
				});
				return setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			if (error instanceof Error) {
				toast({
					title: "Service creation error",
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
		<Dialog modal open={dialogAtom.open}>
			<DialogOverlay className=" backdrop-blur-lg" />
			<DialogContent removeClose className="">
				<DialogHeader>
					<DialogTitle className="mb-">
						{createMode ? "Add" : editMode ? "Edit" : "Delete"} Service
					</DialogTitle>
				</DialogHeader>
				{deleteMode && <Label>Are you sure to delete this service?</Label>}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									{categories.length > 0 ? (
										<FormControl className="">
											<Select
												disabled={loading}
												onValueChange={(val) => {
													form.setValue("categoryId", val);
													form.clearErrors("categoryId");
												}}
												value={field?.value}>
												<SelectTrigger className="disabled:bg-white disabled:border-gray-900 disabled:cursor-text">
													<SelectValue
														placeholder="Select a Category"
														className="min-w-full first-letter:uppercase"
													/>
												</SelectTrigger>
												<SelectContent className="min-w-full w-full ">
													{categories.map((category) => (
														<SelectItem
															value={category.id.toString()}
															key={category.id}
															className="min-w-[120%] capitalize">
															{category.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
									) : (
										<FormControl>
											<Input
												autoComplete="off"
												autoFocus={false}
												readOnly={loading || viewMode}
												className="first-letter:uppercase"
												placeholder="Category name..."
												{...field}
											/>
										</FormControl>
									)}
									<div className="flex justify-end">
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
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
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											autoFocus={false}
											autoComplete="off"
											className="first-letter:uppercase"
											readOnly={loading || viewMode}
											placeholder="Description..."
											multiple
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
							name="active"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center py-2 space-x-3">
											<FormLabel>Active</FormLabel>
											<Switch
												checked={field.value}
												disabled={loading}
												value={Number(field.value)}
												onCheckedChange={(v) => {
													form.setValue("active", Boolean(v));
													form.clearErrors("active");
												}}
												className="scale-100 active:scale-100 hover:right-1 "
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
                            control={form.control}
                            name=""
                            render={({ field}) => (
                                <FormItem > 
                                    <FormControl>
                                        <Input 
                                            readOnly={ loading || dialogAtom.mode === "view"} 
                                            placeholder="Name" 
                                            {...field} 
                                        />
                                    </FormControl> 
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
						<div className="flex justify-end gap-x-4">
							<Button
								type="button"
								disabled={loading}
								variant="destructive"
								className="btn-scale transition-1"
								onClick={() => {
									if (editMode) {
										setDialogAtom((p) => ({ ...p, mode: "view" }));
										form.reset();
										return;
									}
									form.reset();
									setValues(null);
									setDialogAtom({ open: false });
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

export default ServiceDialog;
