import { atom } from "jotai";
import { Review } from "@/types/types.ts";


export const reviewsAtom = atom<Review[]>([]);

