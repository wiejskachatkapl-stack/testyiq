# Generatory

Każdy generator zwraca kategorię, poziom, SVG, dokładnie 5 odpowiedzi i jedną poprawną.

Kolejność: kostki 1–6, liczby, litery, obrót figur, matryce, symetria.

## Generator kostek — v1010
Obsługuje ciągi rosnące, malejące, skoki o 2, pary, wartości przeciwległe sumujące się do 7 oraz dwa przeplatające się ciągi. Każde pytanie ma pięć unikalnych odpowiedzi i jedną poprawną.


### Wygląd kostek od v1011
Kostki są kremowe (`#F3EAD8`) z czarnymi oczkami, delikatnym gradientem i cieniem. Kolor odpowiedzi zmienia jedynie obramowanie/poświatę, a nie samą powierzchnię kostki.


### Poprawka v1012
Elementy powierzchni, obwódki i oczek mają osobne klasy SVG oraz wymuszone kolory, aby globalne style aplikacji nie zmieniały wyglądu kostek.


## Rozbudowa v1015
Dostępne są różne rodziny łamigłówek z kostkami: ciągi, analogie, macierze 2×2, macierze 3×3, wybór elementu niepasującego, równowaga, diament, pierścień oraz złożone reguły wielowarstwowe. Typy są przypisane do poziomów 1–10 i nie powtarzają się bezpośrednio.


## Matryce figur geometrycznych — v1016
Generator ma 16 typów reguł na poziomach 1–10: cykle figur, wypełnienia, obroty, wielkości, liczby elementów, pozycje, reguły wierszy i kolumn, odbicia i układy wielocechowe. Odpowiedzi są generowane jako własne SVG.


### Widoczność figur v1017
Paleta figur: krem `#f3ead8`, jasny kontur `#f6f0e2`, ciemna obwódka `#4b443b`. Style są zapisane bezpośrednio w SVG, aby globalne reguły aplikacji nie mogły ich przyciemnić.


### Czytelność v1018
Figury obrysowe: turkus `#55edf0`, grubość 6. Figury pełne: krem `#fff3d7`. Skala figur została zwiększona dla telefonu i komputera.
