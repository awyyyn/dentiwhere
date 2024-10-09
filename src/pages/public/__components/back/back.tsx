import { useNavigate } from "react-router-dom";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/shared/tooltip/tooltip";

/* ASSETS */
import { ChevronLeft } from "lucide-react";

export default function Back() {
	const navigate = useNavigate();

	const handleNavigate = () => navigate(-1);

	return (
		<div>
			<Tooltip tooltip="Back" side="right" delayDuration={500}>
				<Button
					onClick={handleNavigate}
					size="icon"
					variant="ghost"
					className="absolute top-2 left-2">
					<ChevronLeft />
				</Button>
			</Tooltip>
		</div>
	);
}
