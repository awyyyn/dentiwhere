import { userAtom } from "@/atoms/user-atom";
import { useAtomValue } from "jotai";
import Layout from "./layout";
import NotVerified from "./not-verified";
import NoRecord from "./no-record";
import { useState } from "react";
import AddClinic from "./add-clinic";

export default function DentalSetting() {
	const user = useAtomValue(userAtom);
	const [adding, setAdding] = useState(false);

	if (!user.verified) return <NotVerified />;
	if (!user.clinicId && !adding)
		return <NoRecord handleAdd={() => setAdding(true)} />;

	if (adding && !user.clinicId) return <AddClinic />;

	console.log("user", user);

	return (
		<>
			<Layout>
				<div className="bg-[#D9D9D9] mix-blend-multiply p-5 rounded-lg">
					<h1 className="text-3xl">
						Welcome,{" "}
						<b className="capitalize">
							{user.firstName} {user.lastName}!
						</b>
					</h1>
					<p>
						We are excited to have you here. Looking forward to what you will
						build With Dentiwhere, kindly complete your dental information to
						get started!
					</p>
				</div>
			</Layout>
		</>
	);
}
