import { Component, OnInit } from '@angular/core';
import {IProjectInterface} from '../../interfaces/project.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ITodoInterface} from '../../interfaces/todo.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  projects!: IProjectInterface[] | any;

  constructor(private http: HttpClient) {}

  ngOnInit(): any {
    this.getProjects()
  }

  getProjects() {
    return this.http.get(`${environment.apiUrl}/projects`)
      .subscribe(data => this.projects = data)
  }

  updateTodo({projectId, todoId, text, isCompleted}: any) {
    return this.http.patch(
      `${environment.apiUrl}/projects/${projectId}/todo/${todoId}`,
      {
        todo: {
          text: text,
          isCompleted: isCompleted,
        }
      })
      .subscribe((result: any) => {
        this.projects.find((project: IProjectInterface) => project.id === projectId)
          .todos
          .find((todo: ITodoInterface) => todo.id === result.id)
          .isCompleted = result.isCompleted
      })
  }

}
