import {
	ERR_INVALID_CREDENTIALS,
	ERR_USER_NOT_REGISTERED,
} from "@/constants/errors";
import { db } from "@/utils/supabase";
import { transformUser } from "./user";
import { User } from "@/types/types";
import { format } from "date-fns";

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

export const visit = async (isMobile: boolean) => {
	try {
		const { error } = await db.from("visits").insert({
			isMobile,
		});
		if (error) throw new Error(error.message);
	} catch (error) {
		console.log(error);
	}
};

export const getVisits = async () => {
	try {
		const { data: mobileData, error: mobileError } = await db
			.from("visits")
			.select()
			.eq("isMobile", true);
		const { data, error } = await db
			.from("visits")
			.select()
			.neq("isMobile", true);

		if (mobileError || error)
			throw new Error(error?.message ?? mobileError?.message);
		const combinedData = mobileData
			.concat(data)
			.sort(
				(a, b) =>
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
			);

		const groupedData = combinedData.reduce((acc, d) => {
			const date = format(new Date(d.created_at), "yyyy-MM-dd");
			if (!acc[date]) {
				acc[date] = { date, desktop: 0, mobile: 0 };
			}
			if (d.isMobile) {
				acc[date].mobile += 1;
			} else {
				acc[date].desktop += 1;
			}
			return acc;
		}, {} as Record<string, { date: string; desktop: number; mobile: number }>);

		console.log(groupedData, "groupedData");

		return {
			error: null,
			data: Object.values(groupedData),
		};
	} catch {
		return {
			error: "Something went wrong, Please try again later or contact support!",
		};
	}
};
