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


## Mobile v1044
Mobilny ekran główny korzysta z czterech proporcjonalnych sekcji wysokości. Dzięki temu wszystkie elementy są widoczne jednocześnie bez przewijania.


## Akademia Kostek v1051
Wskazówki są prezentowane jako duże, opisowe kafelki. Widok rozłożonej kostki pokazuje położenie wszystkich sześciu ścian i pary przeciwległe.


## Interakcje v1071
Tylko aktywny ekran może odbierać kliknięcia. Na komputerze wszystkie aktywne przyciski pokazują kursor ręki.


## v1071
Siatka kostki składa się teraz rzeczywiście z sześciu ścian w prawidłowy sześcian 3D. Usunięto fałszywy, nakładany podgląd.


## v1071
Powiększono czcionki w oknie prezentacji prawdziwej kostki: nagłówki, opisy, pary przeciwległe, dolne zasady oraz przyciski.


## v1071
Dodano trzeci etap Akademii Kostek: sąsiedztwo ścian i rozpoznawanie trzech ścian spotykających się w jednym narożniku.


## v1071
W etapie 3 poprawna odpowiedź podświetla się na zielono i po 2 sekundach automatycznie przechodzi do następnego pytania. Błędna odpowiedź podświetla się na czerwono, pojawia się komunikat „Zła odpowiedź. Popraw się i spróbuj jeszcze raz”, po czym zaznaczenie znika i można ponownie odpowiadać.


## v1071
Wybrana odpowiedź pojawia się teraz bezpośrednio w brakującej ścianie oznaczonej wcześniej znakiem zapytania. Poprawna jest zielona, błędna czerwona. Przycisk następnego pytania jest widoczny po poprawnej odpowiedzi i podczas dwusekundowego oczekiwania.


## v1071
Naprawiono właściwą zakładkę Orientacja. Wybrana odpowiedź pojawia się w polu ze znakiem zapytania, a po poprawnej odpowiedzi widoczny jest przycisk Następne pytanie.


## v1071
Kostki w Orientacji zostały wizualnie złożone i dosunięte. W zakładce Przeciwległe wybrana odpowiedź pojawia się w polu ze znakiem zapytania, z zielonym lub czerwonym oznaczeniem oraz widocznym przyciskiem następnego pytania.


## v1071
Przebudowano wizualizację kostki w zakładce Orientacja. Wszystkie trzy ściany są teraz widoczne, stykają się krawędziami i tworzą zwartą kostkę zamiast dwóch rozdzielonych boków.


## v1071
Wizualizacja kostki w zakładce Orientacja została wykonana od nowa jako jeden spójny rysunek SVG. Górna, lewa i prawa ściana są połączone wspólnymi krawędziami, więc nie mogą się rozsunąć ani zniknąć.


## v1071
Wskazówki w Akademii Kostek są teraz uniwersalne, zgodne z zasadą danego typu zadania i otwierają się w dużym, czytelnym oknie modalnym.


## Wskazówki v1071
Okno wskazówek pokazuje trzy uniwersalne kroki oraz wyróżnioną zasadę „Zapamiętaj”. Treści nie odnoszą się do konkretnych oczek ani pojedynczego pytania.


## v1071
Uproszczono system podpowiedzi. Usunięto trzy osobne karty i dolny komunikat w lewej kolumnie. Podpowiedzi są teraz dostępne wyłącznie przez jeden przycisk przy aktualnym zadaniu i otwierają jedno spójne okno.


## Okno podpowiedzi v1071
Okno można zamknąć przyciskiem X, przyciskiem ROZUMIEM, kliknięciem w przyciemnione tło albo klawiszem Esc.


## Trening podsumowujący v1071
Przycisk POKAŻ PODPOWIEDZI otwiera wspólne okno modalne z trzema ogólnymi krokami i zasadą ZAPAMIĘTAJ. Obok pozostaje POKAŻ ROZWIĄZANIE.


## v1071
W teście kostek dodano duże okno podpowiedzi. Kliknięta odpowiedź pojawia się w polu ze znakiem zapytania. Poprawna jest zielona i po 2 sekundach przechodzi dalej. Błędna jest czerwona, znika i pozwala ponownie odpowiedzieć na to samo pytanie.


## v1071
Naprawiono sprawdzanie poprawności odpowiedzi w teście kostek. Silnik porównuje teraz nie tylko indeks, ale również rzeczywistą wartość wybranej kostki. Poprawna kostka pozostaje w polu znaku zapytania przez 2 sekundy, po czym następuje automatyczne przejście. Błędna odpowiedź pozostawia to samo pytanie do ponownej próby.


## v1071
Naprawiono pole ze znakiem zapytania: celem jest teraz samo okienko o stałych wymiarach, dlatego wybrana odpowiedź pokazuje całą kostkę, a nie pojedyncze oczko. Trening Kostek nie używa już ręcznego przechodzenia — poprawna odpowiedź automatycznie przechodzi dalej po 2 sekundach, a błędna odblokowuje to samo pytanie do ponownej próby.


## v1071
Dopasowano matryce 2×2 i 3×3 oraz inne układy wielorzędowe do obszaru pytania. Kostki i pole ze znakiem zapytania skalują się automatycznie, dzięki czemu plansza nie wychodzi poza kartę zadania.


## v1071
Matryce kostkowe 2×2 i 3×3 otrzymują teraz osobne klasy układu. Plansza ma wydzieloną wysokość wewnątrz karty, nie nachodzi na tytuł ani odpowiedzi, a kostki skalują się do komórek zamiast zwiększać cały układ.
