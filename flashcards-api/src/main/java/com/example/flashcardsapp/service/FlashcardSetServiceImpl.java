package com.example.flashcardsapp.service;

import com.example.flashcardsapp.dto.FlashcardSetDto;
import com.example.flashcardsapp.exceptions.FlashcardSetNotFoundException;
import com.example.flashcardsapp.model.FlashcardSet;
import com.example.flashcardsapp.repository.FlashcardSetRepository;
import com.example.flashcardsapp.service.FlashcardService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FlashcardSetServiceImpl implements FlashcardSetService {

    private FlashcardSetRepository flashcardSetRepository;
    private FlashcardService flashcardService;

    public FlashcardSetServiceImpl(FlashcardSetRepository flashcardSetRepository, FlashcardService flashcardService) {
        this.flashcardSetRepository = flashcardSetRepository;
        this.flashcardService = flashcardService;
    }

    @Override
    public FlashcardSetDto toDto(FlashcardSet set) {
        return new FlashcardSetDto(
                set.getId(),
                set.getName(),
                set.getDescription(),
                set.getFlashcards().stream().map(flashcardService::toDto).toList()
        );
    }

    @Override
    public FlashcardSetDto findById(Long id) {
        FlashcardSetDto set;
        Optional<FlashcardSetDto> result = this.flashcardSetRepository.findById(id)
                .stream()
                .map(this::toDto)
                .findFirst();
        if (result.isPresent()) {
            set = result.get();
        } else {
            throw new FlashcardSetNotFoundException("FlashcardSet with id " + id + " not found");
        }
        return set;
    }

    @Override
    public List<FlashcardSetDto> findAll() {
        return flashcardSetRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public FlashcardSetDto save(FlashcardSet set) {
        return toDto(flashcardSetRepository.save(set));
    }

    @Override
    public void deleteById(Long id) {
        FlashcardSet flashcardSet = flashcardSetRepository.findById(id)
            .orElseThrow(() -> new FlashcardSetNotFoundException("FlashcardSet with id " + id + " not found"));
        flashcardSet.getFlashcards().clear();
        flashcardSetRepository.deleteById(id);
    }
}
