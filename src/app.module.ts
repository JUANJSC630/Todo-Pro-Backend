// app.module.ts
import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { ChecklistsModule } from './modules/checklists/checklists.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [
    TasksModule,
    ChecklistsModule,
    NotesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
