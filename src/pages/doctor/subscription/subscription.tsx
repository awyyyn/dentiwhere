import { useEffect } from "react";
import { useAtom } from "jotai";

/* ACTIONS */
import {
	getAllSubscriptions,
	updateDoctorSubscription,
	getSubscription,
} from "@/actions";

/* STATES */
import { subscriptionsAtom, userAtom } from "@/atoms";

/* COMPONENTS */
import LogoWithText from "@/components/shared/logo-with-text/logo-with-text";
import { isPast } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isEmpty } from "lodash";
import SubscriptionCard from "@/components/shared/subscription-card/subscription-card";

/* ASSETS */

export default function Subscribe() {
	const [subscriptions, setSubscriptions] = useAtom(subscriptionsAtom);
	const navigate = useNavigate();
	const [user, setUser] = useAtom(userAtom);
	const [sParams] = useSearchParams();

	useEffect(() => {
		(async () => {
			if (sParams.size > 0) {
				console.log(sParams.get("id"), "asdas");
				const subId = sParams.get("id");
				if (
					sParams.get("status") === "success" &&
					!isEmpty(subId) &&
					typeof subId === "string"
				) {
					const subscription = await getSubscription(Number(subId));

					const d = await updateDoctorSubscription(
						Number(subId),
						Number(subscription.months),
						user.id
					);
					setUser(d);
				}
			} else {
				try {
					const response = await getAllSubscriptions();
					setSubscriptions(response.filter((r) => r.id !== 8));
				} catch (error) {
					console.error(error);
				}
			}
		})();
	}, [sParams]);

	const isExpired =
		(isPast(user.subscriptionEndDate) && !user.boost) ||
		isPast(user.subscriptionEndDate);

	const PaymentUI = () => {
		const isSuccess = sParams.get("status") === "success";

		const handlePostPayment = () => {
			if (isSuccess) navigate("/dental-setting");
			else navigate("/subscribe");
		};
		return (
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						{isSuccess ? (
							<CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
						) : (
							<XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
						)}
						{isSuccess ? "Thanks for Subscribing" : "Payment Unsuccessful"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-center text-muted-foreground">
						{isSuccess
							? "We appreciate your subscription. Enjoy our services and the exclusive features and benefits that come with your plan."
							: "We're sorry, but there was an issue processing your payment. Please try again or contact our support team for assistance."}
					</p>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button
						onClick={handlePostPayment}
						variant={isSuccess ? "default" : "destructive"}>
						{isSuccess ? "Go to Dental Settings" : "Try Again"}
					</Button>
				</CardFooter>
			</Card>
		);
	};

	return (
		<section>
			<div className="md:px-10 grid grid-cols-1 gap-y-5 lg:grid-cols-4 grid-flow-row mt-8 lg:mt-10 lg:gap-y-0 divide-y-reverse ">
				<div className="order-2 md:order-1 lg:col-span-3 space-y-5 lg:pra-32 xl:apr-40">
					{sParams.size > 0 ? (
						<>
							<PaymentUI />
							{/* <h1 className="font-extrabold text-3xl md:text-5xl tracking-wide">
								Thanks for Subscribing
							</h1>
							<p className="lg:max-w-2xl">
								We appreciate your subscription. Enjoy our services and the
								exclusive features and benefits that come with your plan.
							</p> */}
						</>
					) : (
						<>
							<h1 className="font-extrabold text-3xl md:text-5xl tracking-wide">
								Subscribe
							</h1>
							<p className="lg:max-w-2xl">
								Subscribe to one of our plans to continue enjoying our services.
								Choose the plan that best suits your needs and gain access to
								exclusive features and benefits.
							</p>
						</>
					)}
					<div className="space-y-5">
						{isExpired &&
							subscriptions.map((sub) => <SubscriptionCard {...sub} />)}
					</div>
				</div>

				<div className=" order-1 justify-self-center lg:order-2  ">
					<LogoWithText />
				</div>
			</div>
		</section>
	);
}
