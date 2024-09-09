 
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

export const clinicEditDialog = atom<DialogAtom>(initialValues);

export const amenitiesEditDialog = atom<DialogAtom>(initialValues);

export const categoryEditDialog = atom<DialogAtom>(initialValues);

export const serviceDialogAtom = atom<DialogAtom>(initialValues);