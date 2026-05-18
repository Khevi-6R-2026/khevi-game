# Wikimedia Commons für Quiz-Spiele verwenden

## 🎯 Warum Wikimedia Commons?

✓ **Kostenlos & Frei** - Alle Bilder unter freien Lizenzen  
✓ **Schulprojekte** - Perfekt für Bildungszwecke  
✓ **Lizenziert** - Alle Lizenzen klar gekennzeichnet  
✓ **Quellenangaben** - Automatische Angabe möglich  
✓ **Keine CORS-Fehler** - Direkter Zugriff auf Bilder  

## 🔍 Bilder auf Wikimedia Commons suchen

### Schritt 1: Website öffnen
Gehe zu: https://commons.wikimedia.org

### Schritt 2: Bild suchen
Suche nach: z.B. "Paris Eiffel Tower", "Berlin Reichstag"

### Schritt 3: Bild öffnen
Klicke auf dein Favoritenbild

### Schritt 4: Informationen sammeln

Auf der Seite findest du:
- **Dateiname**: z.B. `Paris_Eiffel_Tower.jpg`
- **Lizenz**: z.B. `CC BY-SA 3.0`
- **Urheber**: Name des Fotografen
- **Beschreibung**: Kurze Info zum Bild

### Schritt 5: Bild-URL kopieren

Unter "File information" → "Original file":
```
https://upload.wikimedia.org/wikipedia/commons/...
```

## 📝 Format für gameConfig

```javascript
window.gameConfig = {
  type: 'quiz',
  questions: [
    {
      question: 'Deine Frage',
      image: 'https://upload.wikimedia.org/...',
      credit: {
        title: 'Eiffel Tower, Paris',
        source: 'https://commons.wikimedia.org/wiki/File:...',
        sourceText: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0'
      },
      answers: ['A', 'B', 'C', 'D'],
      correct: 'A'
    }
  ]
};
```

## 🔗 Credit-Objekt erklärt

```javascript
credit: {
  // Titel des Bildes (wird unter dem Bild angezeigt)
  title: 'Eiffel Tower, Paris',
  
  // Link zur Wikimedia Commons Seite
  source: 'https://commons.wikimedia.org/wiki/File:Paris_-_Eiffel_Tower.jpg',
  
  // Text für den Link (wird als anklickbar dargestellt)
  sourceText: 'Wikimedia Commons',
  
  // Lizenztyp (z.B. CC BY-SA 3.0, Public Domain)
  license: 'CC BY-SA 3.0'
}
```

## 📊 Häufige Lizenzen auf Wikimedia Commons

| Lizenz | Bedeutung | Info |
|--------|-----------|------|
| **CC0** | Public Domain | Völlig frei nutzbar |
| **CC BY** | Attribution | Mit Nennung nutzbar |
| **CC BY-SA** | Attribution-Share Alike | Mit Nennung & gleicher Lizenz |
| **GFDL** | GNU Free Doc License | Für Dokumentationen |

## 🚀 Schritt-für-Schritt Beispiel

### Suche nach Berlin

1. Gehe zu commons.wikimedia.org
2. Suche: "Berlin Reichstag"
3. Wähle ein gutes Bild aus
4. Kopiere folgende Informationen:

```
Titel: Reichstag Berlin
URL (Original): https://upload.wikimedia.org/wikipedia/commons/thumb/.../800px-...jpg
Wikimedia URL: https://commons.wikimedia.org/wiki/File:Berlin_Reichstag_building.jpg
Lizenz: CC BY-SA 3.0
```

5. Füge in gameConfig ein:

```javascript
{
  question: 'Hauptstadt von Deutschland?',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/.../800px-Berlin_Reichstag_building.jpg',
  credit: {
    title: 'Reichstag, Berlin',
    source: 'https://commons.wikimedia.org/wiki/File:Berlin_Reichstag_building.jpg',
    sourceText: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  answers: ['Frankreich', 'Deutschland', 'Italien', 'Spanien'],
  correct: 'Deutschland'
}
```

## 💡 Tipps für gute Bilder

✓ **Erkennbar**: Zeigt charakteristisches Wahrzeichen  
✓ **Qualität**: Mindestens 600x450px  
✓ **Hell**: Gute Sichtbarkeit  
✓ **Frei lizenziert**: CC0 oder CC BY-SA bevorzugt  

## 🔗 Direkte Links zu häufigen Hauptstädten

Hier sind bewährte Wikimedia Commons Seiten zum Starten:

- **Paris**: https://commons.wikimedia.org/wiki/Category:Eiffel_Tower
- **Berlin**: https://commons.wikimedia.org/wiki/Category:Reichstag
- **Rom**: https://commons.wikimedia.org/wiki/Category:Colosseum
- **Madrid**: https://commons.wikimedia.org/wiki/Category:Retiro_Park,_Madrid
- **Amsterdam**: https://commons.wikimedia.org/wiki/Category:Canal_Ring,_Amsterdam
- **Wien**: https://commons.wikimedia.org/wiki/Category:St._Stephen%27s_Cathedral,_Vienna

## ⚠️ Wichtig: Bildquelle anzeigen!

Wikimedia Commons verlangt, dass du:
1. **Bildtitel** angibst
2. **Lizenz** angibst
3. **Link zur Seite** setzt

**Das Framework tut das automatisch!** Die `credit` Informationen werden unter jedem Bild angezeigt.

## 📄 Lizenz-Text für dein Projekt

Falls du dein Quiz veröffentlichst, füge folgendes hinzu:

```
Bilder: Wikimedia Commons
Lizenz: Siehe Quellenangaben unter jedem Bild
Ursprungsseite: https://commons.wikimedia.org
```

## 🎓 Für Lehrer

Nutzen Sie dieses Framework, um Schülern beizubringen:
- ✓ Quellenangaben sind wichtig
- ✓ Freie Lizenzen verstehen
- ✓ Creative Commons Konzept
- ✓ Respekt vor Urheberrechten
