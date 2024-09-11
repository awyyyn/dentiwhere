import { Database } from "./db.types";

 
export enum Role  {
    admin = "ADMIN", 
    doctor = "DOCTOR",
    superAdmin = "SUPER_ADMIN"
} 


export type User = { 
    id: number;
    licenseNumber: string;
    email: string;
    name: string;
    address?: string;
    birthDate?: string | Date;
    contacts: string[];
    clinicId?: number;
    role: Role,
    img: string,
    authId: string;
    boost: boolean;
    verified: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
} 

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
    services?: Service[]
    boosted: boolean;
    archive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}   



export type Service = {
    id: number;
    clinicId: number;
    categoryId: number;
    name: string;
    img: string;
    description?: string;
    rate?: string;
    active: boolean;
    createdAt: Date | string
    updatedAt: Date | string;
}

export type ServiceCreateInput = Omit<Service, "id" | "createdAt" | "updatedAt" | "clinicId" | "rate">;

export type Amenities = {
    id: number;
    clinicId: number
    name: string;
    createdAt: Date | string;
    updatedAt: Date | string
}

export type Category = {
    id: number;
    name: string;
    clinicId: number;
    createdAt: Date | string;  
    updatedAt: Date | string;
}

export type DBCategory = Database["public"]["Tables"]["category"]["Row"];
export type DBUser = Database["public"]["Tables"]["user"]["Row"];
export type DBService = Database["public"]["Tables"]["services"]["Row"];
export type DBClinic = Database["public"]["Tables"]["clinics"]["Row"];
export type DBAminities = Database["public"]["Tables"]["amenities"]["Row"];
