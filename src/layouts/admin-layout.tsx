import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/user-atom";
import { Role } from "@/types/types";
import Logo from "@/assets/svgs/logo with text.svg";
import { Tooltip } from "@/pages/admin/__components/tooltip";
import { Button } from "@/components/ui/button";
import { Hospital, LayoutDashboard, Users } from "lucide-react";
import Navbar from "@/components/shared/navbar/navbar";

export default function AdminLayout() {
	const user = useAtomValue(userAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.role === Role.doctor) {
			return navigate("/profile", { replace: true });
		}
	}, []);

	return (
		<div className="bg-s w-full flex">
			<aside className="w-2/12 z-50 bg-1/20 h-screen py-5 lg:py-14">
				<div className="space-y-5">
					<Tooltip tooltip="Dentiwhere">
						<img
							src={Logo}
							alt="Dentiwhere logo"
							className="md:max-w-32 px-2 md:px-0 lg:max-w-40 mx-auto"
						/>
					</Tooltip>
					{/* <Button variant="ghost" className=" ">
						Dentiwhere
					</Button> */}

					<nav className="space-y-2">
						<div
							className="flex     w-full"
							onClick={() => navigate("/dashboard")}>
							<Tooltip tooltip="Dashboard">
								<Button
									variant="ghost"
									className=" md:justify-start lg:px-5 xl:px-10 transition-all duration-300   w-full border-r-4 border-transparent hover:border-black hover:bg-1/20 py-6 rounded-none">
									<LayoutDashboard className="max-w-10 min-w-10 ml-2 md:ml-0  " />
									<p className="hidden md:block md:ml-2 lg:ml-4 xl:ml-8">
										Dashboard
									</p>
								</Button>
							</Tooltip>
						</div>
						<NavLink
							to="doctors"
							className={({ isActive }) =>
								`flex w-full border-r-4  group transition-all ${
									isActive
										? "border-black bg-1/20"
										: "border-transparent hover:border-black"
								}`
							}>
							<Tooltip tooltip="Doctors">
								<Button
									variant="ghost"
									className=" md:justify-start lg:px-5 xl:px-10 transition-all duration-300 group-hover:bg-1/20  w-full py-6 rounded-none">
									<Users className="max-w-10 min-w-10 ml-2 md:ml-0  " />
									<p className="hidden md:block md:ml-2 lg:ml-4 xl:ml-8">
										Doctors
									</p>
								</Button>
							</Tooltip>
						</NavLink>
						<div className="  w-full" onClick={() => navigate("clinics")}>
							<Tooltip tooltip="Clinics">
								<Button
									variant="ghost"
									className="  md:justify-start   lg:px-5 xl:px-10 transition-all duration-300   w-full border-r-4 border-transparent hover:border-black hover:bg-1/20 py-6 rounded-none">
									<Hospital className="max-w-10 min-w-10 ml-2 md:ml-0   " />
									<p className="hidden md:block md:ml-2 lg:ml-4 xl:ml-8">
										Clinics
									</p>
								</Button>
							</Tooltip>
						</div>
					</nav>
				</div>
			</aside>
			<main className="mt-16 px-1 w-full max-h-screen overflow-y-scroll md:w-10/12 lg:w-10/12  scrollbar-hide">
				<Navbar />
				<Outlet />
			</main>
		</div>
	);
}
