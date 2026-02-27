import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from 'generated/prisma/client';
import {
    EmployeeCreateInput,
    EmployeeUpdateInput,
} from 'generated/prisma/models';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllEmployee(): Promise<Employee[] | null> {
        return await this.prisma.employee.findMany();
    }

    async getEmployeeById(id: string): Promise<Employee> {
        const employee = await this.prisma.employee.findUnique({
            where: { id: id },
        });

        if (!employee) {
            throw new NotFoundException();
        }

        return employee;
    }

    async createEmployee(data: EmployeeCreateInput): Promise<Employee> {
        return await this.prisma.employee.create({
            data: data,
        });
    }

    async updateEmployee(
        id: string,
        data: EmployeeUpdateInput,
    ): Promise<Employee> {
        const employee = await this.prisma.employee.update({
            where: { id: id },
            data: data,
        });

        if (!employee) {
            throw new NotFoundException();
        }

        return employee;
    }

    async deleteEmployee(id: string): Promise<Employee | null> {
        const employee = await this.prisma.employee.delete({
            where: { id: id },
        });

        if (!employee) {
            throw new NotFoundException();
        }

        return employee;
    }
}
