//metodos que se comunican con la base de datos
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Tasks } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    async getAllTasks(): Promise<Tasks[]> {
        return this.prisma.tasks.findMany();
    }

    async getTaskById(id: number): Promise<Tasks> {
        return this.prisma.tasks.findUnique({
            where: {
                id: id,
            },
        });
    }

    async createTask(data: Tasks): Promise<Tasks> {
        return this.prisma.tasks.create({
            data,
        });
    }

    async updateTask(id: number, data: Tasks): Promise<Tasks> {
        return this.prisma.tasks.update({
            where: {
                id: id,
            },
            data,
        });
    }

    async deleteTask(id: number): Promise<Tasks> {
        return this.prisma.tasks.delete({
            where: {
                id: id,
            },
        });
    }
}
