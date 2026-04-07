# Changelog

## 2026-04-07

- Fehlerhafte Spielfiguren-Icons behoben: Coding-Theme nutzt nun dynamisch `label (1).png` (Blau) und `label.png` (Orange), Gaming-Theme nutzt korrekterweise `Player (1).png` (Blau) und `Player.png` (Orange).
- CSS Card-Flip Glitch behoben: Fehler behoben, bei dem die Karte darunter geöffnet wurde (behoben durch `pointer-events: none`).
- Current-Player Icon Bugfix: Starre CSS-Farbfilter (`hue-rotate`, `sepia`) vom Header-Icon entfernt, sodass der dynamische Bild-Wechsel (z. B. auf Orange) nun auch wieder visuell sichtbar ist.
- Responsive Setup (Menüs): Die fixen `100vh` Begrenzungen vom "#app" Container übersteuerten das Menü. Settings- / Home-Screens nutzen nun sichere `margin: auto;` Box-Zentrierungen mit internen, eigenständigen Scrollbars, wodurch auf allen Geräten (iPhone SE, XR, etc.) nun sauber rauf und runter gescrollt werden kann, ohne dass der obere/untere Bereich abgeschnitten wird.
- Querformat-Optimierung (Tablets & Landscape): Das Memory-Grid reagiert nun adaptiv auf die Bildschirmhöhe (`75vh`). Karten passen sich geschmeidig an, ohne zu überlappen!
- Querformat-Blocker (Smartphones): Speziell für sehr niedrige Höhen (< 500px) wurde ein "Bitte Bildschirm auf Hochformat drehen"-Overlay eingebaut. (inkl. funktionierendem CSS / korrigiertem Icon `ROTATE_icon.png`).
- Game Over Screen als eigene View implementiert (view-gameover)
- Winner Screen als eigene View implementiert (view-winner)
- Game Over Screen wird 3 Sekunden angezeigt, danach automatischer Wechsel zum Winner Screen
- Coding-Theme Game Over: türkiser 3D-Text "Game over" mit Schatten
- Pink-Theme Game Over: pinke Pixel-Schrift "GAME OVER" (Press Start 2P)
- Coding-Theme Winner: Konfetti-Bild + großes Schachfigur-Icon (blau/orange) + "Back to start" Button
- Pink-Theme Winner: Goldener Pokal (Trophy) + kursiver Spielername + "Home" Button mit pinker Umrandung
- Header-Styling für beide Themes angepasst: Pink hat Score-Tags in einem gemeinsamen Container
- Score-Board-Wrapper mit theme-spezifischem Styling hinzugefügt
- Exit-Icon Filter für bessere Sichtbarkeit hinzugefügt

## 2026-04-01

- Projekt initialisiert mit Vite + TypeScript + SCSS
- TypeScript-Code modularisiert in state.ts, gameLogic.ts, ui.ts
- SCSS aufgeteilt in Views: _home.scss, _settings.scss, _game.scss, _result.scss, _modal.scss
- Home-Screen mit Controller-Hintergrund und linksbündigem Text
- Settings-Screen mit Theme-, Player- und Board-Size-Auswahl
- Breadcrumbs im Settings-Footer mit Live-Aktualisierung
- Game-Screen mit Score-Anzeige, Current Player und Exit-Button
- Karten-Flip-Animation mit 3D-Perspektive
- Theme-spezifische Hintergrundfarben (#303131 für Coding, #294F60 für Pink)
- Theme-spezifische Button-Farben (türkis für Coding, pink für Pink)
- Exit-Modal mit theme-spezifischen Button-Farben
- Responsive Design für alle Views
