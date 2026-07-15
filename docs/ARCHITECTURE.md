# Architektura

Aplikacja działa jako SPA. Widoki są przełączane funkcją `nav()` i tylko jeden ekran ma klasę `active`.

## Stan
`state` przechowuje bieżący ekran, historię i dane uczestnika.

## Widoki v1004
Home, Setup, Intro, Question.

Nowych ekranów nie wolno dopisywać pod istniejącymi widokami.

## Silnik pytań v1010
`QuestionEngine` zarządza sesją, postępem, odpowiedziami, czasem reakcji i prostą adaptacją poziomu. Generator jest niezależnym modułem przekazywanym do silnika.


## MixedGenerator v1016
Warstwa pośrednia przeplata DiceGenerator i MatrixGenerator, dzięki czemu silnik pytań nie zależy od konkretnej rodziny zadań.


## Training Hub v1024
Kategorie i gry są definiowane w konfiguracji TRAINING_CATEGORIES. Profil lokalny przechowuje XP, postęp, gwiazdki i serię dni.
