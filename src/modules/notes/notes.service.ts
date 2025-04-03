import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) { }

  async getAllNotes(): Promise<NoteDto[]> {
    return this.prisma.note.findMany();
  }

  async createNote(note: NoteDto): Promise<NoteDto> {
    return this.prisma.note.create({ data: note });
  }

  async getNoteById(id: number): Promise<NoteDto> {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async deleteNote(id: number): Promise<void> {
    await this.prisma.note.delete({ where: { id } });
  }

  async updateNote(id: number, note: NoteDto): Promise<NoteDto> {
    return this.prisma.note.update({ where: { id }, data: note });
  }
}
