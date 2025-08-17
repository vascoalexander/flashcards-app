package com.example.flashcardsapp.service;

import com.example.flashcardsapp.dto.FlashcardDto;
import com.example.flashcardsapp.dto.FlashcardOptionDto;
import com.example.flashcardsapp.dto.FlashcardSetDto;
import com.example.flashcardsapp.exceptions.FlashcardNotFoundException;
import com.example.flashcardsapp.model.Flashcard;
import com.example.flashcardsapp.model.FlashcardOption;
import com.example.flashcardsapp.model.FlashcardSet;
import com.example.flashcardsapp.repository.FlashcardOptionRepository;
import com.example.flashcardsapp.repository.FlashcardRepository;
import com.example.flashcardsapp.repository.FlashcardSetRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class FlashcardServiceImpl implements FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final FlashcardSetRepository flashcardSetRepository;
    private final FlashcardOptionRepository flashcardOptionRepository;

    @Autowired
    public FlashcardServiceImpl(FlashcardRepository flashcardRepository,
                                FlashcardSetRepository flashcardSetRepository,
                                FlashcardOptionRepository flashcardOptionRepository) {
        this.flashcardRepository = flashcardRepository;
        this.flashcardSetRepository = flashcardSetRepository;
        this.flashcardOptionRepository = flashcardOptionRepository;
    }

    @Override
    public Flashcard toEntity(FlashcardDto flashcardDto) {
        Flashcard flashcard = new Flashcard();
        flashcard.setId(flashcardDto.getId());
        flashcard.setQuestion(flashcardDto.getQuestion());
        flashcard.setAnswer(flashcardDto.getAnswer());
        flashcard.setType(flashcardDto.getType());

        if (flashcardDto.getOptions() != null) {
            for (FlashcardOptionDto optDto : flashcardDto.getOptions()) {
                FlashcardOption option = new FlashcardOption();
                option.setId(optDto.getId());
                option.setOptionText(optDto.getOptionText());
                option.setCorrect(optDto.getCorrect());
                flashcard.addOption(option);
            }
        }
        return flashcard;
    }

    @Override
    public FlashcardDto toDto(Flashcard flashcard) {
        List<FlashcardOptionDto> options = flashcard.getOptions()
                .stream()
                .map(o -> new FlashcardOptionDto(
                        o.getId(),
                        o.getOptionText(),
                        o.isCorrect()
                )).toList();

        List<FlashcardSetDto> sets = flashcard.getSets()
                .stream()
                .map(s -> new FlashcardSetDto(
                        s.getId(),
                        s.getName(),
                        s.getDescription()
                )).toList();

        return new FlashcardDto(
                flashcard.getId(),
                flashcard.getQuestion(),
                flashcard.getAnswer(),
                flashcard.getType(), options, sets);
    }

    @Override
    public FlashcardDto findById(Long id) {
        FlashcardDto flashcard;
        Optional<FlashcardDto> result = this.flashcardRepository.findById(id)
                .stream()
                .map(this::toDto)
                .findFirst();
        if (result.isPresent()) {
            flashcard = result.get();
        } else {
            throw new FlashcardNotFoundException("Flashcard with id " + id + " not found");
        }
        return flashcard;
    }

    @Override
    public List<FlashcardDto> findAll(String type, Long setId) {
        return flashcardRepository.findAll()
                .stream()
                .filter(f -> type == null || f.getType().name().equals(type))
                .filter(f -> setId == null || f.getSets().stream().anyMatch(s -> s.getId().equals(setId)))
                .map(this::toDto)
                .toList();
    }

    public List<FlashcardDto> findBySetId(Long setId) {
        return flashcardRepository.findBySetId(setId).stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public FlashcardDto save(FlashcardDto flashcardDto) {
        Flashcard flashcard = toEntity(flashcardDto);
        for (FlashcardOption option : flashcard.getOptions()) {
            option.setFlashcard(flashcard);
        }

        if (flashcardDto.getSets() != null && !flashcardDto.getSets().isEmpty()) {
            List<FlashcardSet> managedSets = flashcardDto.getSets().stream()
                    .map(setDto -> flashcardSetRepository.getReferenceById(setDto.getId()))
                    .toList();
            flashcard.setSets(managedSets);
        }

        Flashcard saved = flashcardRepository.save(flashcard);
        return toDto(saved);
    }

    @Override
    public FlashcardDto update(Long id, FlashcardDto flashcardDto){
        Flashcard existing = flashcardRepository.findById(id)
                .orElseThrow(() -> new FlashcardNotFoundException("Flashcard with id " + id));
        existing.setQuestion(flashcardDto.getQuestion());
        existing.setAnswer(flashcardDto.getAnswer());
        existing.setType(flashcardDto.getType());
        if (flashcardDto.getOptions() != null) {
            existing.getOptions().clear();
            for (FlashcardOptionDto optionDto : flashcardDto.getOptions()) {
                FlashcardOption option;
                if(optionDto.getId() != null) {
                    option = flashcardOptionRepository.findById(optionDto.getId())
                            .orElseThrow(() -> new FlashcardNotFoundException("Flashcard option with id " + optionDto.getId()));
                    option.setId(optionDto.getId());
                } else {
                    option = new FlashcardOption();
                }
                option.setOptionText(optionDto.getOptionText());
                option.setCorrect(optionDto.getCorrect());
                option.setFlashcard(existing);
                existing.addOption(option);
            }
        }
        return  toDto(flashcardRepository.save(existing));
    }

    @Override
    public void deleteById(Long id) {
        Flashcard flashcard = flashcardRepository.findById(id)
            .orElseThrow(() -> new FlashcardNotFoundException("Flashcard with id " + id + " not found"));
        flashcardRepository.deleteById(id);
    }
}
