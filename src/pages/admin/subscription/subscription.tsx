import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";

/* ACTIONS */
import { getAllSubscriptions } from "@/actions";

/* STATES */
import { subscriptionsAtom } from "@/atoms";

/* COMPONENTS */
import SubscriptionTable from "../__components/subscription-table";

/* ASSETS */
import { ImSpinner2 } from "react-icons/im";
import { useTranslation } from "react-i18next";

export default function Subscription() {
	const setSubscriptions = useSetAtom(subscriptionsAtom);
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		const fetchClinics = async () => {
			try {
				setLoading(true);
				const data = await getAllSubscriptions();
				setSubscriptions(data);
				setLoading(false);
			} catch {
				setLoading(false);
			}
		};

		fetchClinics();
	}, []);

	return (
		<div className="p-2 md:p-5 lg:p-10 xl:p-14   space-y-5">
			<section className="md:space-y-2">
				<h1 className="text-2xl lg:text-5xl font-bold">Subscriptions</h1>
				<p className="text-gray-600 md:text-lg">{t("manageSubscription")}</p>
				{loading ? (
					<div className="w-full p-2 h-[50vh] flex justify-center items-center flex-col bg-white rounded-lg shadow-xl">
						<ImSpinner2 className="animate-spin" size={50} />
						<h1>Fetching Data</h1>
					</div>
				) : (
					<SubscriptionTable />
				)}
			</section>
		</div>
	);
}
