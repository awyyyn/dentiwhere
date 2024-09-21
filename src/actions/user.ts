import { ERR_INTERNAL, ERR_USER_ALREADY_REGISTERED } from "@/constants/errors";
import { DBUser, Role, Status, User } from "@/types/types";
import { db } from "@/utils/supabase";
import { transformNotification } from "./notification";
import { getUnixTime } from "date-fns";

export const transformUser = (user: DBUser): User => {
	const role =
		user.role === "DOCTOR"
			? Role.doctor
			: user.role === "ADMIN"
			? Role.admin
			: Role.superAdmin;

	return {
		status:
			user.status.toLowerCase() === "pending"
				? Status["PENDING"]
				: user.status.toLowerCase() === "verified"
				? Status["verified"]
				: Status["unverified"],
		id: user.id,
		authId: user.auth_id,
		email: user.email,
		firstName: user.first_name,
		lastName: user.last_name,
		gender: user.gender,

		licenseId:
			typeof user.license_id === "string"
				? JSON.parse(user.license_id)
				: user.license_id,
		postalId: user.postal_id,
		verifiedId: user.license_number,
		contacts: user.contacts ?? [],
		role: role,
		boost: user.boost,
		img: user.img!,
		licenseNumber: user.license_number,
		notifications: user.notification,
		verified: user.verified,
		clinicId: user.clinic_id ?? 0,
		createdAt: user.created_at ?? "",
		updatedAt: user.updated_at ?? "",
		address: user.address ?? "",
		birthDate: user.birth_date ? new Date(user.birth_date).toISOString() : "",
	};
};

export const getOne = async (id: string) => {
	const { data, error } = await db.from("user").select().or(`auth_id.eq.${id}`);

	if (error) {
		console.error(error);
	}

	if (data === null || (data && data?.length === 0)) return null;

	return transformUser(data[0]);
};

export const getOneDoctor = async (
	id: number
): Promise<User & { clinicName: string }> => {
	const { data, error } = await db
		.from("user")
		.select("*, clinics!user_clinic_id_fkey (name)")
		.eq(`id`, id);

	if (error) {
		console.error(error);
	}

	if (data === null || (data && data?.length === 0))
		throw new Error("DOCTOR_NOT_FOUND");

	return {
		...transformUser(data[0]),
		clinicName: data[0].clinics?.name ?? "",
	};
};

export const getOneByAuthID = async (id: string) => {
	const { data, error } = await db
		.from("user")
		.select("*, notification!notification_to_fkey(*)")
		.eq("auth_id", id)
		.maybeSingle();

	if (error) {
		console.error(error);
	}

	if (data === null) return null;

	return transformUser({
		...data,
		notification:
			data.notification.length > 0
				? data.notification
						.map((notif) => transformNotification(notif))
						.sort((a, b) => getUnixTime(b.createdAt) - getUnixTime(a.createdAt))
				: [],
	});
};

export const getAll = async () => {
	const { data, error } = await db.from("user").select("*");

	if (error) {
		console.error(error);
	}

	return data ? data?.map((user) => transformUser(user)) : [];
};

export const create = async (user: any): Promise<User> => {
	const isExists = await db
		.from("user")
		.select("*")
		.or(`email.eq.${user.email},license_number.eq.${user.licenseNumber}`);

	if (isExists.data && isExists.data.length > 0)
		throw new Error(ERR_USER_ALREADY_REGISTERED);

	const { data, error } = await db.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: {
				...user,
				password: null,
			},
		},
	});

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	if (data.user === null) {
		throw new Error(ERR_INTERNAL);
	}

	const insertToUserTable = await db
		.from("user")
		.insert({
			gender: "",
			address: "",
			postal_id: "",
			license_id: {},
			first_name: user.firstName,
			last_name: user.lastName,
			auth_id: data.user.id.toString(),
			email: user.email,
			license_number: user.licenseNumber,
			contacts: user.contacts,
			role: user.role,
			verified: false,
		})
		.select();

	if (insertToUserTable.error) throw new Error(insertToUserTable.error.message);

	return transformUser(insertToUserTable.data[0]);
};

export const update = async (
	inputs: Omit<DBUser, "created_at" | "updated_at" | "auth_id" | "clinic_id">
): Promise<User> => {
	const { data, error } = await db
		.from("user")
		.update(inputs)
		.eq("id", inputs.id)
		.select()
		.maybeSingle();
	if (error || data === null) throw new Error("Error updating user");
	return transformUser(data);
};

export const updateUserClinic = async (inputs: {
	id: number;
	clinicId: number;
}) => {
	const { data, error } = await db
		.from("user")
		.update({ clinic_id: inputs.clinicId })
		.eq("id", inputs.id)
		.select()
		.maybeSingle();
	if (error || data === null) throw new Error("Error updating user");
	return transformUser(data);
};

export const getAllDoctors = async () => {
	const { error, data } = await db
		.from("user")
		.select("*")
		.eq("role", "DOCTOR");

	if (error) throw new Error(error.message);

	return data.map((user) => transformUser(user));
};

export const updateDoctorStatus = async (
	id: number,
	status: Status
): Promise<User & { clinicName: string }> => {
	const response = await db
		.from("user")
		.update({
			status,
		})
		.eq("id", id)
		.select("*, clinics!user_clinic_id_fkey (name)")
		.maybeSingle();

	if (response.error) throw new Error(ERR_INTERNAL);

	if (response.data === null) throw new Error("Error updating user");

	return {
		...transformUser(response.data),
		clinicName: response.data.clinics?.name ?? "",
	};
};
