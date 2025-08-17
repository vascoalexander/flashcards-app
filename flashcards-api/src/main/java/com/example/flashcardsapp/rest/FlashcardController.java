package com.example.flashcardsapp.rest;

import com.example.flashcardsapp.dto.FlashcardDto;
import com.example.flashcardsapp.service.FlashcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FlashcardController {

    private final FlashcardService flashcardService;

    @Autowired
    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @GetMapping("/flashcards")
    public List<FlashcardDto>  getFlashcards(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long set
    ) {
        return flashcardService.findAll(type, set);
    }

    @GetMapping("/sets/{setId}/flashcards")
    public List<FlashcardDto> getFlashcardsBySetId(@PathVariable Long setId) {
        return flashcardService.findBySetId(setId);
    }

    @GetMapping("/flashcards/{flashcardId}")
    public FlashcardDto getFlashcard(@PathVariable("flashcardId") Long flashcardId) {
        return flashcardService.findById(flashcardId);
    }

    @PutMapping("/flashcards/{flashcardId:\\d+}")
    public FlashcardDto updateFlashcard(@PathVariable Long flashcardId, @RequestBody FlashcardDto flashcardDto) {
        return flashcardService.update(flashcardId, flashcardDto);
    }

    @PostMapping("/flashcards")
    public FlashcardDto createNewFlashcard(@RequestBody FlashcardDto flashcardDto) {
        flashcardDto.setId(null);
        return flashcardService.save(flashcardDto);
    }

    @DeleteMapping("/flashcards/{flashcardId}")
    public void deleteFlashcard(@PathVariable("flashcardId") Long flashcardId) {
        flashcardService.deleteById(flashcardId);
    }
}
