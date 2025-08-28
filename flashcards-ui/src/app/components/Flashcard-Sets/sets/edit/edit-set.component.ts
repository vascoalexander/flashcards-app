import { Component, inject, OnInit, signal, ViewChild, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardSetsService } from '../../../../flashcard-sets.service';
import { Flashcard, FlashcardSet } from '../../../../flashcard.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlashcardsService } from '../../../../flashcards.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-set',
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, MatListModule, MatProgressBarModule, MatCardModule, MatDividerModule, MatGridListModule],
  templateUrl: './edit-set.component.html',
  styleUrl: './edit-set.component.css'
})


export class EditSetComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(FlashcardSetsService);
  private flashcardsApi = inject(FlashcardsService);

  @ViewChild('availableCardsList') availableCardsList!: MatSelectionList;

  mode = signal<'create' | 'edit'>('create');
  id = signal<number | null>(null);
  name = signal('');
  description = signal('');
  saving = signal(false);
  error = signal<string | null>(null);
  loading = signal(false);

  allFlashcards = this.flashcardsApi.flashcards;
  selectedCardIds = signal<number[]>([]);


  cardsInSet = computed(() => {
    const all = this.allFlashcards();
    const selectedIds = this.selectedCardIds();
    return all.filter(card => selectedIds.includes(card.id));
  });

  cardsAvailable = computed(() => {
    const all = this.allFlashcards();
    const selectedIds = this.selectedCardIds();
    return all.filter(card => !selectedIds.includes(card.id));
  });

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await Promise.all([
        this.flashcardsApi.getFlashcards(),
        this.loadSetIfInEditMode()
      ]);
    } catch (e: any) {
      this.error.set('Fehler beim Laden der Initialdaten.');
    } finally {
      this.loading.set(false);
    }
  }

  private async loadSetIfInEditMode(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.mode.set('edit');
      const num = Number(idParam);
      this.id.set(num);
      await this.load(num);
    }
  }



  private async load(id: number) {
    this.error.set(null);
    try {
      const s = await this.api.getSetById(id);
      this.name.set(s.name ?? '');
      this.description.set(s.description ?? '');
      this.selectedCardIds.set(s.flashcards?.map((f: Flashcard) => f.id) ?? []);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Fehler beim Laden des Sets.');
    }
  }

  async save() {
    const norm = (s: string) => s.trim().toLowerCase();

    const name = this.name().trim();
    if (!name) {
      this.error.set('Der Name für das Set ist erforderlich.'); return;
    }
    this.saving.set(true);
    this.error.set(null);

    const newlySelectedOptions = this.availableCardsList.selectedOptions.selected;
    const newlySelectedIds = newlySelectedOptions.map(option => option.value);

    const originalIds = this.selectedCardIds();
    const finalSelectedIds = [...originalIds, ...newlySelectedIds];

    const allCards = this.allFlashcards();
    const selectedCards = finalSelectedIds
      .map(id => allCards.find(c => c.id === id))
      .filter((c): c is Flashcard => c !== undefined);

    try {
      const id = this.id();
      const sets = await this.api.getAllSets();
      if (sets.some(s => norm(s.name) === norm(name) && s.id !== id)) {
        this.error.set('Das Deck existiert bereits.'); return;
      }
      const payload: Omit<FlashcardSet, 'id'> = {
        name: name,
        description: this.description().trim(),
        flashcards: selectedCards
      };

      if (this.mode() === 'create') {
        await this.api.createSet(payload);
      } else {
        const id = this.id();
        if (id) {
          const updatePayload = { ...payload, id };
          await this.api.updateSet(id, updatePayload);
        }
      }
      this.router.navigate(['/sets']);

    } catch (e: any) {
      if (e instanceof HttpErrorResponse) {
        if (e.status === 400) {
          const errorMessage = e.error?.message || e.error;
          if (errorMessage && (errorMessage.toLowerCase().includes('already exists') || errorMessage.toLowerCase().includes('bereits existiert'))) {
            this.error.set('Das Deck existiert bereits.');
          } else {
            this.error.set('Speichern fehlgeschlagen: Ungültige Anfrage.');
          }
        } else {
          this.error.set(e?.message ?? 'Speichern fehlgeschlagen.');
        }
      } else {
        this.error.set(e?.message ?? 'Speichern fehlgeschlagen.');
      }
    } finally { this.saving.set(false); }
  }
  cancel() { this.router.navigate(['/sets']); }

}
