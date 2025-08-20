import { Component, OnInit } from '@angular/core';
import { Flashcard } from '../../flashcard.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-card-list',
  imports: [],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})

//TODO: vllt mit Resolver arbeiten
export class CardListComponent implements OnInit
{
  cards$: Observable<Flashcard[]> | undefined;


  ngOnInit(): void
  {

  }
}
