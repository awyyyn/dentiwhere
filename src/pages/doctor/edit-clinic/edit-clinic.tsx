import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddEditClinicForm from "../shared/add-edit-clinic-form";
import { useLayoutEffect } from "react";

export default function EditClinic() {
	const { clinicId } = useParams();
	const { state } = useLocation();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (!clinicId || !state?.clinic) return navigate("/", { replace: true });

		return () => {};
	}, [clinicId, state?.clinic, navigate]);

	return (
		<div>
			<AddEditClinicForm edit clinic={state.clinic} />
		</div>
	);
}
