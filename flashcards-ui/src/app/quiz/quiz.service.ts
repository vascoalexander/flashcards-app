import {computed, inject, Injectable, signal} from '@angular/core';
import {FlashcardsService} from '../flashcards.service';
import {FlashcardSetsService} from '../flashcard-sets.service';
import {Flashcard, FlashcardType} from '../flashcard.model';

export interface QuizConfig {
  setId: number;
  timeLimit: string;
  quizMode: string;
  shuffleCards: boolean;
}

export interface QuizState {
  quizMode: string;
  isStarted: boolean;
  isFinished: boolean;
  currentIndex: number;
  totalTime: number;
  timeLeft: number; // seconds
}

export interface QuizResult {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  score: number; // prozent
  flashcards: Flashcard[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private flashcardsService = inject(FlashcardsService);
  private flashcardSetsService = inject(FlashcardSetsService);

  private _quizState = signal<QuizState>({
    quizMode: '',
    isStarted: false,
    isFinished: false,
    currentIndex: 0,
    totalTime: 0,
    timeLeft: 0
  });

  private _userAnswers = signal<Map<number, string[]>>(new Map());
  private _timerInterval: any;

  quizState = this._quizState.asReadonly();

  flashcards = computed(() => this.flashcardsService.flashcards());
  sets = computed(() => this.flashcardSetsService.sets());

  // quiz initialization and startup
  async initializeQuiz() {
    try {
      await this.flashcardSetsService.getAllSets();
    } catch (e: any) {
      console.error('Error initializing quiz:', e.message);
    }
  }

  async startQuiz(config: QuizConfig) {
    try {
      await this.flashcardsService.getFlashcardsBySetId(config.setId);
      const totalTime = this.calculateTime(config.timeLimit);

      if (config.shuffleCards) {
        this.shuffleFlashcards();
      }

      this._quizState.set({
        quizMode: config.quizMode,
        isStarted: true,
        isFinished: false,
        currentIndex: 0,
        totalTime: totalTime,
        timeLeft: totalTime
      });
      this.startTimer();
      this._userAnswers.set(new Map());
    } catch (error: any) {
      console.error('Error starting quiz:', error.message);
      throw error;
    }
  }

  // timer functions
  private calculateTime(timeLimit: string) {
    if (timeLimit === 'per-question') {
      return this.flashcards().length * 60;
    } else {
      return parseInt(timeLimit) * 60;
    }
  }

  private startTimer() {
    this.clearTimer();
    this._timerInterval = setInterval(() => {
      const state = this.quizState();
      const currentTimeLeft = state.timeLeft - 1;
      if (currentTimeLeft <= 0) {
        this.finishQuiz();
      } else {
        this._quizState.set({
          ...state,
          timeLeft: currentTimeLeft
        })
      }
    }, 1000);
  }

  formatTime() {
    const timeLeft = this._quizState().timeLeft;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  private clearTimer() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  }

  // shuffle

  private shuffleFlashcards(){
    const flashcards = this.flashcardsService.flashcards();
    if (flashcards.length <= 1) return;

    // fisher-yates algorithm
    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    this.flashcardsService.flashcards.set(shuffled);
  }

  // quiz functions

  currentFlashcard = computed(() => {
    const flashcards = this.flashcards();
    const index = this._quizState().currentIndex;
    return flashcards[index];
  })

  currentFlashcardCorrect = computed(() => {
    const currentCard = this.currentFlashcard();
    return this.calculateIsCorrect(currentCard, this.getAnswerForQuestion(currentCard.id));
  })

  answeredCount = computed(() => {
    const answers = this._userAnswers();
    return answers.size;
  })

  isCurrentQuestionAnswered = computed(() => {
    const currentCard = this.currentFlashcard();
    const answers = this._userAnswers();
    return currentCard ? answers.has(currentCard.id) : false;
  });

  canGoNext = computed(() => {
    const state = this._quizState();
    return state.currentIndex < this.flashcards().length - 1;
  })

  canGoPrev = computed(() => {
    const state = this._quizState();
    return state.currentIndex > 0;
  })

  nextQuestion() {
    if (this.canGoNext()) {
      const state = this._quizState();
      this._quizState.set({
        ...state,
        currentIndex: state.currentIndex + 1
      });
    }
  }

  prevQuestion() {
    if (this.canGoPrev()) {
      const state = this._quizState();
      this._quizState.set({
        ...state,
        currentIndex: state.currentIndex - 1
      });
    }
  }

  getAnswerForQuestion(questionId: number) {
    return this._userAnswers().get(questionId) || [];
  }

  quizProgress = computed(() => {
    const totalCards = this.flashcards().length;
    return (this.answeredCount() / totalCards) * 100;
  })

  // flashcard answer validation
  submitAnswer(answer: string[]) {
    const currentCard = this.currentFlashcard();
    if (!currentCard) return;

    this._userAnswers.update(answers => {
      const newAnswers = new Map(answers);
      newAnswers.set(currentCard.id, answer);
      return newAnswers;
    })

    const isCorrect = this.validateAnswer(currentCard, answer);
    this.updateStats(currentCard.id, isCorrect);
  }

  private updateStats(flashcardId: number, isCorrect: boolean) {
    const statsKey = `flashcard-stats-${flashcardId}`;
    let stats = JSON.parse(localStorage.getItem(statsKey) || '{}');

    stats.timesSeen = (stats.timesSeen || 0) + 1;
    if (isCorrect) {
      stats.correctCount = (stats.correctCount || 0) + 1;
    }
    stats.lastReviewedAt = new Date();

    localStorage.setItem(statsKey, JSON.stringify(stats));
  }

  private getCorrectAnswers(flashcard: Flashcard) {
    return (flashcard.options ?? [])
      .filter(o => o.correct)
      .map(o => o.optionText);
  }

  private validateMultipleChoiceAnswer(flashcard: Flashcard, givenAnswers: string[]) {
    const correctAnswers = this.getCorrectAnswers(flashcard);
    return (correctAnswers.length === givenAnswers.length &&
      correctAnswers.every(a => givenAnswers.includes(a)));
  }

  private validateSingleChoiceAnswer(flashcard: Flashcard, givenAnswer: string) {
    const correctAnswer = this.getCorrectAnswers(flashcard)[0];
    return correctAnswer === givenAnswer;
  }

  private validateTextAnswer(flashcard: Flashcard, givenAnswer: string) {
    return givenAnswer === flashcard.answer;
  }

  validateAnswer(flashcard: Flashcard, selectedOptions: string[]): boolean {
    if (!flashcard || selectedOptions.length === 0) return false;
    return this.calculateIsCorrect(flashcard, selectedOptions);
  }

  private calculateIsCorrect(card: Flashcard, selectedOptions: string[]): boolean {
    if (!card || selectedOptions.length === 0) return false;

    switch (card.type) {
      case FlashcardType.MULTIPLE_CHOICE:
        return this.validateMultipleChoiceAnswer(card, selectedOptions);
      case FlashcardType.SINGLE_CHOICE:
        return this.validateSingleChoiceAnswer(card, selectedOptions[0]);
      case FlashcardType.TEXT:
        return this.validateTextAnswer(card, selectedOptions[0]);
      default:
        return false;
    }
  }

  // quiz termination
  finishQuiz() {
    this.clearTimer();
    this._quizState.update(state => ({
      ...state,
      isStarted: false,
      isFinished: true
    }))
  }

  getQuizResult(): QuizResult {
    const flashcards = this.flashcards();
    const answers = this._userAnswers();

    let correctAnswers = 0;
    let answeredQuestions = 0;

    const resultFlashcards = flashcards.map(card => {
      const userAnswer = answers.get(card.id) ?? [];

      if (userAnswer.length > 0) {
        answeredQuestions++;
        const isCorrect = this.calculateIsCorrect(card, userAnswer);
        if (isCorrect) correctAnswers++;

        return {
          ...card,
          userAnswer,
          isCorrect,
          answered: true
        };
      }

      return {
        ...card,
        userAnswer: [],
        isCorrect: false,
        answered: false
      };
    });

    const incorrectAnswers = answeredQuestions - correctAnswers;
    const skippedQuestions = flashcards.length - answeredQuestions;
    const score = flashcards.length > 0 ? (correctAnswers / flashcards.length) * 100 : 0;

    return {
      totalQuestions: flashcards.length,
      answeredQuestions,
      correctAnswers,
      incorrectAnswers,
      skippedQuestions,
      score: Math.round(score * 100) / 100,
      flashcards: resultFlashcards
    };
  }

  resetQuiz() {
    this.clearTimer();
    this._quizState.set({
      quizMode: '',
      isStarted: false,
      isFinished: false,
      currentIndex: 0,
      totalTime: 0,
      timeLeft: 0
    });
  }
}
