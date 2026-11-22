import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const deadline = new Date(createTaskDto.deadline);

    // Pertahankan validasi duplikasi dari implementasi Pekan 9.
    const duplicate = await this.prisma.task.findFirst({
      where: {
        judul: { equals: createTaskDto.judul, mode: 'insensitive' },
        matakuliah: createTaskDto.matakuliah,
        deadline,
      },
    });

    if (duplicate) {
      throw new ConflictException(
        'Tugas dengan judul, mata kuliah, dan deadline tersebut sudah ada.',
      );
    }

    return this.prisma.task.create({
      data: {
        judul: createTaskDto.judul,
        deskripsi: createTaskDto.deskripsi ?? '',
        matakuliah: createTaskDto.matakuliah,
        deadline,
        prioritas: createTaskDto.prioritas,
        status: createTaskDto.status,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      orderBy: { deadline: 'asc' },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Tugas dengan ID ${id} tidak ditemukan.`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    const updatedJudul = updateTaskDto.judul ?? task.judul;
    const updatedMatakuliah = updateTaskDto.matakuliah ?? task.matakuliah;
    const updatedDeadline = updateTaskDto.deadline
      ? new Date(updateTaskDto.deadline)
      : task.deadline;

    const duplicate = await this.prisma.task.findFirst({
      where: {
        id: { not: id },
        judul: { equals: updatedJudul, mode: 'insensitive' },
        matakuliah: updatedMatakuliah,
        deadline: updatedDeadline,
      },
    });

    if (duplicate) {
      throw new ConflictException('Data tugas tersebut sudah tersedia.');
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        ...(updateTaskDto.judul !== undefined && {
          judul: updateTaskDto.judul,
        }),
        ...(updateTaskDto.deskripsi !== undefined && {
          deskripsi: updateTaskDto.deskripsi,
        }),
        ...(updateTaskDto.matakuliah !== undefined && {
          matakuliah: updateTaskDto.matakuliah,
        }),
        ...(updateTaskDto.deadline !== undefined && {
          deadline: new Date(updateTaskDto.deadline),
        }),
        ...(updateTaskDto.prioritas !== undefined && {
          prioritas: updateTaskDto.prioritas,
        }),
        ...(updateTaskDto.status !== undefined && {
          status: updateTaskDto.status,
        }),
      },
    });
  }

  async remove(id: number) {
    // Cek dahulu agar respons 404 tetap sama seperti implementasi sebelumnya.
    await this.findOne(id);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
