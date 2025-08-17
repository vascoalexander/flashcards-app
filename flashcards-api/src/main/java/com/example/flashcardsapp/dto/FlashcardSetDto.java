package com.example.flashcardsapp.dto;

import java.util.List;

public class FlashcardSetDto {
    private Long id;
    private String name;
    private String description;

    public FlashcardSetDto(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
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
}
