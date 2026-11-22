import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        judul: string;
        deskripsi: string;
        matakuliah: string;
        deadline: Date;
        prioritas: string;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        judul: string;
        deskripsi: string;
        matakuliah: string;
        deadline: Date;
        prioritas: string;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        judul: string;
        deskripsi: string;
        matakuliah: string;
        deadline: Date;
        prioritas: string;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        judul: string;
        deskripsi: string;
        matakuliah: string;
        deadline: Date;
        prioritas: string;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        judul: string;
        deskripsi: string;
        matakuliah: string;
        deadline: Date;
        prioritas: string;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
