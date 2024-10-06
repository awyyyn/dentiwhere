import { createLink } from "@/actions";
import { userAtom } from "@/atoms";
import { Subscription } from "@/types/types";
import { useAtomValue } from "jotai";

export default function SubscriptionCard(sub: Subscription) {
	const user = useAtomValue(userAtom);

	const handleClick = async () => {
		const response = await createLink(
			{
				biller: {
					email: user.email,
					name: `${user.firstName} ${user.lastName}`,
					phone: user.contacts[0].slice(1),
				},
				amount: parseInt(`${sub.price}00`),
				name: sub.name,
				description: sub.description ?? "Subscribe to a plan",
			},
			sub.id,
			sub.name
		);

		localStorage.setItem("subId", sub.id.toString());
		window.location.replace(response.data.attributes.checkout_url);
	};

	return (
		<div
			key={sub.id}
			className="p-6 bg-white/60 justify-between rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center">
			<div>
				<h1 className="font-semibold text-xl mb-2">{sub.name}</h1>
				<p className="text-gray-700 mb-4">{sub.description}</p>
				<p className="text-emerald-600 font-bold text-lg mb-2">
					{new Intl.NumberFormat("en-PH", {
						style: "currency",
						currency: "PHP",
					}).format(sub.price)}
				</p>
				<p className="text-gray-500">
					{sub.months === 12
						? "1 year"
						: `${sub.months} month${sub.months > 1 ? "s" : ""}`}
				</p>
			</div>{" "}
			<button
				onClick={handleClick}
				// disabled={user.subscribe === sub.id}
				className="mr-4 disabled:bg-emerald-100 disabled:text-black bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
				Subscribe
			</button>
		</div>
	);
}
