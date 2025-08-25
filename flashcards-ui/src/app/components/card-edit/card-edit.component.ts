import { Component, inject, OnInit } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Flashcard } from '../../flashcard.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { formMultipleChoiceValidator } from '../../validators/formMultipleChoiceValidator';
import { formNoWhiteSpaceValidator } from '../../validators/formNoWhiteSpaceValidator';
import { formMultipleChoiceMaxThreeRightValidator } from '../../validators/formMultipleChoiceMaxThreeRightValidator';
import { formSingleChoiceValidator } from '../../validators/formSingleChoiceValidator';
import { FormatCardtypePipe } from '../../pipes/format-cardtype.pipe';


@Component({
  selector: 'app-card-edit',
  imports:
  [ MatChipsModule, MatRadioModule, ReactiveFormsModule, MatInputModule, MatFormField, MatError, MatLabel,
    CommonModule, MatCheckboxModule, MatButtonModule, RouterLink, FormatCardtypePipe

  ],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.scss'
})


//TODO: komplett gegen DRY, muss aufgeräumt werden
export class CardEditComponent implements OnInit
{
  selectedFlashcard: Flashcard | undefined;
  flashcardsService = inject(FlashcardsService);
  private route = inject(ActivatedRoute);
  ignoreGuard = false;
  private router = inject(Router);
  id!: number;


  customValidators = [Validators.required, formNoWhiteSpaceValidator()];


  cardFormEditText = new FormGroup(
  {
    question: new FormControl('', { nonNullable: true, validators: this.customValidators }),

    answer: new FormControl('', {nonNullable: true, validators: this.customValidators }),

  });


  cardFormEditSingleChoice = new FormGroup(
  {
    //quick dirty fix
    type: new FormControl('', { nonNullable: true, validators: Validators.required }),

    question: new FormControl('', { nonNullable: true, validators: this.customValidators }),

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

  }, { validators: formSingleChoiceValidator() });



    cardFormEditMultipleChoice = new FormGroup(
  {

    //quick dirty fix
    type: new FormControl('', { nonNullable: true, validators: Validators.required }),

    question: new FormControl('', { nonNullable: true, validators: this.customValidators }),


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
    ] });






  ngOnInit()
  {
    const id = Number(this.route.snapshot.params['id']);
    this.id = id;



    // Formular prefillen
    this.flashcardsService.getFlashcardById(id).then(card =>
    {
      if (card)
      {
        this.selectedFlashcard = card;
        //Text
        if (card.type === 'TEXT')
        {
          this.cardFormEditText.setValue(
          {
            question: card.question,
            answer: card.answer
          });
        }


        //single choice
        if (card.type === 'SINGLE_CHOICE')
        {
          this.cardFormEditSingleChoice.setValue({
          question: card.question,
          createAnswer1: card.options[0]?.optionText ?? '',
          createCorrect1: card.options[0]?.correct ?? false,
          createAnswer2: card.options[1]?.optionText ?? '',
          createCorrect2: card.options[1]?.correct ?? false,
          createAnswer3: card.options[2]?.optionText ?? '',
          createCorrect3: card.options[2]?.correct ?? false,
          createAnswer4: card.options[3]?.optionText ?? '',
          createCorrect4: card.options[3]?.correct ?? false,
          createAnswer5: card.options[4]?.optionText ?? '',
          createCorrect5: card.options[4]?.correct ?? false,
          //quick dirty fix
          type: card.type
          });
        }


        //multi choice
        if (card.type === 'MULTIPLE_CHOICE') {
        this.cardFormEditMultipleChoice.setValue({
        question: card.question,
        createAnswer1: card.options[0]?.optionText ?? '',
        createCorrect1: card.options[0]?.correct ?? false,
        createAnswer2: card.options[1]?.optionText ?? '',
        createCorrect2: card.options[1]?.correct ?? false,
        createAnswer3: card.options[2]?.optionText ?? '',
        createCorrect3: card.options[2]?.correct ?? false,
        createAnswer4: card.options[3]?.optionText ?? '',
        createCorrect4: card.options[3]?.correct ?? false,
        createAnswer5: card.options[4]?.optionText ?? '',
        createCorrect5: card.options[4]?.correct ?? false,
        //quick dirty fix
        type: card.type
          });
        }
      }
    });
  }




  async submitEditText()
  {
    var newFlashcard = {}

    if (this.cardFormEditText.valid)
    {
      this.ignoreGuard = true;

      const formValues = this.cardFormEditText.getRawValue();

      newFlashcard =
      {
        question: formValues.question.trim(),
        answer: formValues.answer,
        type: this.selectedFlashcard?.type,
        options: []
      };
    }


    //debug
    console.log(newFlashcard);
    try
    {
      await this.flashcardsService.updateFlashcard(this.id, newFlashcard);
    }
    catch (error)
    {
      alert('Die Karte konnte nicht gespeichert werden. Bitte versuche es später erneut.');
    }

    this.cardFormEditText.reset();
    this.router.navigate(['/cards', this.id]);
  }


  async submitEditSingleChoice()
  {
    var newFlashcard = {}

    if (this.cardFormEditSingleChoice.valid)
    {
      this.ignoreGuard = true;

      const formValues = this.cardFormEditSingleChoice.getRawValue();

      const options =
      [
        { optionText: formValues.createAnswer1.trim(), isCorrect: formValues.createCorrect1 },
        { optionText: formValues.createAnswer2.trim(), isCorrect: formValues.createCorrect2 },
        { optionText: formValues.createAnswer3.trim(), isCorrect: formValues.createCorrect3 },
        { optionText: formValues.createAnswer4.trim(), isCorrect: formValues.createCorrect4 },
        { optionText: formValues.createAnswer5.trim(), isCorrect: formValues.createCorrect5 }
      ]

      const correctAnswers = options.filter(i => i.isCorrect).map(i => i.optionText).join(', ');

      newFlashcard =
        {
          question: formValues.question.trim(),
          answer: correctAnswers,
          type: this.selectedFlashcard?.type,
          options: options
        };
    }


    //debug
    console.log(newFlashcard);
    try
    {
      await this.flashcardsService.updateFlashcard(this.id, newFlashcard);
    }
    catch (error)
    {
      alert('Die Karte konnte nicht gespeichert werden. Bitte versuche es später erneut.');
    }


    this.cardFormEditSingleChoice.reset();
    this.router.navigate(['/cards', this.id]);
  }


  async submitEditMultipleChoice()
  {
    var newFlashcard = {}

    if (this.cardFormEditMultipleChoice.valid)
    {
      this.ignoreGuard = true;

      const formValues = this.cardFormEditMultipleChoice.getRawValue();

      const options =
      [
        { optionText: formValues.createAnswer1.trim(), isCorrect: formValues.createCorrect1 },
        { optionText: formValues.createAnswer2.trim(), isCorrect: formValues.createCorrect2 },
        { optionText: formValues.createAnswer3.trim(), isCorrect: formValues.createCorrect3 },
        { optionText: formValues.createAnswer4.trim(), isCorrect: formValues.createCorrect4 },
        { optionText: formValues.createAnswer5.trim(), isCorrect: formValues.createCorrect5 }
      ]

      const correctAnswers = options.filter(i => i.isCorrect).map(i => i.optionText).join(', ');

      newFlashcard =
        {
          question: formValues.question.trim(),
          answer: correctAnswers,
          type: this.selectedFlashcard?.type,
          options: options
        };
    }


    //debug
    console.log(newFlashcard);
    try
    {
      await this.flashcardsService.updateFlashcard(this.id, newFlashcard);
    }
    catch (error)
    {
      alert('Die Karte konnte nicht gespeichert werden. Bitte versuche es später erneut.');
    }


    this.cardFormEditMultipleChoice.reset();
    this.router.navigate(['/cards', this.id]);
  }
}
