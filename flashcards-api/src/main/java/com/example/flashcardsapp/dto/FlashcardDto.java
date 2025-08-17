package com.example.flashcardsapp.dto;

import com.example.flashcardsapp.model.FlashcardType;

import java.util.List;

public class FlashcardDto {

    private Long id;
    private String question;
    private String answer;
    private FlashcardType type;
    private List<FlashcardOptionDto> options;
    private List<FlashcardSetDto> sets;

    public FlashcardDto(
            Long id,
            String question,
            String answer,
            FlashcardType type,
            List<FlashcardOptionDto> options,
            List<FlashcardSetDto> sets) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.type = type;
        this.options = options;
        this.sets = sets;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public FlashcardType getType() {
        return type;
    }

    public List<FlashcardOptionDto> getOptions() {
        return options;
    }

    public List<FlashcardSetDto> getSets() {
        return sets;
    }
}
