# Frida – dein Jahr in Farbe

Ein digitales Bullet Journal in Filzstift-Optik: jeden Tag in unter 30 Sekunden festhalten,
wie es dir ging und was los war. 100 % lokal, kein Konto, kein Abo, keine Streaks.

Stand **V2.1**: Redesign-Runde 1 aus Claude Design umgesetzt – beschriftete Ampel mit
Größenstaffelung, Woche als Einstieg in den Monat, haftender Abschluss, echte leere
Zustände, Inline-Umbenennen mit Rücknahme statt Systemdialogen, WCAG-AA-Kontraste in
allen drei Themes. Darunter unverändert V2.0: Monats- und Jahresreviews, Zyklus-Schätzung,
Korrelations-Karten, blätterbare Jahresansicht, drei Themes (inkl. Nachtpapier),
optionale PIN-Sperre, CSV-Export, teilbare Wochen-/Jahresbilder und Notiz-Suche.

## Dateien

| Datei | Rolle |
|---|---|
| `index.html` | Die komplette App – eine Datei, kein Build, kein Framework (ehemals `frida.html`) |
| `sw.js` | Service Worker: Offline-Start, network-first fürs HTML (keine hängenden alten Versionen) |
| `manifest.webmanifest` | PWA-Manifest (Name, Farben, Icons) |
| `icon-180/192/512.png` | App-Icons (180 = Apple Touch Icon) |
| `favicon.ico` | Browser-Tab-Icon (16/32/48 px, aus dem Marker-Motiv beschnitten) |
| `docs/Frida_Konzept_und_Uebergabe.md` | Konzept, Datenmodell, Impulse-Engine, Backlog |

## Betrieb auf dem iPhone

1. Repo über **GitHub Pages** hosten (Settings → Pages → Branch `main`, Ordner `/`).
2. Die URL in **Safari** öffnen → Teilen → **„Zum Home-Bildschirm"**.
3. Fertig: eigenes Icon, Vollbild, dauerhafter Speicher (Home-Screen-Web-Apps sind von
   Safaris 7-Tage-Löschregel ausgenommen).

Alle Daten liegen in `localStorage` auf dem Gerät. Das Backup (Mehr → „Backup sichern")
ist eine JSON-Datei – die App erinnert nach 14 Tagen automatisch daran.

## Entwickeln & Testen

Doppelklick auf `index.html` genügt (läuft auch über `file://`, der Service Worker
wird dann einfach übersprungen). Automatisierter Smoke-Test im iPhone-Viewport (390×844)
mit Playwright: Onboarding, Check-in, Nachtrag, Monats-/Jahresansicht, Habit-Verwaltung,
Import-Validierung, Reload-Persistenz.

Konventionen (siehe Konzeptdokument, Abschnitte 6–8):

- Single File, kein Framework, localStorage-Key `frida_v1` mit `version`-Feld –
  Schema-Änderungen laufen über `migrate()`, nie über Bruch.
- Datums-Keys immer **lokal** erzeugen (`YYYY-MM-DD`), nie `toISOString()`.
- Ausgaben konsequent escapen (`esc()`), auch in Attributen.
- Swatch-Rotation **und Klecksform** deterministisch aus `hash(datum + habitId)`.
- Fridas Ich-Stimme in Onboarding und Impulsen; warm, nie diagnostisch.

Aus dem Redesign dazugekommen (siehe `docs/Frida_Design_Uebergabe.md`, Abschnitt 6):

- **Eine Button-Sprache:** Berry gefüllt = die eine Haupthandlung pro Screen,
  `.btn.line` = sekundär (Berry umrandet), `.btn.ghost` = abbrechen. Braun gefüllt
  gibt es nicht mehr.
- **Farbe bedeutet nie allein.** Die Ampel trägt zusätzlich Wort und Größe
  (`.sw.v-g/-y/-r`); jede neue Farbaussage braucht einen zweiten Kanal.
- **Kontrast ist Pflicht, nicht Geschmack.** Neue Werte gegen Papier, Karte und
  Tab-Bar in allen drei Themes prüfen – AA für Text, 3:1 für Grafik. `--m-red`
  bleibt Markerfarbe, für Text und Löschflächen gibt es `--danger`/`--danger-bg`.
- **Keine Systemdialoge** für Umbenennen und Löschen: inline bearbeiten, löschen
  mit sechs Sekunden Rücknahme (`showUndo()`).
