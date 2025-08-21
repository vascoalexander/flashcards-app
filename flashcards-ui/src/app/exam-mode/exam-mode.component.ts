import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FlashcardSetsService} from '../flashcard-sets.service';
import {FlashcardsService} from '../flashcards.service';
import {FlashcardType} from '../flashcard.model';

@Component({
  selector: 'app-exam-mode',
  imports: [FormsModule],
  templateUrl: './exam-mode.component.html',
  styleUrl: './exam-mode.component.css'
})
export class ExamModeComponent implements OnInit {

  private flashcardSetService = inject(FlashcardSetsService);
  private flashcardsService = inject(FlashcardsService);
  sets = computed(() => this.flashcardSetService.sets());
  flashcards = computed(() => this.flashcardsService.flashcards())
  examStarted = false;

  // User Inputs
  selectedTime: string = '15';
  selectedSetId: number = 1;
  selectedOptions: string[] = [];
  textAnswer: string = '';

  // Timer
  totalTime: number = 0;
  timeLeft: number = 0;
  interval: any;

  // Exam state
  currentIndex: number = 0;
  showAnswer = false;
  currentFlashcard = computed(() => this.flashcards()[this.currentIndex]);

  // temp
  isCorrect: boolean = false;

  ngOnInit(): void {
    try {
      this.flashcardSetService.getAllSets();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async startExam() {

    this.examStarted = true;

    // get exam cards
    await this.flashcardsService.getFlashcardsBySetId(this.selectedSetId);

    // set timer
    if (this.selectedTime === 'per-question'){
      this.totalTime = this.flashcards().length * 60;
    } else {
      this.totalTime = parseInt(this.selectedTime) * 60;
    }
    this.timeLeft = this.totalTime;
    this.startTimer();
  }

  startTimer(){
    this.interval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.interval);
        this.examStarted = false;
      }
    }, 1000);
  }

  formatTime(): string {
    const m = Math.floor(this.timeLeft / 60);
    const s = this.timeLeft % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  nextCard() {
    if (this.currentIndex < this.flashcards().length - 1){
      this.currentIndex++;
      this.showAnswer = false;
    }
  }

  prevCard() {
    if (this.currentIndex > 0){
      this.currentIndex--;
      this.showAnswer = false;
    }
  }

  // toggleAnswer() {
  //   this.showAnswer = !this.showAnswer;
  // }

  onMcOptionSelect(event: Event, optionText: string) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked){
      if (!this.selectedOptions.includes(optionText)) {
        this.selectedOptions.push(optionText);
        }
      } else {
      this.selectedOptions = this.selectedOptions.filter(o => o !== optionText);
    }
  }

  onScOptionSelect(event: Event, optionText: string) {
    this.selectedOptions = [];
    this.selectedOptions.push(optionText);
  }

  submitAnswer() {
    if (this.flashcards()[this.currentIndex]?.type === FlashcardType.TEXT) {
      this.selectedOptions = [this.textAnswer];
    }

    this.flashcardsService.validateAnswer(this.flashcards()[this.currentIndex], this.selectedOptions);
    this.selectedOptions = [];
  }

  finishExam() {
    this.examStarted = false;
  }

}
