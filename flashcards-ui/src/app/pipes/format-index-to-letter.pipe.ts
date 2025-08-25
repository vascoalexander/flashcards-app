import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'formatIndexToLetter'
})


export class FormatIndexToLetterPipe implements PipeTransform
{
  transform(index: number): string
  {
    if (index < 0)
    {
      return '';
    }
    else
    {
      const letter = String.fromCharCode(65 + index);
      return `${letter})`;
    }
  }
}
