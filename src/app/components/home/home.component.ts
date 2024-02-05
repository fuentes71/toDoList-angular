import { Component, Output } from '@angular/core';
import { FormsComponent, ToDoTask } from '../forms/forms.component';
import { NgFor } from '@angular/common';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsComponent, NgFor, TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public todos$: ToDoTask[] = [{id:"efw",title:"wefefefefefefefefefe",description:"wefefefefefefefefefewefefefefefefefefefewefefefefefefefefefe",completed:false}];

  idTask: string | null = null;
  receiveTask(updateTask: ToDoTask) {
    const existTodoIndex = this.todos$.findIndex((task: ToDoTask) => task.id === updateTask.id);

    if (existTodoIndex !== -1) {
        this.todos$[existTodoIndex] = {
            ...this.todos$[existTodoIndex],
            title: updateTask.title,
            description: updateTask.description,
            completed: updateTask.completed
        };
    } else {
        this.todos$.push(updateTask);
    }
  }

  onHandleCompleted(id: string) {
    this.todos$.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
  }

  onHandleDelet(id: string) {
    const index = this.todos$.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.todos$.splice(index, 1);
    }
  }
}
