import { getAllSubscriptions } from "@/actions";
import { Subscription } from "@/types/types";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const subscriptionsAtom = atom<Subscription[]>([]);

export const subscriptionDataAtom = atom<Subscription | null>(null);

const subLoadable = atom(async () => {
	return await getAllSubscriptions();
});

export const subscriptionLoadable = loadable(subLoadable);
