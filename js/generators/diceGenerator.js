(() => {
  'use strict';

  const usedTypes = [];
  const MAX_USED_MEMORY = 8;

  const TYPES = [
    {
      id: 'sequence-plus-one',
      level: 1,
      layout: 'sequence',
      prompt: 'Która kostka uzupełnia ciąg?',
      build: () => {
        const start = rand(1, 3);
        return makeSequence([start, start + 1, start + 2], start + 3);
      }
    },
    {
      id: 'sequence-minus-one',
      level: 1,
      layout: 'sequence',
      prompt: 'Która kostka uzupełnia ciąg?',
      build: () => {
        const start = rand(4, 6);
        return makeSequence([start, start - 1, start - 2], start - 3);
      }
    },
    {
      id: 'sequence-pairs',
      level: 2,
      layout: 'sequence',
      prompt: 'Która kostka kontynuuje układ par?',
      build: () => {
        const a = rand(1, 6);
        let b = rand(1, 6);
        while (b === a) b = rand(1, 6);
        return makeSequence([a, a, b], b);
      }
    },
    {
      id: 'sequence-opposites',
      level: 2,
      layout: 'sequence',
      prompt: 'Wskaż brakującą wartość.',
      build: () => {
        const a = rand(1, 6);
        const b = 7 - a;
        let c = rand(1, 6);
        while (c === a || c === b) c = rand(1, 6);
        return makeSequence([a, b, c], 7 - c);
      }
    },
    {
      id: 'sequence-alternating',
      level: 3,
      layout: 'sequence',
      prompt: 'Która kostka kończy naprzemienny wzór?',
      build: () => {
        const a = rand(1, 3);
        const b = rand(4, 6);
        return makeSequence([a, b, a + 1], wrap(b + 1));
      }
    },
    {
      id: 'analogy-same-change',
      level: 3,
      layout: 'analogy',
      prompt: 'Zastosuj tę samą zmianę do drugiej pary.',
      build: () => {
        const step = choose([1, 2, -1, -2]);
        const a = rand(1, 6);
        const b = wrap(a + step);
        let c = rand(1, 6);
        while (c === a) c = rand(1, 6);
        const answer = wrap(c + step);
        return {
          cells: [a, b, c, null],
          answer,
          labels: ['A', 'B', 'C', '?']
        };
      }
    },
    {
      id: 'analogy-opposite',
      level: 4,
      layout: 'analogy',
      prompt: 'Znajdź wartość odpowiadającą drugiej analogii.',
      build: () => {
        const a = rand(1, 6);
        const b = 7 - a;
        let c = rand(1, 6);
        while (c === a || c === b) c = rand(1, 6);
        return {
          cells: [a, b, c, null],
          answer: 7 - c,
          labels: ['A', 'B', 'C', '?']
        };
      }
    },
    {
      id: 'matrix-row-sum',
      level: 4,
      layout: 'matrix2',
      prompt: 'Uzupełnij brakującą kostkę w macierzy 2 × 2.',
      build: () => {
        const a = rand(1, 5);
        const b = rand(1, 5);
        const c = rand(1, 5);
        const answer = wrap(a + b - c);
        return { cells: [a, b, c, null], answer };
      }
    },
    {
      id: 'matrix-column-opposites',
      level: 5,
      layout: 'matrix2',
      prompt: 'Która kostka kończy zależność kolumn?',
      build: () => {
        const a = rand(1, 6);
        const b = rand(1, 6);
        return { cells: [a, b, 7 - a, null], answer: 7 - b };
      }
    },
    {
      id: 'matrix-row-step',
      level: 5,
      layout: 'matrix2',
      prompt: 'W każdym wierszu działa ta sama zmiana.',
      build: () => {
        const step = choose([1, 2, -1, -2]);
        const a = rand(1, 6);
        const c = rand(1, 6);
        return { cells: [a, wrap(a + step), c, null], answer: wrap(c + step) };
      }
    },
    {
      id: 'matrix3-row-sum',
      level: 6,
      layout: 'matrix3',
      prompt: 'Uzupełnij ostatnie pole macierzy 3 × 3.',
      build: () => {
        const r1 = [rand(1, 6), rand(1, 6)];
        const r2 = [rand(1, 6), rand(1, 6)];
        const r3 = [rand(1, 6), rand(1, 6)];
        const row = x => wrap(x[0] + x[1]);
        return {
          cells: [r1[0], r1[1], row(r1), r2[0], r2[1], row(r2), r3[0], r3[1], null],
          answer: row(r3)
        };
      }
    },
    {
      id: 'matrix3-row-difference',
      level: 6,
      layout: 'matrix3',
      prompt: 'Trzecia kostka w wierszu wynika z dwóch pierwszych.',
      build: () => {
        const makeRow = () => {
          const a = rand(1, 6), b = rand(1, 6);
          return [a, b, wrap(Math.abs(a - b) || 6)];
        };
        const r1 = makeRow(), r2 = makeRow();
        const a = rand(1, 6), b = rand(1, 6);
        return {
          cells: [...r1, ...r2, a, b, null],
          answer: wrap(Math.abs(a - b) || 6)
        };
      }
    },
    {
      id: 'matrix3-column-opposites',
      level: 7,
      layout: 'matrix3',
      prompt: 'W każdej kolumnie obowiązuje ta sama relacja.',
      build: () => {
        const top = [rand(1, 6), rand(1, 6), rand(1, 6)];
        const middle = [7 - top[0], 7 - top[1], 7 - top[2]];
        const bottom = [top[0], top[1], null];
        return { cells: [...top, ...middle, ...bottom], answer: top[2] };
      }
    },
    {
      id: 'odd-one-out',
      level: 3,
      layout: 'odd',
      prompt: 'Która kostka nie pasuje do pozostałych?',
      build: () => {
        const group = choose([
          [1,3,5], [2,4,6], [1,2,3], [4,5,6]
        ]);
        const oddPool = [1,2,3,4,5,6].filter(v => !group.includes(v));
        const values = [choose(group), choose(group), choose(group), choose(oddPool), choose(group)];
        const oddIndex = values.findIndex(v => !group.includes(v));
        return { cells: values, answerIndexValue: oddIndex, answer: values[oddIndex], oddMode: true };
      }
    },
    {
      id: 'balance-equality',
      level: 7,
      layout: 'balance',
      prompt: 'Która kostka zachowuje równowagę?',
      build: () => {
        const a = rand(1, 6), b = rand(1, 6), c = rand(1, 6);
        const answer = wrap(a + b - c);
        return { left: [a, b], right: [c, null], answer };
      }
    },
    {
      id: 'diamond-cross-sum',
      level: 8,
      layout: 'diamond',
      prompt: 'Uzupełnij dolne pole diamentu.',
      build: () => {
        const top = rand(1, 6), left = rand(1, 6), right = rand(1, 6);
        return { cells: [top, left, right, null], answer: wrap(left + right - top) };
      }
    },
    {
      id: 'clockwise-step',
      level: 8,
      layout: 'ring',
      prompt: 'Wskaż brakującą wartość na pierścieniu.',
      build: () => {
        const start = rand(1, 6);
        const step = choose([1,2,-1,-2]);
        const vals = [start, wrap(start+step), wrap(start+2*step), wrap(start+3*step), null, wrap(start+5*step)];
        return { cells: vals, answer: wrap(start+4*step) };
      }
    },
    {
      id: 'two-rule-grid',
      level: 9,
      layout: 'matrix3',
      prompt: 'Odkryj dwie jednoczesne reguły w macierzy.',
      build: () => {
        const a = rand(1,6), b = rand(1,6);
        const c = wrap(a+b);
        const d = wrap(a+1), e = wrap(b+1), f = wrap(c+2);
        const g = wrap(a+2), h = wrap(b+2);
        return { cells:[a,b,c,d,e,f,g,h,null], answer:wrap(c+4) };
      }
    },
    {
      id: 'hidden-cycle',
      level: 9,
      layout: 'sequence',
      prompt: 'Znajdź brakującą wartość ukrytego cyklu.',
      build: () => {
        const cycle = shuffle([1,2,3,4,5,6]).slice(0,3);
        return makeSequence([cycle[0], cycle[1], cycle[2], cycle[0], cycle[1]], cycle[2], 6);
      }
    },
    {
      id: 'double-analogy',
      level: 10,
      layout: 'analogy3',
      prompt: 'Zastosuj wspólną regułę do trzeciego układu.',
      build: () => {
        const step = choose([1,2,-1,-2]);
        const a = rand(1,6), c = rand(1,6), e = rand(1,6);
        return {
          cells:[a,wrap(a+step),c,wrap(c+step),e,null],
          answer:wrap(e+step)
        };
      }
    }
  ];

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function wrap(v) {
    return ((v - 1) % 6 + 6) % 6 + 1;
  }

  function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function makeSequence(sequence, answer, length = 4) {
    return { cells: sequence, answer, length };
  }

  function buildOptions(answer, oddMode = false) {
    const values = [1,2,3,4,5,6].filter(v => v !== answer);
    const omitted = values.splice(Math.floor(Math.random() * values.length), 1)[0];
    return shuffle([answer, ...values]);
  }

  function pipPositions(value) {
    const P = {
      tl:[31,31], tr:[69,31], ml:[31,50], c:[50,50], mr:[69,50], bl:[31,69], br:[69,69]
    };
    const map = {
      1:['c'], 2:['tl','br'], 3:['tl','c','br'],
      4:['tl','tr','bl','br'], 5:['tl','tr','c','bl','br'],
      6:['tl','tr','ml','mr','bl','br']
    };
    return map[value].map(k => P[k]);
  }

  function diceSvg(value, className = '') {
    const uid = `dice-${Math.random().toString(36).slice(2)}`;
    const pips = pipPositions(value)
      .map(([x,y]) => `<circle cx="${x}" cy="${y}" r="6.3"/>`)
      .join('');
    return `<svg class="dice-svg ${className}" viewBox="0 0 100 100" role="img" aria-label="Kostka z liczbą oczek ${value}">
      <defs>
        <linearGradient id="${uid}-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fffaf0"/>
          <stop offset="55%" stop-color="#f3ead8"/>
          <stop offset="100%" stop-color="#ded1bb"/>
        </linearGradient>
        <filter id="${uid}-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity=".28"/>
        </filter>
      </defs>
      <rect class="dice-face" x="8" y="8" width="84" height="84" rx="19"
            style="fill:url(#${uid}-face)!important;stroke:none!important" filter="url(#${uid}-shadow)"/>
      <rect class="dice-outline" x="10.5" y="10.5" width="79" height="79" rx="16.5"
            style="fill:none!important;stroke:#5b5247!important;stroke-width:1.5" opacity=".9"/>
      <path class="dice-shine" d="M18 24 Q18 17 25 17 H69"
            style="fill:none!important;stroke:#ffffff!important;stroke-width:2.2" opacity=".62"/>
      <g class="dice-pips" style="fill:#111111!important">${pips}</g>
    </svg>`;
  }

  function pickType(level) {
    const maxLevel = Math.max(1, Math.min(10, level));
    let eligible = TYPES.filter(t => t.level <= maxLevel && !usedTypes.includes(t.id));
    if (!eligible.length) eligible = TYPES.filter(t => t.level <= maxLevel);
    const selected = choose(eligible);
    usedTypes.push(selected.id);
    if (usedTypes.length > MAX_USED_MEMORY) usedTypes.shift();
    return selected;
  }

  function generate(index = 0, requestedLevel = 1) {
    const type = pickType(requestedLevel);
    const built = type.build();

    const answer = built.answer;
    const options = buildOptions(answer, built.oddMode);
    return {
      id: `dice-${Date.now()}-${index}`,
      category: 'KOSTKI',
      type: type.id,
      layout: type.layout,
      level: type.level,
      prompt: type.prompt,
      data: built,
      answer,
      answerIndex: options.indexOf(answer),
      options
    };
  }

  window.DiceGenerator = {
    generate,
    diceSvg,
    typeCount: TYPES.length,
    types: TYPES.map(({id,level,layout,prompt}) => ({id,level,layout,prompt}))
  };
})();