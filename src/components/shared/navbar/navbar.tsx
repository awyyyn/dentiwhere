import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* UTILS */
import { db } from "@/utils/supabase";

/* STATES */
import { userAtom, userAtomDefaultValue } from "@/atoms";

/* ASSETS */
import { ImSpinner2 } from "react-icons/im";

/* COMPONENTS */ import { Button } from "@/components/ui/button";
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
	DialogClose,
} from "@/components/ui/dialog";
import LangToggle from "../lang-toggle/lang-toggle";
import { useTranslation } from "react-i18next";

export default function Navbar() {
	const setUser = useSetAtom(userAtom);
	const navigate = useNavigate();
	const { t } = useTranslation();
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
					<div className="space-x-3 py-3 px-2 md:w-10/12 lg:md:w-9/12 mx-auto flex flex-row items-center justify-end">
						<LangToggle />
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
										{t("logoutConfirmation")}
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											disabled={loading}
											className="bg-emerald-500 hover:bg-emerald-600">
											{t("cancel")}
										</Button>
									</DialogClose>
									<Button
										disabled={loading}
										onClick={handleLogout}
										variant="destructive">
										{loading ? (
											<>
												<ImSpinner2 className="animate-spin mr-2" />
												<span>{t("loggingOut")}</span>
											</>
										) : (
											t("logOut")
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
