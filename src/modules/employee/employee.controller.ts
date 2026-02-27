import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';

@Controller('/employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    async getEmployee() {
        return this.employeeService.getAllEmployee();
    }

    @Get('/:id')
    async getEmployeeById(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.employeeService.getEmployeeById(id);
    }

    @Post()
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeeService.createEmployee(createEmployeeDto);
    }

    @Patch('/:id')
    async updateEmployee(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateEmployeeDto: UpdateEmployeeDto,
    ) {
        return this.employeeService.updateEmployee(id, updateEmployeeDto);
    }

    @Delete('/:id')
    async deleteEmployee(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.employeeService.deleteEmployee(id);
    }
}
