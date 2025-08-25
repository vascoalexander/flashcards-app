import {Component, input, output} from '@angular/core';
import {FlashcardSet} from '../../flashcard.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-quiz-config',
  imports: [
    FormsModule
  ],
  templateUrl: './quiz-config.component.html',
  styleUrl: './quiz-config.component.css'
})
export class QuizConfigComponent {

  // input & output
  sets = input.required<FlashcardSet[]>();
  examStart = output<{timeLimit: string, setId: number, quizMode: string, shuffleCards: boolean}>();

  // initial state
  selectedTime = '15';
  selectedSetId = 1;
  selectedQuizMode = 'learn';
  selectedShuffle = false;

  timerOptions = [
    { value: '15', label: '15 Minuten' },
    { value: '30', label: '30 Minuten' },
    { value: '45', label: '45 Minuten' },
    { value: '60', label: '60 Minuten' },
    { value: '90', label: '90 Minuten' },
    { value: 'per-question', label: '1 Minute Pro Frage' },
  ]

  onStartQuiz() {
    this.examStart.emit({
      timeLimit: this.selectedTime,
      setId: this.selectedSetId,
      quizMode: this.selectedQuizMode,
      shuffleCards: this.selectedShuffle
    })

  }
}
