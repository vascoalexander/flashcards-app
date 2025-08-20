import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  private baseUrl = '/api/flashcards';

  async getFlashcards(): Promise<any> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Fehler beim Abrufen des /flashcards Enpoints');
    return  response.json();
  }

  async getFlashcardsBySetId(setId: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}?set=${setId}`);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async getFlashcardById(flashcardId: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${flashcardId}`);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async createFlashcard(flashcard: any): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flashcard)
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async updateFlashcard(flashcardId: number, flashcard: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${flashcardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flashcard)
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async deleteFlashcard(flashcardId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${flashcardId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }
}
