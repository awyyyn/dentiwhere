import { Service } from "@/types/types";
import { atom } from "jotai";


export const serviceDataAtom = atom<Service | null>(null);

