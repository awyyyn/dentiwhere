import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

/* UTILS */
import { db } from "@/utils/supabase";

/* STATES */
import { notificationsAtom, userAtom } from "@/atoms";

/* TYPES */
import { Role, Status } from "@/types/types";

/* COMPONENTS */
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LogoWithText from "@/components/shared/logo-with-text/logo-with-text";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/* ASSETS */
import { IoHome, IoLogOut } from "react-icons/io5";
import { RiNotificationFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiSettingsFill } from "react-icons/ri";
import { AlignJustify, CircleX, Info } from "lucide-react";
import { formatDate, isPast } from "date-fns";
import { Tooltip } from "@/components/shared/tooltip/tooltip";

export default function DoctorLayout() {
	const [user, setUser] = useAtom(userAtom);
	const [bannerAlert, setBannerAlert] = useState(false);
	const [bannerExpiredAlert, setBannerExpiredAlert] = useState(false);
	const [open, setIsOpen] = useState(false);
	const [notifications, setNotifications] = useAtom(notificationsAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.role !== Role.doctor && user.id !== 0) {
			return navigate("/dashboard", { replace: true });
		}

		if (user) {
			setBannerAlert(
				!user.boost && new Date(user.subscriptionEndDate) >= new Date()
			);
			setBannerExpiredAlert(isPast(user.subscriptionEndDate));
		}
	}, [user]);

	useEffect(() => {
		const options = {
			event: "INSERT",
			schema: "public",
			table: "notification",
		};

		const subscribe = db
			.channel("notification")
			// @ts-ignore
			.on("postgres_changes", options, (payload) => {
				if (payload.new.to === user.id) {
					setNotifications((notifications) => {
						return [
							{
								id: payload.new.id,
								name: payload.new.name,
								to: payload.new.to,
								from: payload.new.from,
								content: payload.new.content,
								title: payload.new.title,
								read: payload.new.read,
								createdAt: payload.new.created_at,
								updatedAt: payload.new.updated_at,
							},
							...notifications,
						];
					});

					if (payload.new.title === "Account Verified") {
						setUser((u) => ({ ...u, status: Status.verified }));
					}
				}
			})
			.subscribe();

		return () => {
			subscribe.unsubscribe();
		};
	}, []);

	const unread = notifications.filter((notif) => !notif.read).length;

	const FreeAccess = () => (
		<Alert className="w-[98%] bg-yellow-200 border-none mt-5 mx-auto flex justify-between items-center">
			<div className="flex space-x-3 items-center">
				<Info className="h-6 w-6" />
				<div className="flex flex-col">
					<AlertTitle>Reminder !</AlertTitle>
					<AlertDescription>
						Your free subscription will expire on{" "}
						{formatDate(user.subscriptionEndDate, "PP")}
					</AlertDescription>
				</div>
			</div>
			<Button onClick={() => setBannerAlert(false)} variant="ghost" size="icon">
				<CircleX className="h-5 w-5" />
			</Button>
		</Alert>
	);

	const AlertAccess = () => (
		<Alert className="w-[98%] bg-yellow-200 border-none mt-5 mx-auto flex justify-between items-center">
			<div className="flex space-x-3 items-center">
				<Info className="h-6 w-6" />
				<div className="flex flex-col">
					<AlertTitle>Reminder !</AlertTitle>
					<AlertDescription>
						Your {!user.boost && "free "}subscription has already <b>expired</b>{" "}
						last {formatDate(user.subscriptionEndDate, "PP")}. To keep your
						clinic visible to patients, please{" "}
						<Tooltip
							side="bottom"
							tooltip="Renew your subscription by clicking here"
							delayDuration={300}>
							<span className="font-bold hover:underline hover:cursor-pointer">
								renew
							</span>
						</Tooltip>{" "}
						your subscription.
					</AlertDescription>
				</div>
			</div>
			<Button
				onClick={() => setBannerExpiredAlert(false)}
				variant="ghost"
				size="icon">
				<CircleX className="h-5 w-5" />
			</Button>
		</Alert>
	);

	return (
		<>
			{bannerAlert && <FreeAccess />}
			{bannerExpiredAlert && <AlertAccess />}
			<div className="p-2 min-h-screen sm:p-5 items-center lg:items-start lg:max-h-min     lg:space-x-5 flex">
				<aside className="hidden lg:block  lg:w-3/12 xl:w-2/12 overflow-hidden  bg-[#BCF0F9] rounded-xl">
					<div className="space-y-2">
						<h1 className="font-extrabold  py-3 pl-10 text-2xl">
							Account Settings
						</h1>

						<Separator className="bg-white w-[200%] h-0.5 -translate-x-24" />
						{/* <Separator className="bg-white w-[200%]   -translate-x-24" /> */}
						<NavLink
							to="/"
							className={({ isActive }) =>
								`flex space-x-5 items-center text-gray-600 transition-all  px-10 py-2 ${
									isActive && "font-bold text-gray-900"
								}`
							}>
							<IoHome className="" />
							<p>Home</p>
						</NavLink>
						<Separator className="bg-white w-[200%] h-0.5 -translate-x-24" />
						<NavLink
							to="/profile"
							className={({ isActive }) =>
								`flex space-x-5 items-center text-gray-600 transition-all  px-10 py-2 ${
									isActive && "font-bold text-gray-900"
								}`
							}>
							<FaUserAlt className="" />
							<p>Profile Settings</p>
						</NavLink>

						<Separator className="bg-white w-[200%] h-0.5 -translate-x-24" />
						<NavLink
							to="password"
							className={({ isActive }) =>
								`flex space-x-5 items-center text-gray-600 transition-all px-10 py-2 ${
									isActive && "font-bold text-gray-900"
								}`
							}>
							<RiLockPasswordFill className="" />
							<p>Password</p>
						</NavLink>

						<Separator className="bg-white w-[200%] h-0.5 -translate-x-24" />
						<NavLink
							to="notification"
							className={({ isActive }) =>
								`flex space-x-5 relative items-center text-gray-600 transition-all px-10 py-2 ${
									isActive && "font-bold text-gray-900"
								}`
							}>
							<RiNotificationFill className="" />
							<p>
								Notification
								{unread > 0 && (
									<span className="p-1 ml-2 rounded-full  bg-destructive text-white px-2 text-xs ">
										{unread}
									</span>
								)}
							</p>
						</NavLink>

						<Separator className="bg-white w-[200%] h-0.5 -translate-x-24" />
						<NavLink
							to="dental-setting"
							className={({ isActive }) =>
								`flex space-x-5 items-center  transition-all  px-10 py-2 ${
									isActive
										? "font-bold text-gray-900 odd:fill-gray-900"
										: "text-gray-600 first:fill-gray-600"
								}`
							}>
							<RiSettingsFill />
							<p>Dental Settings</p>
						</NavLink>

						<Separator className="bg-white w-[200%] h-0.5 -translate-x-24" />
						<NavLink
							to="logout"
							className={({ isActive }) =>
								`flex space-x-5 pb-[1rem] items-center  px-10 transition-all  py-2 ${
									isActive ? "font-bold text-red-600" : "text-gray-600"
								}`
							}>
							<IoLogOut className="" />
							<p>Logout</p>
						</NavLink>
					</div>
				</aside>
				<main className="relative w-full mx-auto   lg:w-9/12 xl:w-10/12 bg-[#BCF0F9] border-t border-[#BCF0F9] p-2 sm:p-5 rounded-2xl   shadow-xl   overflow-y-scroll  scrollbar-hide max-h-[95vh] min-h-[95vh] ">
					<Button
						onClick={() => setIsOpen(true)}
						variant="ghost"
						size="icon"
						className="z-[999] fixed block lg:hidden rounded-full  hover:bg-2 shadow-lg active:scale-90 transition-all duration-300 bg-1 ">
						<AlignJustify className="mx-auto stroke-[#BCF0F9]" />
					</Button>
					<Outlet />
					<DoctorDrawer
						unread={unread}
						open={open}
						handleClose={() => setIsOpen(false)}
					/>
				</main>
			</div>
		</>
	);
}

const DoctorDrawer = ({
	handleClose,
	open,
	unread,
}: {
	unread: number;
	open: boolean;
	handleClose: () => void;
}) => {
	return (
		<Sheet open={open}>
			<SheetContent
				closeSheet={handleClose}
				side="left"
				className="bg-1 overflow-hidden z-[9999] ">
				<SheetHeader>
					<SheetTitle>
						<LogoWithText />
					</SheetTitle>
				</SheetHeader>
				<div className="p-4">
					<div className="space-y-2 ">
						<Separator className="bg-white w-[200%]  -translate-x-24" />
						<h1 className="font-bold   text-lg py-2">Account Settings</h1>
						<NavLink
							onClick={handleClose}
							to="/"
							className={({ isActive }) =>
								`flex space-x-5 items-center text-gray-600 transition-all py-2 ${
									isActive && "font-bold text-gray-900"
								}`
							}>
							<IoHome className="" />
							<p>Home</p>
						</NavLink>
						<NavLink
							onClick={handleClose}
							to="/profile"
							className={({ isActive }) =>
								`flex space-x-5 items-center text-gray-600 transition-all py-2 ${
									isActive && "font-bold text-gray-900"
								}`
							}>
							<FaUserAlt className="" />
							<p>Profile Settings</p>
						</NavLink>
						{/* <Separator className="bg-white w-[200%]   -translate-x-24" /> */}
						<NavLink
							onClick={handleClose}
							to="password"
							className={({ isActive }) =>
								`flex space-x-5 items-center text-gray-600 transition-all  py-2 ${
									isActive && "font-bold text-gray-900"
								}`
							}>
							<RiLockPasswordFill className="" />
							<p>Password</p>
						</NavLink>

						{/* <Separator className="bg-white w-[200%]   -translate-x-24" /> */}
						<NavLink
							onClick={handleClose}
							to="notification"
							className={({ isActive }) =>
								`flex relative space-x-5 items-center text-gray-600 transition-all  py-2 ${
									isActive && "font-bold  text-gray-900"
								}`
							}>
							<RiNotificationFill className="" />
							<p>Notification</p>
							{unread > 0 && (
								<span className="p-1 rounded-full  bg-destructive text-white px-2 text-xs ">
									{unread}
								</span>
							)}
						</NavLink>

						{/* {/* <Separator className="bg-white w-[200%]   -translate-x-24" /> */}
						<NavLink
							onClick={handleClose}
							to="dental-setting"
							className={({ isActive }) =>
								`flex space-x-5 items-center  transition-all  py-2 ${
									isActive
										? "font-bold text-gray-900 odd:fill-gray-900"
										: "text-gray-600 first:fill-gray-600"
								}`
							}>
							<RiSettingsFill />
							<p>Dental Settings</p>
						</NavLink>

						{/* <Separator className="bg-white w-[200%]   -translate-x-24" /> */}
						<div className="absolute bottom-0">
							<NavLink
								onClick={handleClose}
								to="logout"
								className={({ isActive }) =>
									`flex space-x-5 pb-[1rem] items-center  transition-all  py-2 ${
										isActive ? "font-bold text-red-600" : "text-gray-600"
									}`
								}>
								<IoLogOut className="" />
								<p>Logout</p>
							</NavLink>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
