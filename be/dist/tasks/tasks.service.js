"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTaskDto) {
        const deadline = new Date(createTaskDto.deadline);
        const duplicate = await this.prisma.task.findFirst({
            where: {
                judul: { equals: createTaskDto.judul, mode: 'insensitive' },
                matakuliah: createTaskDto.matakuliah,
                deadline,
            },
        });
        if (duplicate) {
            throw new common_1.ConflictException('Tugas dengan judul, mata kuliah, dan deadline tersebut sudah ada.');
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
    async findOne(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Tugas dengan ID ${id} tidak ditemukan.`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
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
            throw new common_1.ConflictException('Data tugas tersebut sudah tersedia.');
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
    async remove(id) {
        await this.findOne(id);
        return this.prisma.task.delete({
            where: { id },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map