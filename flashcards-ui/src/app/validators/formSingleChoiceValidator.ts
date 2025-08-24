import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


//wenn return null -> alles richtig, wenn nicht dann springt der Validator an
export function formSingleChoiceValidator(): ValidatorFn
{
  return (control: AbstractControl): ValidationErrors | null =>
  {

    //control = gesamte formGroup (also -> meine cardForm)
    const cardType = control.get('type')?.value;


    if (cardType !== 'SINGLE_CHOICE')
    {
      return null;
    }


    const createCorrect1: boolean = control.get('createCorrect1')?.value;
    const createCorrect2: boolean = control.get('createCorrect2')?.value;
    const createCorrect3: boolean = control.get('createCorrect3')?.value;
    const createCorrect4: boolean = control.get('createCorrect4')?.value;
    const createCorrect5: boolean = control.get('createCorrect5')?.value;


    const createCorrectsAsArray =
      [
        createCorrect1, createCorrect2, createCorrect3,
        createCorrect4, createCorrect5
      ];


    let trues = 0;
    for (let i = 0; i < createCorrectsAsArray.length; i++)
    {
      if (createCorrectsAsArray[i])
      {
        trues++;
      }
    }



    if (trues === 1)
    {
      return null;
    }
    else
    {
      return { singleChoiceNotNull: 'Nur 1 Häkchen muss als richtige Antwort ausgewählt werden.' };
    }
  }
}
