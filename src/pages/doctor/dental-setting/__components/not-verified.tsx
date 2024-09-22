import Layout from "./layout.tsx";
import { PiSealWarningFill } from "react-icons/pi";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export default function NotVerified() {
	return (
		<Layout>
			<div className=" text-center items-center h-full flex  flex-col gap-y-2 ">
				<PiSealWarningFill size={200} />
				<h1 className="font-bold text-3xl">
					Please Verify your account first!
				</h1>
				<p className="text-gray-700 text-lg">
					Please complete your information to verify your account.
				</p>
				<Link to={"/profile"}>
					<Button className="mt-2">Complete Information</Button>
				</Link>
			</div>
		</Layout>
	);
}
