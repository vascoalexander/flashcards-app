import { Component } from '@angular/core';
import {Flashcard} from '../flashcard.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-exam-mode',
  imports: [FormsModule],
  templateUrl: './exam-mode.component.html',
  styleUrl: './exam-mode.component.css'
})
export class ExamModeComponent {

  flashcards: Flashcard[] = [];
  sets: Flashcard[] = [];
  selectedTime: string = '15';

  startExam() {
  }
}
