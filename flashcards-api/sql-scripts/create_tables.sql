-- PostgreSQL Script für Flashcards App
-- Tabellen erstellen und mit neuen Flashcards befüllen (Testdaten entfernt)

-- Cleanup (falls Tabellen bereits existieren)
DROP TABLE IF EXISTS flashcard_options CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS flashcard_sets CASCADE;

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
    answer   VARCHAR(4000) NOT NULL,
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

-- Seeding: Flashcard Sets (frei anpassbar)
INSERT INTO flashcard_sets (name, description) VALUES
    ('Undefined', 'Standard-Set für nicht zugeordnete Karten'),
    ('u-form – Teil 1', 'Automatisch extrahierte und bereinigte Lernkarten (30 Items)');

-- =====================
-- Seeding: 30 Flashcards
-- =====================
-- Hinweis:
-- - SINGLE_CHOICE & MULTIPLE_CHOICE: genau 5 Optionen
-- - MULTIPLE_CHOICE: max. 3 richtige; Frage beinhaltet den Hinweis
-- - TEXT: Klartext-Antwort; keine Optionen

-- Karten einfügen (IDs starten bei 1 nach dem DROP)
INSERT INTO cards (question, answer, type) VALUES
-- 1
('Auf welcher OSI-Schicht arbeitet ein Router?', 'Layer 3 (Network)', 'SINGLE_CHOICE'),
-- 2
('Welche HTTP-Methoden sind idempotent? (Mehrere Antworten sind richtig)', 'GET, PUT, DELETE', 'MULTIPLE_CHOICE'),
-- 3
('Welches Präfix kennzeichnet link-lokale IPv6-Adressen?', 'fe80::/10', 'SINGLE_CHOICE'),
-- 4
('Standardport für RDP ist …', '3389', 'SINGLE_CHOICE'),
-- 5
('Wie viele Bits hat eine IPv6-Adresse?', '128', 'TEXT'),
-- 6
('Welche Ziele gehören zur Informationssicherheit? (Mehrere Antworten sind richtig)', 'Vertraulichkeit, Integrität, Verfügbarkeit', 'MULTIPLE_CHOICE'),
-- 7
('Welcher Hypervisor läuft direkt auf der Hardware („bare-metal“)?', 'Typ 1', 'SINGLE_CHOICE'),
-- 8
('Welcher HTTP-Statuscode bedeutet „Nicht gefunden“?', '404', 'TEXT'),
-- 9
('Welche RAID-Level erhöhen die Ausfallsicherheit durch Redundanz? (Mehrere Antworten sind richtig)', 'RAID 1, RAID 5, RAID 6', 'MULTIPLE_CHOICE'),
-- 10
('Welches ist kein symmetrisches Verfahren?', 'RSA', 'SINGLE_CHOICE'),
-- 11
('Wie lautet die Standard-Portnummer für HTTPS?', '443', 'TEXT'),
-- 12  -- ACID als Klartext (max. 3 Richtige-Regel für Multi)
('Welche Eigenschaften umfasst ACID bei Transaktionen?', 'Atomicity, Consistency, Isolation, Durability', 'TEXT'),
-- 13
('Welcher OSI-Layer kapselt Segmente in Pakete?', 'Layer 3', 'SINGLE_CHOICE'),
-- 14
('Wofür steht die Abkürzung „UML“?', 'Unified Modeling Language', 'TEXT'),
-- 15
('Welche Protokolle dienen der E-Mail-Abholung? (Mehrere Antworten sind richtig)', 'IMAP, POP3, IMAPS', 'MULTIPLE_CHOICE'),
-- 16
('Welcher Git-Befehl erstellt einen neuen Branch?', 'git branch <name>', 'SINGLE_CHOICE'),
-- 17
('Wie lautet die Kurzformel für elektrische Wirkleistung?', 'P = U · I', 'TEXT'),
-- 18
('Welche Merkmale hat eine REST-Schnittstelle? (Mehrere Antworten sind richtig)', 'Zustandslos, Einheitliche Schnittstelle, Cache-fähig', 'MULTIPLE_CHOICE'),
-- 19
('Welcher Befehl zeigt aktive Netzwerkverbindungen an (Windows)?', 'netstat', 'SINGLE_CHOICE'),
-- 20
('Wofür steht „CRUD“?', 'Create, Read, Update, Delete', 'TEXT'),
-- 21
('Welche Backup-Strategien gehören zu gängigen Konzepten? (Mehrere Antworten sind richtig)', 'Vollbackup, Inkrementelles Backup, Differenzielles Backup', 'MULTIPLE_CHOICE'),
-- 22
('Welcher SQL-Befehl legt eine neue Tabelle an?', 'CREATE TABLE', 'SINGLE_CHOICE'),
-- 23
('Welcher Git-Befehl zeigt die aktuelle Konfiguration?', 'git config --list', 'TEXT'),
-- 24
('Welche Scrum-Rollen gibt es offiziell? (Mehrere Antworten sind richtig)', 'Product Owner, Scrum Master, Entwicklungsteam', 'MULTIPLE_CHOICE'),
-- 25
('Wofür steht „CI/CD“ im DevOps-Kontext?', 'Continuous Integration / Continuous Delivery (oder Deployment)', 'TEXT'),
-- 26
('Welche Adressbereiche sind für IPv4-Private-Netze reserviert? (Mehrere Antworten sind richtig)', '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16', 'MULTIPLE_CHOICE'),
-- 27
('Welcher HTTP-Statuscode bedeutet „Erfolgreich“?', '200', 'SINGLE_CHOICE'),
-- 28
('Wie lautet die Normalform, die transitive Abhängigkeiten ausschließt?', '3. Normalform (3NF)', 'TEXT'),
-- 29
('Welche Eigenschaften treffen auf kryptografische Hashfunktionen zu? (Mehrere Antworten sind richtig)', 'Einwegfunktion, Kollisionsresistenz, Feste Ausgabelänge', 'MULTIPLE_CHOICE'),
-- 30
('Welcher Befehl zeigt laufende Prozesse unter Linux?', 'ps', 'SINGLE_CHOICE');

-- Optionen für SINGLE_CHOICE und MULTIPLE_CHOICE
-- Wir referenzieren die IDs 1..30, da die Tabellen oben frisch erstellt wurden.

-- 1 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('Layer 1 (Physical)', false, 1),
('Layer 2 (Data Link)', false, 1),
('Layer 3 (Network)', true, 1),
('Layer 4 (Transport)', false, 1),
('Layer 7 (Application)', false, 1);

-- 2 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('GET', true, 2),
('PUT', true, 2),
('DELETE', true, 2),
('POST', false, 2),
('PATCH', false, 2);

-- 3 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('fc00::/7', false, 3),
('2001::/16', false, 3),
('ff00::/8', false, 3),
('::1/128', false, 3),
('fe80::/10', true, 3);

-- 4 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('22', false, 4),
('80', false, 4),
('443', false, 4),
('5900', false, 4),
('3389', true, 4);

-- 6 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('Vertraulichkeit', true, 6),
('Integrität', true, 6),
('Verfügbarkeit', true, 6),
('Gewinnerzielung', false, 6),
('Schönes Design', false, 6);

-- 7 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('Typ 2', false, 7),
('Container Runtime', false, 7),
('Microkernel', false, 7),
('Emulator', false, 7),
('Typ 1', true, 7);

-- 9 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('RAID 1', true, 9),
('RAID 5', true, 9),
('RAID 6', true, 9),
('RAID 0', false, 9),
('JBOD', false, 9);

-- 10 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('AES', false, 10),
('3DES', false, 10),
('ChaCha20', false, 10),
('Blowfish', false, 10),
('RSA', true, 10);

-- 13 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('Layer 2', false, 13),
('Layer 3', true, 13),
('Layer 4', false, 13),
('Layer 5', false, 13),
('Layer 7', false, 13);

-- 15 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('IMAP', true, 15),
('POP3', true, 15),
('IMAPS', true, 15),
('SMTP', false, 15),
('FTP', false, 15);

-- 16 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('git push origin main', false, 16),
('git fetch', false, 16),
('git merge', false, 16),
('git branch <name>', true, 16),
('git reset --hard', false, 16);

-- 18 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('Zustandslos (stateless)', true, 18),
('Einheitliche Schnittstelle (uniform interface)', true, 18),
('Cache-fähig', true, 18),
('SOAP-gebunden', false, 18),
('Server hält Session-State zwingend', false, 18);

-- 19 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('ipconfig /all', false, 19),
('ping', false, 19),
('netstat', true, 19),
('tracert', false, 19),
('arp -a', false, 19);

-- 21 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('Vollbackup', true, 21),
('Inkrementelles Backup', true, 21),
('Differenzielles Backup', true, 21),
('RAID 0', false, 21),
('Komprimierung', false, 21);

-- 22 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('INSERT', false, 22),
('SELECT', false, 22),
('UPDATE', false, 22),
('CREATE TABLE', true, 22),
('ALTER USER', false, 22);

-- 24 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('Product Owner', true, 24),
('Scrum Master', true, 24),
('Entwicklungsteam', true, 24),
('Projektmanager', false, 24),
('Prozess-Owner', false, 24);

-- 26 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('10.0.0.0/8', true, 26),
('172.16.0.0/12', true, 26),
('192.168.0.0/16', true, 26),
('169.254.0.0/16', false, 26),
('224.0.0.0/4', false, 26);

-- 27 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('201', false, 27),
('202', false, 27),
('200', true, 27),
('204', false, 27),
('304', false, 27);

-- 29 MULTI (3 richtig)
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('Einwegfunktion', true, 29),
('Kollisionsresistenz', true, 29),
('Feste Ausgabelänge', true, 29),
('Verschlüsselung mit Schlüssel', false, 29),
('Reversibel', false, 29);

-- 30 SINGLE
INSERT INTO flashcard_options (option_text, is_correct, flashcard_id) VALUES
('ls', false, 30),
('pwd', false, 30),
('ps', true, 30),
('chmod', false, 30),
('chown', false, 30);
