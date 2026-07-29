# Frida – Konzept & Codeübergabe

**Name:** Frida („dein Jahr in Farbe")
Persona-Ansatz: Die App ist eine Begleiterin, keine Software – sie spricht in der Ich-Form („Ich bin Frida. Ich male dein Jahr auf eine Seite."). Die Malerin-Assoziation ist gewollt und trägt die Filzstift-Ästhetik. Perspektivisch kann Frida eine Stimme bekommen (siehe Backlog V2).

**Stand:** 29.07.2026 · **V1.1** (V1 aus dem Chat, V1.1 in Claude Code umgesetzt)
**Dateien:** `index.html` (die App, ehemals `frida.html`) + `sw.js` + `manifest.webmanifest` + Icons. Die App selbst bleibt eine einzige Datei ohne Build und ohne Abhängigkeiten, komplett offline-fähig; Service Worker und Manifest sind bewusste, minimale Ausnahmen für die PWA-Installation.

---

## 1. Die Idee in einem Satz

Ein digitales Bullet Journal in Filzstift-Optik: jeden Tag in unter 30 Sekunden festhalten, wie es dir ging und was los war – und am Monatsende auf einen Blick sehen, was dich wirklich bewegt. Lokal, privat, ohne Konto, ohne Abo, ohne Druck.

---

## 2. Markt-Snapshot (Recherche Juli 2026)

Der Markt teilt sich in fünf Cluster:

| Cluster | Vertreter | Stärke | Schwäche |
|---|---|---|---|
| Schnell-Logger | Daylio, Moodflow | Check-in in Sekunden, Monats-Heatmap | 5 Standard-Moods, generisch, Abo für Tiefe |
| Gamification | Finch (virtueller Vogel) | Warm, niedrigschwellig, hohe Bindung | Kaum Analyse, kaum Datenexport |
| Daten & Symptome | Bearable | Korrelation Mood/Schlaf/Medikation | Klinisch-nüchtern, Overkill für Alltag |
| Emotionsvokabular | How We Feel (Yale) | 100+ Emotionen, kostenlos | Kein Export, keine Habits |
| Habit-Builder | HabitBox, Streaks | Konsistenz, Heatmap, on-device | Binäres Modell, Streak-Druck, keine Befindlichkeit |

**Vier Befunde, auf denen Frida aufbaut:**

1. **Zyklus fehlt fast überall.** Die dedizierten Mood-Apps (Daylio, How We Feel, Moodfit, Stoic, Finch) haben praktisch kein Zyklus-Tracking – nur Nischen-Apps wie Go Go Gaia besetzen das. Im Referenz-Screenshot ist „Periode" eine selbstverständliche Zeile. Genau da liegt die Lücke für die weibliche Zielgruppe.
2. **Streaks sind der Abbruchgrund Nr. 1.** Das dokumentierte Muster: zwei Wochen euphorisch tracken, ein Tag verpasst, Streak weg, App nie wieder geöffnet. Frida hat deshalb **bewusst keine Streaks** – ein leerer Tag ist einfach ein leeres Feld, kein Versagen. Das steht seit V1.1 auch wörtlich im Onboarding.
3. **Der Check-in entscheidet.** Die beste App ist die, deren Log man in 10–30 Sekunden zur immer gleichen Tageszeit schafft. V1 ist exakt darauf gebaut: Ampeln tippen, Chips tippen, fertig.
4. **Privacy allein differenziert nicht mehr.** On-device ohne Account bieten auch HabitBox & Co. Die Differenzierung liegt in der Kategorie: Habit-Builder messen Disziplin (binär, Streak), Frida zeichnet Zustand auf (Gefühle, Schlaf, Zyklus, Notiz nebeneinander) – Selbstverstehen statt Selbstoptimierung.

**Kultureller Rückenwind:** „Year in Pixels" (2015 von der Bullet-Journal-Szene erfunden) ist auf TikTok/Instagram ein lebendiger Trend (#bujo, Habit-Tracker-Reels wie die Design-Vorlage mit 38k Likes). Die Ästhetik ist etabliert – digital aber fast immer als sterile Pixel-Grids umgesetzt, nicht als Filzstift-Journal.

---

## 3. Positionierung

**Nicht noch ein Daten-Dashboard – sondern dein Journal, das mitdenkt.**

1. **100 % lokal.** Kein Konto, keine Cloud, kein Server. Die Daten liegen im Gerätespeicher, das Backup ist eine JSON-Datei in deiner Hand.
2. **Zyklus als gleichberechtigtes Signal** – neben Schlaf, Sport, Gefühlen. Keine separate Perioden-App nötig.
3. **Kein Streak-Terror.** Lücken sind erlaubt. Frida belohnt Hinschauen, nicht Lückenlosigkeit.
4. **Bullet-Journal-Ästhetik statt Pixel-Sterilität.** Filzstift-Swatches, Punktraster-Papier, Handschrift – digital, aber mit Journal-Seele.
5. **Eine Begleiterin, kein Tool.** Frida spricht in der Ich-Form und gibt regelbasierte, warme Impulse aus den eigenen Daten („3× Sport in Folge – morgen darf Pause sein") statt Statistik-Friedhof.

---

## 4. Zielgruppe

Primär Frauen ca. 18–40, Bullet-Journal-/Self-Care-affin, Instagram-/TikTok-sozialisiert, genervt von Abo-Apps und Datenkraken. Sekundär: alle, die ein ruhiges, privates Tages-Log wollen.

---

## 5. Ist-Stand V1.1 (implementiert)

**Aus V1 übernommen:**

- **Splash-Screen** (Wortmarke „Frida" + drei aufpoppende Marker)
- **Einmaliges Onboarding** (3 Schritte): Frida stellt sich in der Ich-Form vor + fragt den Namen ab → Themenauswahl (12 Default-Habits, vorausgewählt, abwählbar) → Backup-Erklärung. Neu: Enter im Namensfeld springt weiter, das No-Streak-Versprechen steht im Willkommenstext.
- **Heute-Screen**: Begrüßung nach Tageszeit („Moin, Lena."), 14-Tage-Streifen zum Nachtragen, Check-in-Formular (Ampel-Fragen + Chips + optionale Notiz), nach dem Speichern Zusammenfassung + Impulse; Eintrag jederzeit editierbar
- **Monatsraster** (Kern-Screen, 1:1 an der Vorlage): Zeilen = Habits als Pillen-Labels (sticky), Spalten = Tage 1–31, Filzstift-Swatches, Heute-Spalte markiert, horizontal scrollbar, Zell-Tap → Nachtrag; Monatsnavigation über alle Monate
- **Jahr in Farben**: 12×31-Grid, Tagesfarbe = Gefühle-Ampel; darunter Monats-Statistik
- **Mehr-Screen**: Backup exportieren/importieren (JSON), Habits verwalten, Name ändern, alles zurücksetzen, Disclaimer
- **Backup-Banner**: erscheint automatisch, wenn das letzte Backup ≥ 14 Tage her ist

**Neu in V1.1 (Backlog abgearbeitet):**

- **PWA-Basis**: `manifest.webmanifest`, App-Icons (180/192/512), Service Worker mit Offline-Start; Installations-Hinweis-Karte im Mehr-Screen, die nur außerhalb des Standalone-Modus erscheint
- **Habits verwalten**: umbenennen, löschen (Einträge bleiben im Backup erhalten) und per Drag am ≡-Handle sortieren (Pointer Events, iOS-tauglich) – zusätzlich zu ein-/ausblenden und neu anlegen
- **Notiz-Verlauf**: alle Notizen des angezeigten Monats als Liste unter dem Raster, Tap springt zum Tag
- **Haptisches Feedback** beim Setzen eines Markers und beim Speichern (`navigator.vibrate`, wo verfügbar – iOS Safari unterstützt es derzeit nicht, dort ohne Effekt)
- **Sanfte In-App-Erinnerung**: ab 18 Uhr ohne Eintrag ein Hinweissatz im Heute-Screen plus dezenter Punkt am Heute-Tab – kein Push, kein Druck
- **Impulse-Engine überarbeitet**: Regeln + Texte in eigene Datenstruktur ausgelagert (V2-Punkt vorgezogen), neue Regel für Erkältung, Texte geschärft (siehe Abschnitt 9)

**Qualitäts-Basis**: Safe-Areas (Notch), 44-px-Touch-Targets, `prefers-reduced-motion`, Fokus-Styles, konsequentes Escaping aller nutzer- und importkontrollierten Ausgaben (auch in Attributen).

**Default-Habits (adaptiert aus der Vorlage):**
Ampel-Typ: Gefühle · Gut geschlafen · Obst & Gemüse
Häkchen-Typ: Sport (grün) · Soziale Kontakte (grün) · Geweint (blau) · Overthinking (blau) · Streit (rot) · Alkohol (gelb) · Erkältung (gelb) · Intimität (pink, in der Vorlage „GV") · Periode (rot)

---

## 6. Datenmodell

Ein einziger localStorage-Key: `frida_v1`

```json
{
  "version": 1,
  "profile": {
    "name": "Lena",
    "onboarded": true,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "lastExport": "2026-07-20T08:00:00.000Z"
  },
  "habits": [
    { "id": "gefuehle", "label": "Gefühle", "type": "scale", "color": "green", "order": 1, "active": true },
    { "id": "sport",    "label": "Sport",   "type": "check", "color": "green", "order": 4, "active": true }
  ],
  "entries": {
    "2026-07-29": { "gefuehle": "g", "schlaf": "y", "sport": true, "periode": true, "note": "Guter Tag." }
  }
}
```

Konventionen:
- Datums-Keys immer `YYYY-MM-DD`, **lokal** erzeugt (nie `toISOString()` fürs Datum – Zeitzonenfalle)
- Ampelwerte: `"g" | "y" | "r"`; Häkchen: `true` oder Key fehlt
- Nur gesetzte Werte werden gespeichert (schlanke Entries)
- `version` ist der Migrationsanker: `migrate()` zieht alte Stände hoch, neuere Stände werden beim Import mit klarer Meldung abgelehnt
- Das Backup ist der komplette State – Import ersetzt alles nach Rückfrage und läuft durch `sanitizeImport()` (Struktur prüfen, Felder normalisieren, Unbekanntes verwerfen); Export-Dateiname `frida-backup-YYYY-MM-DD.json`
- Ein beim Laden nicht parsebarer State wird nie stillschweigend überschrieben, sondern vorher unter `frida_v1_corrupt` weggesichert

---

## 7. Architektur & Konventionen

- **Single File** (`index.html`), drei Blöcke: `<style>` (Tokens → Screens → Komponenten), Markup (Splash → Onboarding → 4 Screens → Tab-Bar), `<script>` (State → Utils → je Screen ein `render*()` → Backup → Onboarding → Start)
- Kein Framework, kein Build – bewusst, damit die Datei einzeln verschickt, gehostet und in Claude Code weiterentwickelt werden kann. `sw.js` und `manifest.webmanifest` sind die einzigen Begleitdateien (PWA); die App läuft auch ohne sie (z. B. per `file://`).
- Screens werden per `.active`-Klasse getauscht (`switchTab()`), jede Ansicht rendert vollständig neu aus dem State (einfach, robust, bei dieser Datenmenge schnell genug)
- Rotation der Swatches ist **deterministisch** aus `hash(datum + habitId)` – gleiche Zelle sieht immer gleich „gemalt" aus

**Technische Leitplanken (Lehren aus früheren Projekten, verbindlich):**

1. **Zeit & Datum:** Datums-Keys nur lokal bauen; Tageswechsel wird aktiv abgefangen (`visibilitychange`/`focus`/`pageshow`), weil Home-Screen-Apps tagelang im Speicher bleiben – sonst zeigt „Heute" gestern.
2. **Escaping:** Alles, was aus Nutzereingaben oder Importen stammt, läuft durch `esc()` – auch in HTML-Attributen (`aria-label`!), nicht nur im Textinhalt.
3. **Import ist feindliches Terrain:** JSON-Backups werden validiert und normalisiert, nie blind übernommen. Neuere Schema-Versionen werden abgelehnt statt geraten.
4. **Service Worker konservativ:** HTML immer network-first (Cache nur als Offline-Fallback), Assets cache-first mit Hintergrund-Refresh, Cache-Name trägt die Version, `activate` räumt alte Caches. So bleibt niemand für immer auf einer alten Version hängen.
5. **iOS-Export:** `<a download>` ist in Home-Screen-Web-Apps unzuverlässig – Export geht zuerst über das Teilen-Blatt (`navigator.share` mit Datei), Download nur als Fallback. Abbruch im Teilen-Blatt zählt nicht als Backup.
6. **Speicher:** `navigator.storage.persist()` wird angefordert; `localStorage`-Fehler (voller Speicher, Private Mode) erzeugen eine sichtbare Meldung statt stillem Datenverlust.

---

## 8. Design-System

| Token | Wert | Rolle |
|---|---|---|
| `--paper` | `#F5EEDF` | Journalpapier (Vorgabe aus der Vorlage) |
| `--ink` | `#453C31` | Fineliner-Braun statt Schwarz |
| `--berry` | `#9C4F66` | UI-Akzent (Buttons, aktiver Tab) – feminin, bewusst kein Terracotta |
| `--m-green/-red/-yellow/-blue/-pink` | s. Code | Die fünf Markerfarben |

- **Typo:** Display = `Noteworthy` (auf iOS vorinstalliert → echte Handschrift ohne Webfont, funktioniert offline; Fallback Bradley Hand/cursive). UI-Text = SF/System. Der Kontrast Handschrift ↔ System-UI ist gewollt.
- **Signatur-Element:** der Filzstift-Swatch – asymmetrischer Border-Radius, deterministische Mini-Rotation, SVG-`feTurbulence`-Filter für die raue Kante, „Aufmal"-Animation beim Setzen. Jede Markierung wirkt gemalt, nicht geklickt. Das App-Icon greift genau dieses Motiv auf (drei Marker auf Punktraster).
- **Papier:** dezentes Punktraster per `radial-gradient` – wie echtes Bullet-Journal-Papier.
- Habit-Labels als umrandete Pillen in Handschrift (direkt aus der Vorlage übernommen).
- **Stimme im Interface:** Frida spricht per Du und in der Ich-Form – Onboarding, Erinnerungen und Impulse sind von ihr formuliert, UI-Labels bleiben neutral („Backup sichern", „Tag festhalten").

---

## 9. Impulse-Engine

Regelbasiert, kein LLM, alles offline. Regeln und Texte liegen seit V1.1 in einer eigenen Datenstruktur (`IMPULSE_RULES`) – neue Impulse sind ein Eintrag, kein Code-Umbau. Max. 2 Karten pro Tag, Priorität = Reihenfolge:

| # | Bedingung | Impuls (Kurzfassung) |
|---|---|---|
| 1 | Gefühle heute rot **und** ≥ 3 rote in den letzten 5 Tagen | „Schwere Tage" – Ermutigung, mit einem vertrauten Menschen zu sprechen; Unterstützung holen ist Stärke |
| 2 | Gefühle heute rot (ohne Serie) | Sanfter Zuspruch, es leicht angehen |
| 3 | Geweint heute | „Tränen sind ein Ventil, kein Fehler" |
| 4 | Periode heute | Wärme, bequeme Kleidung, kürzere To-do-Liste |
| 5 | Erkältung heute | Tee, Schlaf, wenig Programm – Gesundwerden ist Tagesaufgabe genug *(neu in V1.1)* |
| 6 | Sport an 3 Tagen in Folge | Regenerations-Empfehlung |
| 7 | Schlaf ≥ 3× rot in 5 Tagen | 30 Minuten früher ins Bett |
| 8 | Overthinking ≥ 4×/Woche **und** soziale Kontakte ≤ 1× | „Schreib jemandem, den du magst" |
| 9 | Alkohol ≥ 3×/Woche | Neutraler Impuls für einen freien Abend |
| 10 | Sonst: Gefühle grün | Positiver Anker („was hat gutgetan – wiederholen") |

**Tonalität:** warm, per Du, in Fridas Ich-Stimme, nie belehrend, nie diagnostisch – auch keine Substanz-/Präparate-Empfehlungen (in V1.1 wurde z. B. „Magnesium" bewusst gestrichen). **Harte Grenze:** Frida ist kein Medizinprodukt und stellt keine Diagnosen – der Disclaimer steht im Mehr-Screen und nennt als niedrigschwellige Anlaufstelle die Telefonseelsorge (116 123). Bei anhaltend roten Tagen wird ausschließlich zum Gespräch mit vertrauten Menschen bzw. professioneller Unterstützung ermutigt, nie „therapiert".

---

## 10. Betrieb auf dem iPhone

**Empfohlener Weg (A):** Das Repo kostenlos hosten (GitHub Pages / Netlify, unauffällige URL genügt) → in Safari öffnen → Teilen → **„Zum Home-Bildschirm"**. Ergebnis: eigenes Icon, Vollbild ohne Browser-Chrome, und der Speicher bleibt dauerhaft erhalten – Home-Screen-Web-Apps sind von Safaris 7-Tage-Löschregel ausgenommen. Seit V1.1 startet die App dank Service Worker auch offline sauber.

**Weg B (rein lokal):** `index.html` in der Dateien-App ablegen und von dort öffnen. Läuft, aber iOS behandelt lokal geöffnete HTML-Dateien als Vorschau-Kontext – die Speicher-Persistenz ist dort **nicht garantiert**. Für den Dauerbetrieb Weg A nehmen.

**Warum der Backup-Rhythmus Pflicht ist:** Safari löscht Website-Speicher nach 7 Tagen ohne Besuch (Intelligent Tracking Prevention). Bei täglicher Nutzung + Home-Screen-Installation greift das nicht – aber der JSON-Export bleibt die Versicherung gegen Gerätewechsel, iOS-Updates und Datenverlust. Der 14-Tage-Banner ist deshalb fest eingebaut; die Empfehlung an Nutzerinnen lautet alle 14–21 Tage. Der Export läuft auf dem iPhone über das Teilen-Blatt („In Dateien sichern"), am Rechner als klassischer Download.

**Am Mac testen:** Doppelklick auf `index.html` – läuft in jedem Browser. (In der Claude-Artifact-Vorschau speichert localStorage nicht – das ist eine Einschränkung der Vorschau, nicht der App.)

---

## 11. Backlog

**V1.1 – Feinschliff: ✅ komplett umgesetzt** (PWA-Basis, Habits umbenennen/löschen/sortieren, Notiz-Verlauf, Haptik, In-App-Erinnerung; zusätzlich vorgezogen: Impulse-Texte in eigener Datenstruktur)

**V2 – Ausbau**
- **Frida spricht:** Impulse und Begrüßung optional als Stimme (Text-to-Speech bzw. API-Voice) – die Persona ist dafür angelegt
- Zyklus-Intelligenz: aus getrackten Perioden-Tagen die nächste Phase schätzen und Impulse darauf abstimmen
- Korrelations-Karten („An Tagen mit Sport schläfst du 2× häufiger grün")
- Themes (2–3 Papier-/Markerfarben-Sets), optionale PIN-Sperre
- CSV-Export zusätzlich zu JSON
- Wochen-Rückblick als teilbares Bild (Canvas-Render des Rasters – Social-Loop)
- Mehr Impulse + saisonale Varianten (Datenstruktur dafür steht seit V1.1)
- Jahresansicht für vergangene Jahre blätterbar machen

**Bewusst NICHT geplant:** Streaks, Punkte, Level, Cloud-Sync, Accounts, Werbung.

---

## 12. Startprompt für Claude Code

> Im Repo liegt `index.html` – eine lokale Habit-/Mood-Tracker-App („Frida") als Single-File-HTML, plus dieses Konzeptdokument. Lies zuerst das Dokument, insbesondere Datenmodell (Abschnitt 6), Architektur inkl. technischer Leitplanken (7) und Design-System (8). Halte dich strikt an: Single File, kein Framework, localStorage-Key `frida_v1` mit `version`-Feld (Migrationen schreiben statt Schema brechen), deterministische Swatch-Rotation, konsequentes Escaping, Fridas Ich-Stimme in Onboarding und Impulsen, Tonalität warm und nie diagnostisch. V1.1 ist umgesetzt – weiter geht es mit dem V2-Backlog aus Abschnitt 11. Teste jede Änderung im iPhone-Viewport (390×844).
