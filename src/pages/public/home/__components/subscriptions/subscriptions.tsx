import { useEffect } from "react";
import { useAtom } from "jotai";

/* ACTIONS */
import { getAllSubscriptions } from "@/actions";

/* STATES */
import { subscriptionsAtom } from "@/atoms";
import SectionHeader from "../section-header/section-header";

export default function Subscriptions() {
	const [subscriptions, setSubscriptions] = useAtom(subscriptionsAtom);

	useEffect(() => {
		(async () => {
			try {
				const response = await getAllSubscriptions();
				setSubscriptions(response);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	return (
		<section className="w-full">
			<div className="mx-auto  w-11/12 md:w-10/12 py-10 space-y-5 md:space-y-10">
				<SectionHeader
					title="Subscriptions"
					description="Easily access doctors offering these services"
					showButton
				/>
			</div>
		</section>
	);
}
