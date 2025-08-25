package com.example.flashcardsapp.service;

import com.example.flashcardsapp.dto.FlashcardSetDto;
import com.example.flashcardsapp.dto.FlashcardSetTransportDto;
import com.example.flashcardsapp.exceptions.FlashcardSetNotFoundException;
import com.example.flashcardsapp.model.Flashcard;
import com.example.flashcardsapp.model.FlashcardOption;
import com.example.flashcardsapp.model.FlashcardSet;
import com.example.flashcardsapp.repository.FlashcardRepository;
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
    private FlashcardRepository flashcardRepository;

    public FlashcardSetServiceImpl(FlashcardSetRepository flashcardSetRepository, FlashcardService flashcardService, FlashcardRepository flashcardRepository) {
        this.flashcardSetRepository = flashcardSetRepository;
        this.flashcardService = flashcardService;
        this.flashcardRepository = flashcardRepository;
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

    public FlashcardSetTransportDto exportSet(Long setId){
        FlashcardSet set = flashcardSetRepository.findById(setId)
                .orElseThrow(() -> new FlashcardSetNotFoundException("FlashcardSet with id " + setId + " not found"));

        FlashcardSetTransportDto transportDto = new FlashcardSetTransportDto();
        transportDto.setName(set.getName());
        transportDto.setDescription(set.getDescription());

        List<FlashcardSetTransportDto.FlashcardTransportDto> flashcards = set.getFlashcards()
                .stream()
                .map(card -> {
                    FlashcardSetTransportDto.FlashcardTransportDto fc = new FlashcardSetTransportDto.FlashcardTransportDto();
                    fc.setQuestion(card.getQuestion());
                    fc.setAnswer(card.getAnswer());
                    fc.setType(card.getType());

                    List<FlashcardSetTransportDto.FlashcardOptionTransportDto> opts = card.getOptions()
                            .stream()
                            .map(opt -> {
                                FlashcardSetTransportDto.FlashcardOptionTransportDto o = new  FlashcardSetTransportDto.FlashcardOptionTransportDto();
                                o.setOptionText(opt.getOptionText());
                                o.setCorrect(opt.isCorrect());
                                return o;
                            }).toList();

                    fc.setOptions(opts);
                    return fc;
                }).toList();

        transportDto.setFlashcards(flashcards);
        return transportDto;
    }

    public FlashcardSet importSet(FlashcardSetTransportDto setDto){
        FlashcardSet set = new FlashcardSet();
        set.setName(setDto.getName());
        set.setDescription(setDto.getDescription());

        List<Flashcard> cards = setDto.getFlashcards().stream()
                .map(fcDto -> {
                    Flashcard flashcard = new Flashcard();
                    flashcard.setQuestion(fcDto.getQuestion());
                    flashcard.setAnswer(fcDto.getAnswer());
                    flashcard.setType(fcDto.getType());
                    flashcard.addSet(set);

                    List<FlashcardOption> opts = fcDto.getOptions().stream()
                            .map(opt -> {
                                FlashcardOption flashcardOption = new FlashcardOption();
                                flashcardOption.setOptionText(opt.getOptionText());
                                flashcardOption.setCorrect(opt.isCorrect());
                                flashcardOption.setFlashcard(flashcard);
                                return flashcardOption;
                            }).toList();

                    flashcard.setOptions(opts);
                    return flashcardRepository.save(flashcard);
                }).toList();

        set.setFlashcards(cards);
        return flashcardSetRepository.save(set);
    }
}
