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
	delayDuration = 3000,
	className,
}: PropsWithChildren & {
	tooltip: string;
	delayDuration?: number;
	className?: string;
}) {
	return (
		<TooltipProvider>
			<ShadcnTooltip delayDuration={delayDuration}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side="right" className={className}>
					<p>{tooltip}</p>
				</TooltipContent>
			</ShadcnTooltip>
		</TooltipProvider>
	);
}
