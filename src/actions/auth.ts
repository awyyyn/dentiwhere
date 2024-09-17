import {
	ERR_INVALID_CREDENTIALS,
	ERR_USER_NOT_REGISTERED,
} from "@/constants/errors";
import { db } from "@/utils/supabase";
import { transformUser } from "./user";
import { User } from "@/types/types";

export const login = async (user: any): Promise<User> => {
	const ifExists = await db
		.from("user")
		.select("*")
		.match({
			email: user.email,
			license_number: user.licenseNumber,
		})
		.maybeSingle();

	if (ifExists.error) throw new Error(ifExists.error.message);

	if (ifExists.data === null) throw new Error(ERR_USER_NOT_REGISTERED);

	if (
		ifExists.data.email !== user.email ||
		ifExists.data.license_number !== user.licenseNumber
	)
		throw new Error(ERR_INVALID_CREDENTIALS);

	if (ifExists.data.license_number !== user.licenseNumber)
		throw new Error(ERR_INVALID_CREDENTIALS);

	const result = await db.auth.signInWithPassword({
		email: user.email,
		password: user.password,
	});

	if (result.error) throw new Error(result.error.message);

	return transformUser(ifExists.data);
};

export const changePassword = async ({
	email,
	password,
	oldPassword,
}: {
	email: string;
	password: string;
	oldPassword: string;
}) => {
	const { error } = await db.auth.signInWithPassword({
		email,
		password: oldPassword,
	});

	if (error) throw new Error("Old password is incorrect");

	const { error: updateErr } = await db.auth.updateUser({
		password,
	});

	if (updateErr) throw new Error(updateErr.message);

	return true;
};
