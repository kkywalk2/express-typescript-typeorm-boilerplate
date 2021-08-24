import { IsString, IsNumber, IsDateString, IsEmail, IsNumberString } from 'class-validator'

export class SignUpReq {
    @IsString()
    accountName: string
    @IsString()
    password: string
    @IsEmail()
    email: string
}