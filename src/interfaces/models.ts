export interface User {
    uuid: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    email: string;
    phoneNumber?: string;
    festivals: FestivalUser[];
}

export interface FestivalUser {
    festival: Festival;
    balance: number;
    payments: Payment[];
    role: Role;
    imageUrl?: string;
}

export interface Festival {
    uuid: string;
    name: string;
    description?: string;
    location?: string;
}

export type Role = "visitor" | "employee" | "organisator";

export interface Payment {
    uuid: string;
    amount: number;
    description?: string;
    festival: Festival;
}

export interface QRCode {
    uuid: string;
    user: User;
    festival: Festival;
}

export interface Response<T> {
    status: number;
    message: string;
    data: T;
    errors?: {
        code: number;
        message: string;
        debug?: string;
    }[];
}
