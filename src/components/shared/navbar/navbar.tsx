import { Button } from "@/components/ui/button";
import LogoutButton from "../logout-button/logout-button";
import Notification from "../notification/notification";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { userAtom, userAtomDefaultValue } from "@/atoms/user-atom";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { db } from "@/utils/supabase";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function Navbar() {
	const setUser = useSetAtom(userAtom);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		await db.auth.signOut();
		setUser(userAtomDefaultValue);
		localStorage.clear();
		setLoading(false);
		navigate("/login", { replace: true });
	};

	return (
		<>
			<header className=" right-0 fixed top-0   z-10  ">
				<nav className="pl-6 bg-white shadow-lg rounded-bl-2xl">
					<div className="space-x-3 py-3 px-2 md:w-10/12 lg:md:w-9/12 mx-auto flex flex-row justify-end">
						<Notification />

						<Dialog>
							<DialogTrigger asChild>
								<LogoutButton
									showLabel={false}
									className="flex justify-center text-center"
								/>
							</DialogTrigger>
							<DialogContent removeClose className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Logout</DialogTitle>
									<DialogDescription>
										Are you sure you want to log out?
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											disabled={loading}
											className="bg-emerald-500 hover:bg-emerald-600">
											Cancel
										</Button>
									</DialogClose>
									<Button
										disabled={loading}
										onClick={handleLogout}
										variant="destructive">
										{loading ? (
											<>
												<ImSpinner2 className="animate-spin mr-2" />
												<span>Logging out...</span>
											</>
										) : (
											"Logout"
										)}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</nav>
			</header>
		</>
	);
}
