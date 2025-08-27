import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, MatToolbar, MatToolbarRow, MatDividerModule, MatButtonModule, MatIconModule],
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

