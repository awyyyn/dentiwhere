 
import { Category } from "@/types/types";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const categoriesAtom = atom<Category[]>([]);

export const categoryDataAtom = atom<Category | null>(null)

export const loadableCategoriesAtom = loadable(categoriesAtom);
