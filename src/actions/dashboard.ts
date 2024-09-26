import { Role } from "@/types/types";
import { db } from "@/utils/supabase";

export const getCounts = async () => {
	const userResponse = await db
		.from("user")
		.select("id, status")
		.eq("role", Role.doctor);
	const clinicResponse = await db.from("clinics").select("id");

	const verified = userResponse.data?.filter(
		(user) => user.status === "VERIFIED"
	);

	return {
		totalClinics: clinicResponse.data?.length ?? 0,
		totalDoctors: userResponse.data?.length ?? 0,
		registeredDoctors: verified?.length ?? 0,
	};
};
