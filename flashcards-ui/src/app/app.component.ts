import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { FlashcardSetsService } from './flashcard-sets.service';
import { Flashcard, FlashcardSet } from './flashcard.model';
import { InfoPanelComponent, InfoItem } from './components/info-panel/info-panel.component';
import { Subscription } from 'rxjs';

import {QuizComponent} from './quiz/quiz.component';



@Component({
  selector: 'app-root',

  imports: [RouterOutlet, RouterLink, InfoPanelComponent, QuizComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit, OnDestroy {
  title = 'Flashcards UI';
  private setssvc = inject(FlashcardSetsService);
  private subscription!: Subscription;

  infoItems = signal<InfoItem[]>([]);

  ngOnInit() {
    this.loadStats();
    this.subscription = this.setssvc.setsChanged$.subscribe(() => {
      this.loadStats();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private async loadStats() {
    try {
      const sets: FlashcardSet[] = await this.setssvc.getAllSets();
      const cardsInSet = sets.flatMap(s => s.flashcards ?? []);
      const byId = new Map<number, Flashcard>(cardsInSet.map(c => [c.id, c]));
      const uniqueCards = Array.from(byId.values());
      const seen = uniqueCards.filter(c =>
        (c as any).seen === true ||
        (c as any).timesSeen > 0 ||
        !!(c as any).lastReviewedAt).length;
        
      const correct = uniqueCards.filter(c => (c as any).correct == true ||
        (c as any).isCorrect === true ||
        ((c as any).stats?.correctCount ?? 0) > 0).length;

      const accuracy = seen > 0 ? Math.round((correct / seen) * 100) : 0;

      this.infoItems.set([
        { icon: 'layers', label: 'Karten gesamt', value: uniqueCards.length.toString() },
        { icon: 'collections_bookmark', label: 'Sets gesamt', value: sets.length.toString() },
        { icon: 'visibility', label: 'Karten gesehen', value: seen.toString() },
        { icon: 'check_circle', label: 'Richtig beantwortet', value: `${correct} (${accuracy}%)` }
      ]);
    }
    catch (e) {
      console.error('Stats laden fehlgeschlagen', e);
    }
  }
}
