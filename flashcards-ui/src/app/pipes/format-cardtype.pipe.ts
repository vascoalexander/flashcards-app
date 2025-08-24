import { Pipe, PipeTransform } from '@angular/core';
import { FlashcardType } from '../flashcard.model';


@Pipe({
  name: 'formatCardtype'
})


export class FormatCardtypePipe implements PipeTransform
{
    transform(value: FlashcardType | null | undefined): string
    {
      switch (value)
      {
        case FlashcardType.SINGLE_CHOICE:
          return 'Single Choice';

        case FlashcardType.MULTIPLE_CHOICE:
          return 'Multiple Choice';

        case FlashcardType.TEXT:
          return 'Text';

        default:
          return 'Fragetyp ist unbekannt';
    }
  }

}
