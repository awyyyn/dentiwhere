import { createLink } from "@/actions";
import { userAtom } from "@/atoms";
import { Subscription, User } from "@/types/types";
import { formatDate } from "date-fns";
import { useAtomValue } from "jotai";
import { isUndefined } from "lodash";

/* COMPONENTS */
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SubscriptionCard(sub: Subscription & { user?: User }) {
	const user = useAtomValue(userAtom);
	const [alert, setAlert] = useState(false);

	const handlePayment = async () => {
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

	const handleClick = () => {
		if (isUndefined(sub.user)) {
			handlePayment();
		} else {
			setAlert(true);
		}
	};

	return (
		<div
			key={sub.id}
			className="p-6 bg-white/60 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ">
			<div className="flex items-center justify-between ">
				<div>
					<h1 className="font-semibold text-xl mb-2">{sub.name}</h1>
					<p className="text-gray-700 mb-4">{sub.description}</p>
					<p className="text-emerald-600 font-bold text-lg mb-2">
						{sub.id === 8
							? " "
							: new Intl.NumberFormat("en-PH", {
									style: "currency",
									currency: "PHP",
							  }).format(sub.price)}
					</p>
				</div>

				{!isUndefined(sub?.user) && sub.user.subscribe === sub.id ? (
					<Button
						disabled
						className="   disabled:bg-emerald-100 disabled:text-black bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
						Active
					</Button>
				) : (
					<Button
						onClick={handleClick}
						// disabled={user.subscribe === sub.id}
						className="  disabled:bg-emerald-100 disabled:text-black bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
						Subscribe
					</Button>
				)}
			</div>
			<div className="flex justify-between w-full">
				<p className="text-gray-500">
					{sub.months === 12
						? "1 year"
						: `${sub.months} month${sub.months > 1 ? "s" : ""}`}
				</p>
				{!isUndefined(sub?.user) && sub.user.subscribe === sub.id && (
					<p className="">
						Please note that your subscription will expire on{" "}
						{formatDate(user.subscriptionEndDate, "MMM d, yyyy")}
					</p>
				)}
			</div>
			<Alert
				handlePayment={handlePayment}
				handelClose={() => setAlert(false)}
				isOpen={alert}
			/>
		</div>
	);
}

const Alert = ({
	isOpen,
	handelClose,
	handlePayment,
}: {
	isOpen: boolean;
	handelClose: VoidFunction;
	handlePayment: VoidFunction;
}) => {
	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to change subscription?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Please note that if you proceed with changing subscription, your
						current active subscription will be replaced. This action is
						irreversible.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handelClose}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handlePayment}
						className="bg-1 hover:bg-2 text-black">
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
