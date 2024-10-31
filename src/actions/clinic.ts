import { Clinic, ClinicWithDoctor, DBClinic } from "@/types/types";
import { db } from "@/utils/supabase";
import { ERR_INTERNAL } from "@/constants/errors.ts";
import { isEmpty } from "lodash";
import { formatDate, getUnixTime, isEqual, isFuture, isPast } from "date-fns";

const transformClinic = (clinic: DBClinic): Clinic => {
	return {
		id: clinic.id,
		address: clinic.address,
		archive: clinic.archive,
		boosted: clinic.boosted,
		contacts: clinic.contacts || [],
		createdAt: clinic.created_at,
		description: clinic.description || "",
		doctorId: Number(clinic.doctor_id),
		website: clinic.website ?? "",
		email: clinic.email,
		img: clinic.img,
		updatedAt: clinic.updated_at,
		name: clinic.name,
	};
};

export const createClinic = async (
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
			map: inputs.map
				? {
						lat: inputs.map.lat,
						lng: inputs.map.lng,
				  }
				: null,
		})
		.select()
		.maybeSingle();

	if (error || data === null) throw new Error("Error creating clinic");

	return transformClinic(data);
};

export const updateClinic = async (
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
			name: inputs.name,
			img: inputs.img,
			map: inputs.map
				? {
						lat: inputs.map.lat,
						lng: inputs.map.lng,
				  }
				: null,
		})
		.eq("id", inputs.id)
		.select()
		.maybeSingle();

	if (clinic.error || clinic.data === null)
		throw new Error("Failed to update your clinic information");

	return transformClinic(clinic.data);
};

export const deleteClinic = async (id: number) => {
	await db.from("clinics").delete().eq("id", id);
};

export const getClinicByDoctor = async (id: number): Promise<Clinic> => {
	const response = await db
		.from("clinics")
		.select(
			`*, 
            services ( img, name, rate, description, active, category_id, clinic_id, created_at, updated_at, id ), 
            amenities (id, clinic_id, name, created_at, updated_at), 
            accessibility (id, clinic_id, name, created_at, updated_at),
			category (id, clinic_id, name, created_at, updated_at)
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
		doctorId: Number(response.data[0]?.doctor_id),
		archive: response.data[0]?.archive,
		map: !isEmpty(response.data[0]?.map)
			? {
					lat: Number((response.data[0].map as Clinic["map"])?.lat),
					lng: Number((response.data[0].map as Clinic["map"])?.lng),
			  }
			: undefined,
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
		categories: response.data[0]?.category?.map((cat) => ({
			clinicId: cat.clinic_id,
			name: cat.name,
			id: cat.id,
			createdAt: cat.created_at,
			updatedAt: cat.updated_at,
		})),
	};
};

export const getClinic = async (id: number): Promise<ClinicWithDoctor> => {
	const response = await db
		.from("clinics")
		.select(
			`*, 
            services ( img, name, rate, description, active, category_id, clinic_id, created_at, updated_at, id ), 
            amenities (id, clinic_id, name, created_at, updated_at), 
            accessibility (id, clinic_id, name, created_at, updated_at),
			category (id, clinic_id, name, created_at, updated_at),
			reviews ( * ),
			user!clinics_doctor_id_fkey(first_name, last_name, id, subscribe)
        `
		)
		.eq("id", id)
		.maybeSingle();

	if (response.error) throw new Error(response.error.message);

	if (response.data === null || response.data === undefined)
		throw new Error("No clinic found");

	return {
		...transformClinic(response.data),
		map: !isEmpty(response.data.map)
			? {
					lat: Number((response.data.map as Clinic["map"])?.lat),
					lng: Number((response.data.map as Clinic["map"])?.lng),
			  }
			: undefined,
		doctor: ` ${response.data.user?.first_name ?? ""} ${
			response.data.user?.last_name ?? ""
		}`,
		subscribe: Number(response.data.user?.subscribe ?? 8),
		status: response.data.archive ? "INACTIVE" : "ACTIVE",
		services: response.data?.services
			.map((service) => ({
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
			}))
			.filter((s) => s.active),
		amenities: response.data?.amenities?.map((ame) => ({
			clinicId: ame.clinic_id,
			name: ame.name,
			id: ame.id,
			createdAt: ame.created_at,
			updatedAt: ame.updated_at,
		})),
		accesibilities: response.data?.accessibility?.map((acc) => ({
			clinicId: acc.clinic_id,
			name: acc.name,
			id: acc.id,
			createdAt: acc.created_at,
			updatedAt: acc.updated_at,
		})),
		categories: response.data?.category?.map((cat) => ({
			clinicId: cat.clinic_id,
			name: cat.name,
			id: cat.id,
			createdAt: cat.created_at,
			updatedAt: cat.updated_at,
		})),
		reviews: response.data?.reviews
			?.map((review) => {
				return {
					id: review.id,
					clinicId: review.clinic_id,
					name: review.name,
					uuid: review.uuid,
					review: review.review ?? "",
					rate: review.rate ?? undefined,
					createdAt: review.created_at,
					updatedAt: review.updated_at,
				};
			})
			.sort((a, b) => getUnixTime(b.createdAt) - getUnixTime(a.createdAt)),
	};
};

export const getAllClinics = async (
	getAll: boolean = false
): Promise<ClinicWithDoctor[]> => {
	const { data, error } = await db.from("clinics").select(
		`*,
		user!clinics_doctor_id_fkey(first_name, last_name, id, subscription_end_date, subscribe)
        `
	);

	if (error) throw new Error(error.message);

	return data
		.filter((d) =>
			getAll
				? d
				: isFuture(new Date(d.user?.subscription_end_date as string)) ||
				  isEqual(
						new Date(d.user?.subscription_end_date as string),
						formatDate(new Date(), "yyyy-MM-dd")
				  )
		)
		.map((d) => {
			return {
				...transformClinic(d),
				doctor: ` ${d.user?.first_name ?? ""} ${d.user?.last_name ?? ""}`,
				subscribe: Number(d.user?.subscribe ?? 8),
				status: d.archive ? "INACTIVE" : "ACTIVE",
				map: !isEmpty(d?.map)
					? {
							lat: Number((d?.map as Clinic["map"])?.lat),
							lng: Number((d?.map as Clinic["map"])?.lng),
					  }
					: undefined,
			};
		}) as Array<ClinicWithDoctor & { subscribe: number }>;
};

export const searchClinic = async (
	query: string
): Promise<ClinicWithDoctor[]> => {
	const { data, error } = await db
		.from("clinics")
		.select(
			"*, user!clinics_doctor_id_fkey(first_name, last_name, id, subscription_end_date, subscribe)"
		)
		.or(`name.ilike.%${query}%,address.ilike.%${query}%`);

	if (error) throw new Error(ERR_INTERNAL);

	return data?.length > 0
		? data
				.filter(
					(d) =>
						!d.archive &&
						(isFuture(new Date(d.user?.subscription_end_date as string)) ||
							isEqual(
								new Date(d.user?.subscription_end_date as string),
								formatDate(new Date(), "yyyy-MM-dd")
							))
				)
				?.map((clinic) => {
					return {
						...transformClinic(clinic),
						doctor: ` ${clinic.user?.first_name ?? ""} ${
							clinic.user?.last_name ?? ""
						}`,
						status: clinic.archive ? "INACTIVE" : "ACTIVE",
						subscribe: Number(clinic.user?.subscribe ?? 8),
						map: !isEmpty(clinic?.map)
							? {
									lat: Number((clinic?.map as Clinic["map"])?.lat),
									lng: Number((clinic?.map as Clinic["map"])?.lng),
							  }
							: undefined,
					};
				})
		: [];
};

export const getBoostedClinics = async (): Promise<ClinicWithDoctor[]> => {
	const { data, error } = await db
		.from("clinics")
		.select(
			"*, user!clinics_doctor_id_fkey(first_name, last_name, id, subscription_end_date, boost, subscribe)"
		);

	if (error) throw new Error(ERR_INTERNAL);

	return data?.length > 0
		? data
				.filter(
					(d) =>
						!d.archive &&
						!isPast(d.user?.subscription_end_date as string) &&
						d.user?.boost
				)
				?.map((clinic) => {
					return {
						...transformClinic(clinic),
						doctor: ` ${clinic.user?.first_name ?? ""} ${
							clinic.user?.last_name ?? ""
						}`,
						status: clinic.archive ? "INACTIVE" : "ACTIVE",
						subscribe: Number(clinic.user?.subscribe ?? 8),
						map: !isEmpty(clinic?.map)
							? {
									lat: Number((clinic?.map as Clinic["map"])?.lat),
									lng: Number((clinic?.map as Clinic["map"])?.lng),
							  }
							: undefined,
					};
				})
		: [];
};

export const updateClinicStatus = async (
	id: number,
	status: boolean
): Promise<boolean> => {
	const { error } = await db
		.from("clinics")
		.update({ archive: status })
		.eq("id", id);

	if (error) throw new Error(ERR_INTERNAL);

	return true;
};

export const getClinicsGeo = async () => {
	const { data, error } = await db
		.from("clinics")
		.select(
			"id, name, map, archive, user!clinics_doctor_id_fkey(subscription_end_date, boost)"
		);

	if (data === null || error) throw new Error("Error fetching clinics");

	return data
		.filter(
			(d) => !d.archive && !isPast(d.user?.subscription_end_date as string)
		)
		?.map((d) => {
			return {
				id: d.id,
				name: d.name,
				map: {
					lat: (d.map as Clinic["map"])?.lat as number,
					lng: (d.map as Clinic["map"])?.lng as number,
				},
			};
		});
};
