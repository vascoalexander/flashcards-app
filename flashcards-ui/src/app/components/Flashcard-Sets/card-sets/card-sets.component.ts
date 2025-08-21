import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashcardSetsService } from '../../../flashcard-sets.service';
import { CommonModule } from '@angular/common';
import { FlashcardSet } from '../../../flashcard.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-card-sets',
  imports: [
    ReactiveFormsModule, CommonModule, MatSidenavModule, MatToolbarModule,
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatListModule, MatProgressBarModule, MatCardModule, MatDividerModule
  ],
  templateUrl: './card-sets.component.html',
  styleUrl: './card-sets.component.css'
})
export class CardSetsComponent {

  private setservice = inject(FlashcardSetsService);
  router = inject(Router);

  sets = signal<FlashcardSet[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  filterText = signal('');
  selectedId = signal<number | null>(null);

  filteredSets = computed(() => {
    const q = this.filterText().toLowerCase().trim();
    const all = this.sets();
    if (!q) return all;
    return all.filter(s => s.name.toLowerCase().includes(q));
  });

  selectedSet = computed<FlashcardSet | null>(() => {
    const id = this.selectedId();
    if (id == null) return null;
    return this.sets().find(s => s.id === id) ?? null;
  });

  selectedCount = computed(() => this.selectedSet()?.flashcards?.length ?? 0);

  constructor() { queueMicrotask(() => this.loadAll()); }

  async loadAll(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.setservice.getAllSets();
      const list = (data ?? []) as FlashcardSet[];
      this.sets.set(list);
      if (this.selectedId() == null && list.length) {
        this.selectedId.set(list[0].id);
      }
    }
    catch (e: any) {
      this.error.set(e?.message ?? 'Fehler beim Laden der Sets.');
    }
    finally {
      this.loading.set(false);
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
      this.sets.update(arr => arr.filter(s => s.id !== id));
      const left = this.sets();
      this.selectedId.set(left.length ? left[0].id : null);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Löschen fehlgeschlagen');
    }
  }

  organizeCards() {
    const id = this.selectedId();
    if (id != null) this.router.navigate(['/sets', id, 'organize']);
  }

  trackById = (_: number, s: FlashcardSet) => s.id;
}