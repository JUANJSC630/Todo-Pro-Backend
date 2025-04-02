import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Note } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) { }

  async getAllNotes(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async createNote(note: Note): Promise<Note> {
    return this.prisma.note.create({ data: note });
  }

  async getNoteById(id: string): Promise<Note> {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async deleteNote(id: string): Promise<void> {
    await this.prisma.note.delete({ where: { id } });
  }

  async updateNote(id: string, note: Note): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data: note });
  }

}
