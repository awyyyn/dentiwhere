import { atom } from "jotai";

type Lang = "en" | "fil";

export const i18Atom = atom<Lang>("en");
