import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    fullname: string;
}
