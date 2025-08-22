export enum FlashcardType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  TEXT = 'TEXT'
}

export interface Flashcard {
  id: number;
  question: string;
  answer?: string;
  type: FlashcardType;
  options?: FlashcardOption[];
  sets?: FlashcardSet[];

  // clientseitige zustände
  userAnswer?: string[];
  isCorrect?: boolean;
  answered?: boolean;
}

export interface FlashcardOption {
  id: number;
  optionText: string;
  correct: boolean;
}

export interface FlashcardSet {
  id: number;
  name: string;
  description: string;
  flashcards: Flashcard[];
}
