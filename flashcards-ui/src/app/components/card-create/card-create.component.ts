import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { FlashcardSetsService } from '../../flashcard-sets.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatOption } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { formMultipleChoiceValidator } from '../../validators/formMultipleChoiceValidator';
import { formNoWhiteSpaceValidator } from '../../validators/formNoWhiteSpaceValidator';
import { formMultipleChoiceMaxThreeRightValidator } from '../../validators/formMultipleChoiceMaxThreeRightValidator';
import { formSingleChoiceValidator } from '../../validators/formSingleChoiceValidator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-card-create',
  imports:
  [
    ReactiveFormsModule, MatFormField, MatLabel, MatError, MatInputModule, MatButtonModule, MatRadioModule,
    MatSelect, MatOption, CommonModule, MatCheckboxModule, RouterLink
  ],
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.scss'
})


export class CardCreateComponent implements OnInit, OnDestroy
{
  flashcardsService = inject(FlashcardsService);
  flashcardSetsService = inject(FlashcardSetsService);
  private router = inject(Router);
  ignoreGuard = false;
  private controlValueChangesSub$: Subscription | undefined;

  sets = this.flashcardSetsService.sets;


  customValidators = [Validators.required, formNoWhiteSpaceValidator()];

  cardForm = new FormGroup(
  {

    question: new FormControl('', { nonNullable: true, validators: this.customValidators }),

    type: new FormControl('', { nonNullable: true, validators: Validators.required }),

    // original
    // set: new FormControl('', { nonNullable: true }),
    // set: new FormControl<number | null>(null, { nonNullable: true, validators: Validators.required }),
    set: new FormControl<number | null>(null),

    //NOTE: TEST FÜR TEXT FILL-IN TYPE (eventuell löschen)
    answer: new FormControl('', {nonNullable: true, validators: this.customValidators }),


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


  }, { validators:
    [
      formMultipleChoiceValidator(),
      formMultipleChoiceMaxThreeRightValidator(),
      formSingleChoiceValidator(),
    ] });




  ngOnInit(): void
  {
    this.flashcardSetsService.getAllSets();




    // harter Brocken: Validation überprüfen je nach gewählten Fragetypen
    this.controlValueChangesSub$ = this.cardForm.get('type')?.valueChanges.subscribe(type =>
      {

        const createAnswerControls = ['createAnswer1','createAnswer2','createAnswer3','createAnswer4','createAnswer5'];


        // für single und multiple choice
        createAnswerControls.forEach(i =>
        {
          const getControl = this.cardForm.get(i);
          if (!getControl)
          {
            return; //continue wird angesetzt
          }

          if (type === 'TEXT')
          {
            getControl.clearValidators();
          }

          else
          {
            getControl.setValidators(this.customValidators);
          }

          getControl.updateValueAndValidity();
        });





        // für text fill-in
        const getControl = this.cardForm.get('answer');

        if (!getControl)
        {
          return;
        }

        if(type === 'TEXT')
        {
          getControl.setValidators(this.customValidators);
        }

        else
        {
          getControl.clearValidators();
        }

        getControl.updateValueAndValidity();



        // Updater for add or remove a validator at run time
        this.cardForm.updateValueAndValidity();
      });

  }



  async submit()
  {
    if (this.cardForm.valid)
    {
      this.ignoreGuard = true;

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




      var newFlashcard = {}
      if (formValues.type === 'TEXT')
      {
        newFlashcard =
      {
        question: formValues.question.trim(),
        type: formValues.type,
        answer: formValues.answer,
        options: []
      };
      }
      else
      {
        newFlashcard =
        {
          question: formValues.question.trim(),
          type: formValues.type,
          answer: correctAnswers,
          options: options
        };
      }






      try
      {
        await this.flashcardsService.createFlashcard(newFlashcard);
      }
      catch (error)
      {
        alert('Fehler beim Erstellen der Karte. Bitte versuche es später erneut.');
      }


      ///SET Zuordnung Logik

      if (formValues.set)
      {
        this.flashcardsService.getFlashcards();
        const getAllFlashcards = this.flashcardsService.flashcards();
        const getLastNewFlashcard = getAllFlashcards[getAllFlashcards.length - 1];



        try
        {
          const selectedSetId = formValues.set;
          const oldFlashcardSet = await this.flashcardSetsService.getSetById(selectedSetId);

          const updatedFlashcardSet = {...oldFlashcardSet, flashcards: [...oldFlashcardSet.flashcards, getLastNewFlashcard]};

          await this.flashcardSetsService.updateSet(selectedSetId, updatedFlashcardSet);
        }
        catch (error)
        {
          alert('Deine erstellte Karte konnte nicht zum Set hinzugefügt werden. Bitte versuche es später erneut.');
        }
      }



      this.cardForm.reset();
      this.router.navigate(['/cards']);
    }
  }



  ngOnDestroy(): void
  {
    this.controlValueChangesSub$?.unsubscribe();
  }
}
