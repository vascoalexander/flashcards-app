import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { filter, Subscription } from 'rxjs';
import { FlashcardSetsService } from '../../../flashcard-sets.service';
import { FlashcardsService } from '../../../flashcards.service';
import { Flashcard, FlashcardSet } from '../../../flashcard.model';

@Component({
  selector: 'app-card-sets',
  imports: [
    ReactiveFormsModule, CommonModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatListModule, MatProgressBarModule, MatCardModule, MatDividerModule, MatGridListModule,

  ],
  templateUrl: './card-sets.component.html',
  styleUrl: './card-sets.component.css'
})
export class CardSetsComponent implements OnInit, OnDestroy {

  private setservice = inject(FlashcardSetsService);
  private flashcardsService = inject(FlashcardsService);
  router = inject(Router);
  private routerSubscription: Subscription;

  loading = signal(false);
  error = signal<string | null>(null);

  filterText = signal('');
  selectedId = signal<number | null>(null);
  selectedSetCards = signal<Flashcard[]>([]);
  questionIdsToDelete = signal<number[]>([]);

  filteredSets = computed(() => {
    const q = this.filterText().toLowerCase().trim();
    const all = this.setservice.sets();
    if (!q) return all;
    return all.filter(s => s.name.toLowerCase().includes(q));
  });

  selectedSet = computed<FlashcardSet | null>(() => {
    const id = this.selectedId();
    if (id == null) return null;
    return this.setservice.sets().find(s => s.id === id) ?? null;
  });

  selectedCount = computed(() => this.selectedSetCards().length);

  constructor() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url.startsWith('/sets'))
    ).subscribe(() => {
      this.loadAll();
    });

    effect(() => {
      const id = this.selectedId();
      this.questionIdsToDelete.set([]);
      if (id !== null) {
        this.loadCardsForSet(id);
      } else {
        this.selectedSetCards.set([]);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  async loadAll(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const list = await this.setservice.getAllSets();
      if (this.selectedId() == null && list.length) {
        this.selectedId.set(list[0].id);
      }
    }
    catch (e: any) {
      this.error.set(e?.message ?? 'Fehler beim Laden der Decks.');
    }
    finally {
      this.loading.set(false);
    }
  }

  async loadCardsForSet(setId: number): Promise<void> {
    try {
      await this.flashcardsService.getFlashcardsBySetId(setId);
      this.selectedSetCards.set(this.flashcardsService.flashcards());
    } catch (e) {
      console.error('Fehler beim Laden der Karten für das Deck', e);
      this.selectedSetCards.set([]);
    }
  }

  onQuestionSelectionChange(change: MatSelectionListChange): void {
    this.questionIdsToDelete.set(change.source.selectedOptions.selected.map(o => o.value));
  }

  async removeSelectedQuestions(): Promise<void> {
    const set = this.selectedSet();
    if (!set) return;

    const originalCards = this.selectedSetCards();
    const idsToDelete = this.questionIdsToDelete();
    const newCards = originalCards.filter(card => !idsToDelete.includes(card.id));

    const updatedSet = { ...set, flashcards: newCards };

    try {
      await this.setservice.updateSet(set.id, updatedSet);
      this.selectedSetCards.set(newCards);
      this.questionIdsToDelete.set([]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unbekannter Fehler';
      this.error.set(`Fragen konnten nicht entfernt werden: ${msg}`);
    }
  }

  selectSet(id: number) {
    this.selectedId.set(id);
  }

  addSet() {
    this.router.navigate(['/sets/create']);
  }


  editSelected() {
    const id = this.selectedId();
    if (id != null) {
      this.router.navigate(['/sets', id, 'edit']);
    }
  }

  async removeSet() {
    const id = this.selectedId();
    if (id == null) return;
    this.error.set(null);
    try {
      await this.setservice.deleteSet(id);
      const left = this.setservice.sets();
      this.selectedId.set(left.length ? left[0].id : null);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Löschen fehlgeschlagen');
    }
  }

  organizeCards() {
    const id = this.selectedId();
    if (id != null) this.router.navigate(['/sets', id, 'organize']);
  }
  cancel() {
    this.router.navigate(['/']);
  }
  trackById = (_: number, s: FlashcardSet) => s.id;
  trackCardById = (_: number, c: Flashcard) => c.id;
}
