
export enum Role  {
    admin = "ADMIN",
    user = "USER",
    clinic = "CLINIC"
}

export type User = {
    uuid: string;
    email: string;
    password?: string;
    phone: string;
    fullName: string;
    username: string; 
    picture?: string;
    providerId?: string
    emailVerified?: string
    phoneVerified?: string
    role: Role
    createdAt?: string;
    updatedAt?: string;
} 

export type SignUpUser = Pick<User, "email" | "password" | "phone" | "fullName" | "role" | "username">