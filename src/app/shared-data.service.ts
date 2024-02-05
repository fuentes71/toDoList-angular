import { Injectable } from '@angular/core';
import { ToDoTask } from './components/forms/forms.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private currentTaskSubject = new BehaviorSubject<ToDoTask|null>(null);

   currentTask = this.currentTaskSubject.asObservable();

  constructor() { }

  setCurrentTask(task: ToDoTask){
    this.currentTaskSubject.next(task)
  }

  getCurrentTask(): ToDoTask | null {
    return this.currentTaskSubject.value
  }
}
