package com.example.flashcardsapp.dto;

import java.util.List;

public class FlashcardSetDto {
    private Long id;
    private String name;
    private String description;
    private List<FlashcardDto> flashcards;

    public FlashcardSetDto(Long id, String name, String description, List<FlashcardDto> flashcards) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.flashcards = flashcards;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<FlashcardDto> getFlashcards() {
        return flashcards;
    }
}
