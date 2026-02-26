import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get('/:username')
    getUserByusername(@Param('username') username: string) {
        return { name: 'kelvin', username: username };
    }

    @Get('/')
    getUsers() {
        return this.employeeService.getAllEmployee();
    }
}
