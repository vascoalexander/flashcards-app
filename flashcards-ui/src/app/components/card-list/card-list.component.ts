import { Component, inject, OnInit, Signal } from '@angular/core';
import { Flashcard } from '../../flashcard.model';
import { signal } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-list',
  imports: [MatProgressSpinnerModule, MatCardModule, MatTableModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})


export class CardListComponent implements OnInit
{
  private flashcardsService = inject(FlashcardsService);
  private router = inject(Router);

  flashcards: Signal<Flashcard[]> = this.flashcardsService.flashcards;
  columnNames = ['id', 'question'];

  loading = signal(true);
  loadingError = signal(false);



  ngOnInit(): void
  {
    this.flashcardsService.getFlashcards()
      .catch(() => this.loadingError.set(true))
      .finally(() => this.loading.set(false));
  }

    clickCardDetail(id: number)
    {
    this.router.navigate(['/cards', id]);
  }
}

