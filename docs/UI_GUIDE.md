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


## Training Hub v1025
Kategorie: Logika — niebieski, Pamięć — zielony, Refleks — pomarańczowy, Koncentracja — turkusowy, Wiedza — złoty, Wyobraźnia — fioletowy. Ikony są wektorowe i nie wymagają plików graficznych.


## Dopasowanie nazw v1026
Nazwy kategorii muszą mieścić się w jednym wierszu. Dłuższe nazwy `KONCENTRACJA` i `WYOBRAŹNIA` używają mniejszego rozmiaru, ale zachowują ten sam styl i wagę pisma.


## Kafelki kategorii v1027
Strzałka jest absolutnie pozycjonowana po prawej stronie, dzięki czemu nie zabiera szerokości nazwie. Tekst ma własną kolumnę z `min-width: 0` i `overflow: hidden`.


## Telefon v1029
Mobilny układ opiera się na stabilnej wersji v1027. Nie używa dużych wysokości ani absolutnego nakładania grafiki mózgu na panel poziomu.


## Mobilny układ v1030
Ekran Trening Umysłu używa czterech proporcjonalnych rzędów: nagłówek 26%, umiejętności 13%, kafelki 49%, codzienne wyzwanie 12%. Całość mieści się w obszarze ekranu aplikacji.


## Splash screen v1031
Animacja jest wykonana w HTML, CSS i SVG, dlatego nie wymaga dodatkowych obrazów oraz zachowuje ostrość na telefonie i komputerze.


## Systemowy splash v1032
Telefon przed uruchomieniem HTML pokazuje ikonę z manifestu. Dlatego stare logo zostało zastąpione neonowym mózgiem, a `background_color` i `theme_color` ustawiono na `#020918`.


## Kafelki gier v1033
Ekran kategorii używa tych samych zasad co Centrum Treningu: mocna ikona, duża nazwa, widoczny postęp, osobny status oraz kolorystyczne rozróżnienie aktywne/wkrótce.


## Kafelki v1035
Kolory są jawne: Kostki — błękit, Matryce — zieleń, Sekwencje — pomarańcz, Zapałki — złoto, Co nie pasuje — fiolet.


## Ikony treningów v1036
Każda gra ma własną ikonę SVG odpowiadającą jej mechanice. Te same komponenty są używane na telefonie i komputerze.


## Ekran główny v1038
Przycisk muzyki jest osadzony w lewym dolnym narożniku nagłówka. Przyciski główne mają sześć osobnych akcentów: błękit, turkus, niebieski, fiolet, róż i cyjan.


## Ekran główny v1040
Każdy kafelek używa tematycznej ikony SVG. Na komputerze układ ma trzy kolumny i dwa rzędy, a przycisk muzyki pozostaje widoczny w lewym dolnym obszarze nagłówka.


## Nagłówek v1042
Na komputerze przycisk muzyki jest zakotwiczony w prawym dolnym narożniku panelu głównego. Na telefonie pozostaje po lewej stronie.
