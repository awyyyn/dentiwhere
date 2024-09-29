import { useAtomValue } from "jotai";

/* STATES */
import { userAtom } from "@/atoms";

/* LAYOUTS */
import Layout from "./layout.tsx";

/* COMPONENTS */
import AddEditClinicForm from "../../shared/add-edit-clinic-form.tsx";

export default function AddClinic() {
	const user = useAtomValue(userAtom);
	return (
		<>
			<Layout>
				<div className="bg-[#D9D9D9]/90 mix-blend-multiply p-5 rounded-lg">
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
				<AddEditClinicForm />
			</Layout>
		</>
	);
}
