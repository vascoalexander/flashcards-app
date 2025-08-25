package com.example.flashcardsapp.dto;

import com.example.flashcardsapp.model.FlashcardType;

import java.util.List;

public class FlashcardSetTransportDto {
    private String name;
    private String description;
    private List<FlashcardTransportDto> flashcards;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<FlashcardTransportDto> getFlashcards() {
        return flashcards;
    }

    public void setFlashcards(List<FlashcardTransportDto> flashcards) {
        this.flashcards = flashcards;
    }

    public static class FlashcardTransportDto{
        private String question;
        private String answer;
        private FlashcardType type;
        private List<FlashcardOptionTransportDto> options;

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }

        public FlashcardType getType() {
            return type;
        }

        public void setType(FlashcardType type) {
            this.type = type;
        }

        public List<FlashcardOptionTransportDto> getOptions() {
            return options;
        }

        public void setOptions(List<FlashcardOptionTransportDto> options) {
            this.options = options;
        }
    }

    public static class FlashcardOptionTransportDto{
        private String optionText;
        private boolean isCorrect;

        public String getOptionText() {
            return optionText;
        }

        public void setOptionText(String optionText) {
            this.optionText = optionText;
        }

        public boolean isCorrect() {
            return isCorrect;
        }

        public void setCorrect(boolean correct) {
            isCorrect = correct;
        }
    }
}
