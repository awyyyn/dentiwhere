import { useState } from "react";
import { useSetAtom } from "jotai";

/* UTILS */
import { db } from "@/utils/supabase";

/* STATES */
import { userAtom, userAtomDefaultValue } from "@/atoms";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import LogoWithText from "@/components/shared/logo-with-text/logo-with-text";

/* ASSETS */
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function Logout() {
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
		<section className="relative">
			<div className="px-10 relative grid gap-y-5 lg:grid-cols-4 mt-8 lg:mt-10 lg:gap-y-0 divide-y-reverse ">
				<div className="col-span-4 sm:justify-self-end order-1 justify-self-center lg:order-2  ">
					<LogoWithText />
				</div>
			</div>
			<div className="absolute h-full flex flex-col w-full  space-y-5 justify-center items-center lg:-mt-14 md:mt-0">
				<h1 className="text-3xl text-center">
					Are you sure you want to log out?
				</h1>
				<div className="flex space-x-4">
					<Button
						disabled={loading}
						className="rounded-3xl py-6 px-8"
						onClick={handleLogout}>
						{loading ? (
							<>
								<ImSpinner2 className="animate-spin mr-2" />
								<span>Logging out...</span>
							</>
						) : (
							"Yes"
						)}
					</Button>
					<Button disabled={loading} className="rounded-3xl py-6 px-8">
						No
					</Button>
				</div>
			</div>
		</section>
	);
}
