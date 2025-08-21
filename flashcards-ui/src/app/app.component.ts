import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {ExamModeComponent} from './exam-mode/exam-mode.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ExamModeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent
{
  title = 'Flashcards UI';
}
