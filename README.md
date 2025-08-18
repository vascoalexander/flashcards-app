# Flashcards App

Dieses Projekt ist eine **Fullstack-Anwendung** bestehend aus:

- **Backend (flashcards-api)**: Spring Boot (Java 21) REST API
- **Frontend (flashcards-ui)**: Angular 19
- **Docker**: Containerisierung
- **Git**: Versionsverwaltung

---

## Voraussetzungen

### Allgemein (Linux/Mac/Windows)

- **OpenJDK 21**
- **Maven**
- **Node.js & Angular CLI (Version 19)**
- **Docker**
- **Git**
- **Postman** (für API-Tests)

---

### Installation unter Linux / macOS

```bash
# Java 21 installieren (z. B. unter Ubuntu)
sudo apt update && sudo apt install openjdk-21-jdk -y

# Prüfen
java -version

# Node.js (empfohlen via nvm)
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
npm install -g @angular/cli@19

# Docker
sudo apt install docker.io -y
sudo systemctl enable docker --now

# Git
sudo apt install git -y
```

---

### Installation unter Windows

1. **Java (OpenJDK 21)**
    
    - Lade dir das aktuelle JDK von [Adoptium](https://adoptium.net/) herunter
    - Installieren und den `bin`-Ordner (z. B. `C:\Program Files\Eclipse Adoptium\jdk-21\bin`) zur `PATH`-Umgebungsvariable hinzufügen
    - OpenJDK Runtime Environment Temurin-21
    
        ```powershell
        java -version
        ```
    
2. **Node.js & Angular CLI**
    
    - Lade Node.js (LTS) von [nodejs.org](https://nodejs.org/) herunter
    - Installiere Angular CLI global:
    
        ```powershell
        npm install -g @angular/cli@19
        ```
    
3. **Docker Desktop**
    
    - Lade [Docker Desktop für Windows](https://www.docker.com/products/docker-desktop/) herunter
    - Stelle sicher, dass WSL2 aktiviert ist
    
4. **Git**
    
    - Lade [Git for Windows](https://git-scm.com/download/win) herunter
    - Installation inkl. Git Bash
    

---

## Projekt klonen

```bash
git clone git@github.com:vascoalexander/flashcards-app.git
cd flashcards-app
```

---

## Git-Workflow

Wir arbeiten mit einer **develop-Branch** und **Feature-Branches**:

[git cheatsheet basics](https://vascoalexander.github.io/my-documentation/assets/files/git_cheatsheet-1e7c9cbaa94d94853fd6aee609711929.pdf)
[git advanced](https://vascoalexander.github.io/my-documentation/assets/files/git_advanced-24f528cf61bac0cc946f8ab261228931.pdf)

```bash
# Neues Feature beginnen
git checkout develop
git pull
git checkout -b feature/dein-feature

# Änderungen committen
git add .
git commit -m "Mein neues Feature"

# Feature pushen
git push origin feature/dein-feature
```

---

## Projektstruktur

```
flashcards-app/
│
├── flashcards-api     # Spring Boot REST API (Backend)
├── flashcards-ui      # Angular App (Frontend)
└── docker-compose.yml # Docker Setup
```

---

## Backend starten

```bash
cd flashcards-api
./mvnw spring-boot:run   # Linux/macOS
mvnw.cmd spring-boot:run # Windows (PowerShell)
```

API läuft anschließend auf:  
👉 `http://localhost:8080/api`

---

## Frontend starten

```bash
cd flashcards-ui
npm install
npm start
```

UI läuft anschließend auf:  
👉 `http://localhost:4200`

---

## API Endpunkte

### FlashcardsController

| endpoint                                      | funktionalität                 |
| --------------------------------------------- | ------------------------------ |
| `GET /api/flashcards?type={type}&set={setId}` | Alle Karten optional gefiltert |
| `GET /api/sets/{setId}/flashcards`            | Karten eines Sets              |
| `GET /api/flashcards/{flashcardId}`           | Karte nach ID                  |
| `POST /api/flashcards`                        | Neue Karte anlegen             |
| `PUT /api/flashcards/{flashcardId}`           | Karte aktualisieren            |
| `DELETE /api/flashcards/{flashcardId}`        | Karte löschen                  |
### FlashcardSetController

| endpoint                   | funktionalität    |
| -------------------------- | ----------------- |
| `GET /api/sets`            | Alle Sets         |
| `GET /api/sets/{setId}`    | Set nach ID       |
| `POST /api/sets`           | Neues Set anlegen |
| `PUT /api/sets`            | Set aktualisieren |
| `DELETE /api/sets/{setId}` | Set löschen       |

---

## Mit Docker starten

```bash
# Build & Run
docker-compose up --build
```

- Backend → `http://localhost:8080/api`
- Frontend → `http://localhost:4200`
