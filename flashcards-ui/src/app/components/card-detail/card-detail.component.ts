import { Component, computed, inject, OnInit } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { FormatCardtypePipe } from '../../pipes/format-cardtype.pipe';
import { FormatIndexToLetterPipe } from '../../pipes/format-index-to-letter.pipe';
import { UpperCasePipe } from '@angular/common';
<<<<<<< HEAD
import { MatButton } from "@angular/material/button";
=======
import { MatButtonModule } from '@angular/material/button';
>>>>>>> b62c5ac17ebcd96310b7f4f33a06e8984a673053


@Component({
  selector: 'app-card-detail',
  imports: [
    MatCardModule, MatChipsModule, CommonModule, MatBadgeModule, FormatCardtypePipe,
<<<<<<< HEAD
    FormatIndexToLetterPipe, UpperCasePipe, MatButton,
=======
    FormatIndexToLetterPipe, UpperCasePipe, MatButtonModule
>>>>>>> b62c5ac17ebcd96310b7f4f33a06e8984a673053
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
    this.router.navigate(['/cards', this.id, 'edit']);
  }

  backBtn()
  {
    this.router.navigate(['/cards']);
  }
}
