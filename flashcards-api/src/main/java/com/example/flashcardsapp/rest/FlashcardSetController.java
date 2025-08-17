package com.example.flashcardsapp.rest;

import com.example.flashcardsapp.dto.FlashcardSetDto;
import com.example.flashcardsapp.model.FlashcardSet;
import com.example.flashcardsapp.service.FlashcardSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FlashcardSetController {

    private final FlashcardSetService flashcardSetService;
    @Autowired
    public FlashcardSetController(FlashcardSetService flashcardSetService) {
        this.flashcardSetService = flashcardSetService;
    }

    @GetMapping("/sets")
    public List<FlashcardSetDto> getAllSets() {
        return flashcardSetService.findAll();
    }

    @GetMapping("/sets/{setId:\\d+}")
    public FlashcardSetDto getSetById(@PathVariable Long setId) {
        return flashcardSetService.findById(setId);
    }

    @PutMapping("/sets")
    public FlashcardSetDto updateSet(@RequestBody FlashcardSet flashcardSet) {
        return flashcardSetService.save(flashcardSet);
    }

    @PostMapping("/sets")
    public FlashcardSetDto createNewSet(@RequestBody FlashcardSet flashcardSet) {
        flashcardSet.setId(null);
        return flashcardSetService.save(flashcardSet);
    }

    @DeleteMapping("/sets/{setId:\\d+}")
    public void deleteSetById(@PathVariable Long setId) {
        flashcardSetService.deleteById(setId);
    }
}
