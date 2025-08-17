package com.example.flashcardsapp.service;

import com.example.flashcardsapp.dto.FlashcardDto;
import com.example.flashcardsapp.model.Flashcard;

import java.util.List;

public interface FlashcardService {
    Flashcard toEntity(FlashcardDto flashcardDto);
    FlashcardDto toDto(Flashcard flashcard);
    FlashcardDto findById(Long id);
    List<FlashcardDto> findAll(String type, Long setId);
    List<FlashcardDto> findBySetId(Long setId);
    FlashcardDto update(Long id, FlashcardDto flashcardDto);
    FlashcardDto save(FlashcardDto flashcardDto);
    void deleteById(Long id);
}
