import { getAllSubscriptions } from "@/actions";
import { subscriptionsAtom, userAtom } from "@/atoms";
import SubscriptionCard from "@/components/shared/subscription-card/subscription-card";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export default function ManageSubscription() {
	const user = useAtomValue(userAtom);
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
		<div className="sm:mr-5 sm:ml-2 ">
			<h1 className="mb-5 text-xl lg:text-3xl ">Subscription</h1>
			<div className="w-full mb-10 p-2 space-y-5  ">
				{subscriptions.map((sub) => (
					<SubscriptionCard key={sub.id} {...sub} user={user} />
				))}
			</div>
		</div>
	);
}
