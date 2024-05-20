import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ChecklistService } from './checklists.service';
import { Checklist, Item } from '@prisma/client';

//metodos que se comunican con el cliente
//se encarga de recibir las peticiones y enviar las respuestas
@Controller('checklists')
export class ChecklistsController {
    constructor(private readonly checklistService: ChecklistService) {}

    // Checklists endpoints

    @Get()
    async getAllChecklist() {
        return this.checklistService.getAllChecklist();
    }

    @Post()
    async createChecklistWithItems(
        @Body() data: { titulo: string; items: Item[] },
    ): Promise<Checklist> {
        return this.checklistService.createChecklistWithItems(data);
    }

    @Get(':id')
    async getChecklistById(@Param('id') id: string) {
        return this.checklistService.getChecklistById(Number(id));
    }

    @Delete(':id')
    async deleteChecklist(@Param('id') id: string, res: Response) {
        try {
            await this.checklistService.deleteChecklist(Number(id));
        } catch (error) {
            console.error(error);
        }
    }

    // Items endpoints

    @Post(':checklistId/items')
    async addItemToChecklist(
        @Param('checklistId') checklistId: string,
        @Body() itemData: Omit<Item, 'id' | 'checklistId'>,
    ): Promise<Item> {
        return this.checklistService.addItemToChecklist(
            Number(checklistId),
            itemData,
        );
    }

    @Get(':checklistId/items')
    async getAllItemsByChecklistId(
        @Param('checklistId') checklistId: string,
    ): Promise<Item[]> {
        return this.checklistService.getAllItemsByChecklistId(
            Number(checklistId),
        );
    }

    @Get(':checklistId/items/:itemId')
    async getItemById(@Param('itemId') itemId: string): Promise<Item> {
        return this.checklistService.getItemById(Number(itemId));
    }

    @Put(':checklistId/items/:itemId')
    async updateItem(
        @Param('itemId') itemId: string,
        @Body() data: Partial<Item>,
    ): Promise<Item> {
        return this.checklistService.updateItem(Number(itemId), data);
    }

    @Delete(':checklistId/items/:itemId')
    async deleteItem(@Param('itemId') itemId: string): Promise<Item> {
        return this.checklistService.deleteItem(Number(itemId));
    }
}
