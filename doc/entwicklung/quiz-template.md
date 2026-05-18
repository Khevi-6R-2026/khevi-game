# Quiz-Spiel Template für Schüler

## 🎯 Einfaches Quiz Framework

Das neue Framework macht es super einfach, ein Quiz-Spiel zu erstellen - **keine komplexen Klassen nötig**!

## 📋 So erstellst du ein neues Quiz

### 1. Neuen Ordner erstellen
```
gameX/
└── index.html
```

### 2. index.html mit minimalem Code

```html
---
layout: game-layout1
title: Dein Quiz Titel
author: 6R 2026
description: Kurze Beschreibung
---

<section class="game-instructions">
  <h2>Anleitung</h2>
  <ul>
    <li>Regel 1</li>
    <li>Regel 2</li>
  </ul>
</section>

<div id="quiz-container" class="quiz-container">
  <div id="city-image-container" class="city-image-container">
    <img id="cityImage" src="" alt="Bild">
  </div>
  
  <div id="answers-container" class="answers-container">
    <button class="answer-btn" data-index="0"></button>
    <button class="answer-btn" data-index="1"></button>
    <button class="answer-btn" data-index="2"></button>
    <button class="answer-btn" data-index="3"></button>
  </div>

  <div id="feedback" class="feedback"></div>
</div>

<script>
  window.gameConfig = {
    type: 'quiz',
    questions: [
      {
        question: 'Deine Frage hier',
        image: '/assets/images/capitals/paris.jpg',  // ← LOKALES Bild!
        answers: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
        correct: 'Antwort 1'
      },
      {
        question: 'Zweite Frage',
        image: '/assets/images/capitals/berlin.jpg',  // ← LOKALES Bild!
        answers: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 'Option C'
      }
      // Mehr Fragen hier...
    ]
  };
</script>
```

## 📝 Erklärung der gameConfig

```javascript
window.gameConfig = {
  type: 'quiz',           // ← Wichtig: Sagt dem Framework, dass es ein Quiz ist
  questions: [            // ← Array mit allen Fragen
    {
      question: '...',    // ← Text der Frage (optional, nur Info)
      image: '...',       // ← URL zum Bild
      answers: [          // ← Array mit 4 Antwortmöglichkeiten
        'Richtig',
        'Falsch 1',
        'Falsch 2',
        'Falsch 3'
      ],
      correct: 'Richtig'  // ← Muss genau mit einer Antwort übereinstimmen!
    }
  ]
}
```

## 📷 Bilder nutzen (LOKAL!)

⚠️ **WICHTIG:** Verwende LOKALE Bilder, nicht externe URLs!

**Warum?**
- Externe URLs können CORS-Fehler verursachen
- Bilder laden schneller von lokal
- Funktioniert auch offline

**Pfad-Format:**
```javascript
image: '/assets/images/capitals/paris.jpg'  // ← Lokales Bild!
```

**Wie Bilder speichern?**
1. Bilder von [unsplash.com](https://unsplash.com) herunterladen
2. Speichern unter: `assets/images/capitals/paris.jpg`
3. Im Config den Pfad `/assets/images/capitals/` nutzen

Siehe dazu: [Bilder herunterladen Anleitung](./bilder-hinzufuegen.md)

## 💡 Tipps

✓ **Mindestens 3 Fragen** - besser 5-10  
✓ **Bilder müssen gut sichtbar sein**  
✓ **Antwort `correct` muss exakt mit einer Antwort im Array übereinstimmen**  
✓ **Zufällige Reihenfolge?** Shuffle die Antworten selbst!  

## ✅ Fertig!

Das Framework macht automatisch:
- Bilder anzeigen
- Button-Logik
- Feedback (grün/rot)
- Punktezählung
- Spiel-Ende

**Du brauchst dich um NICHTS davon kümmern!** 🚀

---

**Beispiel:** Siehe `game1/index.html`
