
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;  // Use primitive string

    @IsString()
    @IsNotEmpty()
    password: string;  // Use primitive string
}