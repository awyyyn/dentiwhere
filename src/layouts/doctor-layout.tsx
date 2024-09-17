import { NavLink, Outlet } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { IoLogOut } from "react-icons/io5";
import { RiNotificationFill } from "react-icons/ri";
import { RiSettingsFill } from "react-icons/ri";

export default function DoctorLayout() {
	return (
		<div className="p-2 h-screen  sm:p-5 items-center lg:items-start lg:max-h-min  lg:p-10 lg:pb-5 lg:space-x-5 flex">
			<aside className="hidden lg:block  lg:w-3/12 xl:w-2/12 overflow-hidden bg-[#BCF0F9] rounded-xl">
				<div className="space-y-2">
					<h1 className="font-extrabold  py-3 pl-10 text-2xl">
						Account Settings
					</h1>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<NavLink
						to="/profile"
						className={({ isActive }) =>
							`flex space-x-5 items-center text-gray-600 transition-all  pl-10 py-2 ${
								isActive && "font-bold text-gray-900"
							}`
						}>
						<FaUserAlt className="" />
						<p>Profile Settings</p>
					</NavLink>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<NavLink
						to="password"
						className={({ isActive }) =>
							`flex space-x-5 items-center text-gray-600 transition-all  pl-10 py-2 ${
								isActive && "font-bold text-gray-900"
							}`
						}>
						<RiLockPasswordFill className="" />
						<p>Password</p>
					</NavLink>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<NavLink
						to="notification"
						className={({ isActive }) =>
							`flex space-x-5 items-center text-gray-600 transition-all  pl-10 py-2 ${
								isActive && "font-bold text-gray-900"
							}`
						}>
						<RiNotificationFill className="" />
						<p>Notification</p>
					</NavLink>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<NavLink
						to="dental-setting"
						className={({ isActive }) =>
							`flex space-x-5 items-center  transition-all  pl-10 py-2 ${
								isActive
									? "font-bold text-gray-900 odd:fill-gray-900"
									: "text-gray-600 first:fill-gray-600"
							}`
						}>
						<RiSettingsFill />
						<p>Dental Settings</p>
					</NavLink>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<NavLink
						to="logout"
						className={({ isActive }) =>
							`flex space-x-5 pb-[1rem] items-center  transition-all  pl-10 py-2 ${
								isActive ? "font-bold text-red-600" : "text-gray-600"
							}`
						}>
						<IoLogOut className="" />
						<p>Logout</p>
					</NavLink>
				</div>
			</aside>
			<main className="w-full mx-auto  lg:w-9/12 xl:w-10/12 bg-[#BCF0F9] p-5 rounded-2xl lg:max-h-[90vh] max-h-[95vh] shadow-xl lg:min-h-[90vh] min-h-[95vh]  overflow-y-scroll  scrollbar-hide">
				<Outlet />
			</main>
		</div>
	);
}
