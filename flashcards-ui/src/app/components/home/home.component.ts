import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlashcardSetsService } from '../../flashcard-sets.service';
import { FlashcardsService } from '../../flashcards.service';
import { InfoPanelComponent, InfoItem } from '../info-panel/info-panel.component';
import { Flashcard, FlashcardSet } from '../../flashcard.model';
import { MatCardModule } from '@angular/material/card';
import { checkoutGuard } from '../../guards/checkout.guard';
import { CheckoutComponent } from '../checkout/checkout.component';
import { firstValueFrom } from 'rxjs';
import { ConfirmDeleteDialogComponent } from '../Flashcard-Sets/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  imports: [RouterLink, InfoPanelComponent, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  private setssvc = inject(FlashcardSetsService);
  private cardsvc = inject(FlashcardsService);

  infoItems = signal<InfoItem[]>([]);

  private dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.setssvc.setsChanged();
      this.cardsvc.cardsChanged();
      this.loadStats();
    });
  }
  async clearLocalStorage(): Promise<void> {
    this.dialog.open(ConfirmDeleteDialogComponent, { data: { entity: 'InfoPanel', title: 'Statistik zurücksetzen?', confirmText: 'Zurücksetzen', cancelText: 'Abbrechen' } })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          localStorage.clear();
          this.loadStats();
        }
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
