import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Notes } from '@prisma/client';

// Controller para el manejo de notas
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Get()
  async getAllNotes() {
    try {
      return await this.notesService.getAllNotes();
    } catch (error) {
      throw new HttpException(
        { message: 'Error in getting the notes', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  async createNote(@Body() note: Notes) {
    try {
      return await this.notesService.createNote(note);
    } catch (error) {
      throw new HttpException(
        { message: 'Error in creating the note', error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string) {
    try {
      const note = await this.notesService.getNoteById(Number(id));
      if (!note) {
        throw new NotFoundException({
            message: 'Nota no encontrada',
            error: `La nota con ID ${id} no existe`,
          statusCode: HttpStatus.NOT_FOUND
        });
      }
      return note;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error in getting the note', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    try {
      const note = await this.notesService.getNoteById(Number(id));
      if (!note) {
        throw new NotFoundException({
          message: 'Note not found',
          error: `The note with ID ${id} does not exist`,
          statusCode: HttpStatus.NOT_FOUND
        });
      }
      return await this.notesService.deleteNote(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error in deleting the note', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() note: Notes) {
    try {
      const existingNote = await this.notesService.getNoteById(Number(id));
      if (!existingNote) {
        throw new NotFoundException({
          message: 'Note not found',
          error: `The note with ID ${id} does not exist`,
          statusCode: HttpStatus.NOT_FOUND
        });
      }
      return await this.notesService.updateNote(Number(id), note);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error in updating the note', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

