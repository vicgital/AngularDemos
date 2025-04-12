import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private logger = inject(LoggingService);

    private tasks = signal<Task[]>([]);

    allTasks = this.tasks.asReadonly();

    addTask(taskData: {title: string, description: string}) {
        this.logger.log(`Adding task: ${taskData.title}`);   
        const newTask: Task = {
            id: Math.random().toString(),
            title: taskData.title,
            description: taskData.description,
            status: 'OPEN'
        };
        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    }

    updateTaskStatus(taskId:string, newStatus: TaskStatus){
        this.logger.log(`Updating task status: ${taskId} to ${newStatus}`);
        this.tasks.update((oldTasks) => oldTasks.map((task) => {
            return task.id === taskId ? {...task, status: newStatus} : task;
        }));
    } 
}