import { readNotification } from "@/actions";
import { notificationsAtom } from "@/atoms/notification-atom";
import LogoWithText from "@/components/shared/logo-with-text/logo-with-text";
import { isSameDay, isYesterday, format } from "date-fns";
import { useAtom } from "jotai";

export default function Notification() {
	const [notifications, setNotifications] = useAtom(notificationsAtom);

	const handleReadNotification = async (id: number, read: boolean) => {
		if (!read) {
			await readNotification(id);
			setNotifications((notifs) => {
				return notifs.map((notif) => {
					if (notif.id === id) {
						return { ...notif, read: true };
					}
					return notif;
				});
			});
		}
	};

	return (
		<section>
			<div className="md:px-10 grid grid-cols-1 gap-y-5 lg:grid-cols-4 grid-flow-row mt-8 lg:mt-10 lg:gap-y-0 divide-y-reverse ">
				<div className="order-2 md:order-1 lg:col-span-3 space-y-5 lg:pra-32 xl:apr-40">
					<h1 className="font-extrabold text-3xl md:text-5xl tracking-wide">
						Notifications
					</h1>
					<div className="space-y-2">
						{notifications.map((notif) => {
							const yesterday = isYesterday(notif.createdAt);
							const now = isSameDay(new Date(), notif.createdAt);
							const time = format(notif.createdAt, "hh:mm aa");

							const timeLabel = yesterday
								? `Yesterday at  ${time}`
								: now
								? time
								: `${format(notif.createdAt, "LLL. d, u hh:mm aa")}`;

							const style = !notif.read ? "bg-gray-800/10" : "bg-white/40";

							return (
								<div
									onClick={handleReadNotification.bind(
										null,
										notif.id,
										notif.read
									)}
									key={notif.id}
									className={`p-3 max-w-3xl lg:p-5 group hover:bg-white/50 transition-all duration-300 cursor-pointer shadow-md rounded-lg    ${style}`}>
									<h1 className="font-semibold">{notif.title}</h1>
									<p className="truncate text-gray-600">{notif.content}</p>
									<p className="text-xs text-right text-gray-600/60">
										{timeLabel}
									</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className=" order-1 justify-self-center lg:order-2  ">
					<LogoWithText />
				</div>
			</div>
		</section>
	);
}
