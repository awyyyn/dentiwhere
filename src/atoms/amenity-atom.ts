import { Amenities } from "@/types/types";
import { atom } from "jotai";

export const amenityDataAtom = atom<Amenities | null>(null);

export const amenitiesAtom = atom<Amenities[]>([]);
