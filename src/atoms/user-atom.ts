import { Role, Status, User } from "@/types/types";
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
	status: Status.unverified,
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
