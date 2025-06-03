# OnkelDoms's Abenteuerkarten Deck

![Cover](./assets/cover.png)

Ein FoundryVTT-Modul zur Nutzung von Abenteuerkarten im Stil von Savage Worlds, vollständig für DSA5 umgesetzt (jedoch für jedes beliebige System anpassbar mit etwas Arbeit).
Die Karten verleihen Spielern narrative Macht und ermöglichen unerwartete Wendungen und kreative Spielimpulse.
Das Modul liefert 53 Abenteuerkarten , jeweils mit Name, Kartentext zur Umsetzung im Spiel und Bebilderung.
Ein Template File ist im Modul enthalten , mit dem man eigene Karteneffekte und Karten per GIMP erstellen kann (sie müssen dann nur an korrekter Stelle im Modul eingepflegt werden, was ein wenig Arbeit mit dem enthaltenen .json File erfordert)
Das Kartensystem ist eine Nachempfindung vom Savage Worlds Adventure Deck und wird in unserer Runde entsprechend benutzt (ihr könnt es aber nutzen wie ihr es für rchtig haltet :)  )
Die Karteneffekte sind auf DSA 5 angepasst und stellen nur meine Interpretaton und Auslegung dar, ihr könnt sie verändern wie ihr möchtet = )

---

## 🧩 Features

 - Automatisches Erstellen des Abenteuerkartendeck beim Foundry Start
 - Automatische Erstellung von Kartenhänden pro existierendem Spielercharakter 
 - Kartenhand mit hübschem Layout
 - Karten können:
		- im Chat ausgespielt werden
		- an andere Spieler weitergegeben werden
		- per Klick als großes Bild angezeigt werden
 - Zugriffsrechte für das Deck, den Ablagestapel und die Kartenhände werden automatisch vergeben (können vom GM verändert werden)

---

## 📦 Installation

### 🧭 Manifest URL

```text
https://raw.githubusercontent.com/xOnkelDomx/onkeldom-abenteuerkarten-deck/main/module.json
```

1. Öffne in FoundryVTT den **Modul-Manager**
2. Klicke auf **Modul aus Manifest installieren**
3. Füge die Manifest-URL ein und bestätige

---

## 💡 Verwendung

### Als Spielleiter:
 - Stelle sicher, dass das Deck automatisch erstellt wurde (Abenteuerkarten)
 - Verwende das Kontextmenü des Decks um Karten an Spieler auszuteilen, das Deck zu mischen oder zurückzusetzen
 - Karten werden nach dem Ausspielen automatisch in den Ablagestapel gelegt

### Als Spieler:
 - Deine Kartenhand wird automatisch erstellt
 - Öffne deine Kartenhand über den entsprechenden Reiter in Foundry
 - Klicke auf Karten, um Details zu sehen oder sie zu verwenden
 - Verwende die Buttons um Karten auszuspielen oder an andere Spieler weiterzugeben.

---

## 🎨 Eigene Karten erstellen

 - Im Ordner assets/cards befinden sich alle Karten, inkl. Rückseite.
 - Du kannst das Template  Abenteuerkarten_Template.xcf   in  assets  verwenden um eigene Karten zu erstellen.
 - Nutze dazu Grafikprogrammen wie GIMP,  oder Photoshop.
 - Neue Karten müssen anschließend in der Datei abenteuerkarten.json eingetragen und im cards Ordner einsortiert werden.
  - `name` – Name der Karte
  - `img` – Pfad zum Kartenvorderbild
  - `back.img` – Pfad zur Rückseite
  - Optional: `text` und `description` für Effekte oder Chatanzeige

⚠️  Hinweis: Beim Hinzufügen eigener Karten musst du sicherstellen, dass die JSON-Struktur korrekt bleibt und die Dateiendungen und Namen alle korrekt sind!


---

## ⚙️ Abhängigkeiten

- **FoundryVTT** ab Version `12.x`

---

## 📁 Modulstruktur

```
onkeldom-abenteuerkarten-deck/
├── module.json
├── index.js
├── style.css
├── abenteuerkarten.json
├── templates/
│   ├── adventurehandsheet.hbs
│   ├── adventurecard-chatcard.hbs
│   └── chooserecipientdialog.hbs
└── assets/
    ├── logo.png
    ├── cover.png
    └── cards/

```

---

## 🧑‍💻 Autor

**Onkel Dom**  
📧 kontakt: Discord  @OnkelDom
🌐 Webseite( https://datengnom.de/ )

---

## 📜 Lizenz

Dieses Modul steht unter der MIT-Lizenz – frei zur Nutzung, Veränderung und Verbreitung. Bilder und Namen basieren auf Eigenkreationen und dürfen mit Verweis verwendet werden.
