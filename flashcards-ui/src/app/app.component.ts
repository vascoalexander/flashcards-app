import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {QuizComponent} from './quiz/quiz.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent
{
  title = 'Flashcards UI';
}
