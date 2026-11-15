import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
export declare class TasksService {
    private tasks;
    private nextId;
    create(createTaskDto: CreateTaskDto): Task;
    findAll(): Task[];
    findOne(id: number): Task;
    update(id: number, updateTaskDto: UpdateTaskDto): Task;
    remove(id: number): Task;
}
