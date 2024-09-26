import { updateClinicStatus } from "@/actions";
import { clinicsAtom } from "@/atoms/clinic-atom";
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
import { useSetAtom } from "jotai";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

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
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [input, setInput] = useState("");
	const setClinics = useSetAtom(clinicsAtom);
	const [alert, setAlert] = useState(false);

	const handleUpdateArchive = async () => {
		setLoading(true);
		try {
			const response = await updateClinicStatus(id, activate);
			if (!response) {
				return setAlert(true);
			}
			setClinics((prev) =>
				prev.map((clinic) => {
					if (clinic.id === id) {
						return { ...clinic, archive: activate };
					}
					return clinic;
				})
			);
			handleClose();
			setLoading(false);
		} catch {
			setLoading(false);
			setAlert(true);
		}
	};

	return (
		<Dialog open={open}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{activate ? "Deactivate" : "Activate"} Clinic
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
						Are you sure you want to{" "}
						<span
							className={`${
								activate ? "text-destructive" : "text-emerald-500"
							} font-semibold`}>
							{activate ? "Deactivate" : "Activate"}{" "}
						</span>
						<span className="font-bold italic">{name}</span> clinic
					</DialogDescription>
					<div className="space-y-1">
						<Label className="font-normal">
							Type{" "}
							<code className="font-bold bg-gray-200 rounded-sm p-0.5 text-xs">
								`{activate ? "deactivate" : "activate"}`
							</code>{" "}
							to confirm
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
						Cancel
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
							: "Confirm"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
