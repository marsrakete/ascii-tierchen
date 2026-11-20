# 🐾 ASCII Tierchen

Eine kleine interaktive Webseite, auf der verschiedene ASCII-Tiere mit wechselbaren Emojis angezeigt werden.  
Du kannst Tiere und Gegenstände per Knopfdruck durchrotieren – und das aktuelle Tierbild sogar in die Zwischenablage kopieren!

![Screenshot](screenshot.png)

## ✨ Funktionen

- 🔁 **Tier wechseln**: Wähle zwischen Hase, Katze, Hund, Ente, Maus, Frosch, Bär, Schnecke und Eule.
- 🍎 **Gegenstand wechseln**: Tiere halten zufällig einen Gegenstand (Emoji) wie 🧊, 🍓 oder 🧁.
- 📋 **Text kopieren**: Kopiert die ASCII-Zeichnung als Text in die Zwischenablage.
- 🦋 **Für Bluesky kopieren**: Kopiert das Tierbild als Text und ersetzt die führenden Leerzeichen jeder Zeile durch breitere Halbgeviert-Leerzeichen (U+2002), damit die Einrückung in Blueskys proportionaler Schrift besser zur Geltung kommt.
- 🎨 **Dunkles Farbschema** für augenfreundliche Darstellung.

## 📦 Verwendung

Öffne einfach die HTML-Datei in deinem Browser:

```bash
index.html
```

Oder hoste sie über einen einfachen lokalen Server:

```bash
# Beispiel mit Python 3
python -m http.server
```

Dann im Browser aufrufen: `http://localhost:8000`

## 📁 Projektstruktur

```text
ascii-tierchen/
├── index.html         # HTML der Web-App
├── app.js             # JavaScript der Web-App
├── style.css          # Layout und Gestaltung der Web-App
├── screenshot.png     # (Optional) Screenshot für README
└── README.md          # Diese Datei
```

## 🛠️ Weiterentwicklung

Mögliche Ideen für zukünftige Features:

- Weitere Tiere (z. B. 🐢, 🐧, 🐙…)
- Soundeffekte oder Animationen
- Teilen auf Social Media
- Personalisierung (Farben, Namen, eigene Emojis)

## 📄 Lizenz

MIT – mach damit, was du willst 🙂

---

Viel Spaß mit deinen ASCII-Freunden! 🎉
