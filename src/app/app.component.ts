import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateTodoDialogComponent} from '../components/create-todo-dialog/create-todo-dialog.component';
import {CardsComponent} from '../components/cards/cards.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(CardsComponent) child !: any

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateTodoDialogComponent, {
      width: '465px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        projects: this.child.projects,
      }
    });
  }

}
