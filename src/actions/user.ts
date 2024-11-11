import { ERR_INTERNAL, ERR_USER_ALREADY_REGISTERED } from "@/constants/errors";
import { DBUser, Role, Status, User } from "@/types/types";
import { db } from "@/utils/supabase";
import { transformNotification } from "./notification";
import { transformSubscription } from "./subscription";
import { add, addMonths, formatDate, getUnixTime } from "date-fns";

export const transformUser = (user: DBUser): Omit<User, "subscription"> => {
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
		authId: user.auth_id!,
		email: user.email,
		firstName: user.first_name,
		lastName: user.last_name,
		gender: user.gender,
		expirationDate: user.expiration_date
			? formatDate(user.expiration_date!, "yyyy-MM-dd")
			: "",
		subscriptionEndDate: formatDate(user.subscription_end_date, "yyyy-MM-dd"),
		subscribe: user.subscribe,
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

export const getUser = async (id: string) => {
	const { data, error } = await db
		.from("user")
		.select("*,  subscription(*)")
		.or(`auth_id.eq.${id}`);

	if (error) {
		console.error(error);
	}

	if (data === null || (data && data?.length === 0)) return null;

	return {
		...transformUser(data[0]),
		subscription: transformSubscription(data[0].subscription!),
	};
};

export const getOneDoctor = async (
	id: number
): Promise<User & { clinicName: string }> => {
	const { data, error } = await db
		.from("user")
		.select("*, clinics!user_clinic_id_fkey (name), subscription(*)")
		.eq(`id`, id);

	if (error) {
		console.error(error);
	}

	if (data === null || (data && data?.length === 0))
		throw new Error("DOCTOR_NOT_FOUND");

	return {
		...transformUser(data[0]),
		subscription: transformSubscription(data[0].subscription!),
		clinicName: data[0].clinics?.name ?? "",
	};
};

export const getOneByAuthID = async (id: string): Promise<User> => {
	const { data, error } = await db
		.from("user")
		.select("*, notification!notification_to_fkey(*),  subscription(*)")
		.eq("auth_id", id)
		.maybeSingle();

	if (error) {
		console.error(error);
	}

	if (data === null) throw new Error("Something went wrong!");

	return {
		...transformUser({
			...data,
			notification:
				data.notification.length > 0
					? data.notification
							.map((notif) => transformNotification(notif))
							.sort(
								(a, b) => getUnixTime(b.createdAt) - getUnixTime(a.createdAt)
							)
					: [],
		}),
		subscription: transformSubscription(data.subscription!),
	};
};

export const getAllUsers = async (): Promise<User[]> => {
	const { data, error } = await db.from("user").select("*,  subscription(*)");

	if (error) {
		console.error(error);
	}

	return data
		? data?.map((user) => ({
				...transformUser(user),
				subscription: transformSubscription(user.subscription!),
		  }))
		: [];
};

export const createUser = async (user: any): Promise<User> => {
	const isExists = await db
		.from("user")
		.select("*,  subscription(*)")
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

	const sub = await db
		.from("subscription")
		.select("*")
		.eq("id", 8)
		.maybeSingle();

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
			subscribe: 8,
			subscription_end_date: formatDate(
				add(new Date(), { months: sub.data?.months ?? 12 }),
				"yyyy-MM-dd"
			),
		})
		.select("*, subscription(*)");

	if (insertToUserTable.error) throw new Error(insertToUserTable.error.message);

	return {
		...transformUser(insertToUserTable.data[0]),
		subscription: transformSubscription(
			insertToUserTable.data[0].subscription!
		),
	};
};

export const updateUser = async (
	inputs: Omit<
		DBUser,
		| "created_at"
		| "updated_at"
		| "auth_id"
		| "clinic_id"
		| "subscribe"
		| "subscription_end_date"
	>
): Promise<User> => {
	const { data, error } = await db
		.from("user")
		.update(inputs)
		.eq("id", inputs.id)
		.select("*, subscription(*)")
		.maybeSingle();
	if (error || data === null) throw new Error("Error updating user");
	return {
		...transformUser(data),
		subscription: transformSubscription(data.subscription!),
	};
};

export const updateUserClinic = async (inputs: {
	id: number;
	clinicId: number;
}) => {
	const { data, error } = await db
		.from("user")
		.update({ clinic_id: inputs.clinicId })
		.eq("id", inputs.id)
		.select("*,  subscription(*)")
		.maybeSingle();
	if (error || data === null) throw new Error("Error updating user");
	return {
		...transformUser(data),
		subscription: transformSubscription(data.subscription!),
	};
};

export const getAllDoctors = async (): Promise<User[]> => {
	const { error, data } = await db
		.from("user")
		.select("*, subscription(*)")
		.eq("role", "DOCTOR");

	if (error) throw new Error(error.message);

	return data.map((user) => {
		return {
			...transformUser(user),
			subscription: transformSubscription(user.subscription!),
		};
	});
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
		.select("*, clinics!user_clinic_id_fkey (name),  subscription(*)")
		.maybeSingle();

	if (response.error) throw new Error(ERR_INTERNAL);

	if (response.data === null) throw new Error("Error updating user");

	return {
		...transformUser(response.data),
		subscription: transformSubscription(response.data.subscription!),
		clinicName: response.data.clinics?.name ?? "",
	};
};

export const updateDoctorSubscription = async (
	subId: number,
	months: number,
	id: number
): Promise<User> => {
	const { data, error } = await db
		.from("user")
		.update({
			subscribe: subId,
			subscription_end_date: addMonths(new Date(), months).toISOString(),
			boost: true,
		})
		.eq("id", id)
		.select("*, subscription(*)")
		.single();

	if (data === null || error) throw new Error("Something went wrong");

	return {
		...transformUser(data),
		subscription: transformSubscription(data.subscription!),
	};
};
