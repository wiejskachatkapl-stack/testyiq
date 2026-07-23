(() => {
  'use strict';

  function shuffle(items){
    const a=[...items];
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function makeQuestion({id,category,mode,prompt,stimulus,answer,distractors,level=1,hint=''}){
    const options=shuffle([answer,...distractors]).slice(0,5);
    return {
      id:`${id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      category,
      family:'cognitive',
      layout:'cognitive',
      level,
      prompt,
      data:{stimulus,mode,hint},
      answer,
      answerIndex:options.findIndex(v=>v===answer),
      options
    };
  }

  const KNOWLEDGE_BANK=[
    ['Która planeta znajduje się najbliżej Słońca?','Merkury',['Mars','Wenus','Jowisz','Saturn'],'Kosmos'],
    ['Stolicą Polski jest:','Warszawa',['Kraków','Gdańsk','Poznań','Wrocław'],'Geografia'],
    ['Który gaz jest niezbędny człowiekowi do oddychania?','Tlen',['Azot','Hel','Wodór','Neon'],'Nauka'],
    ['Największym oceanem na Ziemi jest:','Ocean Spokojny',['Ocean Atlantycki','Ocean Indyjski','Ocean Arktyczny','Morze Śródziemne'],'Geografia'],
    ['Które zwierzę jest ssakiem?','Delfin',['Rekin','Pstrąg','Ośmiornica','Krokodyl'],'Zwierzęta'],
    ['Przeciwieństwem słowa „szybki” jest:','wolny',['krótki','jasny','cichy','lekki'],'Słownictwo'],
    ['Ile boków ma sześciokąt?','6',['4','5','7','8'],'Nauka'],
    ['Który kontynent jest największy?','Azja',['Europa','Afryka','Australia','Antarktyda'],'Geografia']
  ];

  function reflex(index,level){
    const symbols=['●','▲','■','◆','★'];
    const target=symbols[index%symbols.length];
    const row=shuffle([target,target,target,...symbols.filter(s=>s!==target)]).slice(0,7).join('  ');
    return makeQuestion({
      id:'reflex',category:'REFLEKS',mode:'SZYBKA REAKCJA',level,
      prompt:'Jakiego symbolu jest najwięcej?',
      stimulus:row,
      answer:target,
      distractors:symbols.filter(s=>s!==target),
      hint:'Najpierw znajdź powtarzający się symbol, a potem szybko policz jego wystąpienia.'
    });
  }

  function focus(index,level){
    const base=['○','□','△','◇'][index%4];
    const odd={'○':'●','□':'■','△':'▲','◇':'◆'}[base];
    const positions=Array(12).fill(base);
    positions[(index*5+3)%positions.length]=odd;
    return makeQuestion({
      id:'focus',category:'KONCENTRACJA',mode:'ZNAJDŹ RÓŻNICĘ',level,
      prompt:'Który symbol różni się od pozostałych?',
      stimulus:positions.map((s,i)=>`${i+1}:${s}`).join('   '),
      answer:String(positions.indexOf(odd)+1),
      distractors:['1','2','3','4','5','6','7','8','9','10','11','12'].filter(v=>v!==String(positions.indexOf(odd)+1)),
      hint:'Przesuwaj wzrok po elementach po kolei i porównuj kształt oraz wypełnienie.'
    });
  }

  function knowledge(index,level){
    const [prompt,answer,distractors,mode]=KNOWLEDGE_BANK[index%KNOWLEDGE_BANK.length];
    return makeQuestion({
      id:'knowledge',category:'WIEDZA',mode,level,prompt,
      stimulus:'Wybierz jedną poprawną odpowiedź.',
      answer,distractors,
      hint:'Odrzuć odpowiedzi, które na pewno nie pasują, a następnie porównaj pozostałe.'
    });
  }

  function imagination(index,level){
    const arrows=['↑','→','↓','←'];
    const start=index%4;
    const turns=(index%3)+1;
    const answer=arrows[(start+turns)%4];
    return makeQuestion({
      id:'imagination',category:'WYOBRAŹNIA',mode:'OBRÓT FIGURY',level,
      prompt:`Wskaż kierunek po ${turns} obrocie${turns===1?'':'ach'} o 90° w prawo.`,
      stimulus:`${arrows[start]}  ↻`,
      answer,
      distractors:arrows.filter(a=>a!==answer),
      hint:'Każdy obrót o 90° w prawo przesuwa kierunek o jedną pozycję zgodnie z ruchem wskazówek zegara.'
    });
  }

  function generator(fn){
    return {generate(index=0,level=1){return fn(index,level);}};
  }

  const ReflexGenerator=generator(reflex);
  const FocusGenerator=generator(focus);
  const KnowledgeGenerator=generator(knowledge);
  const ImaginationGenerator=generator(imagination);

  const gameMap={
    green:ReflexGenerator,
    differences:FocusGenerator,
    animals:KnowledgeGenerator,
    rotate:ImaginationGenerator
  };

  const dailyFamilies=[
    window.DiceGenerator,
    window.MatrixGenerator,
    ReflexGenerator,
    FocusGenerator,
    KnowledgeGenerator,
    ImaginationGenerator
  ];

  window.CognitiveGenerators={
    ReflexGenerator,
    FocusGenerator,
    KnowledgeGenerator,
    ImaginationGenerator,
    forGame(id){return gameMap[id]||null;}
  };

  window.DailyMixedGenerator={
    generate(index=0,level=1){
      return dailyFamilies[index%dailyFamilies.length].generate(index,level);
    }
  };
})();