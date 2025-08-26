import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Flashcard } from '../../flashcard.model';
import { signal } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-card-list',
  imports:
  [
    MatProgressSpinnerModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule,
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})


export class CardListComponent implements OnInit
{
  private flashcardsService = inject(FlashcardsService);
  private router = inject(Router);

  //dient als proxy
  flashcards: Signal<Flashcard[]> = this.flashcardsService.flashcards;
  filteredFlashcards = signal<Flashcard[]>([]);

  columnNames = ['id', 'question'];

  loading = signal(true);
  loadingError = signal(false);



  ngOnInit(): void
  {
    this.flashcardsService.getFlashcards()
      .then(() => {
        this.filteredFlashcards.set(this.flashcards()); //proxy
      })
      .catch(() => this.loadingError.set(true))
      .finally(() => this.loading.set(false));
  }



  filterResults(text: string)
  {
    if (!text)
    {
      this.filteredFlashcards.set(this.flashcards());
      return;
    }
    const result = this.flashcards()
      .filter(card =>
        card?.question.toLowerCase().includes(text.toLowerCase())
    );
    this.filteredFlashcards.set(result);
  }




  clickCardDetail(id: number)
  {
    this.router.navigate(['/cards', id]);
  }

  clickAddCard()
  {
    this.router.navigate(['/card/new']);
  }
}

