import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
    controllers: [TasksController],
    providers: [TaskService],
    imports: [PrismaModule],
})
export class TasksModule {}
