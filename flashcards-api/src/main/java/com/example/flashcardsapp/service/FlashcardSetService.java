package com.example.flashcardsapp.service;

import com.example.flashcardsapp.dto.FlashcardSetDto;
import com.example.flashcardsapp.model.FlashcardSet;

import java.util.List;

public interface FlashcardSetService {
    FlashcardSetDto toDto(FlashcardSet set);
    FlashcardSetDto findById(Long id);
    List<FlashcardSetDto> findAll();
    FlashcardSetDto save(FlashcardSet set);
    void deleteById(Long id);
    
}
