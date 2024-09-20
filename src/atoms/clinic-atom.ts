import { atom } from "jotai";
import { Clinic, ClinicWithDoctor } from "@/types/types";

export const clinicEditDataAtom = atom<Clinic>();

export const clinicAtom = atom<Clinic>();

export const clinicWithDoctorAtom = atom<ClinicWithDoctor>();
