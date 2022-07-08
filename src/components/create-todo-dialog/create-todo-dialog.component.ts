import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ICreateTodoInterface} from '../../interfaces/create.todo.interface';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IProjectInterface} from '../../interfaces/project.interface';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.scss']
})

export class CreateTodoDialogComponent implements OnInit {

  form!: FormGroup;
  projectLabels!: {id: number, title: string}[] | any;
  projects!: IProjectInterface[] | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.projects = this.data
  }

  ngOnInit() {
    this.createForm();
    this.getProjectLabels();
  }

  createForm() {
    this.form = this.fb.group({
      todo_list_id: ['', [Validators.required]],
      text: ['', [Validators.required]],
    })
  }

  submitForm() {
    if (this.form.status === "VALID") {
      this.addTodo(this.form.value)
        .subscribe({
          next: data => {
            this.data.projects.find((project: IProjectInterface) => project.id === this.form.value.todo_list_id)
              .todos
              .push(data);

            this.form.reset();
          }
        })
    }
  }

  addTodo(data: ICreateTodoInterface) {
    return this.http.post(`${environment.apiUrl}/todos`, {...data, isCompleted: false})
  }

  getProjectLabels() {
    return this.http.get(`${environment.apiUrl}/projects-labels`)
      .subscribe(data => {
        this.projectLabels = data
      })
  }

}
