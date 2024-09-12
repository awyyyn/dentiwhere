import { useAtomValue } from "jotai";
import AddEditClinicForm from "../shared/add-edit-clinic-form";
import { userAtom } from "@/atoms/user-atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
