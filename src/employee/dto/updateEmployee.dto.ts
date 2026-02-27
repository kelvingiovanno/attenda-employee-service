import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    fullname: string;
}
