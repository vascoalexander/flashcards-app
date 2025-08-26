import {Component, input, output} from '@angular/core';
import {FlashcardSet} from '../../flashcard.model';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatLabel, MatFormField} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {RouterLink} from '@angular/router';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-quiz-config',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckbox,
    RouterLink,
    MatLabel,
    MatFormField,
    MatOption,
    MatSelect
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
