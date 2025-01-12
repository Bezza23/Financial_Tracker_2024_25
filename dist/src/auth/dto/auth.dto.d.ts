import { Role } from '@prisma/client';
export declare class AuthDto {
    email: string;
    password: string;
    role?: Role;
    constructor(email: string, password: string, role?: Role);
}
