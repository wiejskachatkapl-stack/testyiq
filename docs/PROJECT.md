# IQ Challenge • Brain Lab

Aktualna wersja: **v1041**

Status: Brain Engine — fundament SPA i pierwsza ścieżka Test IQ.

## Zasady stałe
- Numeracja wersji zawsze +1.
- Każda paczka zawiera pełny projekt.
- `pliki_do_podmiany` zawiera tylko pliki zmienione lub dodane.
- Jednocześnie aktywny jest tylko jeden ekran.
- Zadania powstają w SVG/Canvas.
- Telefon działa pionowo i bez przewijania.

## Działa
Ekran startowy, menu, SPA, formularz uczestnika, zasady testu, kontener pytania i PWA.

## Następny krok
v1005 — generator kostek do gry 1–6.

## v1005
Powiększono interfejs komputerowy i wymuszono właściwy, pionowy układ strony głównej na telefonach.


## v1006
Przebudowano ekran przygotowania testu zgodnie z zaakceptowaną makietą premium: osobne karty danych, liczby pytań, trybu, pasek informacji i dolna nawigacja.


## v1007
Przebudowano ekran główny: prostokątne przyciski, menu obniżone, a w górnej części dodano własną dekorację SVG z mózgiem i elementami analitycznymi.


## v1008
Ekran główny otrzymał siatkę 3 × 2 mniejszych przycisków, dodatkową dolną grafikę mózgu oraz więcej dekoracji Brain Lab. Usunięto wskaźnik IQ i pasek trzech informacji zgodnie z zaznaczeniem użytkownika.


## v1009
Poprawiono wyłącznie układ komputerowy. Dolna grafika mózgu ma własny, ograniczony obszar i nie nachodzi już na przyciski ani panel poziomu. Układ telefonu pozostawiono bez zmian.


## v1010
Uruchomiono pierwszy działający generator zadań. Kategoria Kostki tworzy sekwencje wartości 1–6, dokładnie pięć odpowiedzi, jedną poprawną, licznik czasu, poziom i pasek postępu.


## v1011
Zmieniono standard wizualny kostek: kremowa powierzchnia, czarne oczka, delikatny gradient 3D, ciemna obwódka i subtelny cień.


## v1012
Naprawiono widoczność kremowych kostek. Starsze reguły neonowego SVG nie mogą już nadpisywać koloru powierzchni i oczek.


## v1013
Przebudowano dolną nawigację: większe ikony SVG, czytelne podpisy i spójne turkusowe podświetlenie aktywnej zakładki.


## v1014
Naprawiono dolną nawigację na telefonie. Ikony SVG są teraz wymuszane jako widoczne również w mobilnych regułach responsywnych.


## v1015
Generator kostek nie tworzy już wyłącznie ciągów. Dodano analogie, macierze 2×2 i 3×3, zadania z elementem niepasującym, równowagę, diamenty, pierścienie i reguły dwuwarstwowe. Wygląd pozostałych ekranów pozostaje bez zmian.


## v1016
Dodano drugą rodzinę pytań: matryce figur geometrycznych. Test przeplata kostki i matryce, a poziom trudności obsługuje skalę 1–10.


## v1017
Naprawiono widoczność figur geometrycznych. Figury mają teraz kremowe wypełnienie lub jasny kontur, ciemniejszą obwódkę, wyraźne paskowanie i większy rozmiar.


## v1018
Znacznie zwiększono figury w matrycach i odpowiedziach. Figury obrysowe mają teraz mocny turkusowy kontur, pełne jasne kremowe wypełnienie, a paskowane wyraźny kontrast.


## v1019
Naprawiono mechanikę przechodzenia do następnego pytania. Usunięto uszkodzony fragment kodu generatora matryc i dodano bezpieczne wznowienie kolejnego pytania.


## v1020
Naprawiono nakładanie się matrycy i odpowiedzi. Ekran matryc ma teraz osobne, kontrolowane strefy dla planszy oraz pięciu odpowiedzi.


## v1021
Naprawiono odpowiedzi matryc: wszystkie pięć wariantów jest wizualnie unikalne, a zmiana koloru lub wypełnienia pojawia się tylko w zadaniach, w których stanowi część reguły. Na komputerze plansza i odpowiedzi mają całkowicie oddzielone strefy.


## v1022
Matryce mają teraz cieńsze kontury oraz więcej czytelnych cech odniesienia: figury puste, pełne półprzezroczyste, paskowane i kropkowane, obroty oraz układy z jedną, dwiema i trzema figurami.


## v1023
Poprawiono wyłącznie układ matryc na komputerze. Pięć odpowiedzi jest teraz zawsze zamkniętych wewnątrz głównej karty, również na ekranach laptopowych i w niskich oknach.


## v1024
Dodano Centrum Treningu Umysłu z sześcioma kategoriami, profilem Brain, XP, ekranem kategorii i konfigurowalną listą gier. Test IQ pozostaje bez zmian.


## v1025
Centrum Treningu otrzymało docelową identyfikację wizualną: duże nazwy, autorskie ikony SVG oraz kolorystyczne rozróżnienie obszarów mózgu.


## v1026
Dopasowano duże nazwy kategorii do szerokości kafelków. Szczególnie poprawiono napisy KONCENTRACJA i WYOBRAŹNIA, bez zmiany mechaniki modułu.


## v1027
Przebudowano układ wnętrza kafelków kategorii. Strzałka jest pozycjonowana niezależnie, tekst ma własną zamkniętą kolumnę, a nazwy KONCENTRACJA i WYOBRAŹNIA zostały dodatkowo zmniejszone.


## v1029
Wersję wykonano ponownie na bazie stabilnej v1027. Usunięto rozbudowane reguły mobilne z v1028 i zastosowano prosty, kontrolowany układ telefonu.


## v1030
Mobilny ekran Trening Umysłu został ponownie ułożony proporcjami procentowymi całej dostępnej wysokości. Wszystkie sześć kafelków oraz Trening mieszany mieszczą się bez przewijania.


## v1031
Zastąpiono stary ekran uruchamiania animowanym ekranem Brain Lab z neonowym mózgiem SVG, pierścieniami, cząsteczkami i paskiem ładowania.


## v1032
Usunięto stare logo `IQ TEST`, które system telefonu pokazywał przed właściwą animacją. Zmieniono ikony PWA, kolory manifestu oraz dodano mocniejsze różowo-fioletowe akcenty do nowego ekranu uruchamiania.


## v1033
Kafelki gier w ekranie kategorii otrzymały ten sam premium styl co główne przyciski Centrum Treningu. Aktywne gry są wyraźniejsze, a planowane zachowują przygaszony wariant.


## v1035
Kafelki gier otrzymały jawne klasy kolorystyczne generowane w app.js. Usunięto zależność od funkcji CSS `color-mix`, aby wygląd był identyczny w każdej przeglądarce.


## v1036
Dodano prawdziwe ikony SVG do Kostek, Matryc, Sekwencji, Zapałek i Co nie pasuje. Wymuszono ten sam premium wygląd kafelków na telefonie i komputerze.


## v1037 — Brain Music
Dodano proceduralny odtwarzacz dźwięków relaksacyjnych i skupiających. Dźwięki są generowane przez Web Audio API, grają podczas przechodzenia między ekranami i nie wymagają zewnętrznych plików audio.


## v1038
Przeniesiono zaakceptowany wygląd ekranu głównego do kodu. Przycisk Muzyka relaksacyjna znajduje się w lewym dolnym obszarze nagłówka, a sześć głównych przycisków ma indywidualne gradienty, podświetlenia i paski postępu.


## v1039 — Brain Music Audio Pack
Wszystkie syntetyczne dźwięki odtwarzane na żywo zastąpiono przygotowanymi, zapętlonymi ścieżkami OGG. Dodano 13 osobnych plików audio, działających offline.


## v1040
Naprawiono widoczność przycisku Muzyka relaksacyjna na komputerze. Główne przyciski otrzymały sześć tematycznych ikon SVG oraz jawne gradienty premium na telefonie i komputerze.


## v1041
Na komputerze przycisk Muzyka relaksacyjna został przeniesiony do prawej dolnej części nagłówka. Układ telefonu pozostawiono bez zmian.
