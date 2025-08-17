package com.example.flashcardsapp.repository;

import com.example.flashcardsapp.model.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    @Query("SELECT f FROM Flashcard f JOIN f.sets s WHERE s.id = :setId")
    List<Flashcard> findBySetId(Long setId);
    @Query("SELECT f FROM Flashcard f JOIN f.sets s WHERE s.id IN :setIds")
    List<Flashcard> findBySetIds(List<Long> setIds);
}
