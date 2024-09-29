import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

/* ACTIONS */
import {
	createService,
	deleteService,
	updateService,
	createCategory,
} from "@/actions";

/* HOOKS */
import { useToast } from "@/hooks/use-toast";

/* CONSTANTS */
import { ERR_INTERNAL } from "@/constants/errors";

/* STATES */
import {
	userAtom,
	categoriesAtom,
	serviceDialogAtom,
	serviceDataAtom,
	servicesAtom,
} from "@/atoms";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogOverlay,
	DialogDescription,
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

/* ASSETS */
import { ImSpinner9 } from "react-icons/im";

const serviceSchema = z.object({
	img: z.string().optional(),
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters long" }),
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

	const createMode = dialogAtom.mode === "create";
	const editMode = dialogAtom.mode === "edit";
	const deleteMode = dialogAtom.mode === "delete";

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

	const handleClose = (type: "edit" | "create" | "delete") => {
		toast({
			title: `Service ${
				type === "edit" ? "updated" : type === "create" ? "created" : "deleted"
			} successfully`,
			description: `Service ${
				type === "edit" ? "updated" : type === "create" ? "created" : "deleted"
			} successfully`,
			variant: "default",
			className: "bg-emerald-600 text-white",
			duration: 5000,
		});
		form.reset();
		setDialogAtom({ open: false });
		setValues(null);
		setLoading(false);
	};

	const onSubmit = async (v: z.infer<typeof serviceSchema>) => {
		try {
			setLoading(true);
			if (createMode) {
				const regex = /^\d+$/;
				let categoryId = v.categoryId;
				if (!regex.test(categoryId)) {
					const newCategory = await createCategory({
						clinicId: Number(user?.clinicId),
						name: v.name,
					});

					setCategories((p) => p.concat(newCategory));
					categoryId = String(newCategory.id);
				}
				const newService = await createService({
					...v,
					categoryId: Number(categoryId),
					clinicId: Number(user?.clinicId),
					rate: v.rate ?? "",
					img: v.img ?? "",
				});
				setServices((p) => p.concat(newService));
				return handleClose("create");
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
				setServices((services) => {
					return services.map((service) => {
						if (service.id === updatedService.id) return updatedService;
						return service;
					});
				});
				return handleClose("edit");
			} else {
				await deleteService(Number(values?.id));
				setServices((services) =>
					services.filter((service) => service.id !== Number(values?.id))
				);
				return handleClose("delete");
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
						{editMode ? "Edit" : createMode ? "Add" : "Delete"} Service
					</DialogTitle>
					{deleteMode && (
						<DialogDescription>
							Are you sure to delete this service?
						</DialogDescription>
					)}
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem className={`${deleteMode ? "hidden" : "block"}`}>
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
												readOnly={loading || deleteMode}
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
											readOnly={loading || deleteMode}
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
									<FormControl className="">
										<div className="flex items-center py-2 space-x-3">
											<FormLabel>Active</FormLabel>
											<Switch
												disabled={loading || deleteMode}
												checked={field.value}
												value={Number(field.value)}
												onCheckedChange={(v) => {
													form.setValue("active", Boolean(v));
													form.clearErrors("active");
												}}
												onBlur={field.onBlur}
												className="scale-100 active:scale-100 hover:right-1 "
											/>
										</div>
									</FormControl>
									<FormMessage />
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
									form.reset();
									setValues(null);
									setDialogAtom({ open: false });
								}}>
								Close
							</Button>
							<Button type="submit">
								{loading && <ImSpinner9 className="animate-spin mr-2" />}
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
};

export default ServiceDialog;
