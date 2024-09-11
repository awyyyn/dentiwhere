 
import { atom,  } from 'jotai'  

interface DialogAtom {
    open: boolean;
    mode?: "create" | "edit" | "delete" | "view"; 
}
 
const initialValues = {
    open: false,
    mode: "view" as const 
}

export const searchClinicDialog = atom<boolean>(false);

export const clinicDialogDialog = atom<DialogAtom>(initialValues);

export const amenitiesDialogDialog = atom<DialogAtom>(initialValues);

export const categoryDialogDialog = atom<DialogAtom>(initialValues);

export const serviceDialogAtom = atom<DialogAtom>(initialValues);