import {Injectable, signal} from '@angular/core';
import {Flashcard, FlashcardType} from './flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  private baseUrl = '/api/flashcards';

  flashcards = signal<Flashcard[]>([]);

  async getFlashcards(): Promise<void> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Fehler beim Abrufen des /flashcards Enpoints');
    const data = await response.json();

    this.flashcards.set(data);
  }

  async getFlashcardsBySetId(setId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}?set=${setId}`);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();

    this.flashcards.set(data);
  }

  async getFlashcardById(flashcardId: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${flashcardId}`);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async createFlashcard(flashcard: any): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flashcard)
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const newCard = await response.json();

    this.flashcards.update(cards => [...cards, newCard])
  }

  async updateFlashcard(flashcardId: number, flashcard: any): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${flashcardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flashcard)
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const updated = await response.json();

    this.flashcards.update(cards => cards.map(c => c.id === updated.id ? updated : c));
  }

  async deleteFlashcard(flashcardId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${flashcardId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    this.flashcards.update(cards => cards.filter(c => c.id !== flashcardId));
  }
}
