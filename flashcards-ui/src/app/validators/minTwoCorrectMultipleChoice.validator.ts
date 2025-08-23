  //TODO: muss umgebaut werden und richtige Logik eingebaut werden.

  // import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

  // export function multipleChoiceValidator(control: AbstractControl): ValidatorFn
  // {
  //   return (control: AbstractControl): ValidationErrors | null =>
  //   {
  //     const form = this.cardForm

  //     if (form)
  //     {
  //       const createCorrect1: boolean = control.get('createCorrect1')?.value;
  //       const createCorrect2: boolean = control.get('createCorrect2')?.value;
  //       const createCorrect3: boolean = control.get('createCorrect3')?.value;
  //       const createCorrect4: boolean = control.get('createCorrect4')?.value;
  //       const createCorrect5: boolean = control.get('createCorrect4')?.value;


  //       const cardType = control.get('type')?.value;
  //       const trues =
  //         [
  //           createCorrect1, createCorrect2, createCorrect3,
  //           createCorrect4, createCorrect5, createCorrect5
  //         ].filter(bool => bool).length;

  //       if (cardType === 'MULTIPLE_CHOICE' && trues >= 2)
  //       {
  //         return null;
  //       }
  //       return 'mindestens 2 richtige Antworten müssen ausgewählt werden.';

  //     }
  //   }
  // }
