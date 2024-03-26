import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
  // Inyección del modelo de datos de tareas proporcionado por Mongoose
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  // Método para buscar todas las tareas
  findAll() {
    return this.taskModel.find();
  }

  // Método para crear una nueva tarea
  async create(createTask: CreateTaskDto) {
    // Crear una nueva instancia de Task utilizando el modelo y guardarla en la base de datos
    const newTask = new this.taskModel(createTask);
    return newTask.save();
  }

  // Método para encontrar una tarea por su ID
  async findOne(id: string) {
    return this.taskModel.findById(id);
  }

  // Método para eliminar una tarea por su ID
  async delete(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }

  // Método para actualizar una tarea por su ID
  async update(id: string, updateTask: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTask, { new: true });
  }
}
