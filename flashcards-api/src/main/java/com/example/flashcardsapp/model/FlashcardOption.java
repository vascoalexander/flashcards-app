package com.example.flashcardsapp.model;

import jakarta.persistence.*;

@Entity
@Table(name="flashcard_options")
public class FlashcardOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="option_text", nullable = false, length = 2000)
    private String optionText;

    @Column(name="is_correct", nullable = false)
    private boolean isCorrect;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name="flashcard_id", nullable = false)
    private Flashcard flashcard;

    public FlashcardOption() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Flashcard getFlashcard() {
        return flashcard;
    }

    public void setFlashcard(Flashcard flashcard) {
        this.flashcard = flashcard;
    }
}
