import { Database } from "./db.types";

export enum Role  {
    admin = "ADMIN", 
    doctor = "doctor"
} 

export type User = { 
}

export type Amenities = Database["public"]["Tables"]["amenities"]["Row"]

export type Clinic = Database["public"]["Tables"]["clinics"]["Row"]

export type Service = Database["public"]["Tables"]["services"]["Row"]

// const t: Service[""]