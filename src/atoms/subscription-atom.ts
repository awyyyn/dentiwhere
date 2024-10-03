import { Subscription } from "@/types/types";
import { atom } from "jotai";

export const subscriptionsAtom = atom<Subscription[]>([]);

export const subscriptionDataAtom = atom<Subscription | null>(null);
