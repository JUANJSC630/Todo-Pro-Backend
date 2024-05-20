//metodos que se comunican con la base de datos
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Checklist, Item } from '@prisma/client';

@Injectable()
export class ChecklistService {
    constructor(private prisma: PrismaService) {}

    // Checklists methods

    async getAllChecklist(): Promise<Checklist[]> {
        return this.prisma.checklist.findMany({
            include: {
                items: true,
            },
        });
    }

    async getChecklistById(id: number): Promise<Checklist> {
        return this.prisma.checklist.findUnique({
            where: {
                id: id,
            },
            include: {
                items: true,
            },
        });
    }

    async createChecklistWithItems(data: {
        titulo: string;
        items: Item[];
    }): Promise<Checklist> {
        const { titulo, items } = data;

        // Crear la lista de verificación
        const checklist = await this.prisma.checklist.create({
            data: {
                titulo,
            },
        });

        if (!items || items.length === 0) {
            return checklist;
        }

        // Asignar checklistId a cada elemento y crear los elementos
        const itemsWithChecklistId = items.map((item) => ({
            ...item,
            checklistId: checklist.id,
        }));
        await this.prisma.item.createMany({
            data: itemsWithChecklistId,
        });

        return checklist;
    }

    async updateChecklist(id: number, data: Partial<Checklist>): Promise<Checklist> {
        return this.prisma.checklist.update({
            where: {
                id: id,
            },
            data: {
                ...data,
            },
        });
    }

    async deleteChecklist(id: number): Promise<void> {
        await this.prisma.$transaction([
            this.prisma.item.deleteMany({
                where: {
                    checklistId: id,
                },
            }),
            this.prisma.checklist.delete({
                where: {
                    id: id,
                },
            }),
        ]);
    }

    // Items methods
    async addItemToChecklist(checklistId: number, itemData): Promise<Item> {
        // Verificar si la lista de verificación existe
        const checklist = await this.prisma.checklist.findUnique({
            where: { id: checklistId },
            include: { items: true }, // Incluir los items asociados a la lista de verificación
        });

        if (!checklist) {
            throw new NotFoundException(`Checklist with id ${checklistId} not found`);
        }

        // Crear el nuevo item y asociarlo a la lista de verificación
        const newItem = await this.prisma.item.create({
            data: {
                ...itemData,
                checklist: { connect: { id: checklistId } }, // Conectar el nuevo item a la lista de verificación existente
            },
        });

        return newItem;
    }

    async getItemById(itemId: number): Promise<Item> {
        return this.prisma.item.findUnique({
            where: {
                id: itemId,
            },
        });
    }

    async getAllItemsByChecklistId(checklistId: number): Promise<Item[]> {
        return this.prisma.item.findMany({
            where: {
                checklistId: checklistId,
            },
        });
    }

    async updateItem(itemId: number, data: Partial<Item>): Promise<Item> {
        return this.prisma.item.update({
            where: {
                id: itemId,
            },
            data: {
                ...data,
            },
        });
    }

    async deleteItem(itemId: number): Promise<Item> {
        return this.prisma.item.delete({
            where: {
                id: itemId,
            },
        });
    }
}
    