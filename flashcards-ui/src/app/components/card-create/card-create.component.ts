import { Component, inject, OnInit } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { FlashcardSetsService } from '../../flashcard-sets.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatOption } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { formMultipleChoiceValidator } from '../../validators/formMultipleChoiceValidator';
import { formNoWhiteSpaceValidator } from '../../validators/formNoWhiteSpaceValidator';


@Component({
  selector: 'app-card-create',
  imports:
  [
    ReactiveFormsModule, MatFormField, MatLabel, MatError, MatInput, MatButtonModule, MatRadioModule,
    MatSelect, MatOption, CommonModule, MatCheckboxModule, RouterLink
  ],
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.scss'
})


export class CardCreateComponent implements OnInit
{
  flashcardsService = inject(FlashcardsService);
  flashcardSetsService = inject(FlashcardSetsService);

  sets = this.flashcardSetsService.sets;


  customValidators = [Validators.required, formNoWhiteSpaceValidator()];

  cardForm = new FormGroup(
  {

    question: new FormControl('', { nonNullable: true, validators: this.customValidators }),

    type: new FormControl('', { nonNullable: true, validators: Validators.required }),

    // original
    // set: new FormControl('', { nonNullable: true }),
    set: new FormControl<number | null>(null, { nonNullable: true, validators: Validators.required }),


    createCorrect1: new FormControl(false),
    createAnswer1: new FormControl('', {nonNullable: true, validators: this.customValidators }),

    createCorrect2: new FormControl(false),
    createAnswer2: new FormControl('', {nonNullable: true, validators: this.customValidators }),

    createCorrect3: new FormControl(false),
    createAnswer3: new FormControl('', {nonNullable: true, validators: this.customValidators }),

    createCorrect4: new FormControl(false),
    createAnswer4: new FormControl('', {nonNullable: true, validators: this.customValidators }),

    createCorrect5: new FormControl(false),
    createAnswer5: new FormControl('', {nonNullable: true, validators: this.customValidators })


  }, { validators: formMultipleChoiceValidator() });






  ngOnInit(): void
  {
    this.flashcardSetsService.getAllSets();
  }


//NOTE: vllt ohne getRawValue -> Buch nochmal lesen: vllt die andere Variante
  async submit() //TODO: Set auswählen, wo kommt der beim Erstellen hin??
  {
    if (this.cardForm.valid)
    {
      const formValues = this.cardForm.getRawValue();


      const options =
      [
        //führende und nachstehende Leerzeichen abschneiden, falls Tippfehler beim Erstellen entstehen
        { optionText: formValues.createAnswer1.trim(), correct: formValues.createCorrect1 },
        { optionText: formValues.createAnswer2.trim(), correct: formValues.createCorrect2 },
        { optionText: formValues.createAnswer3.trim(), correct: formValues.createCorrect3 },
        { optionText: formValues.createAnswer4.trim(), correct: formValues.createCorrect4 },
        { optionText: formValues.createAnswer5.trim(), correct: formValues.createCorrect5 }
      ]

      //Formatierung für die Datenbank für die property "anwser"
      const correctAnswers = options.filter(i => i.correct).map(i => i.optionText).join(', ');


      const newFlashcard =
      {
        question: formValues.question.trim(),
        type: formValues.type,
        answer: correctAnswers,
        options: options
      };



      try
      {
        await this.flashcardsService.createFlashcard(newFlashcard);

        this.cardForm.reset();
      }
      catch (error)
      {
        alert('Fehler beim Erstellen der Karte. Bitte versuche es später erneut.');
      }
    }
  }

}
















