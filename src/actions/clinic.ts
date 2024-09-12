import { Clinic, DBClinic } from "@/types/types";
import { db } from "@/utils/supabase";

const transformClinic = (clinic: DBClinic): Clinic => {
	return {
		id: clinic.id,
		address: clinic.address,
		archive: clinic.archive,
		boosted: clinic.boosted,
		contacts: clinic.contacts || [],
		createdAt: clinic.created_at,
		description: clinic.description || "",
		doctorId: clinic.doctor_id,
		email: clinic.email,
		img: clinic.img,
		updatedAt: clinic.updated_at,
		name: clinic.name,
	};
};

export const create = async (
	inputs: Omit<Clinic, "id" | "createdAt" | "updatedAt" | "archive" | "boosted">
): Promise<Clinic> => {
	const { data, error } = await db
		.from("clinics")
		.insert({
			address: inputs.address,
			website: inputs.website ?? "",
			doctor_id: inputs.doctorId,
			email: inputs.email,
			name: inputs.name,
			archive: false,
			boosted: false,
			contacts: inputs.contacts,
			description: inputs.description,
			img: inputs.img,
		})
		.select()
		.maybeSingle();

	if (error || data === null) throw new Error("Error creating clinic");

	return transformClinic(data);
};

export const update = async (
	inputs: Omit<
		Clinic,
		| "createdAt"
		| "updatedAt"
		| "accessibilities"
		| "services"
		| "amenities"
		| "doctorId"
	>
) => {
	const clinic = await db
		.from("clinics")
		.update({
			address: inputs.address,
			archive: inputs.archive,
			boosted: inputs.boosted,
			contacts: inputs.contacts || [],
			description: inputs.description,
			email: inputs.email,
			website: inputs.website,
			map: inputs.map,
			name: inputs.name,
			img: inputs.img,
		})
		.eq("id", inputs.id)
		.select()
		.maybeSingle();

	if (clinic.error || clinic.data === null)
		throw new Error("Failed to update your clinic information");

	return transformClinic(clinic.data);
};

export const deleteOne = async (id: number) => {
	await db.from("clinics").delete().eq("id", id);
};

export const getClinic = async (id: number): Promise<Clinic> => {
	const response = await db
		.from("clinics")
		.select(
			`*, 
            services ( img, name, rate, description, active, category_id, clinic_id, created_at, updated_at, id ), 
            amenities (id, clinic_id, name, created_at, updated_at), 
            accessibility (id, clinic_id, name, created_at, updated_at)
        `
		)
		.eq("doctor_id", id);

	if (response.error) throw new Error(response.error.message);

	if (response.data === null || response.data.length === 0)
		throw new Error("No clinic found");

	return {
		website: response.data[0]?.website || "",
		address: response.data[0]?.address || "",
		email: response.data[0]?.email,
		img: response.data[0]?.img,
		id: response.data[0]?.id,
		boosted: response.data[0]?.boosted,
		name: response.data[0]?.name,
		contacts: response.data[0]?.contacts || [],
		createdAt: response.data[0]?.created_at,
		updatedAt: response.data[0]?.updated_at as string,
		doctorId: response.data[0]?.doctor_id,
		archive: response.data[0]?.archive,
		services: response.data[0]?.services.map((service) => ({
			img: service.img!,
			name: service.name,
			updated_at: service.id,
			rate: service.rate || "",
			description: service.description || "",
			categoryId: service.category_id,
			clinicId: service.clinic_id,
			createdAt: service.created_at,
			updatedAt: service.updated_at!,
			id: service.id,
			active: service.active,
		})),
		description: response.data[0]?.description ?? "",
		amenities: response.data[0]?.amenities?.map((ame) => ({
			clinicId: ame.clinic_id,
			name: ame.name,
			id: ame.id,
			createdAt: ame.created_at,
			updatedAt: ame.updated_at,
		})),
		accesibilities: response.data[0]?.accessibility?.map((acc) => ({
			clinicId: acc.clinic_id,
			name: acc.name,
			id: acc.id,
			createdAt: acc.created_at,
			updatedAt: acc.updated_at,
		})),
	};
};
