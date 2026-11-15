"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    tasks = [];
    nextId = 1;
    create(createTaskDto) {
        const duplicate = this.tasks.find((task) => task.judul.toLowerCase() === createTaskDto.judul.toLowerCase() &&
            task.matakuliah === createTaskDto.matakuliah &&
            task.deadline.toISOString().slice(0, 10) === createTaskDto.deadline);
        if (duplicate) {
            throw new common_1.ConflictException('Tugas dengan judul, mata kuliah, dan deadline tersebut sudah ada.');
        }
        const newTask = {
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
    findAll() {
        return this.tasks;
    }
    findOne(id) {
        const task = this.tasks.find((item) => item.id === id);
        if (!task) {
            throw new common_1.NotFoundException(`Tugas dengan ID ${id} tidak ditemukan.`);
        }
        return task;
    }
    update(id, updateTaskDto) {
        const task = this.findOne(id);
        const updatedJudul = updateTaskDto.judul ?? task.judul;
        const updatedMatakuliah = updateTaskDto.matakuliah ?? task.matakuliah;
        const updatedDeadline = updateTaskDto.deadline ?? task.deadline.toISOString().slice(0, 10);
        const duplicate = this.tasks.find((item) => item.id !== id &&
            item.judul.toLowerCase() === updatedJudul.toLowerCase() &&
            item.matakuliah === updatedMatakuliah &&
            item.deadline.toISOString().slice(0, 10) === updatedDeadline);
        if (duplicate) {
            throw new common_1.ConflictException('Data tugas tersebut sudah tersedia.');
        }
        Object.assign(task, updateTaskDto);
        if (updateTaskDto.deadline) {
            task.deadline = new Date(updateTaskDto.deadline);
        }
        return task;
    }
    remove(id) {
        const task = this.findOne(id);
        this.tasks = this.tasks.filter((item) => item.id !== id);
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map