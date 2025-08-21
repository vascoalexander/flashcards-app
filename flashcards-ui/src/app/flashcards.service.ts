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

  validateAnswer(flashcard: Flashcard, selectedOption: string[]):boolean {
    let isCorrect = false;

    if (selectedOption.length === 0) return false;

    if (flashcard.type === FlashcardType.MULTIPLE_CHOICE){
      const correctAnswers = (flashcard.options ?? []).filter(o => o.correct).map(o => o.optionText);
      const givenAnswers = Array.isArray(selectedOption) ? selectedOption : [selectedOption];
      isCorrect = (correctAnswers.length === givenAnswers.length && correctAnswers.every(a => givenAnswers.includes(a)));
    } else if (flashcard.type === FlashcardType.SINGLE_CHOICE){
      if (selectedOption.length > 1) return false;
      const correctAnswer = (flashcard.options ?? []).find(o => o.correct)?.optionText;
      const givenAnswer = selectedOption[0].toString();
      isCorrect = correctAnswer === givenAnswer;
    } else if (flashcard.type === FlashcardType.TEXT){
      if (selectedOption.length > 1) return false;
      const correctAnswer = flashcard.answer;
      isCorrect = correctAnswer === selectedOption[0].toString();
    }

    this.flashcards.update(cards =>
      cards.map(card => {
        if (card.id === flashcard.id) {
          return {
            ...card,
            userAnswer: selectedOption,
            isCorrect: isCorrect,
            answered: true
          };
        }
        return card;
      })
    );

    return isCorrect;
  }
}
