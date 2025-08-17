package com.example.flashcardsapp.repository;

import com.example.flashcardsapp.model.FlashcardOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardOptionRepository extends JpaRepository<FlashcardOption, Long> {
}
