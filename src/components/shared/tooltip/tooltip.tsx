import { PropsWithChildren } from "react";

/* COMPONENTS */
import {
	Tooltip as ShadcnTooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function Tooltip({
	children,
	tooltip,
	delayDuration = 3000,
	className,
	side = "right",
}: PropsWithChildren & {
	tooltip: string;
	delayDuration?: number;
	className?: string;
	side?: "right" | "left" | "top" | "bottom";
}) {
	return (
		<TooltipProvider>
			<ShadcnTooltip delayDuration={delayDuration}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side} className={className}>
					<p>{tooltip}</p>
				</TooltipContent>
			</ShadcnTooltip>
		</TooltipProvider>
	);
}
