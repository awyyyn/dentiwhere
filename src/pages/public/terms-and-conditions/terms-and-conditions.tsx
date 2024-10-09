import SocialLinks from "@/components/shared/social-links/social-links";
import Back from "../__components/back/back";

export default function TermsAndConditions() {
	return (
		<div className="py-5">
			<Back />
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Terms and Conditions
				</h1>

				<div className="max-w-3xl mx-auto space-y-8">
					<section>
						<p className="text-lg">
							Welcome to Dentiwhere. By accessing or using our website, you
							agree to comply with and be bound by the following terms and
							conditions. Please read them carefully.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
						<p>
							These Terms and Conditions ("Terms") govern your use of
							Dentiwhere, a dental clinic directory service. By accessing or
							using our platform, you agree to comply with these Terms. If you
							do not agree, you should not use our platform.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">2. User Eligibility</h2>
						<p>
							You must be at least 18 years old to use our services. By using
							our platform, you represent that you meet this age requirement.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							3. Dentist Registration and Clinic Listings
						</h2>
						<p>
							Dentists may register an account to list their clinic on the
							platform. By registering, you agree to provide accurate and
							complete information and to keep your account details updated.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">4. Subscription</h2>
						<p>
							Our platform offers subscription-based services for clinics. By
							subscribing, you agree to the payment terms provided at the time
							of subscription. Subscription fees are non-refundable unless
							stated otherwise.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							5. Services Provided
						</h2>
						<p>
							Dentiwhere provides a platform for users to search for and inquire
							about dental clinics. We do not provide dental services directly
							and are not responsible for the quality of services provided by
							listed clinics.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
						<p>You agree not to:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Provide false information or create multiple accounts.</li>
							<li>
								Use the platform for any illegal activity or harm others in any
								way.
							</li>
							<li>
								Attempt to hack or exploit vulnerabilities in the platform.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							7. User Responsibilities
						</h2>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Users must provide accurate and complete information when
								creating an account or making inquiries.
							</li>
							<li>
								Users are responsible for maintaining the confidentiality of
								their account information.
							</li>
							<li>
								Users must use the platform for lawful purposes and not engage
								in any activity that may harm the platform or its users.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							8. Limitation of Liability
						</h2>
						<p>
							Dentiwhere is not responsible for the quality or outcomes of
							dental care provided by listed clinics. We do not guarantee any
							specific results from using our platform.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							9. Third-Party Links
						</h2>
						<p>
							Our platform may contain links to third-party websites. We do not
							endorse or take responsibility for the content or practices of
							these sites. Use them at your own risk.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">10. Amendments</h2>
						<p>
							We reserve the right to modify these Terms at any time. Any
							changes will be posted here, and your continued use of the
							platform constitutes acceptance of the updated Terms.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
						<p>
							If you have any questions regarding these Terms, feel free to
							contact us via our social media platforms:
						</p>
						<div className="flex space-x-4 mt-4">
							<SocialLinks />
						</div>
					</section>

					<section>
						<p className="text-lg font-semibold">
							By using Dentiwhere, you acknowledge that you have read and
							understood these Terms and Conditions and agree to be bound by
							them.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
