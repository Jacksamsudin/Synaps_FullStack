
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const duplicate = this.tasks.find(
      (task) =>
        task.judul.toLowerCase() === createTaskDto.judul.toLowerCase() &&
        task.matakuliah === createTaskDto.matakuliah &&
        task.deadline.toISOString().slice(0, 10) === createTaskDto.deadline,
    );

    if (duplicate) {
      throw new ConflictException(
        'Tugas dengan judul, mata kuliah, dan deadline tersebut sudah ada.',
      );
    }

    const newTask: Task = {
      id: this.nextId++,
      judul: createTaskDto.judul,
      deskripsi: createTaskDto.deskripsi ?? '',
      matakuliah: createTaskDto.matakuliah,
      deadline: new Date(createTaskDto.deadline),
      prioritas: createTaskDto.prioritas,
      status: createTaskDto.status,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) {
      throw new NotFoundException(`Tugas dengan ID ${id} tidak ditemukan.`);
    }

    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    const updatedJudul = updateTaskDto.judul ?? task.judul;
    const updatedMatakuliah =
      updateTaskDto.matakuliah ?? task.matakuliah;
    const updatedDeadline =
      updateTaskDto.deadline ?? task.deadline.toISOString().slice(0, 10);

    const duplicate = this.tasks.find(
      (item) =>
        item.id !== id &&
        item.judul.toLowerCase() === updatedJudul.toLowerCase() &&
        item.matakuliah === updatedMatakuliah &&
        item.deadline.toISOString().slice(0, 10) === updatedDeadline,
    );

    if (duplicate) {
      throw new ConflictException('Data tugas tersebut sudah tersedia.');
    }

    Object.assign(task, updateTaskDto);

    if (updateTaskDto.deadline) {
      task.deadline = new Date(updateTaskDto.deadline);
    }

    return task;
  }

  remove(id: number): Task {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter((item) => item.id !== id);
    return task;
  }
}
