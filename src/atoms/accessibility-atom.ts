import { Accessibility } from "@/types/types";
import { atom } from "jotai";

export const accessibilitiesDataAtom = atom<Accessibility | null>(null);

export const accessibilitiesAtom = atom<Accessibility[]>([]);
