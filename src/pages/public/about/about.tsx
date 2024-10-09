import { Button } from "@/components/ui/button";
import { AsyncImage } from "loadable-image";
import Dental from "@/assets/images/dental.webp";
import { Link } from "react-router-dom";
import Back from "../__components/back/back";

export default function About() {
	return (
		<div className="py-5">
			<Back />
			<div className="w-11/12 mx-auto md:w-10/12 space-y-10">
				<div className="flex flex-col items-center mb-12  ">
					<h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
						About Dentiwhere
					</h1>
					<p className="text-xl text-center text-muted-foreground mb-8">
						Discover Your Perfect Dental Match with Ease
					</p>
					<AsyncImage
						src={Dental}
						srcSet={Dental}
						alt="Dentiwhere hero image"
						className="rounded-lg h-[300px] md:h-[500px] w-full max-w-3xl shadow-lg"
					/>
				</div>

				<div className="max-w-3xl mx-auto space-y-8 pb-14">
					<section>
						<h2 className="text-2xl font-semibold mb-4">
							Welcome to Dentiwhere
						</h2>
						<p className="text-muted-foreground">
							Your go-to online platform for finding the right dental clinic
							tailored to your needs. We understand that navigating dental care
							can be overwhelming, with countless options and varying services.
							That's why we've created a user-friendly space where you can
							effortlessly explore clinics, compare services, and inquire about
							costs—all from the comfort of your home.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							Our Priority: Your Convenience
						</h2>
						<p className="text-muted-foreground">
							At Dentiwhere, we prioritize your convenience. No more long drives
							or waiting in line to gather information; our platform empowers
							you to make informed decisions quickly and easily. Whether you're
							looking for a routine check-up, specialized treatment, or just
							want to know more about your options, we've got you covered.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">
							Supporting Dental Professionals
						</h2>
						<p className="text-muted-foreground">
							We also believe in supporting dental professionals. Dentiwhere
							serves as a marketing hub for clinics, allowing them to showcase
							their services and connect with potential patients. Our mission is
							to bridge the gap between patients and dental care providers,
							creating a seamless experience for everyone involved.
						</p>
					</section>

					<div className="text-center my-12">
						<h3 className="text-xl font-semibold mb-4">
							Ready to Find Your Ideal Dental Care?
						</h3>
						<Link to="/">
							<Button size="lg">Get Started with Dentiwhere</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
