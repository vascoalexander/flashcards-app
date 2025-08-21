import { Component, inject, signal, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardSetsService } from '../../../flashcard-sets.service';
import { FlashcardSet } from '../../../flashcard.model';


@Component({
  selector: 'app-edit-set',
  imports: [],
  templateUrl: './edit-set.component.html',
  styleUrl: './edit-set.component.css'
})
export class EditSetComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(FlashcardSetsService);
  mode = signal<'create' | 'edit'>('create');
  id = signal<number | null>(null);
  name = signal('');
  description = signal('');
  saving = signal(false);
  error = signal<string | null>(null);
  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.mode.set('edit');
      const num = Number(idParam);
      this.id.set(num);
      this.load(num);
    }
  }
  private async load(id: number) {
    this.error.set(null);
    try {
      const s = await this.api.getSetById(id);
      this.name.set(s.name ?? '');
      this.description.set(s.description ?? '');

    } catch (e: any) {
      this.error.set(e?.message ?? 'Fehler beim Laden des Sets.');
    }
  }
  async save() {
    const name = this.name().trim();
    if (!name) {
      this.error.set('Der Name für das Set ist erforderlich.'); return;
    }
    this.saving.set(true);
    this.error.set(null);
    try {
      if (this.mode() === 'create') {
        await this.api.createSet({
          name: name,
          description: this.description().trim(),
          flashcards: []
        } as Omit<FlashcardSet, 'id'>);
        this.router.navigate(['/sets']);

      }
    } catch (e: any) {
      this.error.set(e?.message ?? 'Speichern fehlgeschlagen.');
    } finally { this.saving.set(false); }
  }
  cancel() { this.router.navigate(['/sets']); }

}
