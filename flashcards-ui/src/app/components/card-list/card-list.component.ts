import { Component, inject, OnInit, Signal } from '@angular/core';
import { Flashcard } from '../../flashcard.model';
import { signal } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-card-list',
  imports: [MatProgressSpinnerModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})


export class CardListComponent implements OnInit
{
  private flashcardsService = inject(FlashcardsService);

  cards: Signal<Flashcard[]> = this.flashcardsService.flashcards;

  loading = signal(true);
  loadingError = signal(false);



  ngOnInit(): void
  {
    this.flashcardsService.getFlashcards()
      .catch(() => this.loadingError.set(true))
      .finally(() => this.loading.set(false));
  }
}

