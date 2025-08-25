import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {QuizService, QuizState} from '../quiz.service';
import {Flashcard, FlashcardType} from '../../flashcard.model';
import {DecimalPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-quiz-question',
  imports: [
    DecimalPipe,
    NgClass
  ],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.css'
})
export class QuizQuestionComponent {

  private quizService = inject(QuizService);

  // inputs
  quizState = input.required<QuizState>();
  flashcards = input.required<Flashcard[]>();
  currentFlashcard = input.required<Flashcard>();
  progress = input.required<number>();
  answeredCount = input.required<number>();

  // outputs
  finishQuiz = output<void>();

  // local state
  selectedOptions = signal<string[]>([]);
  textAnswer = signal<string>('');

  // computed
  canGoNext = computed(() => this.quizService.canGoNext());
  canGoPrevious = computed(() => this.quizService.canGoPrev());
  isCurrentAnswered = computed(() => this.quizService.isCurrentQuestionAnswered());
  isCurrentCorrect = computed(() => this.quizService.currentFlashcardCorrect());

  // timer
  showTimer = computed(() => this.quizState().quizMode === 'exam');

  FlashcardType = FlashcardType;

  constructor() {
    effect(() => {
      const currentFlashcard = this.currentFlashcard();
      if (currentFlashcard) {
        const savedAnswer = this.quizService.getAnswerForQuestion(currentFlashcard.id);
        this.selectedOptions.set([...savedAnswer]);

        if (currentFlashcard.type === FlashcardType.TEXT && savedAnswer.length > 0) {
          this.textAnswer.set(savedAnswer[0]);
        } else {
          this.textAnswer.set('');
        }
      }
    });
  }

  formatTime() {
    return this.quizService.formatTime();
  }

  onPreviousQuestion() {
    this.quizService.prevQuestion();
  }

  onNextQuestion() {
    this.quizService.nextQuestion();
  }

  onScOptionChange(event: Event, optionText: string) {
    this.selectedOptions.set([optionText]);
  }

  onMcOptionChange(event: Event, optionText: string) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (!this.selectedOptions().includes(optionText)) {
        this.selectedOptions.update(options => [...options, optionText]);
      } else {
        this.selectedOptions.update(options => options.filter(o => o !== optionText));
      }
    }
  }

  isOptionSelected(optionText: string): boolean {
    return this.selectedOptions().includes(optionText);
  }

  onTextAnswerChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.textAnswer.set(input.value);
  }

  onSubmitAnswer() {
    const currentFlashcard = this.currentFlashcard();
    if (!currentFlashcard) return;

    if (this.quizState().quizMode === 'learn' && currentFlashcard.type === FlashcardType.TEXT) {
      const correct = currentFlashcard.answer ?? '';
      this.textAnswer.set(correct);
      if (correct.length > 0) {
        this.quizService.submitAnswer([correct]);
      }
      return;
    }


    let answerToSubmit: string[];
    if (currentFlashcard.type === FlashcardType.TEXT) {
      answerToSubmit = [this.textAnswer()];
    } else {
      answerToSubmit = this.selectedOptions();
    }

    if (answerToSubmit.length > 0) {
      this.quizService.submitAnswer(answerToSubmit);
    }
  }

  onFinishQuiz() {
    this.finishQuiz.emit();
  }
}
