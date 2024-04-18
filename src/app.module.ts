// app.module.ts
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ChecklistsModule } from './checklists/checklists.module';

@Module({
  imports: [
    TasksModule,
    ChecklistsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
