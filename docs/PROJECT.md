# IQ Challenge • Brain Lab

Aktualna wersja: **v1079**

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


## v1042
Na komputerze przycisk Muzyka relaksacyjna został przeniesiony do prawej dolnej części nagłówka. Układ telefonu pozostawiono bez zmian.


## v1044
Ekran główny telefonu został zmniejszony tak, aby całość mieściła się bez przewijania. Przycisk Muzyka relaksacyjna przeniesiono na prawą dolną część nagłówka, analogicznie do wersji komputerowej.


## v1051
Dodano widok rozłożonej kostki z opisem par przeciwległych ścian. Powiększono wskazówki i uproszczono pierwszą lekcję, aby była zrozumiała bez znajomości obrotów przestrzennych.


## v1079
Naprawiono przycisk cofania, dodano kursor ręki do elementów interaktywnych oraz zablokowano przechwytywanie kliknięć przez ukryte ekrany i przycisk muzyki.


## v1079
Siatka kostki składa się teraz rzeczywiście z sześciu ścian w prawidłowy sześcian 3D. Usunięto fałszywy, nakładany podgląd.


## v1079
Powiększono czcionki w oknie prezentacji prawdziwej kostki: nagłówki, opisy, pary przeciwległe, dolne zasady oraz przyciski.


## v1079
Dodano trzeci etap Akademii Kostek: sąsiedztwo ścian i rozpoznawanie trzech ścian spotykających się w jednym narożniku.


## v1079
W etapie 3 poprawna odpowiedź podświetla się na zielono i po 2 sekundach automatycznie przechodzi do następnego pytania. Błędna odpowiedź podświetla się na czerwono, pojawia się komunikat „Zła odpowiedź. Popraw się i spróbuj jeszcze raz”, po czym zaznaczenie znika i można ponownie odpowiadać.


## v1079
Wybrana odpowiedź pojawia się teraz bezpośrednio w brakującej ścianie oznaczonej wcześniej znakiem zapytania. Poprawna jest zielona, błędna czerwona. Przycisk następnego pytania jest widoczny po poprawnej odpowiedzi i podczas dwusekundowego oczekiwania.


## v1079
Naprawiono właściwą zakładkę Orientacja. Wybrana odpowiedź pojawia się w polu ze znakiem zapytania, a po poprawnej odpowiedzi widoczny jest przycisk Następne pytanie.


## v1079
Kostki w Orientacji zostały wizualnie złożone i dosunięte. W zakładce Przeciwległe wybrana odpowiedź pojawia się w polu ze znakiem zapytania, z zielonym lub czerwonym oznaczeniem oraz widocznym przyciskiem następnego pytania.


## v1079
Przebudowano wizualizację kostki w zakładce Orientacja. Wszystkie trzy ściany są teraz widoczne, stykają się krawędziami i tworzą zwartą kostkę zamiast dwóch rozdzielonych boków.


## v1079
Wizualizacja kostki w zakładce Orientacja została wykonana od nowa jako jeden spójny rysunek SVG. Górna, lewa i prawa ściana są połączone wspólnymi krawędziami, więc nie mogą się rozsunąć ani zniknąć.


## v1079
Wskazówki w Akademii Kostek są teraz uniwersalne, zgodne z zasadą danego typu zadania i otwierają się w dużym, czytelnym oknie modalnym.


## v1079
Wszystkie podpowiedzi w Akademii Kostek są teraz ogólne i niezależne od konkretnych liczb w pytaniu. Dodano sekcję „Zapamiętaj” z najważniejszą regułą danego typu zadania.


## v1079
Uproszczono system podpowiedzi. Usunięto trzy osobne karty i dolny komunikat w lewej kolumnie. Podpowiedzi są teraz dostępne wyłącznie przez jeden przycisk przy aktualnym zadaniu i otwierają jedno spójne okno.


## v1079
Naprawiono zamykanie okna podpowiedzi. Przycisk X, przycisk ROZUMIEM, kliknięcie w tło oraz klawisz Esc są inicjalizowane po załadowaniu DOM i działają niezależnie od kolejności wczytywania skryptów.


## v1079
W podsumowującym treningu kostek pozostawiono jeden przycisk podpowiedzi. Otwiera on duże okno identyczne jak w poprzednich etapach, ale treść jest dobierana do aktualnego typu zadania: ciąg, analogia, matryca, element niepasujący lub zadanie ogólne.


## v1079
W teście kostek dodano duże okno podpowiedzi. Kliknięta odpowiedź pojawia się w polu ze znakiem zapytania. Poprawna jest zielona i po 2 sekundach przechodzi dalej. Błędna jest czerwona, znika i pozwala ponownie odpowiedzieć na to samo pytanie.


## v1079
Naprawiono sprawdzanie poprawności odpowiedzi w teście kostek. Silnik porównuje teraz nie tylko indeks, ale również rzeczywistą wartość wybranej kostki. Poprawna kostka pozostaje w polu znaku zapytania przez 2 sekundy, po czym następuje automatyczne przejście. Błędna odpowiedź pozostawia to samo pytanie do ponownej próby.


## v1079
Naprawiono pole ze znakiem zapytania: celem jest teraz samo okienko o stałych wymiarach, dlatego wybrana odpowiedź pokazuje całą kostkę, a nie pojedyncze oczko. Trening Kostek nie używa już ręcznego przechodzenia — poprawna odpowiedź automatycznie przechodzi dalej po 2 sekundach, a błędna odblokowuje to samo pytanie do ponownej próby.


## v1079
Dopasowano matryce 2×2 i 3×3 oraz inne układy wielorzędowe do obszaru pytania. Kostki i pole ze znakiem zapytania skalują się automatycznie, dzięki czemu plansza nie wychodzi poza kartę zadania.


## v1079
Matryce kostkowe 2×2 i 3×3 otrzymują teraz osobne klasy układu. Plansza ma wydzieloną wysokość wewnątrz karty, nie nachodzi na tytuł ani odpowiedzi, a kostki skalują się do komórek zamiast zwiększać cały układ.


## v1079
Wprowadzono osobne rozmiary matryc kostkowych dla komputera i telefonu. Na komputerze układy 2×2 i 3×3 są większe i czytelniejsze, a na telefonie delikatnie zmniejszone, aby cała plansza mieściła się nad odpowiedziami.


## v1079
Na komputerze matryce 2×2 i 3×3 otrzymały stałą, większą przestrzeń w karcie pytania oraz jawne rozmiary plansz, komórek i kostek. Usunięto zależność od procentowej wysokości, która wcześniej powodowała ich nadmierne zmniejszenie.


## v1079
Uruchomiono osobny trening Matryce. Dodano cztery nowe rodziny zadań inspirowane przykładami użytkownika: przesuwanie zaciemnionych ćwiartek, przesuwanie pól w siatce 3×3, zależności liczby linii oraz wzrost układów blokowych. Trening korzysta z tego samego szablonu odpowiedzi, podpowiedzi i informacji zwrotnej co Kostki.


## v1079
Dopasowano matryce figur 3×3 do obszaru pytania. Plansza, komórki, figury i odpowiedzi skalują się niezależnie dla komputera, niskiego ekranu i telefonu, dzięki czemu cały układ mieści się w karcie.


## v1079
Zwiększono wysokość obszaru planszy dla wszystkich pytań typu Matryce. Plansza jest wyśrodkowana pionowo i nie powinna być obcinana od góry ani od dołu. Rozmiaru samych figur nie zmniejszano.


## v1079
Podłączono pierwsze gry w kategoriach Refleks, Koncentracja, Wiedza i Wyobraźnia. Wszystkie korzystają ze wspólnego 20-pytaniowego szablonu, podpowiedzi, kolorów odpowiedzi i automatycznego przejścia. Wyzwanie dnia uruchamia mieszany trening obejmujący Kostki, Matryce oraz cztery nowe kategorie.


## v1079
Poprawiono pierwszy trening w kategorii Refleks. Kafelek ma teraz nazwę „Szybka spostrzegawczość”, ponieważ zadania polegają na błyskawicznym rozpoznawaniu dominującego symbolu. Po każdej poprawnej odpowiedzi pokazuje się czas reakcji, kolejne pytanie pojawia się po 0,65 sekundy, a podsumowanie zawiera średni czas reakcji.


## v1079
Podłączono moduły Sekwencje, Zapałki i Co nie pasuje. Każdy ma własny generator, 20 pytań, podpowiedzi, rozwiązania, ponowną próbę i automatyczne przejście.
