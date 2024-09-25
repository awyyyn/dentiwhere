import { ERR_INTERNAL } from "@/constants/errors";
import { DBNotification, Notification } from "@/types/types";
import { db } from "@/utils/supabase";

interface NotificationInput {
	title: string;
	message: string;
	from?: number;
	to?: number;
	name: string;
}

export const transformNotification = (
	notification: DBNotification
): Notification => {
	return {
		content: notification.content,
		id: notification.id,
		name: notification.name,
		read: notification.read,
		title: notification.title,
		to: notification.to,
		from: notification.from ?? 0,
		createdAt: notification.created_at,
		updatedAt: notification.updated_at,
	};
};

export const sendNotification = async ({
	message,
	title,
	to,
	name,
	from,
}: NotificationInput) => {
	try {
		let sendTo = to;
		let fromName = name;

		if (!sendTo) {
			const { data, error } = await db
				.from("user")
				.select("first_name, last_name, id")
				.eq("role", "SUPERADMIN")
				.maybeSingle();
			if (error) throw new Error(ERR_INTERNAL);
			if (data === null) throw new Error(ERR_INTERNAL);
			sendTo = data.id;
			fromName = `${data.first_name} ${data.last_name}`;
		}

		const response = await db.from("notification").insert({
			title,
			content: message,
			from,
			name: fromName,
			to: sendTo,
		});
		if (response.error) return false;
		if (response.data === null) return false;
		return true;
	} catch (error) {
		console.error(error);
	}
};

export const readNotification = async (id: number) => {
	await db.from("notification").update({ read: true }).eq("id", id);
};
