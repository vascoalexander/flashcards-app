import {computed, inject, Injectable, signal} from '@angular/core';
import {FlashcardsService} from '../flashcards.service';
import {FlashcardSetsService} from '../flashcard-sets.service';

export interface QuizConfig {
  setId: number;
  timeLimit: string;
  quizMode: string;
}

export interface QuizState {
  quizMode: string;
  isStarted: boolean;
  isFinished: boolean;
  currentQuestionIndex: number;
  totalTime: number;
  timeLeft: number; // seconds
  progress: number; // percent
}

export interface QuizResult {}


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private flashcardsService = inject(FlashcardsService);
  private flashcardSetsService = inject(FlashcardSetsService);

  flashcards = computed(() => this.flashcardsService.flashcards());
  sets = computed(() => this.flashcardSetsService.sets());

  private _timerInterval: any;

  private _quizState = signal<QuizState>({
    quizMode: '',
    isStarted: false,
    isFinished: false,
    currentQuestionIndex: 0,
    totalTime: 0,
    timeLeft: 0,
    progress: 0
  });

  quizState = this._quizState.asReadonly();

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

      this._quizState.set({
        quizMode: config.quizMode,
        isStarted: true,
        isFinished: false,
        currentQuestionIndex: 0,
        totalTime: totalTime,
        timeLeft: totalTime,
        progress: 0
      });
      this.startTimer();


    } catch (e: any) {
      console.error('Error starting quiz:', e.message);
    }
  }

  // timer functions
  private calculateTime(timeLimit: string){
    if (timeLimit === 'per-question') {
      return this.flashcards.length * 60
    } else {
      return parseInt(timeLimit) * 60;
    }
  }

  private startTimer() {
    this.clearTimer();
    this._timerInterval = setInterval(() => {
      const state = this.quizState();
      const timeLeft = state.timeLeft - 1;
      if (timeLeft <= 0) {
        this.finishQuiz();
      } else {
        this._quizState.set({
          ...state,
          timeLeft: timeLeft
        })
      }
    }, 1000);
  }

  formatTime(){
    const timeLeft = this.quizState().timeLeft;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  private clearTimer() {
    if(this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  }

  // quiz functions

  currentFlashcard = computed(() => {
    const flashcards = this.flashcards();
    const index = this.quizState().currentQuestionIndex;
    return flashcards[index];
  })

  nextQuestion() {}
  prevQuestion() {}
  submitAnswer() {}
  toggleShowAnswer() {}

  // quiz termination
  finishQuiz() {}
  resetQuiz() {}
}
