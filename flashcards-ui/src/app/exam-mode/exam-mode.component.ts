import { Component } from '@angular/core';

@Component({
  selector: 'app-exam-mode',
  imports: [],
  templateUrl: './exam-mode.component.html',
  styleUrl: './exam-mode.component.css'
})
export class ExamModeComponent {

  flashcards: Flashcard[] = [];
  selectedTime: string = '15';

  startExam() {
    if (selectedTime === "per-question") {
      totalTime = flashcards.length * 60; // Sekunden
    } else {
      totalTime = selectedTime * 60; // Minuten in Sekunden
    }
  }
}
