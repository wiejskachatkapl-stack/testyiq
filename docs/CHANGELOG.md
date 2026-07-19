# Changelog

## v1070
### Naprawiono
- matryce 2×2 nie wychodzą już poza obszar pytania,
- matryce 3×3 automatycznie dopasowują rozmiar,
- kostki skalują się do wielkości komórek,
- pole ze znakiem zapytania ma taki sam rozmiar jak pozostałe pola,
- dodano responsywne ustawienia dla mniejszych ekranów,
- zabezpieczono także inne układy z wieloma rzędami i kolumnami,
- cache PWA zmieniono na `iq-brain-lab-v1070`.

## v1069
### Naprawiono
- w polu ze znakiem zapytania pojawia się cała wybrana kostka, a nie pojedyncza kropka,
- cel odpowiedzi ma teraz prawidłowy, stały rozmiar,
- poprawna odpowiedź w Treningu Kostek automatycznie przechodzi dalej po 2 sekundach,
- usunięto ręczny tryb przechodzenia w treningu podsumowującym,
- błędna odpowiedź pozostawia to samo pytanie i po chwili pozwala wybrać ponownie,
- przycisk ręcznego przejścia został ukryty,
- cache PWA zmieniono na `iq-brain-lab-v1069`.

## v1068
### Naprawiono
- poprawna kostka nie jest już błędnie uznawana za złą,
- odpowiedź jest sprawdzana także według rzeczywistej wartości kostki, a nie tylko pozycji przycisku,
- wybrana poprawna kostka pojawia się w polu ze znakiem zapytania,
- zielone oznaczenie pozostaje widoczne przez 2 sekundy,
- po 2 sekundach test automatycznie przechodzi do następnego pytania,
- błędna odpowiedź jest czerwona i pozwala ponownie rozwiązać to samo pytanie,
- cache PWA zmieniono na `iq-brain-lab-v1068`.

## v1067
### Dodano i naprawiono
- podpowiedzi w teście otwierają duże okno modalne,
- kliknięta odpowiedź pojawia się w polu ze znakiem zapytania,
- dobra odpowiedź jest oznaczana na zielono,
- po dobrej odpowiedzi kolejne pytanie pojawia się po 2 sekundach,
- zła odpowiedź jest oznaczana na czerwono,
- po złej odpowiedzi pytanie pozostaje bez zmian i można odpowiedzieć ponownie,
- cache PWA zmieniono na `iq-brain-lab-v1067`.

## v1066
### Zmieniono
- etap treningowy jest opisany jako powtórka wszystkich poznanych zasad,
- dwa przyciski wskazówek zastąpiono jednym przyciskiem `POKAŻ PODPOWIEDZI`,
- podpowiedzi otwierają duże okno takie jak w poprzednich etapach,
- treść wskazówek jest automatycznie dopasowana do typu aktualnego pytania,
- wskazówki nie podają konkretnej odpowiedzi ani liczby oczek,
- pozostawiono oddzielny przycisk `POKAŻ ROZWIĄZANIE`,
- cache PWA zmieniono na `iq-brain-lab-v1066`.

## v1065
### Naprawiono
- przycisk `ROZUMIEM` zamyka okno podpowiedzi,
- przycisk `X` zamyka okno podpowiedzi,
- kliknięcie poza kartą zamyka okno,
- klawisz `Esc` zamyka okno,
- inicjalizacja zdarzeń odbywa się po załadowaniu dokumentu,
- dodano zabezpieczenie przed wielokrotnym podpinaniem tych samych zdarzeń,
- cache PWA zmieniono na `iq-brain-lab-v1065`.

## v1064
### Uproszczono
- usunięto trzy osobne przyciski podpowiedzi z lewej kolumny,
- usunięto drugi, dolny panel podpowiedzi,
- pozostawiono jeden przycisk `POKAŻ PODPOWIEDZI` przy aktualnym zadaniu,
- wszystkie podpowiedzi otwierają jedno wspólne, duże okno,
- treść wskazówek jest teraz zawsze spójna z daną zakładką,
- cache PWA zmieniono na `iq-brain-lab-v1064`.

## v1063
### Zmieniono
- usunięto wszystkie podpowiedzi odnoszące się do konkretnych oczek lub liczb,
- podpowiedzi są teraz uniwersalne i zawsze pasują do typu zadania,
- `Orientacja` uczy porównywania całego zestawu trzech ścian,
- `Przeciwległe` uczy par przeciwległych i zasady sumy 7,
- `Narożniki` uczy eliminowania par przeciwległych,
- dodano wyróżnioną sekcję `ZAPAMIĘTAJ`,
- cache PWA zmieniono na `iq-brain-lab-v1063`.

## v1062
### Zmieniono
- usunięto wskazówki zależne od konkretnych liczb, które mogły nie pasować do aktualnego pytania,
- dodano uniwersalne wskazówki dla `Orientacji`,
- dodano uniwersalne wskazówki dla `Przeciwległych`,
- dodano uniwersalne wskazówki dla `Sąsiedztwa i narożników`,
- wskazówki otwierają się w osobnym, dużym oknie,
- zwiększono rozmiar czcionek i czytelność treści,
- cache PWA zmieniono na `iq-brain-lab-v1062`.

## v1061
### Naprawiono
- całkowicie przebudowano kostki w zakładce `Orientacja`,
- kostka jest teraz jednym rysunkiem SVG zamiast trzech osobno obracanych elementów,
- górna, lewa i prawa ściana zawsze stykają się wspólnymi krawędziami,
- górna ściana nie może już zniknąć ani zostać zasłonięta,
- poprawkę zastosowano do przykładu, wszystkich odpowiedzi i pola wybranej odpowiedzi,
- cache PWA zmieniono na `iq-brain-lab-v1061`.

## v1060
### Naprawiono
- górna ściana kostki w zakładce `Orientacja` jest ponownie widoczna,
- trzy ściany stykają się ze sobą i tworzą zwartą kostkę,
- usunięto efekt dwóch rozdzielonych boków,
- ten sam poprawiony wygląd zastosowano do kostki wyjściowej, odpowiedzi i pola docelowego,
- cache PWA zmieniono na `iq-brain-lab-v1060`.

## v1059
### Naprawiono
- kostki w zakładce `Orientacja` są teraz zwarte i wyglądają jak złożone sześciany,
- zmniejszono przerwy między trzema widocznymi ścianami,
- w zakładce `Przeciwległe` kliknięta odpowiedź pojawia się w miejscu znaku zapytania,
- poprawna odpowiedź ma zieloną ramkę,
- błędna odpowiedź ma czerwoną ramkę i po chwili znika,
- po poprawnej odpowiedzi widoczny jest przycisk `NASTĘPNE PYTANIE`,
- automatyczne przejście następuje po 2 sekundach,
- cache PWA zmieniono na `iq-brain-lab-v1059`.

## v1058
### Naprawiono
- poprawki dotyczą teraz właściwej zakładki `Orientacja`,
- kliknięta odpowiedź pojawia się w polu ze znakiem zapytania,
- dobra odpowiedź ma zieloną ramkę,
- błędna odpowiedź ma czerwoną ramkę i po chwili znika,
- po dobrej odpowiedzi widoczny jest przycisk `NASTĘPNE PYTANIE`,
- automatyczne przejście następuje po 2 sekundach,
- cache PWA zmieniono na `iq-brain-lab-v1058`.

## v1057
### Naprawiono
- wybrana kostka pojawia się w okienku ze znakiem zapytania,
- dobra odpowiedź w okienku otrzymuje zieloną ramkę,
- zła odpowiedź w okienku otrzymuje czerwoną ramkę,
- po złej odpowiedzi okienko ponownie pokazuje znak zapytania,
- przycisk `NASTĘPNE PYTANIE` jest widoczny po dobrej odpowiedzi,
- przycisk pozwala przejść dalej od razu, a bez kliknięcia pytanie zmienia się automatycznie po 2 sekundach,
- cache PWA zmieniono na `iq-brain-lab-v1057`.

## v1056
### Zmieniono
- poprawna odpowiedź w etapie 3 jest zaznaczana na zielono,
- po poprawnej odpowiedzi kolejne pytanie pojawia się automatycznie po 2 sekundach,
- błędna odpowiedź jest zaznaczana na czerwono,
- po błędnej odpowiedzi pojawia się komunikat „Zła odpowiedź. Popraw się i spróbuj jeszcze raz”,
- czerwone zaznaczenie znika, a użytkownik może wybrać odpowiedź ponownie,
- usunięto konieczność ręcznego przechodzenia dalej,
- cache PWA zmieniono na `iq-brain-lab-v1056`.

## v1055
### Dodano
- trzeci etap Akademii Kostek: `Sąsiedztwo i narożniki`,
- sześć ćwiczeń z wyborem trzeciej ściany narożnika,
- graficzny pokaz trzech ścian kostki,
- większe wskazówki i pełne wyjaśnienia,
- ręczne przechodzenie do kolejnego pytania,
- podsumowanie po ukończeniu etapu,
- cache PWA zmieniono na `iq-brain-lab-v1055`.

## v1054
### Zmieniono
- powiększono czcionki w pokazie prawdziwej kostki,
- zwiększono czytelność opisów par przeciwległych,
- powiększono tekst trzech zasad u dołu,
- zwiększono napisy na przyciskach,
- cache PWA zmieniono na `iq-brain-lab-v1054`.

## v1053
### Naprawiono
- prawidłowe składanie rozłożonej siatki kostki,
- każda z sześciu ścian składa się do właściwej pozycji w sześcianie 3D,
- zachowano prawidłowe pary przeciwległe: 1–6, 2–5, 3–4,
- usunięto nieprawidłowy rysunkowy podgląd nakładany na siatkę,
- cache PWA zmieniono na `iq-brain-lab-v1053`.

## v1052
### Naprawiono
- przycisk cofania w lewym górnym rogu,
- kursor ręki na przyciskach drugiego i trzeciego ekranu,
- kursor ręki na przyciskach Akademii Kostek,
- ukryty ekran główny nie przechwytuje już kliknięć,
- przycisk `Muzyka relaksacyjna` nie otwiera się po kliknięciu kafelka `Analogie`,
- cache PWA zmieniono na `iq-brain-lab-v1052`.

## v1051
### Zmieniono
- dodano przycisk `Pokaż rozłożoną kostkę`,
- dodano pełny widok siatki sześciu ścian,
- pokazano pary przeciwległe: 1–6, 2–5, 3–4,
- znacząco powiększono przyciski wskazówek,
- powiększono treść wyświetlanej podpowiedzi,
- uproszczono pierwszą lekcję i rozwiązanie,
- cache PWA zmieniono na `iq-brain-lab-v1051`.

## v1044
### Zmieniono
- cały ekran główny telefonu mieści się bez przewijania,
- zmniejszono nagłówek, kafelki, dolną grafikę i panel poziomu,
- sześć przycisków zachowuje układ 2 × 3,
- przycisk `Muzyka relaksacyjna` znajduje się po prawej i niżej, tak jak na komputerze,
- wygląd i mechanika v1042 pozostały bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1044`.

## v1042
### Zmieniono
- na komputerze przycisk `Muzyka relaksacyjna` znajduje się po prawej stronie nagłówka,
- przycisk został lekko obniżony,
- telefon zachowuje dotychczasowe położenie przycisku,
- pozostały wygląd i mechanika v1040 pozostały bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1042`.

## v1040
### Naprawiono i zmieniono
- przycisk Muzyka relaksacyjna jest widoczny na komputerze,
- Test IQ ma ikonę mózgu,
- Trening Umysłu ma ikonę głowy z mózgiem,
- Wyzwanie Dnia ma ikonę celu,
- Postępy mają ikonę rosnącego wykresu,
- Osiągnięcia mają ikonę pucharu,
- Ustawienia mają ikonę koła zębatego,
- wymuszono kolorowe gradienty premium na PC i telefonie,
- mechanika i muzyka v1039 pozostały bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1040`.

## v1039
### Zmieniono
- wymieniono wszystkie 13 dźwięków Brain Music,
- dodano osobne ścieżki OGG dla Natury, Focus, Wyciszenia i Snu,
- Las, Kominek, Deszcz i Ocean mają znacznie bogatsze brzmienie,
- muzyka Focus i Medytacja wykorzystuje pełne kompozycje ambientowe,
- dźwięki działają offline i są zapętlone,
- mechanika timera, głośności i odtwarzania pozostała bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1039`.

## v1038
### Zmieniono
- przeniesiono przycisk Muzyka relaksacyjna niżej i do lewej,
- sześć głównych przycisków otrzymało indywidualne kolory,
- dodano gradienty, neonowe obramowania i paski postępu,
- zachowano pełną responsywność telefonu i komputera,
- mechanika Brain Music i pozostałe funkcje pozostały bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1038`.

## v1037
### Dodano
- przycisk `Muzyka relaksacyjna` pod nazwą IQ Challenge,
- panel Brain Music,
- kategorie Natura, Focus, Wyciszenie i Sen,
- 13 generowanych dźwięków i pejzaży dźwiękowych,
- odtwarzanie, pauzę, zatrzymanie i regulację głośności,
- timer 10, 20, 30 i 60 minut,
- zapamiętywanie wyboru i głośności,
- działanie muzyki podczas przechodzenia między ekranami,
- cache PWA `iq-brain-lab-v1037`.

## v1036
### Zmieniono
- Kostki mają ikonę dwóch kostek,
- Matryce mają ikonę planszy 3 × 3,
- Sekwencje mają ikonę ciągu figur,
- Zapałki mają ikonę dwóch zapałek,
- Co nie pasuje ma ikonę zestawu z jednym innym elementem,
- wygląd kafelków premium został wymuszony także na komputerze,
- mechanika pozostała bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1036`.

## v1035
### Naprawiono
- kafelki naprawdę otrzymują pięć różnych kolorów,
- klasy kolorystyczne są nadawane bezpośrednio przez `app.js`,
- usunięto zależność od `color-mix`,
- wygląd działa na telefonie i komputerze,
- mechanika gier pozostała bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1035`.

## v1033
### Zmieniono
- nowe premium kafelki gier w ekranie kategorii,
- większe i czytelniejsze ikony,
- wyraźne przyciski `GRAJ`,
- przygaszony wariant `WKRÓTCE`,
- dopasowanie do telefonu i komputera,
- mechanika v1032 pozostaje bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1033`.

## v1032
### Naprawiono
- usunięto stare systemowe logo `IQ TEST`,
- zastąpiono ikony PWA nową ikoną neonowego mózgu,
- ustawiono jednolite ciemnogranatowe tło startowe systemu,
- dodano ikonę maskowalną i Apple Touch Icon,
- wzmocniono różowe i fioletowe akcenty nowej animacji,
- cache PWA zmieniono na `iq-brain-lab-v1032`.

## v1031
### Zmieniono
- nowy animowany ekran uruchamiania,
- neonowy mózg SVG,
- obracające się pierścienie i cząsteczki,
- animowany pasek ładowania,
- płynne przejście do aplikacji,
- mechanika v1030 bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1031`.

## v1030
### Poprawiono
- cały ekran Trening Umysłu mieści się na telefonie bez przewijania,
- widoczne są wszystkie sześć kafelków,
- widoczny jest panel Trening mieszany,
- wysokości sekcji są liczone proporcjonalnie do realnej wysokości ekranu,
- usunięto mobilne nakładanie elementów,
- zachowano wygląd i mechanikę wersji komputerowej,
- cache PWA zmieniono na `iq-brain-lab-v1030`.

## v1029
### Naprawiono
- porzucono wadliwy układ mobilny z v1028,
- przywrócono stabilną bazę v1027,
- kafelki na telefonie mają stałą wysokość,
- teksty, strzałki i paski postępu mają osobne obszary,
- panel umiejętności nie nakłada tekstów,
- nagłówek i codzienne wyzwanie zostały uproszczone na telefonie,
- mechanika pozostała bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1029`.

## v1027
### Poprawiono
- teksty kategorii nie mogą już wyjść poza obręb kafelków,
- strzałki zostały przeniesione poza kolumnę tekstową,
- nazwy mają własny zamknięty obszar,
- osobno zmniejszono `KONCENTRACJA` i `WYOBRAŹNIA`,
- zachowano wygląd, kolory i mechanikę v1026,
- cache PWA zmieniono na `iq-brain-lab-v1027`.

## v1026
### Poprawiono
- duże nazwy kategorii nie wychodzą poza kafelki,
- osobno dopasowano napisy `KONCENTRACJA` i `WYOBRAŹNIA`,
- zmniejszono ikony tylko tam, gdzie było to potrzebne,
- zwiększono przestrzeń przeznaczoną na tekst,
- dodano osobne proporcje dla szerokich monitorów, laptopów i telefonu,
- mechanika Centrum Treningu pozostała bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1026`.

## v1023
### Poprawiono
- dolne przyciski odpowiedzi nie wychodzą poza główną kartę na komputerze,
- wysokości planszy i odpowiedzi dopasowują się do wysokości okna,
- dodano osobne proporcje dla typowych monitorów, laptopów i niskich okien,
- układ telefonu pozostawiono bez zmian,
- mechanika i generator zadań pozostały bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1023`.

## v1022
### Dodano
- wypełnienie kropkowane,
- delikatne wypełnienie pełne w kolorystyce Brain Lab,
- nowe typy matryc łączące obrót, wypełnienie i liczbę figur,
- zadania z dwiema i trzema figurami w jednym polu,
- cztery nowe rodziny reguł matryc.

### Zmieniono
- kontury figur są wyraźnie cieńsze,
- paski i kropki zachowują turkusową kolorystykę aplikacji,
- odpowiedzi mają większe podobieństwo stylistyczne do matrycy,
- pozostałych ekranów i mechaniki nie zmieniono,
- cache PWA zmieniono na `iq-brain-lab-v1022`.

## v1021
### Poprawiono
- usunięto wizualnie identyczne odpowiedzi,
- generator rozpoznaje symetrię koła, kwadratu, krzyża, gwiazdy i wielokątów,
- zmiana obrotu nie jest już uznawana za inną odpowiedź, gdy figura wygląda identycznie,
- w prostych zadaniach wszystkie odpowiedzi zachowują ten sam sposób wypełnienia i kolorystykę,
- biały pełny plus nie pojawia się jako przypadkowa odpowiedź do turkusowych figur obrysowych,
- na komputerze dolny rząd matrycy i odpowiedzi mają osobne, nieprzecinające się strefy,
- układ telefonu pozostawiono bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1021`.

## v1020
### Poprawiono
- plansza matrycy nie nachodzi już na odpowiedzi,
- odpowiedzi mają własny stały obszar,
- figury są automatycznie ograniczane do rozmiaru swoich pól,
- dodano osobne proporcje dla komputera i telefonu,
- mechanika pytań pozostała bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1020`.

## v1019
### Naprawiono
- usunięto uszkodzony, zdublowany fragment funkcji `scaleFor`,
- przywrócono generowanie kolejnego pytania po wybraniu odpowiedzi,
- silnik pytań ma zabezpieczenie przed błędem podczas przejścia dalej,
- błędnie zaznaczona odpowiedź jest wskazywana na podstawie indeksu, a nie fokusu,
- cache PWA zmieniono na `iq-brain-lab-v1019`.

### Bez zmian
- wygląd figur,
- ekran główny,
- formularz,
- nawigacja,
- pozostałe moduły.
## v1018
### Poprawiono
- znacznie powiększono figury w matrycy,
- powiększono figury w pięciu odpowiedziach,
- figury obrysowe mają gruby turkusowy kontur,
- figury pełne mają jasne kremowe wypełnienie,
- figury paskowane mają kremowe tło i ciemnoturkusowe paski,
- zwiększono kontrast pól matrycy,
- cache PWA zmieniono na `iq-brain-lab-v1018`.

## v1017
### Poprawiono
- figury geometryczne są wyraźnie widoczne na ciemnym tle,
- figury obrysowe mają jasny kremowy kontur,
- figury pełne mają kremowe wypełnienie i ciemną obwódkę,
- figury paskowane otrzymały jasne tło i ciemne paski,
- zwiększono rozmiary figur w matrycy i odpowiedziach,
- dodano delikatny cień dla poprawy czytelności,
- cache PWA zmieniono na `iq-brain-lab-v1017`.

## v1016
### Dodano
- generator matryc figur geometrycznych,
- 16 typów reguł na poziomach 1–10,
- figury SVG: koło, kwadrat, trójkąt, romb, pięciokąt, sześciokąt, gwiazda i krzyż,
- cechy: wypełnienie, obrót, rozmiar, liczba i położenie,
- pięć generowanych odpowiedzi,
- MixedGenerator przeplatający kostki i matryce,
- rozszerzenie adaptacyjnego poziomu do 10.

### Bez zmian
- ekran główny, formularz, nawigacja i wygląd kostek.

## v1015
### Dodano
- wiele różnych typów zadań z kostkami zamiast samych ciągów,
- analogie,
- macierze 2 × 2,
- macierze 3 × 3,
- element niepasujący,
- zadania równowagi,
- układ diamentowy,
- układ pierścieniowy,
- trudne reguły dwuwarstwowe,
- przypisanie typów do poziomów 1–10,
- pamięć ostatnio użytych typów, aby ograniczyć powtórzenia.

### Bez zmian
- wygląd strony głównej,
- formularz uczestnika,
- dolna nawigacja,
- kolorystyka i responsywność pozostałych ekranów.

## v1014
### Poprawiono
- przywrócono ikony w dolnej nawigacji na telefonie,
- usunięto konflikt mobilnych reguł CSS ukrywających SVG,
- zachowano podpisy pod ikonami,
- aktywna zakładka nadal ma turkusowe podświetlenie,
- cache PWA zmieniono na `iq-brain-lab-v1014`.

## v1013
### Zmieniono
- przebudowano dolny pasek nawigacji,
- dodano większe i czytelne ikony SVG,
- dodano podpis pod każdą ikoną,
- zastosowano granatowo-turkusową kolorystykę Brain Lab,
- aktywna zakładka ma turkusową poświatę i dolny wskaźnik,
- zwiększono obszary klikalne na telefonie,
- cache PWA zmieniono na `iq-brain-lab-v1013`.

## v1012
### Poprawiono
- kremowe tło kostek jest teraz wymuszane bezpośrednio w SVG,
- czarne oczka nie są nadpisywane przez stare style,
- przywrócono wyraźną ciemną obwódkę,
- zwiększono czytelność kostek na ciemnym tle,
- cache PWA zmieniono na `iq-brain-lab-v1012`.

## v1011
### Zmieniono
- kostki mają kremową powierzchnię,
- oczka są czarne,
- dodano delikatny gradient przestrzenny,
- dodano subtelną obwódkę i cień,
- po poprawnej lub błędnej odpowiedzi zmienia się poświata, a nie kolor kostki,
- cache PWA zmieniono na `iq-brain-lab-v1011`.

## v1010
### Dodano
- moduł `QuestionEngine`,
- moduł `DiceGenerator`,
- generowanie kostek 1–6 jako SVG,
- kilka reguł sekwencji kostek,
- dokładnie 5 odpowiedzi i jedną poprawną,
- ekran pytania z licznikiem czasu,
- pasek postępu i poziom zadania,
- wizualną informację o poprawnej i błędnej odpowiedzi,
- automatyczne przechodzenie do kolejnego pytania,
- podsumowanie demonstracyjne po zakończeniu,
- cache PWA `iq-brain-lab-v1010`.

## v1009
### Poprawiono
- dostosowano ekran główny na komputerze do zaakceptowanej makiety,
- zwiększono górny panel wizualny,
- ustawiono przyciski w dwóch równych rzędach po trzy,
- dolna grafika mózgu otrzymała osobny obszar o ograniczonej wysokości,
- usunięto nachodzenie grafiki na przyciski i panel poziomu,
- dodano osobne dopasowanie dla niskich okien komputerowych,
- układ telefonu pozostawiono bez zmian,
- cache PWA zmieniono na `iq-brain-lab-v1009`.

## v1008
### Zmieniono
- przyciski ekranu głównego zwężono i ustawiono w siatce 3 × 2,
- dodano więcej elementów graficznych Brain Lab w górnej części,
- dodano dolną dekoracyjną grafikę mózgu SVG,
- usunięto dekoracyjny wskaźnik IQ,
- usunięto pasek „Bezpieczne / Czas testu / Wynik IQ”,
- zachowano panel poziomu użytkownika i dolną nawigację,
- cache PWA zmieniono na `iq-brain-lab-v1008`.

## v1007
### Zmieniono
- ekran główny otrzymał nowy układ premium,
- przyciski menu są prostokątne i bardziej zwarte,
- menu zostało obniżone,
- nad menu dodano własną grafikę SVG mózgu i elementy analityczne,
- dodano pasek informacji pod poziomem użytkownika,
- zachowano układ bez przewijania na telefonie i komputerze,
- cache PWA zmieniono na `iq-brain-lab-v1007`.

## v1006
### Zmieniono
- pełna przebudowa graficzna ekranu „Przygotuj test”,
- imię i nazwisko w dwóch kolumnach, wiek w pełnym wierszu,
- trzy rozbudowane karty liczby pytań,
- dwie rozbudowane karty trybu testu,
- wyraźne zaznaczenie aktywnych opcji,
- pasek informacji o bezpieczeństwie, czasie i raporcie,
- dolna nawigacja modułów,
- dekoracyjna grafika mózgu wykonana jako SVG,
- zachowano działającą walidację formularza,
- cache PWA zmieniono na `iq-brain-lab-v1006`.

## v1005
### Poprawiono
- powiększono ekran główny na komputerach,
- zwiększono wykorzystanie szerokości i wysokości monitora,
- telefon zawsze korzysta z pionowego układu aplikacji,
- menu telefonu ma stałą siatkę 2 × 3,
- zabezpieczono teksty przycisków przed nakładaniem i wychodzeniem poza karty,
- dodano osobne dopasowanie dla bardzo wąskich telefonów,
- zmieniono cache PWA na `iq-brain-lab-v1005`.

## v1004
Dodano architekturę SPA, centralną nawigację, formularz, walidację danych, wybór liczby pytań i trybu, zasady testu, kontener pytania, dokumentację oraz katalog `pliki_do_podmiany`.

Zmieniono cache PWA na `iq-brain-lab-v1004`.
## v1024
Dodano Centrum Treningu Umysłu, sześć kategorii, profil Brain/XP, ekran kategorii, statusy Graj/Wkrótce i responsywność. Test IQ bez zmian.


## v1025
- odświeżono wygląd Centrum Treningu,
- powiększono nazwy kategorii,
- dodano własne ikony SVG dla sześciu obszarów,
- dodano indywidualne akcenty kolorystyczne kategorii,
- przebudowano grafikę mózgu w nagłówku,
- dodano ikonę pucharu w codziennym wyzwaniu,
- zachowano mechanikę i działanie v1024.


## v1034
- stabilny komponent premium dla kafelków gier,
- duże ikony, gradienty, paski postępu i okrągłe strzałki,
- zwarty układ mobilny bez nakładania,
- mechanika bez zmian.
