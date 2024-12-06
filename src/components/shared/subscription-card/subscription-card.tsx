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
import { useTranslation } from "react-i18next";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SubscriptionCard(sub: Subscription & { user?: User }) {
	const user = useAtomValue(userAtom);
	const [alert, setAlert] = useState(false);
	const [acc, setAcc] = useState(false);
	const [showDialog, setDialog] = useState(false);
	const { t } = useTranslation();

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
						{t("active")}
					</Button>
				) : (
					<Button
						onClick={() => setDialog(true)}
						// disabled={user.subscribe === sub.id}
						className="  disabled:bg-emerald-100 disabled:text-black bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
						Subscribe
					</Button>
				)}
			</div>
			<div className="flex justify-between w-full">
				<div>
					<p className="text-gray-900 font-bold text-xl ">
						{sub.months === 12
							? "1 year"
							: `${sub.months} month${sub.months > 1 ? "s" : ""}`}
					</p>
					<p className="">- Clinic will be prioritize in suggested clinics</p>
					<p className="">- Clinic will be visible</p>
				</div>
				{!isUndefined(sub?.user) && sub.user.subscribe === sub.id && (
					<p className="">
						{t("subscriptionNote1")}{" "}
						{formatDate(user.subscriptionEndDate, "MMM d, yyyy")}
					</p>
				)}
			</div>
			<Alert
				handlePayment={handlePayment}
				handelClose={() => setAlert(false)}
				isOpen={alert}
			/>

			<Dialog open={showDialog}>
				<DialogContent className=" max-w-[525px] ">
					<DialogHeader>
						<DialogTitle>{t("termsAndConditions")}</DialogTitle>
						<DialogDescription>
							Welcome to Dentiwhere. By accessing or using our website, you
							agree to comply with and be bound by the following terms and
							conditions. Please read them carefully.
						</DialogDescription>
					</DialogHeader>
					<ScrollArea className="h-[400px] overscroll-y-auto">
						<p className="font-bold text-md">1. Acceptance of Terms</p>
						<p className="text-sm">
							- By subscribing to our service, you agree to be bound by these
							terms and conditions. If you do not agree, please refrain from
							subscribing.
						</p>
						<p className="font-bold text-md mt-2">
							2. Subscription Plans and Payment
						</p>
						<p className="text-sm">
							- Subscriptions are available on a [monthly/yearly] basis.
						</p>
						<p className="text-sm">
							- Payment is due at the beginning of each billing cycle.
						</p>
						<p className="text-sm">
							- You authorize us to charge your payment method on a recurring
							basis.
						</p>
						<p className="text-sm">
							- If payment is not received, we reserve the right to suspend or
							terminate your access.
						</p>
						<p className="font-bold text-md mt-2">3. Free Trial</p>
						<p className="text-sm">
							- We may offer a free trial period to new subscribers.
						</p>
						<p className="text-sm">
							- After the free trial ends, you will be charged according to the
							selected subscription plan unless you cancel before the trial
							ends.
						</p>
						<p className="font-bold text-md mt-2">
							4. Cancellation and Refunds
						</p>
						<p className="text-sm">
							- We do not provide refunds for any partial subscription period.
						</p>

						<p className="font-bold text-md mt-2">
							5. Modifications to Service or Subscription
						</p>
						<p className="text-sm">
							- We may update our services, pricing, or terms at any time.
						</p>
						<p className="text-sm">
							- Notice of significant changes will be provided, and continued
							use of the service indicates your acceptance of these updates.
						</p>
						<p className="font-bold text-md mt-2">6. Account Responsibility</p>
						<p className="text-sm">
							- You are responsible for maintaining the confidentiality of your
							account login information.
						</p>
						<p className="text-sm">
							- You are responsible for all activities that occur under your
							account.
						</p>
						<p className="font-bold text-md mt-2">
							7. License and Restrictions
						</p>
						<p className="text-sm">
							- Your subscription grants you a limited, non-exclusive,
							non-transferable license to access and use our service.
						</p>
						<p className="text-sm">
							- You agree not to share access, reverse engineer, or use our
							service for any unlawful purposes.
						</p>
						<p className="font-bold text-md mt-2">
							7. Disclaimer and Limitation of Liability
						</p>
						<p className="text-sm">
							- Our service is provided "as is" and without warranties of any
							kind.
						</p>
						<p className="text-sm">
							- We shall not be liable for any indirect, incidental, or
							consequential damages arising from your use of our service.
						</p>
						<p className="font-bold text-md mt-2">8. Contact Information</p>
						<p className="text-sm">
							- For any questions regarding these terms, please contact us at
							dentiwhere@gmail.com.
						</p>
						<p className="font-bold text-md mt-2">9. Contact Information</p>
						<p className="text-sm">
							- For any questions regarding these terms, please contact us at
							dentiwhere@gmail.com.
						</p>

						<p className="mt-4">
							By using Dentiwhere, you acknowledge that you have read and
							understood these Terms and Conditions and agree to be bound by
							them.
						</p>
						<div className="flex gap-2 my-4 items-center">
							<Checkbox
								id="terms"
								name="terms"
								value={Number(acc)}
								onCheckedChange={(v) => setAcc(Boolean(v))}
							/>
							<Label htmlFor="terms" className="text-sm">
								I have read and agree to the terms and conditions.
							</Label>
						</div>
						<Button
							onClick={handleClick}
							disabled={!acc}
							className="w-full bg-1 text-black">
							Continue
						</Button>
						<Button
							onClick={() => setDialog(false)}
							className="w-full mt-2 bg-destructive text-destructive-foreground">
							Cancel
						</Button>
					</ScrollArea>
				</DialogContent>
			</Dialog>
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
	const { t } = useTranslation();

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t("subscriptionTitle")}</AlertDialogTitle>
					<AlertDialogDescription>
						{t("subscriptionNote")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handelClose}>
						{t("cancel")}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handlePayment}
						className="bg-1 hover:bg-2 text-black">
						{t("confirm")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
