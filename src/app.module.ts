// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://todo_user:RlsLHgLXYZfjtgCS@cluster0.zvrufoz.mongodb.net/todopro',
    ),
    TasksModule,
  ],
})
export class AppModule {}
