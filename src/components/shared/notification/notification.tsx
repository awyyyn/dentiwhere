import { useState } from "react";
import { format, isSameDay, isYesterday } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

/* UTILS */
import { readNotification } from "@/actions";

/* STATES */
import { notificationsAtom } from "@/atoms";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/components/shared/tooltip/tooltip";

/* ASSETS */
import { RiNotificationFill } from "react-icons/ri";
import { ChevronRight } from "lucide-react";

export default function Notification() {
	const [notifications, setNotifications] = useAtom(notificationsAtom);
	const unread = notifications.filter((notif) => !notif.read).length;
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleNavigate = async (
		id: number,
		notifId: number,
		type: "verification" | "notification"
	) => {
		if (type === "notification") return;
		await readNotification(notifId);
		setNotifications((prev) => {
			return prev.map((notif) => {
				if (notif.id === notifId) {
					return { ...notif, read: true };
				}
				return notif;
			});
		});
		setOpen(false);
		navigate(`/dashboard/doctors/verify/${id}`);
	};

	return (
		<Popover open={open}>
			<PopoverTrigger asChild onClick={() => setOpen((s) => !s)}>
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
					<div className="space-y-4 max-h-96 overflow-y-scroll scrollbar-hide scroll-mb-10">
						{notifications.length > 0 ? (
							notifications.map((notif) => {
								const yesterday = isYesterday(notif.createdAt);
								const now = isSameDay(new Date(), notif.createdAt);
								const time = format(notif.createdAt, "hh:mm aa");

								const timeLabel = yesterday
									? `Yesterday at  ${time}`
									: now
									? time
									: `${format(notif.createdAt, "LLL. d, u hh:mm aa")}`;

								const style = !notif.read && "bg-gray-800/10";

								const verification =
									notif.title.toLowerCase() === "data verification required";

								const type = verification ? "verification" : "notification";

								return (
									<Tooltip
										tooltip="view"
										key={notif.id}
										side="bottom"
										delayDuration={1500}>
										<div
											onClick={() =>
												handleNavigate(Number(notif?.from), notif.id, type)
											}
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
							})
						) : (
							<div className="text-center text-gray-500">No notifications</div>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
