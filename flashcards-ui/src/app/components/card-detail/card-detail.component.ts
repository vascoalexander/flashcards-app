import { Component, inject, OnInit, signal } from '@angular/core';
import { Flashcard } from '../../flashcard.model';
import { FlashcardsService } from '../../flashcards.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-card-detail',
  imports: [],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})


export class CardDetailComponent implements OnInit
{
  private flashcardsService = inject(FlashcardsService);
  private route = inject(ActivatedRoute);

  flashcard = signal<Flashcard | null>(null);


  ngOnInit(): void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));



    this.flashcardsService.getFlashcardById(id)
    .then(data => this.flashcard.set(data));

  };

}
