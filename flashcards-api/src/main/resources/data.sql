-- PostgreSQL Script für Flashcards App
-- Tabellen erstellen und mit IT-Beispieldaten befüllen

-- Cleanup (falls Tabellen bereits existieren)
DROP TABLE IF EXISTS flashcard_options CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS flashcard_sets CASCADE;
-- TRUNCATE TABLE flashcard_set_mapping;

-- Erstelle flashcards_sets Tabelle
CREATE TABLE IF NOT EXISTS flashcard_sets
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255)  NOT NULL UNIQUE,
    description VARCHAR(2000) NOT NULL
);

-- Erstelle cards Tabelle
CREATE TABLE cards
(
    id       BIGSERIAL PRIMARY KEY,
    question VARCHAR(1000) NOT NULL,
    answer   VARCHAR(4000) NULL,
    type     VARCHAR(32)   NOT NULL
);

-- Erstelle flashcard_options Tabelle
CREATE TABLE flashcard_options
(
    id           BIGSERIAL PRIMARY KEY,
    option_text  VARCHAR(2000) NOT NULL,
    is_correct   BOOLEAN       NOT NULL DEFAULT false,
    flashcard_id BIGINT        NOT NULL,
    FOREIGN KEY (flashcard_id) REFERENCES cards (id) ON DELETE CASCADE
);

-- Seeding: Flashcard Sets anlegen
INSERT INTO flashcard_sets (name, description)
VALUES ('Undefined', 'Default set for flashcards without explicit set'),
       ('Java Basics', 'Questions covering basic Java concepts'),
       ('Spring Boot', 'Flashcards about Spring Boot features'),
       ('Database Fundamentals', 'Covers SQL, normalization, indexes');

-- Seeding: IT-Flashcards einfügen
INSERT INTO cards (question, answer, type)
VALUES

-- Multiple Choice Fragen (mehrere richtige Antworten)
('Welche der folgenden sind relationale Datenbankmanagementsysteme?', NULL, 'MULTIPLE_CHOICE'),
('Welche HTTP-Methoden sind idempotent?', NULL, 'MULTIPLE_CHOICE'),
('Welche Programmiersprachen sind objektorientiert?', NULL, 'MULTIPLE_CHOICE'),
('Welche Datentypen gibt es in JavaScript?', NULL, 'MULTIPLE_CHOICE'),
('Welche der folgenden sind Eigenschaften von REST APIs?', NULL, 'MULTIPLE_CHOICE'),

-- Single Choice Fragen (eine richtige Antwort)
('Welche Datenstruktur arbeitet nach dem LIFO-Prinzip?', NULL, 'SINGLE_CHOICE'),
('Welcher HTTP-Statuscode steht für "Not Found"?', NULL, 'SINGLE_CHOICE'),
('Was bedeutet die Abkürzung CPU?', NULL, 'SINGLE_CHOICE'),
('Welches OSI-Layer ist für die Datenübertragung zwischen Netzwerkknoten zuständig?', NULL,
 'SINGLE_CHOICE'),
('Welcher Algorithmus hat die beste durchschnittliche Zeitkomplexität für Sortierung?', NULL, 'SINGLE_CHOICE'),

-- Text Fragen (eindeutige kurze Antworten)
('Wie viele Bits hat ein Byte?', '8', 'TEXT'),
('Welcher Port wird standardmäßig für HTTPS verwendet?', '443', 'TEXT'),
('Wie lautet die Dateiendung für Java-Quelldateien?', '.java', 'TEXT'),
('Welche SQL-Anweisung wird zum Hinzufügen von Daten verwendet?', 'INSERT', 'TEXT'),
('Wie heißt das Protokoll für E-Mail-Übertragung?', 'SMTP', 'TEXT');

-- Multiple Choice Optionen (mehrere richtige Antworten möglich)
-- Flashcard 1: Relationale DBMS
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('PostgreSQL', true, 1),
       ('MySQL', true, 1),
       ('MongoDB', false, 1),
       ('Oracle', true, 1);

-- Flashcard 2: Idempotente HTTP-Methoden
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('GET', true, 2),
       ('POST', false, 2),
       ('PUT', true, 2),
       ('DELETE', true, 2);

-- Flashcard 3: Objektorientierte Programmiersprachen
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('Java', true, 3),
       ('C', false, 3),
       ('C++', true, 3),
       ('Python', true, 3);

-- Flashcard 4: JavaScript Datentypen
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('String', true, 4),
       ('Number', true, 4),
       ('Boolean', true, 4),
       ('Object', true, 4);

-- Flashcard 5: REST API Eigenschaften
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('Stateless', true, 5),
       ('Stateful', false, 5),
       ('Cacheable', true, 5),
       ('Uniform Interface', true, 5);

-- Single Choice Optionen (nur eine richtige Antwort)
-- Flashcard 6: LIFO-Datenstruktur
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('Queue', false, 6),
       ('Array', false, 6),
       ('Stack', true, 6),
       ('Linked List', false, 6);

-- Flashcard 7: HTTP-Statuscode Not Found
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('200', false, 7),
       ('404', true, 7),
       ('500', false, 7),
       ('302', false, 7);

-- Flashcard 8: CPU Bedeutung
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('Computer Processing Unit', false, 8),
       ('Central Processing Unit', true, 8),
       ('Core Processing Unit', false, 8),
       ('Central Program Unit', false, 8);

-- Flashcard 9: OSI Layer für Datenübertragung
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('Layer 1 (Physical)', false, 9),
       ('Layer 2 (Data Link)', true, 9),
       ('Layer 3 (Network)', false, 9),
       ('Layer 4 (Transport)', false, 9);

-- Flashcard 10: Bester Sortieralgorithmus (durchschnittlich)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id)
VALUES ('Bubble Sort', false, 10),
       ('Quick Sort', true, 10),
       ('Selection Sort', false, 10),
       ('Insertion Sort', false, 10);

-- INSERT INTO flashcard_set_mapping (flashcard_id, set_id)
-- VALUES (1, 1),
--        (2, 1),
--        (3, 2),
--        (3, 4),
--        (4, 2),
--        (5, 1),
--        (6, 3),
--        (7, 3),
--        (8, 1),
--        (8, 2),
--        (9, 1),
--        (10, 3)
