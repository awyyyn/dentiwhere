import { Link, Outlet } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { IoLogOut } from "react-icons/io5";

export default function DoctorLayout() {
	return (
		<div className="p-2 h-screen  sm:p-5 items-center lg:items-start lg:max-h-min  lg:p-10 lg:pb-5 lg:space-x-5 flex">
			<aside className="hidden lg:block  lg:w-3/12 xl:w-2/12 overflow-hidden bg-[#BCF0F9] rounded-xl">
				<div className="space-y-2">
					<h1 className="font-extrabold  py-3 pl-10 text-2xl">
						Account Settings
					</h1>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<Link to="/" className="flex space-x-5 items-center pl-10 py-2 ">
						<FaUserAlt className="" />
						<p>Profile Settings</p>
					</Link>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<Link
						to="password"
						className="flex space-x-5 items-center pl-10 py-2 ">
						<RiLockPasswordFill className="" />
						<p>Password</p>
					</Link>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<Link to="/" className="flex space-x-5 items-center pl-10 py-2 ">
						<FaUserAlt className="" />
						<p>Notification</p>
					</Link>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<Link to="/" className="flex space-x-5 items-center pl-10 py-2 ">
						<FaUserAlt className="" />
						<p>Dental Settings</p>
					</Link>
					<Separator className="bg-white w-[200%] -translate-x-52 h-0.5" />
					<Link to="logout" className="flex space-x-5 items-center pl-10 py-2 ">
						<IoLogOut className="" />
						<p>Logout</p>
					</Link>
				</div>
			</aside>
			<main className="w-full mx-auto  lg:w-9/12 xl:w-10/12 bg-[#BCF0F9] p-5 rounded-2xl lg:max-h-[90vh] max-h-[95vh] shadow-xl lg:min-h-[90vh] min-h-[95vh]  overflow-y-scroll  scrollbar-hide">
				<Outlet />
			</main>
		</div>
	);
}
