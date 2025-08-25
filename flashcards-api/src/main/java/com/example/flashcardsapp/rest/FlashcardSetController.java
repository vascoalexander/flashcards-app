package com.example.flashcardsapp.rest;

import com.example.flashcardsapp.dto.FlashcardSetDto;
import com.example.flashcardsapp.dto.FlashcardSetTransportDto;
import com.example.flashcardsapp.model.FlashcardSet;
import com.example.flashcardsapp.service.FlashcardSetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FlashcardSetController {

    private final FlashcardSetService flashcardSetService;
    private final ObjectMapper objectMapper;

    @Autowired
    public FlashcardSetController(FlashcardSetService flashcardSetService,  ObjectMapper objectMapper) {
        this.flashcardSetService = flashcardSetService;
        this.objectMapper = objectMapper;
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

    @GetMapping("/sets/{id}/export")
    public ResponseEntity<byte[]> exportSet(@PathVariable Long id) throws IOException {
        FlashcardSetTransportDto dto = flashcardSetService.exportSet(id);

        byte[] json = objectMapper.writeValueAsBytes(dto);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"set-" + id + ".json\"")
                .contentType(MediaType.APPLICATION_JSON)
                .body(json);
    }

    @PostMapping("/sets/import")
    public ResponseEntity<Long> importSet(@RequestBody FlashcardSetTransportDto dto) {
        FlashcardSet saved = flashcardSetService.importSet(dto);
        return ResponseEntity.ok(saved.getId());
    }

}
