import { userAtom } from "@/atoms/user-atom";
import { useAtomValue } from "jotai";
import Layout from "./layout";
import NotVerified from "./not-verified";
import NoRecord from "./no-record";
import { useState } from "react";
import { Status } from "@/types/types";
import AddEditClinicForm from "../shared/add-edit-clinic-form";
import { clinicAtom } from "@/atoms/clinic-atom";
import AddClinic from "./add-clinic";

export default function DentalSetting() {
	const user = useAtomValue(userAtom);
	const [adding, setAdding] = useState(false);
	const [editing, setEditing] = useState(false);
	const clinic = useAtomValue(clinicAtom);

	if (user.status === Status.unverified) return <NotVerified />;
	if (user.status !== Status.verified && !adding)
		return <NoRecord handleAdd={() => setAdding(true)} />;
	if (user.status === Status.verified && user.clinicId === 0)
		return <AddClinic />;

	return (
		<>
			<Layout>
				<div></div>
				<AddEditClinicForm edit clinic={clinic} />
			</Layout>
		</>
	);
}
