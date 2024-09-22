import { Notification } from "@/types/types";
import { atom } from "jotai";

export const notificationsAtom = atom<Notification[]>([]);
