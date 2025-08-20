import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashcardSetsService {

  private baseUrl = '/api/sets';

  async getAllSets(): Promise<any> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Fehler beim Abrufen des /flashcards Enpoints');
    return  response.json();
  }

  async getSetById(setId: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${setId}`);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async createSet(set: any): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(set)
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async deleteSet(setId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${setId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }
}
