import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";

/* ACTIONS */
import { updateClinicStatus } from "@/actions";

/* STATES */
import { clinicsAtom } from "@/atoms";

/* COMPONENTS */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ASSETS */
import { TriangleAlert } from "lucide-react";
import { ImSpinner2 } from "react-icons/im";
import { useTranslation } from "react-i18next";

interface ActivateDeactivateClinic {
	activate: boolean;
	id: number;
	open: boolean;
	name: string;
	handleClose: VoidFunction;
}

export function ActivateDeactivateClinic({
	activate,
	id,
	name,
	handleClose,
	open,
}: ActivateDeactivateClinic) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [input, setInput] = useState("");
	const setClinics = useSetAtom(clinicsAtom);
	const [alert, setAlert] = useState(false);

	const [idToEdit, setIdToEdit] = useState<number>(id);

	useEffect(() => {
		setIdToEdit(id);
	}, [id, name, open]);

	const handleUpdateArchive = async () => {
		setLoading(true);
		try {
			const response = await updateClinicStatus(idToEdit, activate);
			if (!response) {
				return setAlert(true);
			}
			setClinics((prev) =>
				prev.map((clinic) => {
					if (clinic.id === idToEdit) {
						return { ...clinic, archive: activate };
					}
					return clinic;
				})
			);
			setInput("");
			handleClose();
			setLoading(false);
		} catch {
			setLoading(false);
			setAlert(true);
		}
	};

	return (
		<Dialog open={open}>
			<DialogContent removeClose className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="capitalize">
						{activate ? t("deactivate") : t("activate")} {t("clinic")}
					</DialogTitle>
					{alert && (
						<Alert
							variant="default"
							className="my-5 text-white bg-destructive ">
							<div className="flex items-center gap-x-2">
								<TriangleAlert className="h-8 w-8 stroke-white" />
								<div>
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>Something went wrong!</AlertDescription>
								</div>
							</div>
						</Alert>
					)}
					<DialogDescription>
						{t("promptDeactivateClinic")}{" "}
						<span
							className={`${
								activate ? "text-destructive" : "text-emerald-500"
							} font-semibold`}>
							{activate ? "Deactivate" : "Activate"}{" "}
						</span>
						<span className="font-bold italic">{name}</span> {t("clinic")}?
					</DialogDescription>
					<div className="space-y-1">
						<Label className="font-normal">
							{t("type")}{" "}
							<code className="font-bold bg-gray-200 rounded-sm p-0.5 text-xs">
								`{activate ? "deactivate" : "activate"}`
							</code>{" "}
							{t("toConfirm")}
						</Label>
						<Input
							value={input}
							onChange={(e) => {
								setInput(e.target.value);
								if (activate) {
									if (e.target.value === "deactivate") setDisabled(false);
									else setDisabled(true);
								} else {
									if (e.target.value === "activate") setDisabled(false);
									else setDisabled(true);
								}
							}}
						/>
					</div>
				</DialogHeader>
				<DialogFooter>
					<Button
						type="button"
						disabled={loading}
						onClick={handleClose}
						className="bg-emerald-500 hover:bg-emerald-500">
						{t("cancel")}
					</Button>
					<Button
						type="submit"
						onClick={handleUpdateArchive}
						disabled={disabled || loading}
						variant="destructive">
						{loading && <ImSpinner2 className="mr-2 animate-spin" />}
						{loading
							? activate
								? "Deactivating..."
								: "Activating..."
							: t("confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
