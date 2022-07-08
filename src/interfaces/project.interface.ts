import {ITodoInterface} from './todo.interface';

export interface IProjectInterface {
  id: number,
  title: string,
  todos: ITodoInterface[],
}
