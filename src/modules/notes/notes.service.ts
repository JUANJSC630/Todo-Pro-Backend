import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Notes } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) { }

  async getAllNotes(): Promise<Notes[]> {
    return this.prisma.notes.findMany();
  }

  async createNote(note: Notes): Promise<Notes> {
    return this.prisma.notes.create({ data: note });
  }

  async getNoteById(id: number): Promise<Notes> {
    return this.prisma.notes.findUnique({ where: { id } });
  }

  async deleteNote(id: number): Promise<void> {
    await this.prisma.notes.delete({ where: { id } });
  }

  async updateNote(id: number, note: Notes): Promise<Notes> {
    return this.prisma.notes.update({ where: { id }, data: note });
  }
}
