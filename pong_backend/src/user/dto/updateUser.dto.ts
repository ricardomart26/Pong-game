import { IsNotEmpty } from 'class-validator'


export class UpdateUserDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    avatar: string;

    @IsNotEmpty()
    password: string;


}