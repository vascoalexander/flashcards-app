import {Component, computed, inject, output, signal} from '@angular/core';
import {QuizService} from '../quiz.service';
import {Flashcard, FlashcardType} from '../../flashcard.model';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-quiz-result',
  imports: [
    MatButton
  ],
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.css'
})
export class QuizResultComponent {
  quizService = inject(QuizService);

  // Outputs
  restartQuiz = output<void>();

  // Local state
  showDetails = signal(false);
  selectedFilter = signal<'all' | 'correct' | 'incorrect' | 'skipped'>('all');

  // Computed
  quizResult = computed(() =>
    this.quizService.getQuizResult());

  scoreColor = computed(() => {
    const score = this.quizResult().score;
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  });

  scoreGrade = computed(() => {
    const score = this.quizResult().score;
    if (score >= 90) return 'Sehr gut';
    if (score >= 80) return 'Gut';
    if (score >= 70) return 'Befriedigend';
    if (score >= 60) return 'Ausreichend';
    if (score >= 50) return 'Mangelhaft';
    return 'Ungenügend';
  });

  filteredQuestions = computed(() => {
    const result = this.quizResult();
    const filter = this.selectedFilter();

    return result.flashcards.filter(card => {
      const hasAnswer = this.quizService.getAnswerForQuestion(card.id).length > 0;

      switch (filter) {
        case 'correct':
          return hasAnswer && card.isCorrect;
        case 'incorrect':
          return hasAnswer && !card.isCorrect;
        case 'skipped':
          return !hasAnswer;
        case 'all':
        default:
          return true;
      }
    });
  });

  onRestartExam(): void {
    this.restartQuiz.emit();
  }

  onToggleDetails(): void {
    this.showDetails.update(show => !show);
  }

  onFilterChange(filter: 'all' | 'correct' | 'incorrect' | 'skipped'): void {
    this.selectedFilter.set(filter);
  }

  getQuestionStatus(card: Flashcard): 'correct' | 'incorrect' | 'skipped' {
    const hasAnswer = this.quizService.getAnswerForQuestion(card.id).length > 0;

    if (!hasAnswer) return 'skipped';
    return card.isCorrect === true ? 'correct' : 'incorrect';
  }

  getUserAnswerText(card: Flashcard): string {
    const userAnswer = this.quizService.getAnswerForQuestion(card.id);

    if (userAnswer.length === 0) {
      return 'Nicht beantwortet';
    }

    if (card.type === FlashcardType.MULTIPLE_CHOICE || card.type === FlashcardType.SINGLE_CHOICE) {
      return userAnswer.join(', ');
    }

    return userAnswer[0];
  }

  getCorrectAnswerText(card: Flashcard): string {
    if (card.type === FlashcardType.TEXT) {
      return card.answer || '';
    }

    const correctOptions = card.options?.filter(option => option.correct) || [];
    return correctOptions.map(option => option.optionText).join(', ');
  }
}
