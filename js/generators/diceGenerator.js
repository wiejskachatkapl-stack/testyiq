(() => {
  'use strict';

  const patterns = [
    {
      id: 'step-up',
      level: 1,
      title: 'Która kostka uzupełnia ciąg?',
      make: () => {
        const start = rand(1, 6);
        const seq = Array.from({length: 4}, (_, i) => wrap(start + i));
        return { sequence: seq.slice(0, 3), answer: seq[3], hint: 'Wartość rośnie o 1.' };
      }
    },
    {
      id: 'step-down',
      level: 1,
      title: 'Która kostka uzupełnia ciąg?',
      make: () => {
        const start = rand(1, 6);
        const seq = Array.from({length: 4}, (_, i) => wrap(start - i));
        return { sequence: seq.slice(0, 3), answer: seq[3], hint: 'Wartość maleje o 1.' };
      }
    },
    {
      id: 'plus-two',
      level: 2,
      title: 'Wskaż następną kostkę.',
      make: () => {
        const start = rand(1, 6);
        const seq = Array.from({length: 4}, (_, i) => wrap(start + i * 2));
        return { sequence: seq.slice(0, 3), answer: seq[3], hint: 'Dodawaj 2, przechodząc po wartościach 1–6.' };
      }
    },
    {
      id: 'minus-two',
      level: 2,
      title: 'Wskaż następną kostkę.',
      make: () => {
        const start = rand(1, 6);
        const seq = Array.from({length: 4}, (_, i) => wrap(start - i * 2));
        return { sequence: seq.slice(0, 3), answer: seq[3], hint: 'Odejmuj 2, przechodząc po wartościach 1–6.' };
      }
    },
    {
      id: 'pairs',
      level: 2,
      title: 'Która wartość kontynuuje układ par?',
      make: () => {
        const a = rand(1, 6);
        let b = rand(1, 6);
        while (b === a) b = rand(1, 6);
        return { sequence: [a, a, b], answer: b, hint: 'Każda wartość występuje dwa razy.' };
      }
    },
    {
      id: 'opposites',
      level: 3,
      title: 'Która kostka kończy zależność?',
      make: () => {
        const a = rand(1, 6);
        const b = 7 - a;
        let c = rand(1, 6);
        while (c === a || c === b) c = rand(1, 6);
        return { sequence: [a, b, c], answer: 7 - c, hint: 'Sąsiednie pary dają razem 7.' };
      }
    },
    {
      id: 'alternating',
      level: 3,
      title: 'Znajdź następną kostkę w rytmie zmian.',
      make: () => {
        const a = rand(1, 6);
        const b = wrap(a + rand(1, 2));
        const c = wrap(a + 1);
        const answer = wrap(b + 1);
        return { sequence: [a, b, c], answer, hint: 'Dwa przeplatające się ciągi rosną o 1.' };
      }
    }
  ];

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function wrap(value) {
    return ((value - 1) % 6 + 6) % 6 + 1;
  }

  function shuffle(values) {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function buildOptions(answer) {
    const values = [1, 2, 3, 4, 5, 6].filter(v => v !== answer);
    const omitted = values.splice(Math.floor(Math.random() * values.length), 1)[0];
    return shuffle([answer, ...values]);
  }

  function pipPositions(value) {
    const P = {
      tl:[31,31], tr:[69,31], ml:[31,50], c:[50,50], mr:[69,50], bl:[31,69], br:[69,69]
    };
    const map = {
      1:['c'],
      2:['tl','br'],
      3:['tl','c','br'],
      4:['tl','tr','bl','br'],
      5:['tl','tr','c','bl','br'],
      6:['tl','tr','ml','mr','bl','br']
    };
    return map[value].map(key => P[key]);
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
      <path class="dice-shine" d="M18 24 Q18 17 25 17 H69" style="fill:none!important;stroke:#ffffff!important;stroke-width:2.2" opacity=".62"/>
      <g class="dice-pips" style="fill:#111111!important">${pips}</g>
    </svg>`;
  }

  function generate(index = 0, requestedLevel = 1) {
    const eligible = patterns.filter(p => p.level <= Math.max(1, requestedLevel));
    const pattern = eligible[Math.floor(Math.random() * eligible.length)];
    const built = pattern.make();
    const options = buildOptions(built.answer);
    return {
      id: `dice-${Date.now()}-${index}`,
      category: 'KOSTKI',
      type: pattern.id,
      level: pattern.level,
      prompt: built.title,
      sequence: built.sequence,
      answer: built.answer,
      answerIndex: options.indexOf(built.answer),
      options,
      hint: built.hint
    };
  }

  window.DiceGenerator = { generate, diceSvg };
})();