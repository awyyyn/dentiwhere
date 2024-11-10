import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

/* ACTIONS */
import { createCategory, deleteCategory, updateCategory } from "@/actions";

/* STATES */
import {
	categoriesAtom,
	categoryDataAtom,
	categoryDialogAtom,
	userAtom,
} from "@/atoms";

/* HOOKS */
import { useToast } from "@/hooks/use-toast.ts";

/* CONSTANTS */
import { ERR_INTERNAL } from "@/constants/errors.ts";

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
import { categories } from "@/constants/categories";

const serviceSchema = z.object({
	name: z.string().min(1, { message: "Name is required!" }),
});

const initialValues = {
	name: "",
};

const CategoryDialog = () => {
	const [values, setValues] = useAtom(categoryDataAtom);
	const [category, setCategoryAtom] = useAtom(categoryDialogAtom);
	const [loading, setLoading] = useState(false);
	const [categoriesData, setCategories] = useAtom(categoriesAtom);
	const user = useAtomValue(userAtom);
	const { toast } = useToast();
	const { t } = useTranslation();
	const [categoryChoices, setCategoryChoices] = useState<
		{ name: string; disabled: boolean }[]
	>([]);
	const form = useForm<z.infer<typeof serviceSchema>>({
		resolver: zodResolver(serviceSchema),
		defaultValues: values ?? initialValues,
		mode: "all",
		values: values ?? initialValues,
	});

	useEffect(() => {
		const choices = categories.map((c) => {
			return {
				name: c.toUpperCase(),
				disabled: categoriesData.map((cD) => cD.name).includes(c.toUpperCase()),
			};
		});
		setCategoryChoices(choices);
	}, [category, categoriesData, values?.name]);

	const createMode = category.mode === "create";
	const editMode = category.mode === "edit";
	const deleteMode = category.mode === "delete";

	const handleClose = (type: "edit" | "create" | "delete") => {
		toast({
			title: `Category ${
				type === "edit" ? "updated" : type === "create" ? "created" : "deleted"
			} successfully`,
			description: `Category ${
				type === "edit" ? "updated" : type === "create" ? "created" : "deleted"
			} successfully`,
			variant: "default",
			className: "bg-emerald-600 text-white",
			duration: 5000,
		});
		form.reset();
		setCategoryAtom({ open: false });
		setValues(null);
		setLoading(false);
	};

	const onSubmit = async (v: z.infer<typeof serviceSchema>) => {
		try {
			setLoading(true);
			if (createMode) {
				const newCategory = await createCategory({
					clinicId: Number(user?.clinicId),
					name: v.name,
				});

				setCategories((params) => [...params, newCategory]);

				return handleClose("create");
			} else if (editMode) {
				const updatedCategory = await updateCategory({
					clinicId: Number(user?.clinicId),
					name: v.name,
					id: Number(values?.id),
				});

				setCategories((categories) => {
					return categories.map((c) => {
						if (c.id === updatedCategory.id) return updatedCategory;
						return c;
					});
				});

				return handleClose("edit");
			} else {
				await deleteCategory(Number(values?.id));

				setCategories((categories) => {
					return categories.filter(
						(category) => category.id !== Number(values?.id)
					);
				});

				return handleClose("delete");
			}
		} catch (error) {
			setLoading(false);
			if (error instanceof Error) {
				toast({
					title: "Category creation error",
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
		<Dialog modal open={category.open}>
			<DialogContent removeClose>
				<DialogHeader>
					<DialogTitle className="mb-">
						{editMode
							? `${t("delete")} ${t("the")}`
							: createMode
							? t("create")
							: `${t("delete")} ${t("the")}`}{" "}
						Category
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
											? t("categoryDeleteConfirmation")
											: t("categoryName")}
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger disabled={loading || deleteMode}>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Category</SelectLabel>
													{categoryChoices.map((category) => (
														<SelectItem
															disabled={category.disabled}
															value={category.name}
															key={category.name}>
															{category.name}
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
									setCategoryAtom({ open: false });
								}}>
								{t("close")}
							</Button>
							<Button type="submit">
								{loading && <ImSpinner9 className="animate-spin mr-2" />}
								{loading
									? "Loading..."
									: createMode
									? `${t("add")} ${t("category")}`
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

export default CategoryDialog;
