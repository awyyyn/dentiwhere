import { useEffect, useState } from "react";
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
import { servicesChoices } from "@/constants/services";

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
import { useTranslation } from "react-i18next";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const serviceSchema = z.object({
	img: z.string().optional(),
	name: z.string().min(1, { message: "Name is required!" }),
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
	const [services, setServices] = useAtom(servicesAtom);
	const user = useAtomValue(userAtom);
	const { toast } = useToast();
	const { t } = useTranslation();
	const createMode = dialogAtom.mode === "create";
	const editMode = dialogAtom.mode === "edit";
	const deleteMode = dialogAtom.mode === "delete";
	const [serviceChoices, setServiceChoices] = useState<
		{ name: string; disabled: boolean }[]
	>([]);

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

	useEffect(() => {
		// Object.keys(servicesD).map(key => key === c)
		// const choices = categories.map((c) => {
		// 	return {
		// 		name: c.name.toUpperCase(),
		// 		disabled: categories
		// 			.map((cD) => cD.name)
		// 			.includes(c.name.toUpperCase()),
		// 	};
		// });

		const categoryName = categories.find(
			(c) => c.id === Number(form.getValues("categoryId"))
		)?.name as string;
		console.log(categoryName, "categoryName");
		const categoryT = Object.entries(servicesChoices)
			.map(([key, value]) => {
				if (key.toUpperCase() === categoryName?.toUpperCase()) {
					return value;
				}
				return null;
			})
			.filter((v) => v !== null)
			.pop();

		const choices = categoryT?.map((c) => {
			return {
				name: c,
				disabled: services.map((s) => s.name).includes(c),
			};
		});

		setServiceChoices(choices ?? []);

		console.log(categoryT, "aqqq");
	}, [values?.categoryId, categories, form.getValues("categoryId")]);

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
						{editMode
							? `${t("edit")} ${t("the")}`
							: createMode
							? t("create")
							: `${t("delete")} ${t("the")}`}{" "}
						Service
					</DialogTitle>
					{deleteMode && (
						<DialogDescription>
							{t("serviceDeleteConfirmation")}
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
									<FormLabel>{t("category")}</FormLabel>
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
														placeholder={t("selectCategory")}
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
												placeholder={`${t("categoryName")}...`}
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
									<FormLabel>{t("name")}</FormLabel>
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
												<SelectValue placeholder="Select a service" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>
														{categories
															.find(
																(c) => c.name === form.getValues("categoryId")
															)
															?.name.toUpperCase() ?? "Category"}
													</SelectLabel>
													{serviceChoices.map((service) => (
														<SelectItem
															key={service.name}
															value={service.name}
															disabled={service.disabled}>
															{service.name}
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
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("description")}</FormLabel>
									<FormControl>
										<Input
											autoFocus={false}
											autoComplete="off"
											className="first-letter:uppercase"
											readOnly={loading || deleteMode}
											placeholder={`${t("description")}...`}
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
											<FormLabel>{t("active")}</FormLabel>
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
								{t("close")}
							</Button>
							<Button type="submit">
								{loading && <ImSpinner9 className="animate-spin mr-2" />}
								{loading
									? "Loading..."
									: createMode
									? `${t("add")} ${t("service")}`
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

export default ServiceDialog;
