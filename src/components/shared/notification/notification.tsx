import { notificationsAtom } from "@/atoms/notification-atom";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/pages/admin/__components/tooltip";
import { format, isSameDay, isYesterday } from "date-fns";
import { useAtomValue } from "jotai";
import { ChevronRight } from "lucide-react";
import { RiNotificationFill } from "react-icons/ri";

export default function Notification() {
	const notifications = useAtomValue(notificationsAtom);
	const unread = notifications.filter((notif) => !notif.read).length;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="relative rounded-full group px-3  "
					variant="ghost"
					size="icon">
					<RiNotificationFill
						className="scale-150 group-hover:scale-[1.8]  
					group-active:scale-90 transition-all"
					/>
					{unread > 0 && (
						<span className="absolute text-xs   transition-all top-1 -right-1 bg-red-500 text-white rounded-full px-1 ">
							{unread}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="
					w-72 
                    data-[state=open]:-translate-x-5 
                    data-[state=closed]:-translate-x-5  
					md:w-80    
                    md:data-[state=open]:-translate-x-24 
                    md:data-[state=closed]:-translate-x-24 
                    lg:data-[state=open]:-translate-x-16 
                    lg:data-[state=closed]:-translate-x-16 
                "
				arrowPadding={2}
				side="bottom">
				<div className="space-y-2">
					<h1>
						Notification{" "}
						{unread > 0 && (
							<>
								<span className="text-white bg-destructive rounded-full p-1 px-2 text-xs">
									{unread}
								</span>
							</>
						)}
					</h1>
					<Separator />
					{notifications.map((notif) => {
						const yesterday = isYesterday(notif.createdAt);
						const now = isSameDay(new Date(), notif.createdAt);
						const time = format(notif.createdAt, "hh:mm aa");

						const timeLabel = yesterday
							? `Yesterday at  ${time}`
							: now
							? time
							: `${format(notif.createdAt, "LLL. d, u hh:mm aa")}`;

						const style = !notif.read && "bg-gray-800/10";

						return (
							<Tooltip
								tooltip="view"
								key={notif.id}
								side="bottom"
								delayDuration={1500}>
								<div
									className={`group relative group hover:shadow-lg active:shadow-sm transition-all duration-300 rounded-md hover:cursor-pointer hover:bg-gray-100 p-2 -space-y-1
								 ${style}`}>
									<h1 className="font-semibold">{notif.title}</h1>
									<p className="truncate first-letter:capitalize lowercase pr-6 text-gray-800/70">
										{notif.content}
									</p>
									<p className="text-xs text-right text-gray-600/60">
										{timeLabel}
									</p>
									<Button
										variant="ghost"
										size="icon"
										className="transition-all opacity-0 group-hover:opacity-100 absolute bg-transparent group:hover:bg-transparent right-2 top-[50%] -translate-y-[50%]">
										<ChevronRight className="stroke-black" />
									</Button>
								</div>
							</Tooltip>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
}
