import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { CardSets } from '../card-sets';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { FlashcardSetsService } from '../flashcard-sets.service';
import { FlashcardsService } from '../flashcards.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-sets',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './card-sets.component.html',
  styleUrl: './card-sets.component.css'
})
export class CardSetsComponent {

  // sets$: Observable<CardSets[]> | undefined;
  //
  // constructor(private cardSetService: FlashcardSetsService, private cardService: FlashcardsService, private router: Router,) { }
  //
  // ngOnInit(): void {
  //   this.onAllSets();
  // }
  //
  // async onAllSets() {
  //   this.sets$ = from(this.cardSetService.getAllSets());
  // }
}
