import { SharedDataService } from './../../shared-data.service';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

export interface ToDoTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent  {
  formGroup: FormGroup;
  @Output() taskAdded = new EventEmitter<ToDoTask>();
  editTask: ToDoTask | null = null;

  constructor(private sharedDataService: SharedDataService) {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
      description: new FormControl('',[Validators.maxLength(60)]),
    });

    this.sharedDataService.currentTask.subscribe(task => {
      this.editTask = task;
      if (this.editTask) {
        this.formGroup.patchValue({
          title: this.editTask.title,
          description: this.editTask.description
        });
      }
    });
  }


  updateTodo() {
    if (this.formGroup.valid) {
      const newTask: ToDoTask = {
        id: this.editTask ? this.editTask.id : uuidv4(),
        title: this.formGroup.value.title,
        description: this.formGroup.value.description,
        completed: false,
      };
      this.taskAdded.emit(newTask);
      this.formGroup.reset();
      this.editTask = null;
    } else {
      }  }

  cancelEdit(){
    this.formGroup.reset();
    this.editTask = null;

  }
}