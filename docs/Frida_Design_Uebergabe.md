# Frida — Design-Übergabe

**Für:** Claude Design · **Von:** Max Kruggel · **Stand:** 29.07.2026 · **App-Version:** 1.3.2
**Beilagen:** `docs/screenshots/` (25 Bereichs-Screenshots + 4 Vollhöhen-Ansichten + Kontaktbogen)

---

## 0. Was du hier bekommst — und was gebraucht wird

Frida ist fertig gebaut und funktioniert. Was fehlt, ist der letzte Schliff auf der
Erlebnisseite: Die App soll sich **angenehm, leicht und selbstverständlich** anfühlen —
so, dass eine Nutzerin sie abends im Bett mit einer Hand in zwanzig Sekunden bedient,
ohne nachzudenken und ohne sich schlecht zu fühlen.

**Der Auftrag an dich:** Sieh dir die Screenshots an, lies die gemessenen Befunde in
Abschnitt 5 und arbeite die Anleitung in Abschnitt 6 ab. Du darfst Layout, Hierarchie,
Wording, Zustände und Interaktionsdetails neu denken. Was du **nicht** anfassen sollst,
steht in Abschnitt 7 — das sind die Dinge, an denen die Identität der App hängt.

**Wichtigste Leitplanke vorweg:** Frida ist kein Dashboard und kein Habit-Tracker mit
Disziplin-Logik. Es gibt bewusst **keine Streaks, keine Punkte, keine Level**. Jede
Design-Entscheidung, die Lückenlosigkeit belohnt oder Lücken bestraft, ist falsch —
auch wenn sie „engagement-fördernd" wirkt. Ein leerer Tag ist ein leeres Feld, kein
Versagen. Das ist der Kern der Positionierung, nicht ein Detail.

---

## 1. Die App in fünf Sätzen

Frida ist ein digitales Bullet Journal in Filzstift-Optik. Jeden Abend hält man in unter
30 Sekunden fest, wie es einem ging (Ampel: Gefühle, Schlaf) und was los war (Häkchen:
Sport, Periode, Overthinking, Alkohol …). Am Monatsende sieht man das eigene Leben als
gemaltes Raster, am Jahresende als Farbfläche. Alles liegt lokal auf dem Gerät — kein
Konto, keine Cloud, kein Abo. Frida spricht dabei in der Ich-Form und gibt aus den
eigenen Daten warme, regelbasierte Impulse („Drei Tage Bewegung am Stück — morgen darf
auch ein Spaziergang reichen").

**Zielgruppe:** primär Frauen, ca. 18–40, Bullet-Journal- und Self-Care-affin, genervt
von Abo-Apps und Datenkraken. Sekundär alle, die ein ruhiges, privates Tages-Log wollen.

**Technisch:** eine einzige HTML-Datei ohne Framework und ohne Build (`index.html`,
1.397 Zeilen), plus Service Worker und Manifest für die Installation als PWA auf dem
iPhone-Homescreen. Reales Nutzungsgerät ist praktisch immer ein iPhone im Hochformat.

---

## 2. Die Bereiche der App — Screenshot für Screenshot

Alle Screenshots liegen in `docs/screenshots/`, aufgenommen im iPhone-Viewport
**390 × 844** bei dreifacher Pixeldichte, mit realistischen Demo-Daten (Nutzerin „Lena",
Einträge Januar bis Juli 2026, Stichtag Mittwoch 29.07.2026). Der Kontaktbogen
`kontaktbogen-alle-bereiche.png` zeigt alle 25 Bereiche auf einem Blatt.

Dateien mit `b` im Namen (`11b`, `16b`, `22b`, `23b`) zeigen denselben Screen in voller
Inhaltshöhe statt im Geräteausschnitt — praktisch, um Layout und Rhythmus im Ganzen zu
beurteilen.

### 2.1 Erstkontakt

| Datei | Bereich | Was dort passiert |
|---|---|---|
| `01-splash-erststart.png` | Splash, generisch | Wortmarke „Frida", drei aufpoppende Marker, Unterzeile „dein Jahr in Farbe". 1,1 s, dann Übergang. |
| `02-onboarding-1-willkommen.png` | Onboarding 1 | Frida stellt sich in der Ich-Form vor, gibt das No-Streak-Versprechen, fragt den Namen. |
| `03-onboarding-1-name.png` | Onboarding 1, ausgefüllt | Name eingetragen, Enter springt weiter. |
| `04-onboarding-2-themen.png` | Onboarding 2 | 12 Default-Themen als Chips, alle vorausgewählt, einzeln abwählbar. |
| `05-onboarding-3-daten.png` | Onboarding 3 | Datenversprechen und Backup-Erklärung, Abschluss „Los geht's". |
| `06-willkommens-animation.png` | Willkommen | Einmaliges Overlay nach der Einrichtung: Marker plus „Hey, Lena." in Handschrift, ~2,4 s. |
| `07-heute-leer-erster-tag.png` | Heute, Tag 1 | Der allererste Blick in die App nach dem Onboarding. |
| `08-splash-personalisiert.png` | Splash, personalisiert | Jeder weitere Start: „Hey, Lena." als Titel, Wortmarke rückt in die Unterzeile. |

### 2.2 Heute — der Screen, der über alles entscheidet

| Datei | Bereich | Was dort passiert |
|---|---|---|
| `09-heute-checkin-offen.png` | Check-in, leer | Begrüßung nach Tageszeit, 14-Tage-Streifen, zwei Ampel-Zeilen, zehn Chips, Notizfeld, „Fertig". |
| `10-heute-checkin-ausgefuellt.png` | Check-in, ausgefüllt | Jeder Tipp speichert sofort; die gesetzten Swatches werden „aufgemalt". |
| `11-heute-zusammenfassung-impulse.png` | Abschluss | Nach „Fertig": Zusammenfassung als Chip-Reihe, Notiz als Zitat, darunter bis zu zwei Impulskarten. |
| `11b-heute-zusammenfassung-voll.png` | Abschluss, volle Höhe | Dieselbe Ansicht ohne Geräteausschnitt. |
| `12-heute-nachtrag-tag.png` | Nachtrag | Tap auf einen Tag im Streifen: Titel wechselt auf „Nachtrag", hier mit zwei Impulsen (schwere Tage, Zyklus). |
| `13-heute-abend-erinnerung-backup.png` | Abend + Banner | Ab 18 Uhr ohne Eintrag: Hinweissatz und Punkt am Tab. Oben das Backup-Banner nach 14 Tagen. |

### 2.3 Monat — der Kern-Screen

| Datei | Bereich | Was dort passiert |
|---|---|---|
| `14-monat-raster.png` | Monatsraster | Zeilen = Themen als Handschrift-Pillen (sticky), Spalten = Tage 1–31, horizontal scrollbar. |
| `15-monat-raster-monatsende.png` | Raster, ans Ende gescrollt | Zeigt, wie viel vom Monat gleichzeitig sichtbar ist. |
| `16-monat-review-und-notizen.png` | Unter dem Raster | Gespeichertes Monatsreview als Karte, darunter alle Notizen des Monats mit Sprung zum Tag. |
| `16b-monat-voll.png` | Monat, volle Höhe | Der ganze Screen am Stück. |
| `24-monat-leer.png` | Monat ohne Daten | Wie der Kern-Screen bei einer neuen Nutzerin aussieht. |

### 2.4 Jahr

| Datei | Bereich | Was dort passiert |
|---|---|---|
| `17-jahr-in-farben.png` | Jahresraster | 12 × 31 Zellen, Farbe = Gefühle-Ampel des Tages. |
| `18-jahr-monatsstatistik.png` | Unter dem Raster | „Dieser Monat in Zahlen": festgehaltene Tage, grüne Tage, Sport, soziale Kontakte. |
| `25-jahr-leer.png` | Jahr ohne Daten | Der Jahres-Screen bei einer neuen Nutzerin. |

### 2.5 Mehr und Dialoge

| Datei | Bereich | Was dort passiert |
|---|---|---|
| `19-mehr-backup.png` | Mehr, oben | Installations-Hinweis (nur außerhalb des Standalone-Modus), Backup sichern und importieren. |
| `20-mehr-themen-verwalten.png` | Themen-Manager | Alle Themen mit Farbe, Typ, Schalter zum Ein-/Ausblenden, Drag-Handle zum Sortieren. |
| `21-mehr-thema-bearbeiten.png` | Thema aufgeklappt | Tap auf ein Thema zeigt „Umbenennen" und „Löschen". |
| `22-mehr-profil-disclaimer.png` | Mehr, unten | Neues Thema anlegen, Name ändern, alles zurücksetzen, Disclaimer mit Telefonseelsorge. |
| `22b-mehr-voll.png` | Mehr, volle Höhe | Der ganze Screen am Stück — zeigt die Länge des Bereichs. |
| `23-monatsreview-dialog.png` | Monatsreview | Am letzten Tag des Monats: Zahlen, eine Ampel-Frage, optionale Notiz. |
| `23b-monatsreview-voll.png` | Monatsreview, volle Höhe | Dieselbe Ansicht ohne Geräteausschnitt. |

---

## 3. Das bestehende Design-System

Diese Werte stehen so im Code und sind die Grundlage, auf der du arbeitest.

### Farben

| Token | Wert | Rolle |
|---|---|---|
| `--paper` | `#F5EEDF` | Journalpapier, Grundfläche |
| `--paper-deep` | `#EFE5D0` | Tab-Bar, eingesenkte Flächen |
| `--card` | `#FBF6EA` | Karten |
| `--ink` | `#453C31` | Fineliner-Braun statt Schwarz |
| `--ink-soft` | `#8A7E6D` | Sekundärtext, Eyebrows, Hints |
| `--line` | `#DDD2BC` | Rahmen, Trennlinien |
| `--berry` | `#9C4F66` | UI-Akzent: Primärbutton, aktiver Tab, Impulskarte |
| `--berry-soft` | `#F0DEE4` | Fläche der Impulskarte, ausgewählter Tag |
| `--m-green` | `#3E7A54` | Marker grün — „gut" |
| `--m-yellow` | `#E0AC35` | Marker gelb — „mittel" |
| `--m-red` | `#D4574E` | Marker rot — „schwer" |
| `--m-blue` | `#3E63A6` | Marker blau |
| `--m-pink` | `#DE8E9C` | Marker rosa |

### Typografie

- **Display und Handschrift:** `Noteworthy` (auf iOS vorinstalliert, echte Handschrift
  ohne Webfont, funktioniert offline), Fallback `Bradley Hand`, dann `cursive`. Verwendet
  für `h1`, `h2` und alles mit Klasse `.hand` — Themen-Pillen, Monatstitel, Impuls-Titel.
- **UI-Text:** System-Font (`-apple-system` / SF). Der Kontrast Handschrift gegen
  nüchterne System-UI ist gewollt und trägt die Journal-Anmutung.
- **Eyebrow:** 11 px, Versalien, `letter-spacing: .14em`, in `--ink-soft`.

> Hinweis zu den Screenshots: Sie wurden unter Linux erzeugt, wo `Noteworthy` fehlt.
> Als Ersatz ist **Patrick Hand** gemappt. Die Anmutung stimmt, die exakten Buchstaben-
> formen auf dem iPhone sind etwas breiter und runder. Bewerte also Rhythmus und
> Textmenge, nicht die Details der Schriftzeichnung.

### Signatur-Element: der Filzstift-Swatch

Jede Markierung ist ein „gemalter" Fleck: asymmetrischer Border-Radius, eine deterministische
Mini-Rotation aus `hash(datum + habitId)` (dieselbe Zelle sieht immer gleich aus, nie zufällig
flackernd), ein SVG-`feTurbulence`-Filter für die raue Kante und eine kurze Aufmal-Animation
beim Setzen. **Das ist das Herz der visuellen Identität** — die App soll gemalt aussehen,
nicht geklickt. Das App-Icon greift dasselbe Motiv auf.

Weitere Konstanten: Punktraster-Hintergrund per `radial-gradient` (22 px Abstand), Radius
18 px für Karten, 26 px für Buttons, Safe-Areas für Notch und Home-Indikator.

### Stimme

Frida spricht per Du und in der Ich-Form. Onboarding, Erinnerungen, Impulse und
Dialogtexte sind von ihr formuliert; reine UI-Labels bleiben neutral („Backup sichern",
„Fertig"). Ton: warm, nie belehrend, nie diagnostisch, nie euphorisch-übergriffig.

---

## 4. Wie die App aufgebaut ist

Vier Tabs in einer festen Tab-Bar am unteren Rand:

**Heute** (Standard beim Start) → **Monat** → **Jahr** → **Mehr**

Dazu drei Überlagerungen: der Splash beim Start, das einmalige Willkommens-Overlay nach
dem Onboarding und der Monatsreview-Dialog am letzten Kalendertag des Monats.

Der **Heute**-Screen hat zwei Zustände, die einander ersetzen: das Check-in-Formular
(solange der Tag leer ist) und die Zusammenfassung mit Impulsen (sobald etwas gesetzt
wurde). „Fertig" speichert nichts mehr — jeder einzelne Tipp schreibt sofort in den
Speicher —, sondern schließt den Tag ab und zeigt die Zusammenfassung.

Der **14-Tage-Streifen** über dem Formular ist zugleich Übersicht und Navigation: ein Tap
auf einen vergangenen Tag schaltet den ganzen Screen in den Nachtrag-Modus.

Zustände, die du beim Redesign mitdenken musst — jeder ist ein eigener Screenshot:
leerer erster Tag, gefüllter Tag, Nachtrag, Abend-ohne-Eintrag, Backup-fällig,
Monat ohne Daten, Jahr ohne Daten, Monatsende.

---

## 5. Gemessene Befunde

Alles hier ist im Browser am realen DOM gemessen oder aus den Farbwerten berechnet —
nichts davon ist geschätzt.

### 5.1 Kontraste (WCAG: 4,5:1 für Normaltext, 3:1 für Großtext und Grafik)

| Kombination | Verhältnis | Bewertung |
|---|---|---|
| `--ink` auf Papier (Fließtext, Überschriften) | **9,35:1** | sehr gut |
| Weiß auf `--berry` (Primärbutton) | **5,64:1** | gut |
| `--berry` auf Papier (aktiver Tab) | **4,88:1** | gut |
| `--ink-soft` auf Papier (Hints, Eyebrows) | **3,44:1** | **unter AA** |
| `--ink-soft` auf Karte (Sub-Labels) | **3,68:1** | **unter AA** |
| `--ink-soft` auf `--paper-deep` (inaktive Tab-Labels) | **3,18:1** | **unter AA** |
| `--m-green` auf Papier | 4,42:1 | als Grafik ok |
| `--m-red` auf Papier | 3,45:1 | als Grafik grenzwertig |
| `--m-pink` auf Papier | **2,15:1** | **unter 3:1** |
| `--m-yellow` auf Papier | **1,80:1** | **deutlich unter 3:1** |

Das Gelb ist der kritischste Wert: Es trägt im Ampel-System die Bedeutung „mittel" und
ist auf dem cremefarbenen Papier fast nicht abgesetzt. Im Jahresraster, wo Farbe der
**einzige** Bedeutungsträger ist, verschwimmen gelbe und leere Tage bei schrägem Licht
oder gedimmtem Display.

### 5.2 Touch-Ziele (Apple HIG: mindestens 44 × 44 pt)

| Element | Gemessen | Betrifft |
|---|---|---|
| `.btn.small` | **40 px hoch** | „Sichern" im Banner, Export, Import, Hinzufügen, Eintrag bearbeiten, Umbenennen, Löschen |
| `.switch` (Themen ein/aus) | **50 × 30 px** | jede Zeile im Themen-Manager |
| Spalte im Monatsraster | **30 px breit** | Zell-Tap zum Nachtragen — genau die Interaktion, zu der der Hinweistext auffordert |
| Tab-Bar-Button | 93 × 52 px | in Ordnung |
| Ampel-Buttons und Chips im Check-in | über 44 px | in Ordnung |

### 5.3 Geometrie

- **Monatsraster:** 352 px sichtbar von 1.064 px Gesamtbreite — man sieht **33 % des
  Monats** auf einmal, etwa acht von 31 Tagen. Die Themen-Labelspalte belegt davon
  118 px, also **34 % der sichtbaren Breite**. Der Screen, der laut Konzept „auf einen
  Blick zeigt, was dich bewegt", zeigt auf einen Blick eine knappe Woche.
- **Jahresraster:** 900 px hoch bei 844 px Viewport — die letzte Zeile und die
  Monatsstatistik liegen immer unter der Kante.
- **Check-in:** Der Inhalt ist 1.032 px hoch. Der Abschluss-Button „Fertig" beginnt bei
  y = 835 und liegt damit **immer knapp unter dem Bildrand** — der letzte Schritt des
  30-Sekunden-Rituals verlangt jedes Mal eine Scrollbewegung ins Leere.

### 5.4 Zugänglichkeit

- **`aria-pressed` fehlt vollständig:** null von sechs Ampel-Buttons und null von zehn
  Chips melden ihren Auswahlzustand. VoiceOver liest „Sport, Taste" — ob Sport heute
  gesetzt ist, erfährt man nicht. Das ist der schwerwiegendste Befund der Liste, weil er
  die App für blinde Nutzerinnen faktisch unbedienbar macht.
- **Fokus-Reihenfolge:** Die ersten vierzehn fokussierbaren Elemente im Heute-Screen sind
  die vierzehn Tages-Buttons des Streifens. Wer per VoiceOver oder Tastatur navigiert,
  muss zwei Wochen Vergangenheit durchqueren, bevor die erste Frage des Tages kommt.
- Positiv: `lang="de"` gesetzt, Live-Region für Toasts vorhanden, Fokus-Styles definiert,
  `prefers-reduced-motion` berücksichtigt, Safe-Areas respektiert.

### 5.5 Konsistenzbrüche

1. **Die Ampel ist im Check-in unbeschriftet, im Monatsreview beschriftet.** Vergleiche
   `09-heute-checkin-offen.png` (drei Farbflecken, kein Wort) mit
   `23-monatsreview-dialog.png` (dieselben drei Flecken mit „gut / mittel / schwer"
   darunter). Dieselbe Frage, zwei Antwortmuster — und ausgerechnet die tägliche Variante
   ist die stumme. Die Legende gibt es nur auf dem Monats-Screen, also dort, wo man nicht
   antwortet.
2. **Zwei konkurrierende Primärbuttons — bei derselben Aktion.** `.btn` ist standardmäßig
   dunkelbraun (`--ink`), `.btn.berry` ist der Marken-Akzent. Der Backup-Knopf heißt an
   beiden Stellen „Sichern" und tut dasselbe, ist aber im Banner dunkelbraun
   (`13-heute-abend-erinnerung-backup.png`) und im Mehr-Screen berry
   (`21-mehr-thema-bearbeiten.png`). Die Farbe transportiert hier also keine Bedeutung,
   sondern nur, wer die Klasse gesetzt hat.
3. **Toggle-Grün gegen Marken-Berry.** Die Schalter im Themen-Manager werden im
   Marker-Grün aktiv, obwohl Berry die Farbe für „aktiv, ausgewählt, primär" ist.
4. **Native Systemdialoge.** Umbenennen läuft über `prompt()`, Löschen über `confirm()`.
   Auf dem iPhone erscheinen dort graue Systemkästen mit der Website-Adresse — der Bruch
   mit der Journal-Anmutung ist an dieser Stelle total. In installierten Web-Apps ist
   `prompt()` außerdem nicht zuverlässig verfügbar.
5. **„Heute nicht" bricht um.** Im Monatsreview-Dialog steht der Ghost-Button zweizeilig
   neben dem Primärbutton (siehe `23-monatsreview-dialog.png`).
6. **Notizverlauf ist zentriert und kursiv** gesetzt (`16-monat-review-und-notizen.png`) —
   als Liste zum Durchsehen die unruhigste denkbare Satzart.

### 5.6 Leere Zustände

Es gibt keine. `24-monat-leer.png` und `25-jahr-leer.png` zeigen, was eine neue Nutzerin
am zweiten Tag sieht, wenn sie neugierig auf „Monat" tippt: eine leere Tabelle mit zwölf
Zeilenbeschriftungen und der Aufforderung, eine Zelle anzutippen, die es visuell nicht
gibt. Genauso `07-heute-leer-erster-tag.png`: Der allererste Tag sieht exakt aus wie der
zweihundertste — inklusive dreizehn leerer Tage im Rückblick-Streifen, die es noch gar
nicht geben kann.

---

## 6. Anleitung: Usability und Experience

### 6.1 Sieben Leitsätze

1. **Der Abendtest.** Jede Entscheidung wird gegen dieselbe Szene geprüft: 22:40 Uhr,
   Bett, eine Hand, halb geschlossene Augen, Display auf niedriger Helligkeit. Was in
   dieser Situation Konzentration verlangt, ist falsch designt.
2. **Zuerst verstehen, dann leicht machen, dann schön machen.** Ein Element, das man
   erklären muss, wird nicht durch schnellere Bedienung besser.
3. **Lücken haben nie ein Gesicht.** Kein Grau, kein Schraffieren, kein „verpasst", keine
   Zählung ausgelassener Tage. Ein leerer Tag ist leeres Papier.
4. **Farbe darf schmücken, nie allein bedeuten.** Jede Information, die über Farbe läuft,
   braucht einen zweiten Kanal: Wort, Position, Form oder Beschriftung.
5. **Die Hand bleibt unten.** Alles, was täglich passiert, gehört in die untere
   Bildschirmhälfte. Überschriften dürfen oben stehen, Entscheidungen nicht.
6. **Frida unterbricht nicht.** Hinweise, Erinnerungen und Impulse erscheinen im Fluss —
   niemals als Modal, das man wegtippen muss. Der Monatsreview ist die einzige erlaubte
   Ausnahme, und er hat einen sichtbaren Ausweg.
7. **Handschrift für Wärme, System-Font für Arbeit.** Handschrift trägt Begrüßungen,
   Titel und Themen-Pillen. Zahlen, Formularlabels und alles, was schnell gelesen wird,
   bleibt System-Font.

### 6.2 Priorität 1 — Verständlichkeit

**1.1 Beschrifte die Ampel im Check-in.**
Setze „gut / mittel / schwer" unter die drei Swatches, genau wie es der Monatsreview
schon macht. Das ist die kleinste Änderung mit der größten Wirkung im ganzen Dokument:
Sie beseitigt gleichzeitig eine Lernhürde, einen Konsistenzbruch und die Abhängigkeit
von reiner Farbunterscheidung. Wenn Platz knapp wird, ist die Zeile „Wie war dein Tag?"
verzichtbar, die Beschriftung nicht.

**1.2 Bau echte leere Zustände.**
Drei Stellen brauchen eine eigene Ansprache in Fridas Stimme, jeweils mit genau einer
Handlung als Ausweg:
- *Monat ohne Daten:* statt des leeren Rasters ein kurzer Satz plus ein Beispielraster
  in gedämpfter Darstellung, damit man sieht, wohin die Reise geht. Handlung: „Heute
  eintragen".
- *Jahr ohne Daten:* dasselbe Prinzip; hier ist die Vorfreude auf die Farbfläche das
  eigentliche Argument.
- *Erster Tag im Heute-Screen:* Der 14-Tage-Streifen sollte am ersten Tag nicht dreizehn
  leere Karten zeigen. Lass ihn mitwachsen, oder ersetze ihn am ersten Tag durch einen
  Satz.

**1.3 Gib der Ampel eine zweite Dimension.**
Farbe allein trägt „gut / mittel / schwer" nicht — dafür ist Gelb bei 1,80:1 zu schwach.
Vorschläge, in dieser Reihenfolge zu prüfen: unterschiedliche Swatch-**Größe** (gut groß,
mittel mittel, schwer klein) oder unterschiedliche **Strichdichte** des Filzstifts. Beides
bleibt im Malerei-Bild, beides funktioniert bei Farbenblindheit und auf gedimmtem Display.
Zusätzlich: Gelb um zwei bis drei Stufen abdunkeln, bis es 3:1 gegen das Papier erreicht.

**1.4 Zeig mehr Monat auf einmal.**
Momentan sieht man ein Drittel. Zwei Hebel: die Themen-Labelspalte schmaler oder
kollabierbar machen (sie belegt ein Drittel der sichtbaren Breite) und die Spaltenbreite
von 30 px reduzieren, wenn die Swatches kleiner werden. Prüfe außerdem, ob eine
Wochenansicht als Einstieg besser trägt und das volle Monatsraster ein bewusster
Zweitblick wird.

### 6.3 Priorität 2 — Leichtigkeit

**2.1 Hol den Abschluss ins Bild.**
„Fertig" liegt immer knapp unter der Kante. Mach den Button haftend am unteren Rand, über
der Tab-Bar, sobald der Check-in offen ist. Dann ist das Ritual jederzeit mit einem
Daumentipp beendbar, egal wie weit gescrollt wurde.

**2.2 Gruppiere die zehn Chips.**
Aktuell stehen Sport, Geweint, Streit, Alkohol, Periode und Intimität als eine flache
Wolke nebeneinander — inhaltlich sehr verschiedene Dinge in identischer Darstellung. Bilde
zwei bis drei stille Gruppen (etwa *Körper* — Sport, Obst & Gemüse, Erkältung, Periode,
Intimität; *Innen* — Geweint, Overthinking; *Außen* — Soziale Kontakte, Streit, Alkohol)
oder sortiere nach Häufigkeit. Keine Überschriften nötig, ein Abstand genügt. Ziel: Man
findet, was man sucht, ohne zu lesen.

**2.3 Ersetze `prompt()` und `confirm()`.**
Umbenennen wird ein Inline-Eingabefeld direkt in der aufgeklappten Themenzeile. Löschen
wird eine Bestätigung im Frida-Look — mit einem Satz, der sagt, was wirklich passiert
(„Deine bisherigen Markierungen bleiben im Backup erhalten, werden aber nicht mehr
angezeigt"). Denk hier auch an eine Rücknahme innerhalb weniger Sekunden statt der
Vorab-Nachfrage.

**2.4 Vergrößere die kleinen Ziele.**
`.btn.small` von 40 auf 44 px, die Themen-Schalter auf 44 px Höhe bringen (die sichtbare
Kapsel darf 30 px bleiben, die Trefferfläche nicht). Für das Monatsraster: Wenn ein Tap
auf eine 30-px-Zelle die beworbene Interaktion ist, muss entweder die Zelle größer werden
oder der Tap auf die ganze Tagesspalte gehen.

**2.5 Füll den Abschluss-Screen.**
Nach „Fertig" bleiben rund 40 % der Fläche leer (`11-heute-zusammenfassung-impulse.png`).
Genau dort ist der Moment, in dem eine Nutzerin offen für den Rückblick ist: Setz die
letzten sieben Tage als kleine Farbreihe darunter, oder die Notiz von heute vor einem
Monat. Kein Statistik-Block — ein ruhiger, freundlicher Nachklang.

**2.6 Räum die Button-Sprache auf.**
Lege fest: **Berry gefüllt** ist die eine Haupthandlung pro Screen. **Umrandet** ist
alles Sekundäre. **Ghost** ist Abbrechen und Wegtippen. Braun gefüllt entfällt. Danach
bekommt das Backup-Banner einen umrandeten Button — es ist ein Hinweis, keine
Haupthandlung.

### 6.4 Priorität 3 — Zugänglichkeit

**3.1 `aria-pressed` an alle Ampel-Buttons und Chips.** Ohne diese Ergänzung sagt
VoiceOver nicht, was gesetzt ist. Nicht verhandelbar.

**3.2 Sortier den Heute-Screen für die Fokus-Reihenfolge um** oder mach den 14-Tage-
Streifen zu einer einzigen Fokus-Station mit Pfeiltasten-Navigation. Die erste Station
nach der Begrüßung muss die erste Frage des Tages sein.

**3.3 Heb `--ink-soft` an.** Bei 3,44:1 trägt es Hints, Eyebrows, Sub-Labels und inaktive
Tab-Labels — also einen großen Teil des Fließtexts. Ein Wert um `#6F6455` erreicht AA und
bleibt in der warmen Papierfamilie. Prüf gleichzeitig, ob die Eyebrow-Zeile 11 px in
Versalien mit weiter Sperrung wirklich braucht; 12 px ohne Versalien liest sich in der
Abendszene deutlich leichter.

**3.4 Gib Toasts mehr Zeit.** 2,4 Sekunden für einen Satz sind knapp, wenn er beim
Erscheinen nicht angesehen wird.

### 6.5 Feinschliff

- Setz den Notizverlauf linksbündig und ohne Kursive; die Datumsspalte wird zur ruhigen
  Kante zum Scannen.
- Markier „heute" im Jahresraster — momentan gibt es keinen Anker im Jahr.
- Zeig im Jahresraster die Monatsinitialen mit ausgeschriebenem Namen beim Antippen; „J"
  steht zweimal da (Januar, Juni, Juli sogar dreimal).
- Zukünftige Tage im Jahr sollten anders aussehen als vergangene leere Tage — heute sind
  beide identisch, und das lässt das Jahr im Juli zu 40 % „versäumt" wirken statt zu 58 %
  gelebt.
- Der Monatsreview-Dialog braucht eine klare Zweiteilung: „Heute nicht" gehört als
  ruhiger Textlink unter den Primärbutton, nicht daneben.
- Prüf das Backup-Banner auf Ton: Es ist die einzige Stelle, an der die App etwas von der
  Nutzerin will. Es sollte am wenigsten nach Aufforderung klingen von allem in der App.

### 6.6 Womit du anfängst

Wenn du nur einen Nachmittag hast: **1.1** (Ampel beschriften), **2.1** (Abschluss ins
Bild holen), **3.1** (`aria-pressed`), **1.2** (leere Zustände). Diese vier verändern das
tägliche Erlebnis am spürbarsten und berühren die Architektur am wenigsten.

---

## 7. Leitplanken — was nicht verhandelbar ist

**Produkt**

- Keine Streaks, keine Punkte, keine Level, keine Abzeichen, keine Zählung verpasster Tage.
- Keine Cloud, kein Konto, keine Registrierung, keine Werbung, kein Abo-Gate.
- Kein diagnostischer Ton. Frida ist kein Medizinprodukt; bei anhaltend schweren Tagen
  wird ausschließlich zum Gespräch mit vertrauten Menschen und zu professioneller
  Unterstützung ermutigt. Keine Substanz- oder Präparate-Empfehlungen. Der Disclaimer mit
  der Telefonseelsorge (116 123) bleibt im Mehr-Screen.
- Zyklus bleibt ein gleichberechtigtes Thema neben Schlaf und Sport — nicht in einen
  Sonderbereich ausgelagert.

**Design**

- Der Filzstift-Swatch mit deterministischer Rotation bleibt das Signatur-Element.
- Papierfarbe, Punktraster und die fünf Markerfarben bleiben die Familie. Abdunkeln zur
  Lesbarkeit ist erlaubt, Auswechseln nicht.
- Handschrift bleibt `Noteworthy` mit System-Fallback. **Keine Webfonts** — die App muss
  offline und ohne Netzabhängigkeit vollständig funktionieren.
- Berry bleibt der UI-Akzent.

**Technik** (falls du Code anfasst)

- Eine einzige HTML-Datei, kein Framework, kein Build.
- Speicherschlüssel `frida_v1` mit `version`-Feld. Schema-Änderungen laufen über
  `migrate()`, nie über einen Bruch.
- Datums-Schlüssel immer lokal erzeugen (`YYYY-MM-DD`), nie über `toISOString()`.
- Alle Ausgaben aus Nutzereingaben und Importen durch `esc()` — auch in Attributen.
- Neue Impulse sind ein Eintrag in `IMPULSE_RULES`, kein Code-Umbau.

---

## 8. Screenshots reproduzieren

Die Screenshots sind kein Handwerk, sondern ein Skript — nach jeder Design-Runde neu
erzeugbar, mit identischen Demo-Daten und damit direkt vergleichbar.

```bash
npm install --no-save playwright
python3 -m http.server 8765 --bind 127.0.0.1 &
node tools/screenshots/shoot.js docs/screenshots
```

`tools/screenshots/seed.js` erzeugt die Demo-Nutzerin deterministisch (gleiche Daten bei
jedem Lauf), `shoot.js` fährt die App durch alle Zustände und schießt die 29 Bilder.
Die Uhrzeit wird pro Aufnahme gesetzt, damit Abend-Hinweis, Backup-Banner und
Monatsreview zuverlässig erscheinen. Der Kontaktbogen entsteht mit
`tools/screenshots/kontaktbogen.py`.

Wer keine Handschrift auf dem System hat, bekommt einen generischen Fallback. Das Skript
`tools/screenshots/fonts.sh` installiert Patrick Hand und mappt es auf `Noteworthy`.

---

## 9. Weiterführende Unterlagen

`docs/Frida_Konzept_und_Uebergabe.md` enthält den vollständigen Hintergrund: Markt-
Snapshot mit fünf Wettbewerbsclustern, Positionierung, Datenmodell mit Beispiel-JSON,
technische Leitplanken aus früheren Projekten, die vollständige Impulse-Tabelle mit allen
zehn Regeln und den V2-Backlog.
