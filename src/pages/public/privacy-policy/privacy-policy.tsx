import SocialLinks from "@/components/shared/social-links/social-links";

export default function PrivacyPolicy() {
	return (
		<div className="py-5">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

				<div className="max-w-3xl mx-auto space-y-8">
					<section>
						<p className="text-lg">
							At Dentiwhere, we are committed to protecting your privacy. This
							Privacy Policy outlines how we collect, use, and safeguard your
							personal information when you use our platform.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							1. Information We Collect
						</h2>
						<p>We may collect the following types of information:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Personal Information:</strong> When you register as a
								dentist or make an inquiry as a patient, we collect your name,
								contact information, and clinic details (for dentists).
							</li>
							<li>
								<strong>Location Data:</strong> We collect and use location data
								to show nearby clinics.
							</li>
							<li>
								<strong>Usage Data:</strong> We gather information about your
								interactions with the platform, including pages viewed and
								features used.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							2. How We Use Your Information
						</h2>
						<p>We use the information we collect for the following purposes:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								To connect patients with dental clinics and professionals.
							</li>
							<li>
								To improve the functionality and user experience of the
								platform.
							</li>
							<li>
								To send notifications and relevant updates regarding
								appointments or services.
							</li>
							<li>To analyze usage trends and gather feedback.</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							3. Sharing Your Information
						</h2>
						<p>
							We do not sell your personal information to third parties.
							However, we may share your information with:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Dental Clinics:</strong> When patients inquire or book
								appointments, their contact information may be shared with the
								clinic.
							</li>
							<li>
								<strong>Service Providers:</strong> We may share your data with
								third-party providers who help us operate the platform, subject
								to strict confidentiality agreements.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
						<p>
							We implement reasonable security measures to protect your personal
							information from unauthorized access, loss, or misuse. However, no
							method of transmission over the internet is completely secure.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
						<p>
							We use cookies to track user behavior and improve the user
							experience. You can disable cookies in your browser settings, but
							this may limit certain functionalities of the platform.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
						<p>
							You have the right to access, correct, or delete your personal
							data. To exercise any of these rights, please contact us through
							our social media platforms listed below.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							7. Changes to This Policy
						</h2>
						<p>
							We reserve the right to update this Privacy Policy from time to
							time. Any changes will be posted here, and continued use of the
							platform constitutes acceptance of the updated policy.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
						<p>
							If you have any questions or concerns about this Privacy Policy,
							please contact us through our social media platforms:
						</p>
						<div className="mt-3">
							<SocialLinks />
						</div>
					</section>

					<section>
						<p className="text-lg font-semibold">
							By using Dentiwhere, you consent to the collection and use of your
							information as outlined in this Privacy Policy.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
