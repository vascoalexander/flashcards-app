import { Injectable, signal } from '@angular/core';
import { FlashcardSet } from './flashcard.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardSetsService {

  private baseUrl = '/api/sets';

  sets = signal<FlashcardSet[]>([]);

  private setsChanged = new Subject<void>();
  setsChanged$ = this.setsChanged.asObservable();

  async getAllSets(): Promise<FlashcardSet[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Fehler beim Abrufen des /flashcards Enpoints');
    const data = await response.json();
    this.sets.set(data);
    return data;
  }

  async getSetById(setId: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${setId}`);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async createSet(set: any): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(set)
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const created = await response.json();

    this.sets.update(sets => [...sets, created]);
    this.setsChanged.next();
  }

  async deleteSet(setId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${setId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    this.setsChanged.next();
  }

  async updateSet(setId: number, set: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(set)
    });
    this.setsChanged.next();
  }
}
