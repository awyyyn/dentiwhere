import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { IoHome, IoLogOut } from "react-icons/io5";
import { RiNotificationFill } from "react-icons/ri";
import { RiSettingsFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import LogoWithText from "@/components/shared/logo-with-text/logo-with-text";
import { useAtomValue, useAtom } from "jotai";
import { userAtom } from "@/atoms/user-atom";
import { Role } from "@/types/types";
import { db } from "@/utils/supabase";
import { notificationsAtom } from "@/atoms/notification-atom";

export default function DoctorLayout() {
	const user = useAtomValue(userAtom);
	const [open, setIsOpen] = useState(false);
	const [notifications, setNotifications] = useAtom(notificationsAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.role !== Role.doctor && user.id !== 0) {
			return navigate("/dashboard", { replace: true });
		}
	}, []);

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
				}
			})
			.subscribe();

		return () => {
			subscribe.unsubscribe();
		};
	}, []);

	const unread = notifications.filter((notif) => !notif.read).length;

	return (
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
