import { Component, inject, OnInit } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { FlashcardSetsService } from '../../flashcard-sets.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatOption } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-card-create',
  imports:
  [
    ReactiveFormsModule, MatFormField, MatLabel, MatError, MatInput, MatButton, MatRadioModule,
    MatSelect, MatOption, CommonModule, MatCheckboxModule
  ],
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.scss'
})


export class CardCreateComponent implements OnInit
{
  flashcardsService = inject(FlashcardsService);
  flashcardSetsService = inject(FlashcardSetsService);

  sets = this.flashcardSetsService.sets;


  cardForm = new FormGroup(
  {

    question: new FormControl('', { nonNullable: true, validators: Validators.required }),

    type: new FormControl('', { nonNullable: true, validators: Validators.required }),

    set: new FormControl('', { nonNullable: true }),


    //TODO: muss mindestens 2 kreuze required sein, weil multiple choice
    createCorrect1: new FormControl(false),
    createAnswer1: new FormControl('', {nonNullable: true, validators: Validators.required }),

    createCorrect2: new FormControl(false),
    createAnswer2: new FormControl('', {nonNullable: true, validators: Validators.required }),

    createCorrect3: new FormControl(false),
    createAnswer3: new FormControl('', {nonNullable: true, validators: Validators.required }),

    createCorrect4: new FormControl(false),
    createAnswer4: new FormControl('', {nonNullable: true, validators: Validators.required }),

    createCorrect5: new FormControl(false),
    createAnswer5: new FormControl('', {nonNullable: true, validators: Validators.required })


  });






  ngOnInit(): void
  {
    this.flashcardSetsService.getAllSets();
  }


  async submit()
  {
    if (this.cardForm.valid)
      {
      //NOTE: vllt ohne getRawValue -> Buch nochmal lesen: vllt die andere Variante
      const newFlashcard = this.cardForm.getRawValue();

      try
      {
        await this.flashcardsService.createFlashcard(this.cardForm);
        //debug
        console.log('Card wurde erstellt!');
        this.cardForm.reset();
      }
      catch (error)
      {
        console.error('Fehler:', error);
      }
    }
  }
}
