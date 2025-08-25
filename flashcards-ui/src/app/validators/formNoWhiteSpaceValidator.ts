import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


export function formNoWhiteSpaceValidator(): ValidatorFn
{
  return (control: AbstractControl): ValidationErrors | null =>
  {
    if(!control.value || control.value.trim() == '')
    {
      return { inputValueNotNull: 'Ungültig. Keine Leerzeichen.' };
    }
    else
    {
      return null;
    }
  }
}
