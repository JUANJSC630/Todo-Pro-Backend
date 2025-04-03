import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./tasks.service";
import { Tasks } from "@prisma/client";

//metodos que se comunican con el cliente
//se encarga de recibir las peticiones y enviar las respuestas
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(@Body() data: Tasks) {
    return this.tasksService.createTask(data);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string){
    return this.tasksService.getTaskById(Number(id));
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string){
    return this.tasksService.deleteTask(Number(id));
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Tasks){
    return this.tasksService.updateTask(Number(id), data);
  }
}