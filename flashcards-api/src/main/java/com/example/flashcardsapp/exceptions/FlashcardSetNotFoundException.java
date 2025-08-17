package com.example.flashcardsapp.exceptions;

public class FlashcardSetNotFoundException extends RuntimeException {
    public FlashcardSetNotFoundException(String message) {
        super(message);
    }
    public FlashcardSetNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    public FlashcardSetNotFoundException(Throwable cause) {
        super(cause);
    }
}
