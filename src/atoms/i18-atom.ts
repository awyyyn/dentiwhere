import { atom } from "jotai";

type Lang = "en" | "fil";

const defaultLang = (localStorage.getItem("i18n") as Lang) ?? "en";

export const i18Atom = atom<Lang>(defaultLang);
