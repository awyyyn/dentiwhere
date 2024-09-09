import { getAll } from "@/actions/category";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const categoriesAtom = atom(async() =>  await getAll());

export const loadableCategoriesAtom = loadable(categoriesAtom)