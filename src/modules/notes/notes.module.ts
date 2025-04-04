import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [PrismaModule],
})
export class NotesModule {}
