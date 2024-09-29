import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useSetAtom } from "jotai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

/* UTILS */
import { db } from "@/utils/supabase";

/* ACTIONS */
import { visit, getClinicByDoctor, getOneByAuthID } from "@/actions";

/* LIB */
import { randomName } from "@/lib/chance";

/* STATES */
import {
	servicesAtom,
	userAtom,
	userAtomDefaultValue,
	notificationsAtom,
	clinicAtom,
	categoriesAtom,
	accessibilitiesAtom,
	amenitiesAtom,
} from "@/atoms";

/* TYPES */
import { Role } from "@/types/types";

/* COMPONENTS */
import { Loader } from "@/components/shared/loader/loader";
import { Toaster } from "@/components/ui/toaster";

export default function Parent() {
	const setUser = useSetAtom(userAtom);
	const setNotifications = useSetAtom(notificationsAtom);
	const setClinic = useSetAtom(clinicAtom);
	const setAccessibilities = useSetAtom(accessibilitiesAtom);
	const setAmenities = useSetAtom(amenitiesAtom);
	const setServices = useSetAtom(servicesAtom);
	const setCategories = useSetAtom(categoriesAtom);
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		(async () => {
			const token = localStorage.getItem(
				"sb-vojignvqrwihtgsjvqpq-auth-token"
			) as string;

			const parsedToken = JSON.parse(token ?? "{}");

			// if (localStorage.getItem("sb-vojignvqrwihtgsjvqpq-auth-token"))
			if (
				!isEmpty(parsedToken) &&
				!isEmpty(parsedToken.user) &&
				!isEmpty(parsedToken.user.id)
			) {
				try {
					setLoading(true);
					// const { data, error } = await db.auth.getSession();

					// if (error) throw new Error(error.message);

					// if (data && data.session === null)
					// 	throw new Error("No session found");

					const user = await getOneByAuthID(parsedToken.user.id);

					if (user === null) throw new Error("No user found");

					if (user.role === Role.doctor && user.clinicId !== 0) {
						const response = await getClinicByDoctor(user.id);
						setClinic(response);
						setCategories(response.categories ?? []);
						setServices(response.services ?? []);
						setAccessibilities(response.accesibilities ?? []);
						setAmenities(response.amenities ?? []);
					}

					localStorage.removeItem("name");
					localStorage.removeItem("uuid");
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
			} else {
				const uuid = localStorage.getItem("uuid");
				if (isEmpty(uuid)) {
					localStorage.setItem("uuid", v4());
					localStorage.setItem("name", randomName());
				}

				if (
					location.pathname !== "/" &&
					!location.pathname.startsWith("/clinics/view")
				) {
					navigate("/login", { replace: true });
				}
			}
		})();
	}, []);

	useEffect(() => {
		return () => {
			const token = localStorage.getItem("sb-vojignvqrwihtgsjvqpq-auth-token");
			(async () => {
				if (isEmpty(token)) {
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
