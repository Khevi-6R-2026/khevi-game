# Bilder für Quiz-Spiele herunterladen

## 🖼️ Warum lokale Bilder?

- ✓ Keine CORS-Fehler
- ✓ Schneller Zugriff
- ✓ Funktioniert offline
- ✓ Größere Kontrollbild-Qualität

## 📥 Schritt 1: Bilder finden

### Kostenlose Bildquellen

**Unsplash** (empfohlen)
- Website: [unsplash.com](https://unsplash.com)
- Suchbegriffe: "Paris city", "Berlin landmark", "Rome architecture"
- Lizenz: Kostenlos für alle Nutzungsarten

**Pexels**
- Website: [pexels.com](https://pexels.com)
- Großes Archiv mit guter Qualität
- Lizenz: Creative Commons 0 (Public Domain)

**Pixabay**
- Website: [pixabay.com](https://pixabay.com)
- Viele hochwertige Fotos
- Lizenz: Kostenlos nutzbar

## 🔗 Schritt 2: Bild-URL kopieren

### Bei Unsplash:
1. Foto suchen (z.B. "Eiffel Tower")
2. Rechts oben auf **Download** klicken
3. Medium-Größe auswählen (400x300px ideal)

Oder direkt mit URL:
```
https://images.unsplash.com/photo-XXXXXXX?w=400&h=300&fit=crop
```

## 💾 Schritt 3: Bild speichern

### Option A: Browser (Einfach)
1. Bild-URL im Browser öffnen
2. Rechts klicken → "Bild speichern unter"
3. Pfad: `assets/images/capitals/`
4. Name: `paris.jpg` (klein schreiben!)

### Option B: PowerShell (Schneller für mehrere Bilder)

```powershell
# In der Konsole ausführen:
$url = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop"
$output = "c:\github\khevi-game\assets\images\capitals\paris.jpg"
Invoke-WebRequest -Uri $url -OutFile $output
```

### Option C: Linux/Mac Terminal

```bash
# Mehrere Bilder herunterladen
curl "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop" -o assets/images/capitals/paris.jpg
```

## 📂 Ordnerstruktur

```
assets/
└── images/
    └── capitals/
        ├── paris.jpg
        ├── berlin.jpg
        ├── rom.jpg
        ├── madrid.jpg
        ├── amsterdam.jpg
        └── wien.jpg
```

## 🎮 Schritt 4: game1/index.html anpassen

```javascript
window.gameConfig = {
  type: 'quiz',
  questions: [
    {
      question: 'Hauptstadt von Frankreich',
      image: '/assets/images/capitals/paris.jpg',  // ← Lokaler Pfad!
      answers: ['Frankreich', 'Deutschland', 'Italien', 'Spanien'],
      correct: 'Frankreich'
    },
    // Weitere Fragen...
  ]
};
```

## 📝 Dateiname-Konventionen

- Nur Kleinbuchstaben: `paris.jpg` (nicht `Paris.jpg`)
- Keine Umlaute: `wien.jpg` (nicht `wïen.jpg`)
- Keine Leerzeichen: `eiffel_tower.jpg` (nicht `eiffel tower.jpg`)
- Format: `.jpg` oder `.png` (keine `.webp`)

## ⚙️ Bildgröße optimieren

Verwende kostenlose Tools zum Komprimieren:

**Online:**
- [tinypng.com](https://tinypng.com) - Automatische Optimierung
- [imagecompressor.com](https://imagecompressor.com)

**Optimal:**
- Breite: 400px
- Höhe: 300px
- Dateigröße: < 100KB

## 🚫 Häufige Fehler

| Fehler | Problem | Lösung |
|--------|---------|--------|
| `404 Not Found` | Pfad falsch | Prüfe `/assets/images/capitals/` |
| Bilder zu groß | Langsames Laden | Mit TinyPNG komprimieren |
| Unscharfe Bilder | Zu niedrige Auflösung | Mindestens 600x450px suchen |
| CORS Fehler | Externe URLs | Nutze lokale Pfade mit `/assets/` |

## 💡 Tipps für gute Quiz-Bilder

✓ Erkennbar: Zeigt charakteristisches Merkmal der Stadt  
✓ Größer: Auf 800px Breite herunterladbar  
✓ Hell: Gute Sichtbarkeit am Bildschirm  
✓ Verschiedene Perspektiven: Nicht alle von oben  

**Beispiele:**
- Paris: Eiffelturm, Kathedrale
- Berlin: Reichstag, Brandenburger Tor
- Rom: Kolosseum, Petersdom
