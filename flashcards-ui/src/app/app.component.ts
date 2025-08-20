import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbar, MatToolbarRow],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent
{
  title = 'Flashcards UI';
}
