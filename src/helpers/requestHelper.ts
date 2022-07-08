import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {IProjectInterface} from '../interfaces/project.interface';

export default class RequestHelper {
  public projects!: IProjectInterface[] | any;

  constructor(private http: HttpClient) {}

  public getProjects(): any {
    return this.http.get(`${environment.apiUrl}/projects`)
      .subscribe(data => {
        this.projects = data
      })
  }

}
