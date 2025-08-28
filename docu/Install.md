## Voraussetzungen


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

## Datenbank starten

```bash
cd flashcards-app
docker compose up -d
```

---


## Backend starten

```bash
cd flashcards-api
mvnw.cmd spring-boot:run # Windows (PowerShell)
# wenn maven global installiert ist
mvn springboot:run
```

**Wichtig**
Die Testdaten werden über ein SQL Script eingefügt. Spring Boot muss beim ersten Start aber ohne das Script laufen.
Im `flashcards-api/src/main/resources` folder liegt die Konfigurations-Date: `application.yml`. Nach dem ersten Start -> Backend stoppen -> in der `application.yml` Datei den wert für `spring.sql.init.mode` von never auf always setzen. Dann das Backend erneut starten.

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


