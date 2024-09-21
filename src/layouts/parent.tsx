import { visit } from "@/actions/auth";
import { getOneByAuthID } from "@/actions/user";
import { notificationsAtom } from "@/atoms/notification-atom";
import { userAtom, userAtomDefaultValue } from "@/atoms/user-atom";
import { Loader } from "@/components/shared/loader/loader";
import { Toaster } from "@/components/ui/toaster";
import { Role } from "@/types/types";
import { db } from "@/utils/supabase";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Parent() {
	const [user, setUser] = useAtom(userAtom);
	const setNotifications = useSetAtom(notificationsAtom);
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
				setNotifications(user.notifications ?? []);
				if (
					location.pathname === "/login" ||
					location.pathname === "/sign-up"
				) {
					navigate("/", { replace: true });
				}
				setLoading(false);
			} catch {
				setUser(userAtomDefaultValue);
				await db.auth.signOut();
				localStorage.clear();
				setLoading(false);
				if (
					location.pathname !== "/" &&
					!location.pathname.includes("clinics/view")
				) {
					navigate("/login", { replace: true });
				}
			}
		})();
	}, []);

	useEffect(() => {
		return () => {
			(async () => {
				if (
					user.role !== Role.doctor &&
					user.role !== Role.admin &&
					user.role !== Role.superAdmin
				) {
					const isMobile = Boolean((navigator as any).userAgentData.mobile);
					await visit(isMobile);
				}
			})();
		};
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="gradient-bg">
			<Outlet />
			<Toaster />
		</div>
	);
}
