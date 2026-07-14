# Brain Design System

Motyw: Deep Mind.

Kolory: granat `#071724`, granat drugi `#0b2133`, turkus `#66d4d7`, tekst `#f3fbff`.

Zasady: jeden styl kart, pól, przycisków i dialogów; `100dvh`; brak przewijania; telefon pionowo.

## Ekran Test Setup v1006
Ekran wykorzystuje modułowe karty premium, turkusowe zaznaczenia, wbudowane SVG i dolną nawigację. Na niskich telefonach pasek informacyjny jest automatycznie ukrywany, aby uniknąć przewijania.


## Home v1007
Górna część ekranu jest strefą wizualną marki. Menu składa się z prostokątnych przycisków w siatce 2 × 3. Dekoracje są wykonywane w SVG/CSS, bez bitmap.


## Home v1008
Menu główne ma sześć małych kart w siatce 3 × 2. Przestrzenie nad i pod menu wykorzystują dekoracje SVG związane z mózgiem i analizą. Usunięto wskaźnik IQ oraz dodatkowy pasek informacyjny.


## Desktop Home v1009
Na komputerze ekran jest podzielony na cztery bezpieczne strefy: panel wizualny, siatkę przycisków 3 × 2, dolną dekorację Brain Lab oraz panel poziomu. Żaden element dekoracyjny nie może wychodzić poza swoją strefę.


## Dolna nawigacja v1013
Pięć zakładek używa ikon liniowych SVG: mózg, kostka, wykres, puchar i ustawienia. Każda ma stały podpis i kolorystykę Deep Mind.


## Poprawka mobilna v1014
Ikony dolnej nawigacji muszą być widoczne na telefonie i komputerze. Mobilne reguły nie mogą ustawiać `display:none` ani zerowych wymiarów dla `.bottom-icon` i jego SVG.
