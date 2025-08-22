import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
import {QuizService} from './quiz.service';
import {QuizConfigComponent} from './quiz-config/quiz-config.component';
import {QuizQuestionComponent} from './quiz-question/quiz-question.component';
import {QuizResultComponent} from './quiz-result/quiz-result.component';

@Component({
  selector: 'app-quiz',
  imports: [
    QuizConfigComponent,
    QuizQuestionComponent,
    QuizResultComponent
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit, OnDestroy {

  private quizService = inject(QuizService);

  sets = this.quizService.sets;
  flashcards = this.quizService.flashcards;
  quizState = this.quizService.quizState;
  currentFlashcard = this.quizService.currentFlashcard;

  // computed
  showConfig = computed(() =>
    !this.quizState().isStarted && !this.quizState().isFinished);
  showQuestion = computed(() =>
    this.quizState().isStarted && !this.quizState().isFinished);
  showResult = computed(() =>
    this.quizState().isFinished);

  // init / start
  async ngOnInit() {
    await this.quizService.initializeQuiz();
  }

  async onStartQuiz(config: {setId: number, timeLimit: string, quizMode: string}) {
    await this.quizService.startQuiz(config);
  }

  // finish / reset
  onFinishQuiz() {
    this.quizService.finishQuiz();
  }

  ngOnDestroy() {
    this.quizService.resetQuiz();
  }

  onRestartQuiz() {
    this.quizService.resetQuiz();
  }

}
