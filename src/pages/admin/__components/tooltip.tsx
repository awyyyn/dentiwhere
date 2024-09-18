import {
	Tooltip as ShadcnTooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";

export function Tooltip({
	children,
	tooltip,
}: PropsWithChildren & { tooltip: string }) {
	return (
		<TooltipProvider>
			<ShadcnTooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side="right">
					<p>{tooltip}</p>
				</TooltipContent>
			</ShadcnTooltip>
		</TooltipProvider>
	);
}
