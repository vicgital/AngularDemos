import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { ITaskForm } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  @Input({required: true}) userId!: string;
  @Input() name?: string; 

  
  constructor(private tasksService: TasksService) {
  }

  showNewTask:boolean = false;
  
  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId!);
  }

  onShowNewTask() {
    this.showNewTask = true;
  }

  onCloseNewTask() {
    this.showNewTask = false;
  }

}
