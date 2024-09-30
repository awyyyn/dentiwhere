import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { Clinic, ClinicWithDoctor } from "@/types/types";
import { getAllClinics, getClinicsGeo } from "@/actions";

export const clinicEditDataAtom = atom<Clinic>();

export const clinicAtom = atom<Clinic>();

export const clinicWithDoctorAtom = atom<ClinicWithDoctor>();

export const clinicsAtom = atom<ClinicWithDoctor[]>([]);

const clinicsLoadableAtom = atom(async () => {
	return await getAllClinics();
});

export const clinicsLoadable = loadable(clinicsLoadableAtom);

const geoClinicsLoadableAtom = atom(async () => {
	return await getClinicsGeo();
});

export const geoClinicsLoadable = loadable(geoClinicsLoadableAtom);
