import { Component, computed, inject, OnInit } from '@angular/core';
import { FlashcardsService } from '../../../../flashcards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { FormatCardtypePipe } from '../../../../pipes/format-cardtype.pipe';
import { FormatIndexToLetterPipe } from '../../../../pipes/format-index-to-letter.pipe';
import { UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-card-detail',
  imports: [
    MatCardModule, MatChipsModule, CommonModule, MatBadgeModule, FormatCardtypePipe,
    FormatIndexToLetterPipe, UpperCasePipe, MatButtonModule
],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})


export class CardDetailComponent implements OnInit
{
  private flashcardsService = inject(FlashcardsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = Number(this.route.snapshot.paramMap.get('id'));

  flashcard = computed(() => this.flashcardsService.flashcards().find(card => card.id === this.id) ?? null);



  ngOnInit(): void
  {
    this.flashcardsService.getFlashcards();
  };


  edit()
  {
    this.router.navigate(['/cards/detail/edit', this.id]);
  }

  backToCards()
  {
    this.router.navigate(['/cards']);
  }
}
