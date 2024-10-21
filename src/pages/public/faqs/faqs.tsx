/* COMPONENTS */
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "../home/__components/section-header/section-header";
import Back from "../__components/back/back";
import { useTranslation } from "react-i18next";

export default function FAQs() {
	const { t } = useTranslation();
	// const faqs = [
	// 	{
	// 		question: "What is this platform about?",
	// 		answer:
	// 			"This platform helps patients find dental clinics and doctors near them. It offers features like map pinning, listing services, and common dental conditions. Dentists can register their clinics, allowing easy access for patients.",
	// 	},
	// 	{
	// 		question: "How can I find a dental clinic near me?",
	// 		answer:
	// 			"You can use the Inquire Now search bar to look for nearby dental clinics. The map also shows pinned locations of registered clinics for easy navigation.",
	// 	},
	// 	{
	// 		question: "Can I book an appointment online?",
	// 		answer:
	// 			"No, but the platform provides the website of the clinic where you can make an appointment.",
	// 	},
	// 	{
	// 		question: "How can a dentist register their clinic on this platform?",
	// 		answer:
	// 			"Dentists can create an account by clicking on the 'Create an Account' option. Once registered, they can list their clinic, making it visible on the map for patients to find easily.",
	// 	},
	// 	{
	// 		question: "What are the benefits of registering my clinic?",
	// 		answer:
	// 			"By registering your clinic, you can: Pin your clinic’s location on the map, making it easier for patients to find you. Showcase your services and conditions you specialize in.",
	// 	},
	// 	{
	// 		question: "Is there a subscription fee for dentists?",
	// 		answer:
	// 			"Yes, the platform offers a subscription model for clinics and doctors to manage their profiles, list services, and access other advanced features.",
	// 	},
	// 	{
	// 		question: "What dental conditions and services are covered?",
	// 		answer:
	// 			"Patients can search for clinics that offer treatments for common dental conditions such as: Diastema Malocclusion Tooth decay And services like: Tooth extraction Root canal Full dentures",
	// 	},
	// 	{
	// 		question: "How do I get help if I face any issues?",
	// 		answer:
	// 			"You can click on the 'Need Help?' button at the top of the page for assistance or contact us directly through our support email.",
	// 	},
	// 	{
	// 		question: "What is the QR code used for?",
	// 		answer:
	// 			"The QR code allows for a seamless user experience. Scan it to access the platform quickly on your mobile device.",
	// 	},
	// ];

	const faqs = [
		{
			question: t("question1"),
			answer: t("answer1"),
		},
		{
			question: t("question2"),
			answer: t("answer2"),
		},
		{
			question: t("question3"),
			answer: t("answer3"),
		},
		{
			question: t("question4"),
			answer: t("answer4"),
		},
		{
			question: t("question5"),
			answer: t("answer5"),
		},
		{
			question: t("question6"),
			answer: t("answer6"),
		},
		{
			question: t("question7"),
			answer: t("answer7"),
		},
		{
			question: t("question8"),
			answer: t("answer8"),
		},
		{
			question: t("question9"),
			answer: t("answer9"),
		},
	];

	return (
		<div className="py-5">
			<Back />
			<div className="w-11/12 mx-auto md:w-10/12 space-y-10">
				<header className="space-y-7">
					<SectionHeader title={t("faqs")} description="" />
				</header>
				<main>
					<Accordion
						type="single"
						collapsible
						className="w-full bg-white/30 p-2 shadow-lg rounded-md">
						{faqs.map((faq) => (
							<AccordionItem value={faq.question}>
								<AccordionTrigger className="text-xl">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-lg">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</main>
			</div>
		</div>
	);
}
