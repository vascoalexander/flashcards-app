import { ResolveFn } from '@angular/router';
import { Flashcard } from '../flashcard.model';
import { FlashcardsService } from '../flashcards.service';
import { inject } from '@angular/core';


export const cardsResolver: ResolveFn<Flashcard[]> = (route, state) =>
  {
    const flashcardsService = inject(FlashcardsService);

    //TODO: Pagination und 'wird geladen oder spin icon'
    return flashcardsService.getFlashcards();
  };
