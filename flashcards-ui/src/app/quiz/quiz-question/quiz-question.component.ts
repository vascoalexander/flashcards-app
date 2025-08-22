import {Component, computed, inject, input, output} from '@angular/core';
import {QuizService, QuizState} from '../quiz.service';
import {Flashcard} from '../../flashcard.model';

@Component({
  selector: 'app-quiz-question',
  imports: [],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.css'
})
export class QuizQuestionComponent {

  private quizService = inject(QuizService);

  // inputs
  quizState = input.required<QuizState>();
  flashcards = input.required<Flashcard[]>();
  currentFlashcard = input.required<Flashcard>();

  // outputs
  finishQuiz = output<void>();

  // computed
  showTimer = computed(() => this.quizState().quizMode === 'exam');

  onFinishQuiz() {
    this.finishQuiz.emit();
  }
}
