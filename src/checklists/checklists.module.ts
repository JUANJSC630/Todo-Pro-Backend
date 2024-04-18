import { Module } from '@nestjs/common';
import { ChecklistsController } from './checklists.controller';
import { ChecklistService } from './checklists.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [ChecklistsController],
    providers: [ChecklistService],
    imports: [PrismaModule],
})
export class ChecklistsModule {}
