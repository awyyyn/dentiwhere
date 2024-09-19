import { Database } from "./db.types";

export enum Role {
	admin = "ADMIN",
	doctor = "DOCTOR",
	superAdmin = "SUPER_ADMIN",
}

export interface LicensedIDImage {
	frontImg: string;
	backImg: string;
}

export enum Status {
	verified = "VERIFIED",
	unverified = "UNVERIFIED",
	PENDING = "PENDING",
}

export type Visit = {
	id: number;
	isMobile: boolean;
	createdAt: Date | string;
};

export type User = {
	id: number;
	licenseNumber: string;
	status: Status;
	email: string;
	firstName: string;
	lastName: string;
	postalId: string;
	verifiedId: string;
	gender: string;
	address?: string;
	birthDate?: string;
	contacts: string[];
	clinicId?: number;
	licenseId: LicensedIDImage;
	role: Role;
	img: string;
	authId: string;
	boost: boolean;
	verified: boolean;
	createdAt: Date | string;
	updatedAt: Date | string;
};

export type ClinicWithDoctor = Clinic & {
	doctor: string;
};

export type Clinic = {
	id: number;
	doctorId: number;
	name: string;
	address: string;
	contacts: string[];
	email: string;
	website?: string;
	description?: string;
	img: string;
	map?: string;
	services?: Service[];
	amenities?: Amenities[];
	accesibilities?: Accessibility[];
	categories?: Category[];
	boosted: boolean;
	archive: boolean;
	createdAt: Date | string;
	updatedAt: Date | string;
};

export type ServiceUpdateInput = Omit<Service, "createdAt" | "updatedAt"> & {
	userId: string;
};

export type Service = {
	id: number;
	clinicId: number;
	categoryId: number;
	name: string;
	img: string;
	description?: string;
	rate?: string;
	active: boolean;
	createdAt: Date | string;
	updatedAt: Date | string;
};

export type ServiceCreateInput = Omit<
	Service,
	"id" | "createdAt" | "updatedAt" | "clinicId" | "rate"
>;

export type Amenities = {
	id: number;
	clinicId: number;
	name: string;
	createdAt: Date | string;
	updatedAt: Date | string;
};

export type Accessibility = Amenities;

export type Category = {
	id: number;
	name: string;
	clinicId: number;
	createdAt: Date | string;
	updatedAt: Date | string;
};

export type DBCategory = Database["public"]["Tables"]["category"]["Row"];
export type DBUser = Database["public"]["Tables"]["user"]["Row"];
export type DBService = Database["public"]["Tables"]["services"]["Row"];
export type DBClinic = Database["public"]["Tables"]["clinics"]["Row"];
export type DBAmenities = Database["public"]["Tables"]["amenities"]["Row"];
export type DBAccessibility =
	Database["public"]["Tables"]["accessibility"]["Row"];
