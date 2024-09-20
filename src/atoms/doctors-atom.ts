import { User } from "@/types/types";
import { atom } from "jotai";

export const doctorsAtom = atom<User[]>([]);

export const doctorAtom = atom<User & { clinicName: string }>();
