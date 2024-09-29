import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* STATES */
import { userAtom } from "@/atoms";

/* COMPONENTS */
import AddEditClinicForm from "../shared/add-edit-clinic-form";

export default function AddClinic() {
	const user = useAtomValue(userAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.clinicId) {
			navigate("/clinic", {
				replace: true,
			});
		}
	}, [user.clinicId]);

	return (
		<div>
			<AddEditClinicForm />
		</div>
	);
}
