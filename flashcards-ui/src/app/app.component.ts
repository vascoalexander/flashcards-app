import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, MatToolbar, MatToolbarRow, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent
{
  title = 'Flashcards UI';
  currentYear = new Date().getFullYear();
  footerTitle = `Triple A © ${this.currentYear}`;

  private router = inject(Router);

  backToHome()
  {
    this.router.navigate(['']);
  }
}

