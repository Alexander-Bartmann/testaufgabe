# Testaufgabe - Social Media Workflow (Agentur Philipp)

Hallo, hier ist meine Lösung für die Testaufgabe. Ich habe versucht, den Kernablauf so einfach und nachvollziehbar wie möglich zu halten. 

## 1. Wie man das Projekt startet
Um das Projekt lokal zu starten:
1. `npm install` ausführen.
2. `npm run dev` starten.
3. Im Browser `http://localhost:3000` aufrufen.

## 2. Architektur & Annahmen
* **Tech-Stack:** Ich habe Next.js (App Router) mit React, TypeScript und Tailwind CSS genutzt.
* **Datenhaltung:** Da es ein Prototyp ist und keine echte Datenbank gefordert war, nutze ich für die 5 Ideen einfachen React-State (`useState`). So bleibt der Code schlank.
* **Workflow (Status):** Jede Idee hat einen Status (`DRAFT`, `IN_REVIEW`, `APPROVED`, `PUBLISHED`). 
* **Änderungsschutz:** Wenn man in der Detailansicht den Text ändert, springt der Status automatisch zurück auf `DRAFT` und die Version erhöht sich.
* **Publishing-Schnittstelle:** Die Übergabe wird durch ein JSON simuliert, das als Alert im Browser aufploppt. Eine echte API-Anbindung habe ich weggelassen, da das laut Aufgabe nicht nötig war.

## 3. KI-Simulation
Echte API-Keys waren nicht erlaubt. Daher habe ich die Texte (Briefings) fest im Code hinterlegt. Das entspricht der simulierten KI. Wenn man das später mit einer echten KI (z.B. OpenAI) verbinden will, müsste man nur die Funktion austauschen, die den Text generiert.

## 4. Tests (Screenshots)
Hier sind die Nachweise für die vier geforderten Tests.

**Test 1: Kapazitätsprüfung (Rote Warnung)**
Wenn Person A über 90 Minuten kommt, wird der Kasten rot.
<img width="1070" height="505" alt="image" src="https://github.com/user-attachments/assets/2bd303a3-6a26-461e-b2de-7511a0c7ff48" />

**Test 2: Änderung nach Freigabe**
Sobald der Text im Detail geändert wird, springt der Status wieder auf "DRAFT" und die Version zählt hoch.
<img width="317" height="463" alt="image" src="https://github.com/user-attachments/assets/62a8cd24-4dd7-4096-b24b-2cd55860633c" />

**Test 3: Fehlende Freigabe blockiert Übergabe**
Der Button "Publish" erscheint erst, wenn der Status auf "APPROVED" steht. Sonst kann man nichts veröffentlichen.
<img width="310" height="479" alt="image" src="https://github.com/user-attachments/assets/9dbfcbae-4ec8-4f89-b90b-352c1a5630bd" />

**Test 4: Einmalige Übergabe (JSON)**
Nach dem Klick auf Publish wird ein JSON generiert. Der Button verschwindet danach, damit nichts doppelt gesendet wird.

## 5. Konzeptionelle Ergänzungen (Teil 2 der Aufgabe)
Hier meine kurzen Gedanken zu den Ausbau-Themen:

* **Erfolgsmessung:** Ich würde UTM-Parameter an die Links hängen. Wichtig ist, im Dashboard fehlende Werte als "Unbekannt" anzuzeigen und nicht einfach 0. Mehrfachzählungen muss man in der Datenbank filtern.
* **Wirtschaftlichkeit:** Kosten pro Anfrage kann man nur berechnen, wenn man genug Daten hat. Wichtig ist, Umsatz und reinen Gewinn (Deckungsbeitrag) zu trennen. Wenn der Nenner 0 ist, sollte man keine Quote ausgeben.
* **Kommentare:** Die KI kann Antworten vorschlagen, aber ein Mensch muss sie immer freigeben. Bei Beschwerden sollte die KI gar nichts machen, sondern direkt an das Team weiterleiten.
* **Betrieb:** Ich würde einen Cronjob nutzen, der z.B. nachts prüft, ob etwas freigegeben ist und es dann postet. Wenn die API nicht antwortet, muss das System eine Warnung an den Admin schicken und den Status auf "Fehler" setzen.
* **Kapazitätsplanung:** Die Minuten werden vom System abgezogen. Freie Beratungstermine würde ich getrennt davon in einem Kalender verwalten.

## 6. Bearbeitungszeit und offene Punkte
* **Zeit:** Ich habe für die Aufgabe ca. 3,5 bis 4 Stunden gebraucht (inkl. dieser README).
* **Offene Punkte:** Die Daten sind aktuell nur im Browser-State und gehen beim Neuladen der Seite verloren (echte DB fehlt). Das Design ist sehr basic gehalten, und die KI-Texte sind wie gesagt nur simuliert.

Vielen Dank für die Aufgabe, es hat Spaß gemacht!
