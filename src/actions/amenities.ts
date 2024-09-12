import { Amenities, DBAmenities } from "@/types/types";
import { db } from "@/utils/supabase";

const transformAmenities = (amenity: DBAmenities): Amenities => {
	return {
		id: amenity.id,
		name: amenity.name,
		clinicId: amenity.clinic_id,
		createdAt: amenity.created_at,
		updatedAt: amenity.updated_at,
	};
};

export const createMany = async (
	inputs: { clinic_id: number; name: string }[]
): Promise<Amenities[]> => {
	const { data, error } = await db.from("amenities").insert(inputs).select();

	if (error || (data && data.length === 0))
		throw new Error("Failed to create amenities");

	return data.map((amenity) => transformAmenities(amenity));
};

export const create = async (inputs: {
	clinic_id: number;
	name: string;
}): Promise<Amenities> => {
	const { data, error } = await db
		.from("amenities")
		.insert(inputs)
		.select()
		.maybeSingle();

	if (error || data === null) throw new Error("Failed to create amenities");

	return transformAmenities(data);
};

export const update = async (inputs: {
	clinic_id: number;
	name: string;
	id: number;
}) => {
	const { id, ...toUpdate } = inputs;

	const { data, error } = await db
		.from("amenities")
		.upsert(toUpdate)
		.eq("id", id)
		.select()
		.maybeSingle();

	console.log(error?.message, data);

	if (error || data === null) throw new Error("Failed to update Amenity");

	return transformAmenities(data);
};
