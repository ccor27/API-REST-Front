import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to angular';
  course: string = 'Course Spring 5 with Angular 7';
  student: string = 'Cristian osorio';
}
