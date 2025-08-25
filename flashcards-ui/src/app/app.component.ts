import { Component, inject, signal, effect } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { FlashcardSetsService } from './flashcard-sets.service';
import { Flashcard, FlashcardSet } from './flashcard.model';
import { InfoPanelComponent, InfoItem } from './components/info-panel/info-panel.component';

import { QuizComponent } from './quiz/quiz.component';
import { FlashcardsService } from './flashcards.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, InfoPanelComponent, QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Flashcards UI';
  private setssvc = inject(FlashcardSetsService);
  private cardsvc = inject(FlashcardsService);

  infoItems = signal<InfoItem[]>([]);

  constructor() {
    effect(() => {
      this.setssvc.setsChanged();
      this.loadStats();
    });
  }

  private async loadStats() {
    try {
      const sets: FlashcardSet[] = await this.setssvc.getAllSets();
      await this.cardsvc.getFlashcards();
      const cards: Flashcard[] = this.cardsvc.flashcards().map(card => {
        const stats = JSON.parse(localStorage.getItem(`flashcard-stats-${card.id}`) || '{}');
        return { ...card, ...stats };
      });

      const seen = cards.filter(c => c.timesSeen && c.timesSeen > 0).length;

      const correct = cards.filter(c => c.correctCount && c.correctCount > 0).length;

      const accuracy = seen > 0 ? Math.round((correct / seen) * 100) : 0;

      this.infoItems.set([
        { icon: 'layers', label: 'Karten gesamt', value: cards.length.toString() },
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

