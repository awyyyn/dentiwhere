import {
	FaSquareXTwitter,
	FaSquareFacebook,
	FaSquareInstagram,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function SocialLinks() {
	return (
		<div className="flex flex-row gap-x-5   pl-5">
			<Button
				size="icon"
				variant="ghost"
				className="hover:shadow-xl transition-shadow duration-300">
				<FaSquareXTwitter size={40} />
			</Button>
			<Button
				size="icon"
				variant="ghost"
				className="hover:shadow-xl transition-shadow duration-300">
				<FaSquareFacebook size={40} />
			</Button>
			<Button
				size="icon"
				variant="ghost"
				className="hover:shadow-xl transition-shadow duration-300">
				<FaSquareInstagram size={40} />
			</Button>
		</div>
	);
}
