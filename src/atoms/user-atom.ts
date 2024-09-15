import { Role, User } from "@/types/types";
import { atom } from "jotai";

export const userAtomDefaultValue: User = {
	email: "",
	firstName: "",
	lastName: "",
	contacts: [],
	role: Role.doctor,
	authId: "",
	boost: false,
	id: 0,
	img: "",
	licenseId: {
		frontImg: "",
		backImg: "",
	},
	licenseNumber: "",
	verified: false,
	clinicId: 0,
	createdAt: "",
	updatedAt: "",
	address: "",
	birthDate: "",
	gender: "",
	postalId: "",
	verifiedId: "",
};

export const userAtom = atom<User>(userAtomDefaultValue);
