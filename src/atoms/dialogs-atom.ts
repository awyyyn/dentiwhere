import { atom } from "jotai";

interface DialogAtom {
	open: boolean;
	mode?: "create" | "edit" | "delete" | "view";
}

const initialValues = {
	open: false,
	mode: "view" as const,
};

export const searchClinicDialogAtom = atom<boolean>(false);

export const clinicDialogAtom = atom<DialogAtom>(initialValues);

export const amenitiesDialogAtom = atom<DialogAtom>(initialValues);

export const accessbilityDialogAtom = atom<DialogAtom>(initialValues);

export const categoryDialogAtom = atom<DialogAtom>(initialValues);

export const serviceDialogAtom = atom<DialogAtom>(initialValues);
