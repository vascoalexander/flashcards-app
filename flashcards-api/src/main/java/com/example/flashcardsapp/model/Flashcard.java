package com.example.flashcardsapp.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cards")
public class Flashcard
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="question", nullable=false, length=1000)
    private String question;

    @Column(name="answer", length=4000)
    private String answer;

    @Enumerated(EnumType.STRING)
    @Column(name="type", nullable=false, length=32)
    private FlashcardType type;

    @OneToMany(mappedBy = "flashcard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FlashcardOption> options = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name="flashcard_set_mapping",
            joinColumns = @JoinColumn(name="flashcard_id"),
            inverseJoinColumns = @JoinColumn(name="set_id")
    )
    private List<FlashcardSet> sets = new ArrayList<>();

    public Flashcard() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public List<FlashcardOption> getOptions() {
        return options;
    }

    public void setOptions(List<FlashcardOption> options) {
        this.options = options;
    }

    public void addOption(FlashcardOption option) {
        options.add(option);
        option.setFlashcard(this);
    }

    public void removeOption(FlashcardOption option) {
        options.remove(option);
        option.setFlashcard(null);
    }

    public List<FlashcardSet> getSets() {
        return sets;
    }

    public void setSets(List<FlashcardSet> sets) {
        this.sets = sets;
    }
}
