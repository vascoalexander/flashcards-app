import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
<<<<<<< HEAD

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, MatToolbar, MatToolbarRow, MatDividerModule],
=======
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, MatToolbar, MatToolbarRow, MatDividerModule, MatButtonModule, MatIconModule],
>>>>>>> b62c5ac17ebcd96310b7f4f33a06e8984a673053
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

