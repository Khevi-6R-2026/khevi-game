# Game Framework Architecture

## 📐 Architektur-Übersicht

```
_layouts/game-layout1.html (Template)
    ↓
    ├─ Definiert Game-Klasse (universal für alle Game-Types)
    └─ Liest window.gameConfig nach DOMContentLoaded
    
gameX/index.html (Spiel-Instanz)
    ↓
    ├─ Definiert HTML-Struktur
    └─ Setzt window.gameConfig mit Spieldaten
    
window.game (Instanz)
    ↓
    └─ Game-Klasse verarbeitet config automatisch
```

## 🔑 Kernkonzept: Config-Driven Games

### Alte Lösung (❌ Kompliziert)
```javascript
// game1/index.html
class CapitalQuiz extends Game {
  constructor() {
    super();
    // 200+ Zeilen Code mit Klassen-Logik
  }
}
```

### Neue Lösung (✓ Einfach)
```javascript
// game1/index.html
window.gameConfig = {
  type: 'quiz',
  questions: [...]  // Nur Daten!
}
```

## 🎮 Unterstützte Game-Types

### Quiz (`type: 'quiz'`)
```javascript
{
  type: 'quiz',
  questions: [
    {
      question: 'Text',
      image: 'url',
      answers: ['A', 'B', 'C', 'D'],
      correct: 'A'
    }
  ]
}
```

Das Framework automatisiert:
- Bildanzeige
- Button-Callbacks
- Feedback-System
- Score-Tracking

## 🔄 Lifecycle

```
1. Jekyll rendert gameX/index.html mit game-layout1.html
2. {{ content }} wird eingefügt (HTML + gameConfig)
3. game-layout1.html <script> lädt
4. Game-Klasse wird definiert
5. DOMContentLoaded Event
6. Game.init() liest window.gameConfig
7. initializeQuiz(config) wird aufgerufen
8. Spiel ist bereit!
```

## 🚀 Erweiterung für neue Game-Types

Um z.B. ein Memory-Spiel zu unterstützen:

**1. game-layout1.html erweitern:**
```javascript
initializeGame(config) {
  if (config.type === 'quiz') {
    this.initializeQuiz(config);
  } else if (config.type === 'memory') {
    this.initializeMemory(config);  // Neue Methode
  }
}

initializeMemory(config) {
  this.cards = config.cards;
  // ... Memory-Logik
}
```

**2. gameX/index.html mit Memory-Config:**
```javascript
window.gameConfig = {
  type: 'memory',
  cards: [
    { image: 'url1', pair: 'A' },
    { image: 'url2', pair: 'A' },
    // ...
  ]
}
```

## 📊 Vergleich: Alte vs. Neue Lösung

| Aspekt | Alt | Neu |
|--------|-----|-----|
| **Schwierigkeit** | Klassen-Inheritance | Einfache Datenstruktur |
| **Zeilen Code** | 200+ | 20-30 |
| **Fehleranfälligkeit** | Hoch | Niedrig |
| **Wartung** | Schwierig | Einfach |
| **Framework-Wissen** | Nötig | Nicht nötig |
| **Setup-Dauer** | ~30 min | ~5 min |

## 💾 Best Practices

1. **Dateistruktur konsistent halten**
   ```
   gameX/
   └── index.html  (mit gameConfig)
   ```

2. **HTML-Struktur nutzen** (nicht selbst erfinden)
   ```html
   <div id="quiz-container">
     <div id="city-image-container">...
   ```

3. **gameConfig validieren**
   - `type` muss gesetzt sein
   - `questions` Array darf nicht leer sein
   - `correct` muss in `answers` enthalten sein

4. **Für neue Game-Types dokumentieren**
   - Config-Format
   - Erforderliche HTML-Elemente
   - Neue Methoden in Game-Klasse

## 🔗 Siehe auch

- [Quiz Template](./quiz-template.md) - Schritt-für-Schritt Guide
- [game-layout1.html](_layouts/game-layout1.html) - Framework Code
- [game1/index.html](game1/index.html) - Praktisches Beispiel
