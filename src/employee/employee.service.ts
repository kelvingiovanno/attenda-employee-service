import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { Employee } from 'generated/prisma/client';
import {
    EmployeeCreateInput,
    EmployeeUpdateInput,
} from 'generated/prisma/models';
import { ErrorCode } from 'src/common/errors/error-code.enum';
import { rpcError } from 'src/common/errors/rpc-error';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllEmployeeDto } from './employee.dto';

@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllEmployee(dto: GetAllEmployeeDto): Promise<Employee[]> {
        const { page = 1, limit = 10 } = dto;

        return this.prisma.employee.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                deletedAt: null,
            },
        });
    }

    async getEmployeeById(id: string): Promise<Employee> {
        const employee = await this.prisma.employee.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
        });

        if (!employee) {
            rpcError({
                code: ErrorCode.NOT_FOUND,
                message: 'Employee not found.',
            });
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
        try {
            const employee = await this.prisma.employee.update({
                where: { id: id },
                data: data,
            });

            return employee;
        } catch (err) {
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === '2025'
            ) {
                rpcError({
                    code: ErrorCode.NOT_FOUND,
                    message: 'Employee not found.',
                });
            }

            rpcError({
                code: ErrorCode.DATABASE_ERROR,
                message: 'Database error.',
            });
        }
    }

    async deleteEmployee(id: string): Promise<Employee> {
        try {
            const employee = await this.prisma.employee.update({
                where: {
                    id: id,
                    deletedAt: null,
                },
                data: {
                    deletedAt: new Date(),
                },
            });

            return employee;
        } catch (err) {
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === '2025'
            ) {
                rpcError({
                    code: ErrorCode.NOT_FOUND,
                    message: 'Employee not found.',
                });
            }

            rpcError({
                code: ErrorCode.DATABASE_ERROR,
                message: 'Database error.',
            });
        }
    }
}
