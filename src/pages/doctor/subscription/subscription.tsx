import { useEffect } from "react";
import { useAtom } from "jotai";

/* ACTIONS */
import {
	getAllSubscriptions,
	createLink,
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

/* ASSETS */

export default function Subscribe() {
	const [subscriptions, setSubscriptions] = useAtom(subscriptionsAtom);
	const navigate = useNavigate();
	const [user, setUser] = useAtom(userAtom);
	const [sParams, setSParams] = useSearchParams();

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
							subscriptions.map((sub) => {
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
										sub.id
									);

									localStorage.setItem("subId", sub.id.toString());
									window.location.replace(
										response.data.attributes.checkout_url
									);
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
							})}
					</div>
				</div>

				<div className=" order-1 justify-self-center lg:order-2  ">
					<LogoWithText />
				</div>
			</div>
		</section>
	);
}
