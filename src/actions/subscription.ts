import { DBSubscription, Subscription } from "@/types/types";
import { db } from "@/utils/supabase";

const transformSubscription = (sub: DBSubscription): Subscription => {
	return {
		id: sub.id,
		name: sub.name,
		price: sub.price,
		description: sub.description,
		months: sub.months,
		updatedAt: sub.updated_at,
		createdAt: sub.created_at,
	};
};

export const getAllSubscriptions = async (): Promise<Subscription[]> => {
	const { data, error } = await db.from("subscription").select("*");

	if (error) throw new Error(error.message);

	return data.map((d) => transformSubscription(d));
};

export const createSubscription = async (
	sub: Omit<Subscription, "createdAt" | "id" | "updatedAt">
): Promise<Subscription> => {
	const { data, error } = await db
		.from("subscription")
		.insert({
			...sub,
		})
		.select()
		.single();

	if (error) throw new Error(error.message);

	return transformSubscription(data);
};

export const updateSubscription = async (
	sub: Omit<Subscription, "createdAt" | "updatedAt">
): Promise<Subscription> => {
	const { id, ...editData } = sub;

	const { data, error } = await db
		.from("subscription")
		.update({ ...editData })
		.eq("id", id)
		.select()
		.single();

	if (error) throw new Error(error.message);

	return transformSubscription(data);
};

export const deleteSubscription = async (id: nubmer) => {
	const { error } = await db.from("subscription").delete().eq("id", id);
	if (error) throw new Error(error.message);
	return true;
};
