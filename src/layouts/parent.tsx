import { getOneByAuthID } from "@/actions/user";
import { userAtom, userAtomDefaultValue } from "@/atoms/user-atom";
import { Loader } from "@/components/shared/loader/loader";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/utils/supabase";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Parent() {
	const setUser = useSetAtom(userAtom);
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data, error } = await db.auth.getSession();

				if (error) throw new Error(error.message);

				if (data && data.session === null) throw new Error("No session found");

				const user = await getOneByAuthID(data.session?.user.id);

				if (user === null) throw new Error("No user found");

				setUser(user);
				if (
					location.pathname === "/login" ||
					location.pathname === "/sign-up"
				) {
					navigate("/", { replace: true });
				}
				setLoading(false);
			} catch {
				setLoading(false);
				await db.auth.signOut();
				setUser(userAtomDefaultValue);
				if (location.pathname !== "/") {
					navigate("/login", { replace: true });
				}
				localStorage.clear();
			}
		})();
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="bg-red-200 sm:bg-red-600 md:bg-yellow-300 lg:bg-1 xl:bg-orange-400">
			<Outlet />
			<Toaster />
		</div>
	);
}
