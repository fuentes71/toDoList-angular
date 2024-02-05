import { SharedDataService } from './../../shared-data.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoTask } from '../forms/forms.component';
import { NgClass, NgFor, NgOptimizedImage } from '@angular/common';

interface submitEvent{
  id: string,
  edit?: boolean,
  delet?: boolean,
  completed?:boolean
}
@Component({
  selector: 'list-task',
  standalone: true,
  imports: [NgFor,NgClass,NgOptimizedImage],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  constructor( private SharedDataService: SharedDataService){}
  @Input() tasks: ToDoTask[] = [];
  @Output("completedTask") completedTask = new EventEmitter<string>()
  @Output("deletTask") deletTask = new EventEmitter<string>()
 
  onChangeCompleted(id:string): void {
    this.completedTask.emit(id)
  }
  onChangeDelet(id:string): void {
    this.deletTask.emit(id)
  }
  onChangeEdit(task:ToDoTask): void {
    this.SharedDataService.setCurrentTask(task)
  }

}
