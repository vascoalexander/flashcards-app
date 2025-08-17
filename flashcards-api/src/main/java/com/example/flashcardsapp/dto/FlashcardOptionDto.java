package com.example.flashcardsapp.dto;

public class FlashcardOptionDto {
    private Long id;
    private String optionText;
    private boolean isCorrect;

    public FlashcardOptionDto(Long id, String optionText, boolean isCorrect) {
        this.id = id;
        this.optionText = optionText;
        this.isCorrect = isCorrect;
    }

    public Long getId() {
        return id;
    }

    public String getOptionText() {
        return optionText;
    }

    public boolean getCorrect() {
        return isCorrect;
    }
}
