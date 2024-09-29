import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { AsyncImage } from "loadable-image";

/* UTILS */
import { db } from "@/utils/supabase";

/* STATES */
import { userAtom, notificationsAtom } from "@/atoms";

/* COMPONENTS */
import { Tooltip } from "@/components/shared/tooltip/tooltip";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/navbar/navbar";

/* ASSETS */
import { Hospital, LayoutDashboard, Users } from "lucide-react";
import Logo from "@/assets/svgs/logo with text.svg";

/* TYPES */
import { Role } from "@/types/types";

export default function AdminLayout() {
	const user = useAtomValue(userAtom);
	const setNotifications = useSetAtom(notificationsAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.role === Role.doctor) {
			return navigate("/profile", { replace: true });
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

	return (
		<div className="bg-s w-full flex  ">
			<aside className="fixed w-2/12 z-50 bg-1/20 h-screen py-5 lg:py-14">
				<div className="space-y-5">
					<Tooltip tooltip="Dentiwhere">
						<AsyncImage
							src={Logo}
							alt="Dentiwhere logo"
							className="md:max-w-32 px-2 md:px-0 lg:max-w-40 mx-auto"
						/>
					</Tooltip>
					{/* <Button variant="ghost" className=" ">
						Dentiwhere
					</Button> */}

					<nav className="space-y-2">
						<NavLink
							to="/"
							className={({ isActive }) =>
								`flex w-full border-r-4  group transition-all ${
									isActive
										? "border-black bg-1/20"
										: "border-transparent hover:border-black"
								}`
							}>
							<Tooltip tooltip="Home">
								<Button
									variant="ghost"
									className=" md:justify-start lg:px-5 xl:px-10 transition-all duration-300 group-hover:bg-1/20  w-full py-6 rounded-none">
									<Users className="max-w-10 min-w-10 ml-2 md:ml-0  " />
									<p className="hidden md:block md:ml-2 lg:ml-4 xl:ml-8">
										Home
									</p>
								</Button>
							</Tooltip>
						</NavLink>
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
			<main className="min-h-screen  pb-10 ml-[16.666667%] pt-16 px-1 w-full max-h-screen overflow-y-scroll md:w-10/12 lg:w-10/12  scrollbar-hide">
				<Navbar />
				<Outlet />
			</main>
		</div>
	);
}
