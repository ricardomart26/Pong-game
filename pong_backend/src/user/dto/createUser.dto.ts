import { IsNotEmpty } from 'class-validator'


export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    avatar: string;

    @IsNotEmpty()
    password: string;


}