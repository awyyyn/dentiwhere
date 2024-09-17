import { Accessibility, DBAccessibility } from "@/types/types";
import { db } from "@/utils/supabase";

const transformAccessibility = (
	accessibility: DBAccessibility
): Accessibility => {
	return {
		id: accessibility.id,
		name: accessibility.name,
		clinicId: accessibility.clinic_id,
		createdAt: accessibility.created_at,
		updatedAt: accessibility.updated_at,
	};
};

export const createMany = async (
	inputs: { clinic_id: number; name: string }[]
): Promise<Accessibility[]> => {
	const { data, error } = await db
		.from("accessibility")
		.insert(inputs)
		.select();
	if (error || (data && data.length === 0))
		throw new Error("Failed to create accessibilities");
	return data.map((accessibility) => transformAccessibility(accessibility));
};

export const create = async (inputs: {
	clinicId: number;
	name: string;
}): Promise<Accessibility> => {
	const { data, error } = await db
		.from("accessibility")
		.insert({
			clinic_id: inputs.clinicId,
			name: inputs.name,
		})
		.select()
		.maybeSingle();
	console.log(error, data, "12312321");
	if (error || data === null) {
		throw new Error("Failed to create Accessibility");
	}

	return transformAccessibility(data);
};

export const update = async (inputs: {
	clinicId: number;
	name: string;
	id: number;
}) => {
	const { data, error } = await db
		.from("accessibility")
		.update({
			clinic_id: inputs.clinicId,
			name: inputs.name,
		})
		.eq("id", inputs.id)
		.maybeSingle();

	if (error || data === null) throw new Error("Failed to update Accessibility");

	return transformAccessibility(data);
};
