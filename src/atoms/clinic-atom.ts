import { atom } from "jotai";
import { Clinic, ClinicWithDoctor } from "@/types/types";
import { loadable } from "jotai/utils";
import { getAllClinics } from "@/actions";

export const clinicEditDataAtom = atom<Clinic>();

export const clinicAtom = atom<Clinic>();

export const clinicWithDoctorAtom = atom<ClinicWithDoctor>();

export const clinicsAtom = atom<ClinicWithDoctor[]>([]);

const clinicsLoadableAtom = atom(async () => {
	return await getAllClinics();
});

export const clinicsLoadable = loadable(clinicsLoadableAtom);
