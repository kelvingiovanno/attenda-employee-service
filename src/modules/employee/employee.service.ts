import { Injectable } from '@nestjs/common';
import { Employee } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllEmployee(): Promise<Employee[] | null> {
        return await this.prisma.employee.findMany();
    }
}
