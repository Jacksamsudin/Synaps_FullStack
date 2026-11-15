import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): import("./entities/task.entity").Task;
    findAll(): import("./entities/task.entity").Task[];
    findOne(id: number): import("./entities/task.entity").Task;
    update(id: number, updateTaskDto: UpdateTaskDto): import("./entities/task.entity").Task;
    remove(id: number): import("./entities/task.entity").Task;
}
