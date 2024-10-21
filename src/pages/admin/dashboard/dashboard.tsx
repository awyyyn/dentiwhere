import { lazy, Suspense } from "react";
import { useAtomValue } from "jotai";

/* STATES */
import { loadableDashboardAtom } from "@/atoms";

/* TYPES */
import { DashboardAtom } from "@/types/types";

/* COMPONENTS */
import { Loader } from "@/components/shared/loader/loader";
const ChartData = lazy(() => import("../__components/chart"));

/* ASSETS */
import { Hospital, UserCheck, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
	const loadableCounts = useAtomValue(loadableDashboardAtom);
	const { t } = useTranslation();
	const data =
		loadableCounts.state === "hasData"
			? loadableCounts.data
			: ({} as DashboardAtom);

	if (loadableCounts.state === "loading") {
		return <Loader />;
	}

	return (
		<div className="p-2 md:p-5 lg:p-10 xl:p-14   space-y-5">
			<section className="md:space-y-2">
				<h1 className="text-2xl lg:text-5xl font-bold">Dashboard</h1>
				<p className="text-gray-600 md:text-lg">{t("dashboardDescription")}</p>
			</section>
			<section className="grid grid-cols-1 md:grid-cols-3 gap-5">
				<div className="p-5 shadow-xl rounded-xl backdrop-blur-lg bg-white/50 space-y-1 md:space-y-2">
					<div className="flex justify-between">
						<h1 className="text-center">{t("totalDoctors")}</h1>
						<Users />
					</div>
					<h1 className=" text-5xl font-bold">{data.totalDoctors}</h1>
					<p className=" text-gray-500 text-sm">{t("registeredDoctors")}</p>
				</div>
				<div className="p-5 shadow-xl rounded-xl backdrop-blur-lg bg-white/50  space-y-1 md:space-y-2">
					<div className="flex justify-between">
						<h1 className="text-center">{t("clinics")}</h1>
						<Hospital />
					</div>
					<h1 className=" text-5xl font-bold">{data.totalClinics}</h1>
					<p className=" text-gray-500 text-sm">{t("registeredClinics")}</p>
				</div>
				<div className="p-5 shadow-xl rounded-xl backdrop-blur-lg bg-white/50  space-y-1 md:space-y-2">
					<div className="flex justify-between">
						<h1 className="text-center">{t("verifiedDoctors")}</h1>
						<UserCheck />
					</div>
					<h1 className=" text-5xl font-bold">
						{data.registeredDoctors}
						<span className="text-lg font-normal">/{data.totalDoctors}</span>
					</h1>
					<p className="text-gray-500 text-sm">
						{t("verifiedDoctorsInPlatform")}
					</p>
				</div>
			</section>
			<section>
				<Suspense fallback={<Loader />}>
					<ChartData />
				</Suspense>
			</section>
		</div>
	);
}
