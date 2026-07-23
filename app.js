const state={screen:'home',history:[],participant:null,sound:true,questionEngine:null,timerId:null,testStartedAt:0};
const screens=[...document.querySelectorAll('.screen')];
const back=document.getElementById('backBtn');
const label=document.getElementById('screenLabel');
const labels={home:'Brain Lab',training:'Trening Umysłu','training-category':'Kategoria treningu','dice-academy':'Nauka • Kostki',setup:'Test IQ',intro:'Zasady testu',question:'Test IQ'};
function nav(name,push=true){if(name===state.screen)return;const t=document.querySelector(`[data-screen="${name}"]`);if(!t)return;if(push)state.history.push(state.screen);screens.forEach(s=>s.classList.toggle('active',s===t));state.screen=name;label.textContent=labels[name]||'Brain Lab';back.style.visibility=name==='home'?'hidden':'visible';if(name==='training')renderTrainingProfile()}
function modal(title,text,icon='✦'){document.getElementById('modalTitle').textContent=title;document.getElementById('modalText').textContent=text;document.getElementById('modalIcon').textContent=icon;document.getElementById('modal').classList.remove('hidden')}
function closeModal(){document.getElementById('modal').classList.add('hidden')}
document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>nav(b.dataset.route));
document.querySelectorAll('[data-coming]').forEach(b=>b.onclick=()=>modal(b.dataset.coming,'Moduł jest zapisany w roadmapie i zostanie uruchomiony w kolejnych wersjach.'));
document.getElementById('backBtn')?.addEventListener('click',()=>nav(state.history.pop()||'home',false));
document.getElementById('closeModal').onclick=closeModal;document.getElementById('okModal').onclick=closeModal;
document.getElementById('modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
document.getElementById('soundBtn').onclick=e=>{state.sound=!state.sound;e.currentTarget.textContent=state.sound?'♪':'×'};
document.getElementById('testForm').onsubmit=e=>{e.preventDefault();const firstName=document.getElementById('firstName').value.trim(),lastName=document.getElementById('lastName').value.trim(),age=Number(document.getElementById('age').value),count=Number(document.querySelector('[name=count]:checked').value),mode=document.querySelector('[name=mode]:checked').value,error=document.getElementById('formError');if(firstName.length<2||lastName.length<2){error.textContent='Wpisz poprawne imię i nazwisko.';return}if(!Number.isInteger(age)||age<10||age>99){error.textContent='Wiek musi mieścić się w zakresie 10–99 lat.';return}error.textContent='';state.participant={firstName,lastName,age,count,mode};document.getElementById('summary').textContent=`${firstName}, ${age} lat • ${count} pytań • tryb ${mode==='adaptive'?'adaptacyjny':'standardowy'}`;nav('intro')};

const TRAINING_CATEGORIES={
 logic:{name:'Logika',icon:'◇',description:'Rozwijaj analizę, wnioskowanie i rozpoznawanie wzorców.',games:[['dice-training','Kostki','⬡',200,'available','Ciągi, zależności i układy kostek'],['matrix-training','Matryce','▦',200,'available','Figury, obroty i brakujące elementy'],['sequences','Sekwencje','⌁',200,'available','Liczby, litery i symbole'],['matches','Zapałki','╱',500,'available','Przesuwaj zapałki i naprawiaj układy'],['odd','Co nie pasuje?','◈',200,'available','Znajdź element łamiący regułę']]},
 memory:{name:'Pamięć',icon:'◎',description:'Ćwicz pamięć roboczą i kolejność.',games:[['memory','Memory','▦',200,'soon','Łącz identyczne pary'],['order','Zapamiętaj kolejność','↔',200,'soon','Odtwarzaj sekwencje'],['numbers','Zapamiętaj liczby','123',200,'soon','Coraz dłuższe ciągi'],['path','Zapamiętaj drogę','⌁',200,'soon','Odtwarzaj trasę']]},
 reflex:{name:'Refleks',icon:'⚡',description:'Ćwicz szybkość reakcji i błyskawiczne rozpoznawanie wzorców.',games:[['green','Szybka spostrzegawczość','●',200,'available','Znajdź dominujący symbol jak najszybciej'],['click-numbers','Kliknij liczby','123',200,'soon','Znajdź liczby po kolei'],['avoid','Unikaj czerwonych','×',200,'soon','Reaguj szybko'],['stroop','Kolor kontra słowo','A',200,'soon','Pokonaj automatyczne skojarzenia']]},
 focus:{name:'Koncentracja',icon:'◉',description:'Trenuj spostrzegawczość i skupienie.',games:[['differences','Znajdź różnice','≠',300,'available','Porównuj obrazy'],['same','Znajdź taki sam','=',200,'soon','Wskaż identyczny symbol'],['hidden','Ukryty obiekt','⌕',200,'soon','Odszukuj przedmioty'],['tracking','Śledzenie obiektu','◌',200,'soon','Nie zgub elementu']]},
 knowledge:{name:'Wiedza',icon:'⌁',description:'Łącz fakty i poznawaj świat.',games:[['animals','Pojedynki zwierząt','♞',300,'available','Które jest większe lub szybsze?'],['world','Świat i geografia','◍',300,'soon','Kraje, góry i rzeki'],['science','Nauka','⚗',300,'soon','Przyroda i wynalazki'],['space','Kosmos','✦',300,'soon','Planety i gwiazdy'],['words','Słownictwo','Aa',300,'soon','Synonimy i znaczenia']]},
 imagination:{name:'Wyobraźnia',icon:'△',description:'Rozwijaj wyobraźnię przestrzenną.',games:[['rotate','Obrót figur','↻',200,'available','Wybierz figurę po obrocie'],['solids','Bryły 3D','⬡',200,'soon','Wyobrażaj sobie obrót brył'],['tangram','Tangram','△',200,'soon','Układaj kształty'],['mazes','Labirynty','⌗',200,'soon','Znajdź drogę']]}
};
for(const c of Object.values(TRAINING_CATEGORIES)) c.games=c.games.map(g=>({id:g[0],name:g[1],icon:g[2],levels:g[3],status:g[4],subtitle:g[5]}));

const TRAINING_GAME_ICONS={
  'dice-training':`<svg class="training-game-svg" viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round">
      <rect x="16" y="18" width="36" height="36" rx="8"/>
      <rect x="48" y="46" width="36" height="36" rx="8"/>
      <circle cx="28" cy="30" r="3" fill="currentColor"/>
      <circle cx="40" cy="42" r="3" fill="currentColor"/>
      <circle cx="60" cy="58" r="3" fill="currentColor"/>
      <circle cx="72" cy="70" r="3" fill="currentColor"/>
      <circle cx="72" cy="58" r="3" fill="currentColor"/>
      <circle cx="60" cy="70" r="3" fill="currentColor"/>
    </g>
  </svg>`,
  'matrix-training':`<svg class="training-game-svg" viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="3.2">
      <rect x="14" y="14" width="72" height="72" rx="10"/>
      <path d="M38 14v72M62 14v72M14 38h72M14 62h72"/>
      <circle cx="26" cy="26" r="5" fill="currentColor"/>
      <rect x="48" y="20" width="10" height="10" rx="2" fill="currentColor"/>
      <path d="M74 20l6 10H68z" fill="currentColor"/>
      <rect x="20" y="48" width="10" height="10" rx="2" fill="currentColor"/>
      <path d="M50 48l6 10H44z" fill="currentColor"/>
      <circle cx="74" cy="50" r="5" fill="currentColor"/>
      <path d="M26 68l6 10H20z" fill="currentColor"/>
      <circle cx="50" cy="74" r="5" fill="currentColor"/>
      <path d="M70 70h10v10H70z" stroke-dasharray="3 3"/>
    </g>
  </svg>`,
  'sequences':`<svg class="training-game-svg" viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="50" r="7"/>
      <rect x="35" y="43" width="14" height="14" rx="3"/>
      <path d="M66 40l9 18H57z"/>
      <path d="M82 50h10M88 44l6 6-6 6"/>
    </g>
  </svg>`,
  'matches':`<svg class="training-game-svg" viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round">
      <path d="M24 76L70 30"/>
      <path d="M37 83L83 37"/>
    </g>
    <circle cx="73" cy="27" r="8" fill="currentColor"/>
    <circle cx="86" cy="34" r="8" fill="currentColor"/>
  </svg>`,
  'odd-one-out':`<svg class="training-game-svg" viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="3.5">
      <circle cx="25" cy="28" r="10"/>
      <circle cx="50" cy="28" r="10"/>
      <circle cx="75" cy="28" r="10"/>
      <circle cx="25" cy="58" r="10"/>
      <circle cx="50" cy="58" r="10"/>
      <path d="M75 46l12 12-12 12-12-12z"/>
    </g>
  </svg>`
};

function getTrainingProfile(){try{return {level:1,xp:0,streak:0,categories:{},games:{},...JSON.parse(localStorage.getItem('brainLabTrainingProfile')||'{}')}}catch{return {level:1,xp:0,streak:0,categories:{},games:{}}}}
function renderTrainingProfile(){const p=getTrainingProfile(),xp=p.xp||0;document.getElementById('brainLevelValue').textContent=Math.floor(xp/100)+1;document.getElementById('brainXpValue').textContent=`${xp%100} / 100`;document.getElementById('brainXpFill').style.width=`${xp%100}%`;document.querySelectorAll('.training-category').forEach(b=>{const v=p.categories?.[b.dataset.category]||0;b.querySelector('.category-progress em').style.width=`${v}%`;b.querySelector('.category-progress b').textContent=`${v}%`})}
function openTrainingCategory(key){const c=TRAINING_CATEGORIES[key];if(!c)return;const p=getTrainingProfile(),v=p.categories?.[key]||0;categoryScreenIcon.textContent=c.icon;categoryScreenTitle.textContent=c.name;categoryScreenDescription.textContent=c.description;categoryScreenProgress.textContent=`${v}%`;let total=0,done=0,stars=0;c.games.forEach(g=>{total+=g.levels;done+=p.games?.[g.id]?.completed||0;stars+=p.games?.[g.id]?.stars||0});categoryCompleted.textContent=`${done} / ${total}`;categoryStars.textContent=stars;categoryStreak.textContent=`${p.streak||0} dni`;trainingGameGrid.innerHTML=c.games.map((g,idx)=>`<button class="training-game-card game-card-${idx+1} ${g.status==='available'?'available':'locked'}" data-game="${g.id}" data-status="${g.status}"><span class="game-icon">${TRAINING_GAME_ICONS[g.id]||g.icon}</span><span class="game-copy"><strong>${g.name}</strong><small>${g.subtitle}</small></span><span class="game-level"><b>${p.games?.[g.id]?.completed||0} / ${g.levels}</b><i><em style="width:0%"></em></i></span><span class="game-status">${g.status==='available'?'GRAJ':'WKRÓTCE'}</span></button>`).join('');trainingGameGrid.querySelectorAll('button').forEach(b=>b.onclick=()=>{
  if(b.dataset.game==='dice-training'&&b.dataset.status==='available'){nav('dice-academy');renderDiceAcademy();return}
  if(b.dataset.game==='matrix-training'&&b.dataset.status==='available'){startMatrixTraining();return}
  if(['green','differences','animals','rotate'].includes(b.dataset.game)&&b.dataset.status==='available'){
    startCognitiveTraining(b.dataset.game,b.querySelector('strong').textContent);
    return;
  }
  if(b.dataset.game==='matches'&&b.dataset.status==='available'){
    startInteractiveMatchsticks();
    return;
  }
  if(['sequences','odd'].includes(b.dataset.game)&&b.dataset.status==='available'){
    startLogicTraining(b.dataset.game,b.querySelector('strong').textContent);
    return;
  }
  modal(b.dataset.status==='available'?b.querySelector('strong').textContent:'Wkrótce dostępne',b.dataset.status==='available'?'Moduł jest dostępny.':'Ten trening zostanie dodany w kolejnych wersjach.','✦')
});nav('training-category')}
document.querySelectorAll('.training-category').forEach(b=>b.onclick=()=>openTrainingCategory(b.dataset.category));




/* =========================================================
   v1051 — Etap 2: Ściany przeciwległe
   ========================================================= */
const OPPOSITE_LESSON_QUESTIONS=[
  {face:1,answer:6,hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'7 − 1 = 6, więc naprzeciwko 1 znajduje się 6.'},
  {face:2,answer:5,hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'7 − 2 = 5, więc naprzeciwko 2 znajduje się 5.'},
  {face:3,answer:4,hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'7 − 3 = 4, więc naprzeciwko 3 znajduje się 4.'},
  {face:6,answer:1,hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Naprzeciwko 6 znajduje się 1.'},
  {face:5,answer:2,hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Naprzeciwko 5 znajduje się 2.'},
  {face:4,answer:3,hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Naprzeciwko 4 znajduje się 3.'}
];

let oppositeLessonIndex=0;
let oppositeLessonLocked=false;

function renderOppositeLesson(){
  const q=OPPOSITE_LESSON_QUESTIONS[oppositeLessonIndex];
  if(!q)return;

  oppositeLessonLocked=false;
  document.getElementById('oppositeQuestionTitle').textContent=`Co znajduje się naprzeciwko ściany z ${q.face} ${q.face===1?'oczkiem':'oczkami'}?`;
  document.getElementById('oppositeQuestionCounter').textContent=`${oppositeLessonIndex+1} / ${OPPOSITE_LESSON_QUESTIONS.length}`;
  document.getElementById('oppositeQuestionDie').innerHTML=DiceGenerator.diceSvg(q.face,'opposite-main-die');

  const oppositeAnswerFace=document.getElementById('oppositeAnswerFace');
  oppositeAnswerFace.className='opposite-question-mark';
  oppositeAnswerFace.innerHTML='?';

  const oppositeNextButton=document.getElementById('oppositeNextBtn');
  oppositeNextButton.classList.add('hidden');
  oppositeNextButton.textContent='NASTĘPNE PYTANIE ›';

  const wrong=[1,2,3,4,5,6].filter(v=>v!==q.answer);
  const distractors=[wrong[(oppositeLessonIndex*2)%wrong.length],wrong[(oppositeLessonIndex*2+2)%wrong.length]];
  const options=[q.answer,...distractors].sort(()=>Math.random()-.5);

  const answers=document.getElementById('oppositeAnswers');
  answers.innerHTML=options.map((value,index)=>`
    <button type="button" data-opposite-value="${value}">
      <span>${String.fromCharCode(65+index)}</span>
      ${DiceGenerator.diceSvg(value,'opposite-answer-die')}
      <small>${value} ${value===1?'oczko':value<5?'oczka':'oczek'}</small>
    </button>`).join('');

  answers.querySelectorAll('button').forEach(button=>{
    button.onclick=()=>{
      if(oppositeLessonLocked)return;

      const value=Number(button.dataset.oppositeValue);
      const correct=value===q.answer;
      const box=document.getElementById('oppositeExplanation');
      const answerFace=document.getElementById('oppositeAnswerFace');
      const nextButton=document.getElementById('oppositeNextBtn');

      answerFace.innerHTML=DiceGenerator.diceSvg(value,'opposite-main-die');
      answerFace.className=`opposite-question-mark filled ${correct?'answer-good':'answer-bad'}`;

      if(correct){
        oppositeLessonLocked=true;
        button.classList.add('correct');
        box.className='opposite-explanation good';
        box.innerHTML=`<small>DOBRA ODPOWIEDŹ</small><p>${q.solution}</p>`;
        nextButton.classList.remove('hidden');
        nextButton.textContent='NASTĘPNE PYTANIE ZA 2 SEKUNDY ›';

        clearTimeout(window.oppositeAdvanceTimer);
        window.oppositeAdvanceTimer=setTimeout(advanceOppositeLesson,2000);
      }else{
        button.classList.add('wrong');
        box.className='opposite-explanation bad';
        box.innerHTML='<small>ZŁA ODPOWIEDŹ</small><p>Popraw się i spróbuj jeszcze raz.</p>';

        setTimeout(()=>{
          button.classList.remove('wrong');
          answerFace.className='opposite-question-mark';
          answerFace.innerHTML='?';
          box.className='opposite-explanation';
          box.innerHTML='<small>NAUKA</small><p>Wybierz ścianę, która znajduje się po przeciwnej stronie standardowej kostki.</p>';
        },1600);
      }
    };
  });
  const explanation=document.getElementById('oppositeExplanation');
  explanation.className='opposite-explanation';
  explanation.innerHTML='<small>NAUKA</small><p>Wybierz ścianę, która znajduje się po przeciwnej stronie standardowej kostki.</p>';
  document.getElementById('oppositeNextBtn').classList.add('hidden');
}


function advanceOppositeLesson(){
  clearTimeout(window.oppositeAdvanceTimer);
  const box=document.getElementById('oppositeExplanation');

  if(oppositeLessonIndex<OPPOSITE_LESSON_QUESTIONS.length-1){
    oppositeLessonIndex++;
    renderOppositeLesson();
  }else{
    oppositeLessonIndex=0;
    oppositeLessonLocked=true;
    document.getElementById('oppositeAnswers').innerHTML='';
    document.getElementById('oppositeNextBtn').classList.add('hidden');
    const answerFace=document.getElementById('oppositeAnswerFace');
    answerFace.className='opposite-question-mark';
    answerFace.innerHTML='✓';
    box.className='opposite-explanation good';
    box.innerHTML='<small>ETAP 2 UKOŃCZONY</small><p>Znasz już wszystkie trzy pary przeciwległych ścian: 1–6, 2–5 oraz 3–4.</p>';
  }
}


document.getElementById('oppositeNextBtn')?.addEventListener('click',()=>{if(oppositeLessonLocked)advanceOppositeLesson();});

function showOppositeLesson(){
  document.querySelector('.academy-training-intro')?.classList.add('hidden');
  document.getElementById('oppositeLessonPanel')?.classList.remove('hidden');
  renderOppositeLesson();
}

function hideOppositeLesson(){
  document.querySelector('.academy-training-intro')?.classList.remove('hidden');
  document.getElementById('oppositeLessonPanel')?.classList.add('hidden');
}

document.getElementById('oppositeHintBtn')?.addEventListener('click',()=>{
  openAcademyHintModal(
    'Jak znaleźć ścianę przeciwległą?',
    OPPOSITE_GENERAL_HINTS,
    'ŚCIANY PRZECIWLEGŁE',
    'Przeciwległe ściany nigdy się nie stykają, a ich wartości na standardowej kostce sumują się do 7.'
  );
});

document.getElementById('oppositeSolutionBtn')?.addEventListener('click',()=>{
  const q=OPPOSITE_LESSON_QUESTIONS[oppositeLessonIndex];
  oppositeLessonLocked=true;

  document.querySelectorAll('#oppositeAnswers button').forEach(b=>{
    b.classList.toggle('correct',Number(b.dataset.oppositeValue)===q.answer);
  });

  const answerFace=document.getElementById('oppositeAnswerFace');
  answerFace.innerHTML=DiceGenerator.diceSvg(q.answer,'opposite-main-die');
  answerFace.className='opposite-question-mark filled answer-good';

  const box=document.getElementById('oppositeExplanation');
  box.className='opposite-explanation solution';
  box.innerHTML=`<small>ROZWIĄZANIE</small><p>${q.solution}</p>`;

  const nextButton=document.getElementById('oppositeNextBtn');
  nextButton.classList.remove('hidden');
  nextButton.textContent='NASTĘPNE PYTANIE ZA 2 SEKUNDY ›';

  clearTimeout(window.oppositeAdvanceTimer);
  window.oppositeAdvanceTimer=setTimeout(advanceOppositeLesson,2000);
});

document.getElementById('oppositeNextBtn')?.addEventListener('click',()=>{
  if(oppositeLessonIndex<OPPOSITE_LESSON_QUESTIONS.length-1){
    oppositeLessonIndex++;
    renderOppositeLesson();
  }else{
    oppositeLessonIndex=0;
    const box=document.getElementById('oppositeExplanation');
    box.className='opposite-explanation good';
    box.innerHTML='<small>ETAP 2 UKOŃCZONY</small><p>Znasz już wszystkie trzy pary przeciwległych ścian: 1–6, 2–5 oraz 3–4.</p>';
    document.getElementById('oppositeNextBtn').classList.add('hidden');
  }
});



/* =========================================================
   v1055 — Etap 3: Sąsiedztwo i narożniki
   ========================================================= */
const CORNER_LESSON_QUESTIONS=[
  {a:1,b:2,answer:3,wrong:[6,5],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'6 jest naprzeciwko 1, a 5 jest naprzeciwko 2. Dlatego 3 może spotkać się z 1 i 2 w jednym narożniku.'},
  {a:1,b:3,answer:2,wrong:[6,4],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'6 nie może dotykać 1, a 4 nie może dotykać 3. Ściana 2 może sąsiadować z obiema.'},
  {a:2,b:4,answer:1,wrong:[5,3],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'5 jest naprzeciwko 2, a 3 jest naprzeciwko 4. Ściana 1 może znaleźć się z nimi w narożniku.'},
  {a:6,b:5,answer:4,wrong:[1,2],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'1 nie dotyka 6, a 2 nie dotyka 5. Ściana 4 może sąsiadować z obiema.'},
  {a:6,b:3,answer:5,wrong:[1,4],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Jedyną poprawną możliwością jest 5, ponieważ dotyka zarówno 6, jak i 3.'},
  {a:5,b:4,answer:6,wrong:[2,3],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Ściana 6 może dotykać obu pokazanych ścian i utworzyć z nimi narożnik.'}
];

let cornerLessonIndex=0;
let cornerLessonLocked=false;

function renderCornerLesson(){
  const q=CORNER_LESSON_QUESTIONS[cornerLessonIndex];
  if(!q)return;

  cornerLessonLocked=false;
  document.getElementById('cornerQuestionTitle').textContent=`Która trzecia ściana może spotkać się z ${q.a} i ${q.b} w jednym narożniku?`;
  document.getElementById('cornerQuestionCounter').textContent=`${cornerLessonIndex+1} / ${CORNER_LESSON_QUESTIONS.length}`;
  document.getElementById('cornerFaceTop').innerHTML=DiceGenerator.diceSvg(q.a,'corner-die');
  document.getElementById('cornerFaceLeft').innerHTML=DiceGenerator.diceSvg(q.b,'corner-die');

  const answerFace=document.getElementById('cornerFaceAnswer');
  answerFace.className='corner-face corner-right corner-missing';
  answerFace.innerHTML='?';

  const nextButton=document.getElementById('cornerNextBtn');
  nextButton.classList.add('hidden');
  nextButton.disabled=false;
  nextButton.textContent='NASTĘPNE PYTANIE ›';

  const options=[q.answer,...q.wrong].sort(()=>Math.random()-.5);
  const answers=document.getElementById('cornerAnswers');
  answers.innerHTML=options.map((value,index)=>`
    <button type="button" data-corner-value="${value}">
      <span>${String.fromCharCode(65+index)}</span>
      ${DiceGenerator.diceSvg(value,'opposite-answer-die')}
      <small>${value} ${value===1?'oczko':value<5?'oczka':'oczek'}</small>
    </button>`).join('');

  answers.querySelectorAll('button').forEach(button=>{
    button.onclick=()=>{
      if(cornerLessonLocked)return;

      const value=Number(button.dataset.cornerValue);
      const correct=value===q.answer;
      const box=document.getElementById('cornerExplanation');
      const answerFace=document.getElementById('cornerFaceAnswer');
      const nextButton=document.getElementById('cornerNextBtn');

      answerFace.innerHTML=DiceGenerator.diceSvg(value,'corner-die');
      answerFace.className=`corner-face corner-right corner-answer-filled ${correct?'answer-good':'answer-bad'}`;

      if(correct){
        cornerLessonLocked=true;
        button.classList.add('correct');
        box.className='opposite-explanation good';
        box.innerHTML=`<small>DOBRA ODPOWIEDŹ</small><p>${q.solution}</p>`;

        nextButton.classList.remove('hidden');
        nextButton.textContent='NASTĘPNE PYTANIE ZA 2 SEKUNDY ›';

        window.clearTimeout(window.cornerLessonAdvanceTimer);
        window.cornerLessonAdvanceTimer=setTimeout(()=>advanceCornerLesson(),2000);
      }else{
        button.classList.add('wrong');
        box.className='opposite-explanation bad';
        box.innerHTML='<small>ZŁA ODPOWIEDŹ</small><p>Popraw się i spróbuj jeszcze raz.</p>';

        setTimeout(()=>{
          button.classList.remove('wrong');
          answerFace.className='corner-face corner-right corner-missing';
          answerFace.innerHTML='?';
          box.className='opposite-explanation';
          box.innerHTML='<small>NAUKA</small><p>Wybierz ścianę, która może dotykać obu pokazanych ścian w jednym narożniku.</p>';
        },1600);
      }
    };
  });
  const explanation=document.getElementById('cornerExplanation');
  explanation.className='opposite-explanation';
  explanation.innerHTML='<small>NAUKA</small><p>Wybierz ścianę, która może dotykać obu pokazanych ścian w jednym narożniku.</p>';
  document.getElementById('cornerNextBtn').classList.add('hidden');
}


function advanceCornerLesson(){
  window.clearTimeout(window.cornerLessonAdvanceTimer);
  const box=document.getElementById('cornerExplanation');

  if(cornerLessonIndex<CORNER_LESSON_QUESTIONS.length-1){
    cornerLessonIndex++;
    renderCornerLesson();
  }else{
    cornerLessonIndex=0;
    cornerLessonLocked=true;
    box.className='opposite-explanation good';
    box.innerHTML='<small>ETAP 3 UKOŃCZONY</small><p>Potrafisz już rozpoznawać, które trzy ściany mogą spotkać się w jednym narożniku kostki.</p>';
    document.getElementById('cornerAnswers').innerHTML='';
    document.getElementById('cornerNextBtn').classList.add('hidden');
  }
}

document.getElementById('cornerNextBtn')?.addEventListener('click',()=>{
  if(!cornerLessonLocked)return;
  advanceCornerLesson();
});

function showCornerLesson(){
  document.querySelector('.academy-training-intro')?.classList.add('hidden');
  document.getElementById('oppositeLessonPanel')?.classList.add('hidden');
  document.getElementById('cornerLessonPanel')?.classList.remove('hidden');
  renderCornerLesson();
}

function hideCornerLesson(){
  document.getElementById('cornerLessonPanel')?.classList.add('hidden');
}

document.getElementById('cornerHintBtn')?.addEventListener('click',()=>{
  openAcademyHintModal(
    'Jak znaleźć trzecią ścianę narożnika?',
    CORNER_GENERAL_HINTS,
    'SĄSIEDZTWO I NAROŻNIKI',
    'W jednym narożniku nie może znaleźć się żadna para ścian przeciwległych.'
  );
});

document.getElementById('cornerSolutionBtn')?.addEventListener('click',()=>{
  const q=CORNER_LESSON_QUESTIONS[cornerLessonIndex];
  cornerLessonLocked=true;

  document.querySelectorAll('#cornerAnswers button').forEach(b=>{
    b.classList.toggle('correct',Number(b.dataset.cornerValue)===q.answer);
  });

  const answerFace=document.getElementById('cornerFaceAnswer');
  answerFace.innerHTML=DiceGenerator.diceSvg(q.answer,'corner-die');
  answerFace.className='corner-face corner-right corner-answer-filled answer-good';

  const box=document.getElementById('cornerExplanation');
  box.className='opposite-explanation solution';
  box.innerHTML=`<small>ROZWIĄZANIE</small><p>${q.solution}</p>`;

  const nextButton=document.getElementById('cornerNextBtn');
  nextButton.classList.remove('hidden');
  nextButton.textContent='NASTĘPNE PYTANIE ZA 2 SEKUNDY ›';

  window.clearTimeout(window.cornerLessonAdvanceTimer);
  window.cornerLessonAdvanceTimer=setTimeout(()=>advanceCornerLesson(),2000);
});




/* =========================================================
   v1058 — poprawiony etap 1: Orientacja
   ========================================================= */

/* =========================================================
   v1062 — uniwersalne, większe wskazówki w osobnym oknie
   ========================================================= */

const ORIENTATION_GENERAL_HINTS=[
  {
    title:'Sprawdź trzy widoczne ściany',
    text:'Najpierw ustal, jakie trzy ściany spotykają się w pokazanym narożniku. Zapamiętaj cały zestaw, a nie tylko jedną ścianę.'
  },
  {
    title:'Nie sugeruj się położeniem',
    text:'Po obrocie góra, lewa i prawa strona mogą zamienić się miejscami. Zestaw trzech ścian pozostaje jednak ten sam.'
  },
  {
    title:'Eliminuj odpowiedzi niemożliwe',
    text:'Odrzuć każdą odpowiedź, w której pojawia się choć jedna inna ściana niż w kostce wyjściowej.'
  }
];

const OPPOSITE_GENERAL_HINTS=[
  {
    title:'Zapamiętaj trzy pary',
    text:'Na standardowej kostce przeciwległe pary to 1–6, 2–5 oraz 3–4.'
  },
  {
    title:'Przeciwległe nigdy się nie stykają',
    text:'Dwie ściany przeciwległe nie mogą dotykać się ani krawędzią, ani narożnikiem.'
  },
  {
    title:'Szybka kontrola',
    text:'Na standardowej kostce liczby na przeciwległych ścianach sumują się do 7.'
  }
];

const CORNER_GENERAL_HINTS=[
  {
    title:'W narożniku spotykają się trzy ściany',
    text:'Poprawny narożnik tworzą dokładnie trzy ściany, które wzajemnie się stykają.'
  },
  {
    title:'Odrzuć pary przeciwległe',
    text:'Dwie ściany przeciwległe nigdy nie mogą znaleźć się razem w jednym narożniku.'
  },
  {
    title:'Zastosuj eliminację',
    text:'Najpierw usuń odpowiedzi zawierające ścianę przeciwną do którejkolwiek z pokazanych, a dopiero potem porównaj pozostałe.'
  }
];


function initAcademyHintModal(){
  const modal=document.getElementById('academyHintModal');
  const closeButton=document.getElementById('academyHintModalClose');
  const doneButton=document.getElementById('academyHintModalDone');

  if(!modal)return false;
  if(modal.dataset.initialized==='true')return true;

  closeButton?.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    closeAcademyHintModal();
  });

  doneButton?.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    closeAcademyHintModal();
  });

  modal.addEventListener('click',event=>{
    if(event.target===modal)closeAcademyHintModal();
  });

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!modal.classList.contains('hidden')){
      closeAcademyHintModal();
    }
  });

  modal.dataset.initialized='true';
  return true;
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initAcademyHintModal,{once:true});
}else{
  initAcademyHintModal();
}

function openAcademyHintModal(title, hints, eyebrow='WSKAZÓWKI', remember=''){
  initAcademyHintModal();
  const modal=document.getElementById('academyHintModal');
  if(!modal)return;

  document.getElementById('academyHintModalEyebrow').textContent=eyebrow;
  document.getElementById('academyHintModalTitle').textContent=title;
  document.getElementById('academyHintModalBody').innerHTML=
    hints.map((hint,index)=>`
      <section class="academy-hint-step">
        <b>${index+1}</b>
        <div>
          <h4>${hint.title}</h4>
          <p>${hint.text}</p>
        </div>
      </section>`).join('')+
    (remember?`<aside class="academy-hint-remember"><small>ZAPAMIĘTAJ</small><p>${remember}</p></aside>`:'');

  modal.classList.remove('hidden');
}

function closeAcademyHintModal(){
  document.getElementById('academyHintModal')?.classList.add('hidden');
}



const ORIENTATION_QUESTIONS=[
  {source:[4,2,3],answer:[2,3,4],wrong:[[4,6,3],[5,2,3]],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Poprawna odpowiedź zawiera dokładnie ściany 4, 2 i 3.'},
  {source:[1,2,3],answer:[3,1,2],wrong:[[1,6,3],[5,2,3]],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Po obrocie nadal widzimy ściany 1, 2 i 3.'},
  {source:[6,5,4],answer:[5,4,6],wrong:[[1,5,4],[6,2,4]],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Poprawny układ zachowuje zestaw 6, 5 i 4.'},
  {source:[2,4,1],answer:[1,2,4],wrong:[[5,4,1],[2,3,1]],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Tylko ta odpowiedź zawiera ściany 2, 4 i 1.'},
  {source:[3,5,1],answer:[5,1,3],wrong:[[4,5,1],[3,2,1]],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Po obrocie nadal spotykają się ściany 3, 5 i 1.'},
  {source:[6,2,4],answer:[4,6,2],wrong:[[1,2,4],[6,5,4]],hint:'Porównaj cały zestaw trzech ścian i odrzuć odpowiedzi zawierające inną ścianę niż w przykładzie.',solution:'Poprawny narożnik nadal tworzą ściany 6, 2 i 4.'}
];

let orientationQuestionIndex=0;
let orientationLocked=false;

function orientationCubeHtml(values, cls='orientation-mini-die'){
  const pipMap={
    1:[[.5,.5]],
    2:[[.28,.28],[.72,.72]],
    3:[[.28,.28],[.5,.5],[.72,.72]],
    4:[[.28,.28],[.72,.28],[.28,.72],[.72,.72]],
    5:[[.28,.28],[.72,.28],[.5,.5],[.28,.72],[.72,.72]],
    6:[[.28,.24],[.72,.24],[.28,.5],[.72,.5],[.28,.76],[.72,.76]]
  };

  const project=(face,u,v)=>{
    if(face==='top'){
      return [60+(u-v)*46,15+(u+v)*24];
    }
    if(face==='left'){
      return [14+u*46,39+v*58+u*24];
    }
    return [60+u*46,63+v*58-u*24];
  };

  const pips=(face,value)=>{
    return (pipMap[value]||[]).map(([u,v])=>{
      const [x,y]=project(face,u,v);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.7" fill="#10151a"/>`;
    }).join('');
  };

  return `<svg class="orientation-cube-svg ${cls}" viewBox="0 0 120 124" role="img" aria-label="Kostka: ${values.join(', ')}">
    <defs>
      <filter id="orientationCubeShadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity=".32"/>
      </filter>
    </defs>
    <g filter="url(#orientationCubeShadow)" stroke="#7a8287" stroke-width="2.2" stroke-linejoin="round">
      <polygon points="60,15 106,39 60,63 14,39" fill="#f3e7ca"/>
      <polygon points="14,39 60,63 60,121 14,97" fill="#eee0c1"/>
      <polygon points="60,63 106,39 106,97 60,121" fill="#f7ecd3"/>
    </g>
    <g>${pips('top',values[0])}${pips('left',values[1])}${pips('right',values[2])}</g>
  </svg>`;
}

function renderOrientationQuestion(){
  const q=ORIENTATION_QUESTIONS[orientationQuestionIndex];
  orientationLocked=false;

  document.getElementById('orientationQuestionCounter').textContent=`${orientationQuestionIndex+1} / ${ORIENTATION_QUESTIONS.length}`;
  document.getElementById('orientationSourceCube').innerHTML=orientationCubeHtml(q.source,'orientation-main-die');

  const target=document.getElementById('orientationAnswerCube');
  target.className='orientation-answer-box';
  target.innerHTML='?';

  const next=document.getElementById('orientationNextBtn');
  next.classList.add('hidden');
  next.textContent='NASTĘPNE PYTANIE ›';

  const options=[q.answer,...q.wrong].sort(()=>Math.random()-.5);
  const answers=document.getElementById('orientationAnswers');
  answers.innerHTML=options.map((values,index)=>`
    <button type="button" data-orientation-index="${index}" data-values="${values.join(',')}">
      <span>${String.fromCharCode(65+index)}</span>
      ${orientationCubeHtml(values,'orientation-option-die')}
    </button>`).join('');

  answers.querySelectorAll('button').forEach(button=>{
    button.onclick=()=>{
      if(orientationLocked)return;

      const values=button.dataset.values.split(',').map(Number);
      const correct=values.join(',')===q.answer.join(',');
      const box=document.getElementById('orientationExplanation');

      target.innerHTML=orientationCubeHtml(values,'orientation-main-die');
      target.className=`orientation-answer-box filled ${correct?'answer-good':'answer-bad'}`;

      if(correct){
        orientationLocked=true;
        button.classList.add('correct');
        box.className='opposite-explanation good';
        box.innerHTML=`<small>DOBRA ODPOWIEDŹ</small><p>${q.solution}</p>`;
        next.classList.remove('hidden');
        next.textContent='NASTĘPNE PYTANIE ZA 2 SEKUNDY ›';

        clearTimeout(window.orientationAdvanceTimer);
        window.orientationAdvanceTimer=setTimeout(advanceOrientationQuestion,2000);
      }else{
        button.classList.add('wrong');
        box.className='opposite-explanation bad';
        box.innerHTML='<small>ZŁA ODPOWIEDŹ</small><p>Popraw się i spróbuj jeszcze raz.</p>';

        setTimeout(()=>{
          button.classList.remove('wrong');
          target.className='orientation-answer-box';
          target.innerHTML='?';
          box.className='opposite-explanation';
          box.innerHTML='<small>NAUKA</small><p>Wybierz odpowiedź zachowującą te same trzy ściany spotykające się w narożniku.</p>';
        },1600);
      }
    };
  });

  const box=document.getElementById('orientationExplanation');
  box.className='opposite-explanation';
  box.innerHTML='<small>NAUKA</small><p>Wybierz odpowiedź zachowującą te same trzy ściany spotykające się w narożniku.</p>';
}

function advanceOrientationQuestion(){
  clearTimeout(window.orientationAdvanceTimer);
  if(orientationQuestionIndex<ORIENTATION_QUESTIONS.length-1){
    orientationQuestionIndex++;
    renderOrientationQuestion();
  }else{
    orientationLocked=true;
    document.getElementById('orientationAnswers').innerHTML='';
    document.getElementById('orientationNextBtn').classList.add('hidden');
    const box=document.getElementById('orientationExplanation');
    box.className='opposite-explanation good';
    box.innerHTML='<small>ETAP 1 UKOŃCZONY</small><p>Potrafisz już rozpoznać ten sam narożnik kostki po obrocie.</p>';
  }
}

function showOrientationLesson(){
  document.querySelector('.academy-training-intro')?.classList.add('hidden');
  document.getElementById('oppositeLessonPanel')?.classList.add('hidden');
  document.getElementById('cornerLessonPanel')?.classList.add('hidden');
  document.getElementById('orientationLessonPanel')?.classList.remove('hidden');
  renderOrientationQuestion();
}

function hideOrientationLesson(){
  document.getElementById('orientationLessonPanel')?.classList.add('hidden');
}

document.getElementById('orientationNextBtn')?.addEventListener('click',()=>{
  if(orientationLocked)advanceOrientationQuestion();
});

document.getElementById('orientationHintBtn')?.addEventListener('click',()=>{
  openAcademyHintModal(
    'Jak rozpoznać ten sam narożnik po obrocie?',
    ORIENTATION_GENERAL_HINTS,
    'ORIENTACJA KOSTKI',
    'Obrót zmienia położenie ścian, ale nie zmienia zestawu trzech ścian spotykających się w narożniku.'
  );
});

document.getElementById('orientationSolutionBtn')?.addEventListener('click',()=>{
  const q=ORIENTATION_QUESTIONS[orientationQuestionIndex];
  orientationLocked=true;
  const target=document.getElementById('orientationAnswerCube');
  target.innerHTML=orientationCubeHtml(q.answer,'orientation-main-die');
  target.className='orientation-answer-box filled answer-good';

  document.querySelectorAll('#orientationAnswers button').forEach(button=>{
    button.classList.toggle('correct',button.dataset.values===q.answer.join(','));
  });

  const box=document.getElementById('orientationExplanation');
  box.className='opposite-explanation solution';
  box.innerHTML=`<small>ROZWIĄZANIE</small><p>${q.solution}</p>`;

  const next=document.getElementById('orientationNextBtn');
  next.classList.remove('hidden');
  next.textContent='NASTĘPNE PYTANIE ZA 2 SEKUNDY ›';

  clearTimeout(window.orientationAdvanceTimer);
  window.orientationAdvanceTimer=setTimeout(advanceOrientationQuestion,2000);
});


const DICE_ACADEMY_LESSONS=[
 {title:'Najpierw poznaj trzy widoczne ściany',description:'Na kostce widzisz jednocześnie górę, przód i prawy bok. Zapamiętaj trzy liczby, które spotykają się w jednym narożniku. Po obróceniu kostki mogą zmienić miejsce, ale nadal muszą się ze sobą stykać.',rule:'Te same trzy ściany spotykające się w narożniku pozostają razem po każdym obrocie.',tips:['Najpierw znajdź ścianę z liczbą 4. To nasz punkt startowy.','Sprawdź, czy obok 4 nadal znajdują się ściany 2 i 3.','Odrzuć każdą odpowiedź, w której przy 4 pojawia się inna liczba.'],solution:'W odpowiedzi B ściana 4 została przeniesiona na górę. Obok niej nadal znajdują się 2 i 3. Dlatego B zachowuje ten sam narożnik kostki.'},
 {title:'Poznaj ściany przeciwległe',description:'Ściany przeciwległe leżą po dwóch stronach kostki i nigdy nie dotykają się krawędzią. W standardowej kostce są tylko trzy takie pary.',rule:'Pary przeciwległe to 1–6, 2–5 oraz 3–4. Ich suma zawsze wynosi 7.',tips:['Zapamiętaj pierwszą parę: 1 i 6.','Następnie zapamiętaj 2 i 5.','Ostatnia para to 3 i 4.'],solution:'Aby znaleźć ścianę przeciwległą, odejmij liczbę oczek od 7.'},
 {title:'Rozpoznawaj ściany przeciwległe',description:'Ściany przeciwległe nigdy nie są widoczne jednocześnie w jednym narożniku kostki.',rule:'Ściany przeciwległe nigdy nie stykają się krawędzią.',tips:['Zapamiętuj pary ścian przeciwległych.','Odrzucaj odpowiedzi pokazujące je obok siebie.','Najpierw eliminuj niemożliwe układy.'],solution:'A i C pokazują niemożliwe sąsiedztwo. B zachowuje poprawną relację ścian.'},
 {title:'Obracaj kostkę etapami',description:'Wyobrażaj sobie pojedyncze obroty o 90°. To łatwiejsze niż obracanie całej kostki naraz.',rule:'Jeden obrót, jedna kontrola położenia ścian.',tips:['Wybierz oś obrotu.','Ściana na osi obrotu pozostaje na swoim boku.','Po każdym obrocie sprawdź trzy widoczne ściany.'],solution:'Po obrocie ściana górna pozostaje górą, a przednia i boczna zamieniają pozycje. Tak wygląda B.'},
 {title:'Używaj eliminacji',description:'W trudnym zadaniu wystarczy znaleźć jedną błędną relację w każdej złej odpowiedzi.',rule:'Najpierw odrzucaj to, co niemożliwe.',tips:['Porównaj pary sąsiednich ścian.','Sprawdź przeciwległe pary.','Na końcu porównaj kolejność ścian wokół narożnika.'],solution:'A odpada przez złą parę sąsiadów, C przez złą kolejność. B jako jedyna jest możliwa.'}
];
let diceAcademyLesson=0;
function renderDiceAcademy(){
 const l=DICE_ACADEMY_LESSONS[diceAcademyLesson];
 academyTitle.textContent=l.title;academyDescription.textContent=l.description;academyRule.textContent=l.rule;
 academySolutionText.textContent=l.solution;academyProgressText.textContent=`${diceAcademyLesson+1} / 5`;
 academyProgressBar.style.width=`${(diceAcademyLesson+1)*20}%`;
 document.querySelectorAll('[data-lesson]').forEach((b,i)=>{b.classList.toggle('active',i===diceAcademyLesson);b.classList.toggle('completed',i<diceAcademyLesson)});
 academySolution.classList.add('hidden');
 if(window.academyFeedback){academyFeedback.className='academy-feedback';academyFeedback.textContent='Wybierz odpowiedź albo pokaż rozwiązanie.'}
 document.querySelectorAll('[data-academy-answer]').forEach(b=>b.classList.remove('correct','wrong'));
 const nextLessonButton=document.getElementById('academyNextLesson');
 if(nextLessonButton)nextLessonButton.textContent=diceAcademyLesson===4?'ZAKOŃCZ NAUKĘ ✓':'NASTĘPNA LEKCJA ›';
}
document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>{
  diceAcademyLesson=Number(b.dataset.lesson);
  renderDiceAcademy();

  hideOrientationLesson();
  hideOppositeLesson();
  hideCornerLesson();

  if(diceAcademyLesson===0){
    orientationQuestionIndex=0;
    showOrientationLesson();
  }else if(diceAcademyLesson===1){
    oppositeLessonIndex=0;
    showOppositeLesson();
  }else if(diceAcademyLesson===2){
    cornerLessonIndex=0;
    showCornerLesson();
  }else{
    document.querySelector('.academy-training-intro')?.classList.remove('hidden');
  }
});



const academyNextLessonButton=document.getElementById('academyNextLesson');
if(academyNextLessonButton)academyNextLessonButton.onclick=()=>{if(diceAcademyLesson<4){diceAcademyLesson++;renderDiceAcademy()}else academySolution.classList.remove('hidden')};
document.getElementById('academyStartTraining')?.addEventListener('click',()=>startDiceTraining());
const academyDirectTrainingButton=document.getElementById('academyDirectTraining');
if(academyDirectTrainingButton)academyDirectTrainingButton.onclick=()=>startDiceTraining();




let realDieRotation=0;
document.getElementById('rotateRealDieBtn')?.addEventListener('click',()=>{
  realDieRotation=(realDieRotation+1)%4;
  const rotations=[
    'rotateX(-20deg) rotateY(32deg)',
    'rotateX(-18deg) rotateY(122deg)',
    'rotateX(-28deg) rotateY(212deg)',
    'rotateX(-16deg) rotateY(302deg)'
  ];
  document.getElementById('realDie').style.transform=rotations[realDieRotation];
});
document.getElementById('foldCubeNetBtn')?.addEventListener('click',()=>{
  const net=document.getElementById('realCubeNet');
  if(!net)return;
  const folded=net.classList.toggle('folded');
  document.getElementById('foldedCubePreview')?.classList.add('hidden');
  document.getElementById('foldCubeNetBtn').textContent=folded?'ROZŁÓŻ':'ZŁÓŻ';
  document.getElementById('foldCubeNetBtn').setAttribute('aria-pressed',String(folded));
});

function openCubeNet(){
  cubeNetPanel.classList.remove('hidden');
  cubeNetPanel.setAttribute('aria-hidden','false');
}
function closeCubeNet(){
  cubeNetPanel.classList.add('hidden');
  cubeNetPanel.setAttribute('aria-hidden','true');
}
document.getElementById('showCubeNetBtn')?.addEventListener('click',openCubeNet);
document.getElementById('closeCubeNetBtn')?.addEventListener('click',closeCubeNet);
document.getElementById('cubeNetDoneBtn')?.addEventListener('click',closeCubeNet);
document.getElementById('cubeNetPanel')?.addEventListener('click',e=>{if(e.target===e.currentTarget)closeCubeNet()});


/* =========================================================
   Brain Music v1037 — procedural ambient audio engine
   ========================================================= */
const brainMusic={
  audio:new Audio(),
  playing:false,
  sound:'rain',
  name:'Deszcz',
  category:'Natura',
  volume:35,
  timerMinutes:0,
  timerEnd:0,
  timerInterval:null,
  sources:{
    rain:'assets/audio/rain.ogg',
    ocean:'assets/audio/ocean.ogg',
    forest:'assets/audio/forest.ogg',
    fire:'assets/audio/fire.ogg',
    night:'assets/audio/night.ogg',
    alpha:'assets/audio/alpha.ogg',
    deepFocus:'assets/audio/deepFocus.ogg',
    study:'assets/audio/study.ogg',
    meditation:'assets/audio/meditation.ogg',
    pink:'assets/audio/pink.ogg',
    brown:'assets/audio/brown.ogg',
    white:'assets/audio/white.ogg',
    delta:'assets/audio/delta.ogg'
  },
  load(){
    try{
      const saved=JSON.parse(localStorage.getItem('brainMusicSettings')||'{}');
      this.sound=saved.sound||this.sound;
      this.name=saved.name||this.name;
      this.category=saved.category||this.category;
      this.volume=Number.isFinite(saved.volume)?saved.volume:this.volume;
      this.timerMinutes=Number.isFinite(saved.timerMinutes)?saved.timerMinutes:0;
    }catch{}
    this.audio.loop=true;
    this.audio.preload='auto';
    this.audio.src=this.sources[this.sound]||this.sources.rain;
    this.audio.volume=this.volume/100;
    this.audio.addEventListener('play',()=>{this.playing=true;this.updateUI()});
    this.audio.addEventListener('pause',()=>{this.playing=false;this.updateUI()});
  },
  save(){
    localStorage.setItem('brainMusicSettings',JSON.stringify({
      sound:this.sound,name:this.name,category:this.category,
      volume:this.volume,timerMinutes:this.timerMinutes
    }));
  },
  start(){
    const src=this.sources[this.sound]||this.sources.rain;
    if(!this.audio.src.endsWith(src))this.audio.src=src;
    this.audio.loop=true;this.audio.volume=this.volume/100;
    this.audio.play().catch(()=>{});
    this.playing=true;this.startTimer();this.updateUI();
  },
  pause(){this.audio.pause();this.playing=false;this.updateUI()},
  resume(){this.audio.play().catch(()=>{});this.playing=true;this.updateUI()},
  stop(){this.audio.pause();this.audio.currentTime=0;this.playing=false;clearInterval(this.timerInterval);this.timerInterval=null;this.timerEnd=0;this.updateUI()},
  select(sound,name,category){
    const wasPlaying=this.playing;
    this.sound=sound;this.name=name;this.category=category;
    this.audio.pause();this.audio.src=this.sources[sound]||this.sources.rain;this.audio.load();
    this.save();
    if(wasPlaying)this.start();else this.updateUI();
  },
  setVolume(value){this.volume=Number(value);this.audio.volume=this.volume/100;this.save();this.updateUI()},
  setTimer(minutes){this.timerMinutes=Number(minutes);this.save();if(this.playing)this.startTimer();else this.updateTimerUI()},
  startTimer(){
    clearInterval(this.timerInterval);this.timerInterval=null;
    if(!this.timerMinutes){this.timerEnd=0;this.updateTimerUI();return}
    this.timerEnd=Date.now()+this.timerMinutes*60000;
    this.timerInterval=setInterval(()=>{if(Date.now()>=this.timerEnd){this.stop();this.timerEnd=0}this.updateTimerUI()},1000);
    this.updateTimerUI();
  },
  updateTimerUI(){
    const el=document.getElementById('musicTimerDisplay');if(!el)return;
    if(this.timerEnd){const sec=Math.max(0,Math.ceil((this.timerEnd-Date.now())/1000));el.textContent=`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`}
    else el.textContent=this.timerMinutes?`${this.timerMinutes} min`:'Bez limitu';
    document.querySelectorAll('[data-minutes]').forEach(b=>b.classList.toggle('active',Number(b.dataset.minutes)===this.timerMinutes));
  },
  updateUI(){
    const name=document.getElementById('musicCurrentName'),cat=document.getElementById('musicCurrentCategory');
    if(name)name.textContent=this.name;if(cat)cat.textContent=this.category;
    const btn=document.getElementById('musicPlayPause');
    if(btn){btn.querySelector('span').textContent=this.playing?'Ⅱ':'▶';btn.querySelector('b').textContent=this.playing?'PAUZA':'ODTWÓRZ'}
    document.getElementById('musicEqualizer')?.classList.toggle('playing',this.playing);
    document.getElementById('brainMusicBtn')?.classList.toggle('playing',this.playing);
    document.querySelectorAll('.music-track').forEach(b=>{b.classList.toggle('active',b.dataset.sound===this.sound);b.querySelector('i').textContent=b.dataset.sound===this.sound&&this.playing?'Ⅱ':'▶'});
    const vol=document.getElementById('musicVolume');if(vol)vol.value=this.volume;
    const vv=document.getElementById('musicVolumeValue');if(vv)vv.textContent=`${this.volume}%`;
    this.updateTimerUI();
  }
};
brainMusic.load();

function openBrainMusic(){
  const panel=document.getElementById('brainMusicPanel');
  panel.classList.remove('hidden');
  panel.setAttribute('aria-hidden','false');
  brainMusic.updateUI();
}
function closeBrainMusic(){
  const panel=document.getElementById('brainMusicPanel');
  panel.classList.add('hidden');
  panel.setAttribute('aria-hidden','true');
}

document.getElementById('brainMusicBtn').onclick=openBrainMusic;
document.getElementById('closeMusicPanel').onclick=closeBrainMusic;
document.getElementById('musicPanelDone').onclick=closeBrainMusic;
document.getElementById('brainMusicPanel').onclick=e=>{if(e.target.id==='brainMusicPanel')closeBrainMusic()};

document.querySelectorAll('[data-music-tab]').forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll('[data-music-tab]').forEach(b=>b.classList.toggle('active',b===btn));
  document.querySelectorAll('[data-music-group]').forEach(g=>g.classList.toggle('active',g.dataset.musicGroup===btn.dataset.musicTab));
});

document.querySelectorAll('.music-track').forEach(btn=>btn.onclick=()=>{
  brainMusic.select(btn.dataset.sound,btn.dataset.name,btn.dataset.category);
  if(!brainMusic.playing)brainMusic.start();
});

document.getElementById('musicPlayPause').onclick=()=>{
  if(brainMusic.playing)brainMusic.pause();
  else brainMusic.resume();
};
document.getElementById('musicStop').onclick=()=>brainMusic.stop();
document.getElementById('musicVolume').oninput=e=>brainMusic.setVolume(e.target.value);
document.querySelectorAll('[data-minutes]').forEach(btn=>btn.onclick=()=>brainMusic.setTimer(btn.dataset.minutes));

brainMusic.updateUI();


function formatTime(ms){
  const total=Math.floor(ms/1000);
  const min=String(Math.floor(total/60)).padStart(2,'0');
  const sec=String(total%60).padStart(2,'0');
  return `${min}:${sec}`;
}


function escapeCognitive(value){
  return String(value).replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char]);
}

function renderOddOneOutQuestion(question){
  const card=document.querySelector('.question-card');
  card?.classList.remove('matrix-question-card','multirow-question-card','matrix-2x2-card','matrix-3x3-card');
  card?.classList.add('odd-image-question-card');

  document.getElementById('questionCategory').textContent=
    `LOGIKA • CO NIE PASUJE? • ${question.data?.difficultyLabel||'ŁATWY'}`;
  document.getElementById('questionPrompt').textContent=question.prompt;

  const board=document.getElementById('diceSequence');
  board.className='dice-sequence odd-image-board';
  board.innerHTML=question.options.map((item,index)=>`
    <button class="dice-answer odd-image-option" type="button" data-answer="${index}" aria-label="${item.name}">
      <span class="odd-option-letter">${String.fromCharCode(65+index)}</span>
      <img src="${item.image}" alt="${item.name}" draggable="false">
    </button>`).join('');

  const answers=document.getElementById('diceAnswers');
  answers.innerHTML='';
  answers.classList.add('odd-hidden-answers');

  board.querySelectorAll('.odd-image-option').forEach(button=>{
    button.addEventListener('click',()=>{
      if(state.questionEngine?.locked)return;
      state.questionEngine.answer(Number(button.dataset.answer));
    });
  });
}

function renderCognitiveQuestion(question){
  document.querySelector('.question-card')?.classList.remove(
    'matrix-question-card','multirow-question-card','matrix-2x2-card','matrix-3x3-card'
  );

  document.getElementById('questionCategory').textContent=`${question.category} • ${question.data.mode}`;
  document.getElementById('questionPrompt').textContent=question.prompt;

  const board=document.getElementById('diceSequence');
  board.className='dice-sequence cognitive-question-board';
  board.innerHTML=`
    <div class="cognitive-stimulus">${escapeCognitive(question.data.stimulus)}</div>
    <div class="cognitive-arrow">→</div>
    <div class="cognitive-answer-target answer-target">?</div>`;

  const answers=document.getElementById('diceAnswers');
  answers.innerHTML=question.options.map((value,index)=>`
    <button class="dice-answer cognitive-answer" type="button" data-answer="${index}">
      <span>${String.fromCharCode(65+index)}</span>
      <strong>${escapeCognitive(value)}</strong>
    </button>`).join('');

  answers.querySelectorAll('.dice-answer').forEach(button=>{
    button.addEventListener('click',()=>{
      if(state.questionEngine?.locked)return;
      state.questionEngine.answer(Number(button.dataset.answer));
    });
  });
}

function renderDiceQuestion(question){
  const questionCard=document.querySelector('.question-card');
  questionCard?.classList.remove('matrix-question-card','multirow-question-card','matrix-2x2-card','matrix-3x3-card');

  if(question.layout==='matrix2'){
    questionCard?.classList.add('multirow-question-card','matrix-2x2-card');
  }else if(question.layout==='matrix3'){
    questionCard?.classList.add('multirow-question-card','matrix-3x3-card');
  }

  if(document.getElementById('trainingHelpPanel')&&!trainingHelpPanel.classList.contains('hidden'))resetTrainingHelp();
  if(question.family==='odd-one-out') return renderOddOneOutQuestion(question);
  document.querySelector('.question-card')?.classList.remove('odd-image-question-card');
  document.getElementById('diceAnswers')?.classList.remove('odd-hidden-answers');
  if(['cognitive','sequence-training','matchstick'].includes(question.family)) return renderCognitiveQuestion(question);
  if(question.family==='matrix') return renderMatrixQuestion(question);
  document.getElementById('questionCategory').textContent=`${question.category} • ${layoutName(question.layout)}`;
  document.getElementById('questionPrompt').textContent=question.prompt;

  const board=document.getElementById('diceSequence');
  board.className=`dice-sequence layout-${question.layout}`;
  board.innerHTML=renderPuzzleLayout(question);

  const answers=document.getElementById('diceAnswers');
  answers.innerHTML=question.options.map((value,index)=>`
    <button class="dice-answer" type="button" data-answer="${index}"
      aria-label="Odpowiedź ${String.fromCharCode(65+index)}: kostka ${value}">
      <span>${String.fromCharCode(65+index)}</span>
      ${DiceGenerator.diceSvg(value,'answer-die')}
    </button>`).join('');

  answers.querySelectorAll('.dice-answer').forEach(button=>{
    button.addEventListener('click',()=>{
      if(state.questionEngine?.locked)return;
      state.questionEngine.answer(Number(button.dataset.answer));
    });
  });
}

function layoutName(layout){
  return ({
    sequence:'CIĄG',
    analogy:'ANALOGIA',
    analogy3:'ANALOGIA',
    matrix2:'MACIERZ 2×2',
    matrix3:'MACIERZ 3×3',
    odd:'NIEPASUJĄCA',
    balance:'RÓWNOWAGA',
    diamond:'DIAMENT',
    ring:'PIERŚCIEŃ'
  })[layout]||'WZÓR';
}

function dieCell(value,extra=''){
  return `<div class="puzzle-cell ${extra}">
    ${value==null?'<div class="missing-die answer-target">?</div>':DiceGenerator.diceSvg(value,'sequence-die')}
  </div>`;
}

function renderPuzzleLayout(question){
  const d=question.data;
  switch(question.layout){
    case 'sequence':
      return `<div class="sequence-row">${
        d.cells.map(v=>dieCell(v)).join('<div class="sequence-arrow">›</div>')
      }<div class="sequence-arrow">›</div>${dieCell(null,'missing')}</div>`;

    case 'analogy':
      return `<div class="analogy-board">
        ${dieCell(d.cells[0])}<div class="relation-arrow">→</div>${dieCell(d.cells[1])}
        <div class="analogy-divider">:</div>
        ${dieCell(d.cells[2])}<div class="relation-arrow">→</div>${dieCell(null,'missing')}
      </div>`;

    case 'analogy3':
      return `<div class="analogy3-board">
        <div class="pair">${dieCell(d.cells[0])}<span>→</span>${dieCell(d.cells[1])}</div>
        <div class="pair">${dieCell(d.cells[2])}<span>→</span>${dieCell(d.cells[3])}</div>
        <div class="pair">${dieCell(d.cells[4])}<span>→</span>${dieCell(null,'missing')}</div>
      </div>`;

    case 'matrix2':
      return `<div class="matrix-board matrix-2">${
        d.cells.map(v=>dieCell(v,v==null?'missing':'')).join('')
      }</div>`;

    case 'matrix3':
      return `<div class="matrix-board matrix-3">${
        d.cells.map(v=>dieCell(v,v==null?'missing':'')).join('')
      }</div>`;

    case 'odd':
      return `<div class="odd-board">${
        d.cells.map((v,i)=>`<div class="odd-item"><span>${String.fromCharCode(65+i)}</span>${DiceGenerator.diceSvg(v,'sequence-die')}</div>`).join('')
      }</div>`;

    case 'balance':
      return `<div class="balance-board">
        <div class="balance-side">${d.left.map(v=>dieCell(v)).join('')}</div>
        <div class="balance-sign">=</div>
        <div class="balance-side">${dieCell(d.right[0])}${dieCell(null,'missing')}</div>
      </div>`;

    case 'diamond':
      return `<div class="diamond-board">
        <div class="diamond-top">${dieCell(d.cells[0])}</div>
        <div class="diamond-mid">${dieCell(d.cells[1])}${dieCell(d.cells[2])}</div>
        <div class="diamond-bottom">${dieCell(null,'missing')}</div>
      </div>`;

    case 'ring':
      return `<div class="ring-board">${
        d.cells.map((v,i)=>`<div class="ring-pos ring-${i}">${dieCell(v,v==null?'missing':'')}</div>`).join('')
      }<div class="ring-core">?</div></div>`;

    default:
      return '';
  }
}

function renderMatrixQuestion(question){
  document.querySelector('.question-card')?.classList.add('matrix-question-card');
  document.getElementById('questionCategory').textContent=`${question.category} • FIGURY`;
  document.getElementById('questionPrompt').textContent=question.prompt;
  const board=document.getElementById('diceSequence');
  board.className='dice-sequence matrix-shape-board';
  board.innerHTML=`<div class="shape-matrix-grid">${question.data.cells.map(item=>
    item==null?'<div class="shape-matrix-cell missing-shape answer-target">?</div>':`<div class="shape-matrix-cell">${MatrixGenerator.shapeSvg(item,'matrix-main-shape')}</div>`
  ).join('')}</div>`;
  const answers=document.getElementById('diceAnswers');
  answers.innerHTML=question.options.map((item,index)=>`<button class="dice-answer matrix-answer" type="button" data-answer="${index}" aria-label="Odpowiedź ${String.fromCharCode(65+index)}"><span>${String.fromCharCode(65+index)}</span>${MatrixGenerator.shapeSvg(item,'matrix-answer-shape')}</button>`).join('');
  answers.querySelectorAll('.dice-answer').forEach(button=>button.addEventListener('click',()=>{if(state.questionEngine?.locked)return;state.questionEngine.answer(Number(button.dataset.answer));}));
}

function updateQuestionProgress(data){
  document.getElementById('questionCounter').textContent=`${data.current} / ${data.total}`;
  document.getElementById('questionLevel').textContent=data.level;
  document.getElementById('questionProgress').style.width=`${data.progress}%`;
}


function renderSelectedAnswerInTarget(question, selectedIndex, correct){
  const target=document.querySelector('#diceSequence .answer-target');
  if(!target)return;
  const selected=question?.options?.[selectedIndex];
  if(selected==null)return;

  target.classList.remove('answer-target-good','answer-target-bad');
  target.classList.add(correct?'answer-target-good':'answer-target-bad');
  target.innerHTML=question.family==='matrix'
    ? MatrixGenerator.shapeSvg(selected,'matrix-main-shape')
    : ['cognitive','sequence-training','matchstick','odd-one-out'].includes(question.family)
      ? `<strong>${escapeCognitive(selected)}</strong>`
      : DiceGenerator.diceSvg(selected,'sequence-die');
}

function resetSelectedAnswerTarget(question){
  const target=document.querySelector('#diceSequence .answer-target');
  if(!target)return;
  target.classList.remove('answer-target-good','answer-target-bad');
  target.innerHTML=question?.family==='matrix'
    ? '?'
    : ['cognitive','sequence-training','matchstick','odd-one-out'].includes(question?.family)
      ? '?'
      : '<div class="missing-die">?</div>';
}

function showQuestionFeedback({correct,correctIndex,selectedIndex,responseMs}){
  const buttons=[...document.querySelectorAll('.dice-answer')];
  const question=state.questionEngine?.current;

  if(question?.family!=='odd-one-out') renderSelectedAnswerInTarget(question,selectedIndex,correct);

  buttons.forEach((button,index)=>{
    button.disabled=true;
    if(index===selectedIndex)button.classList.add(correct?'correct':'wrong');
  });

  document.querySelector('.question-card')?.classList.add(correct?'flash-correct':'flash-wrong');
  setTimeout(()=>document.querySelector('.question-card')?.classList.remove('flash-correct','flash-wrong'),420);

  const isTextFamily=['cognitive','sequence-training','matchstick','odd-one-out'].includes(question?.family);
  const h=isTextFamily ? {solution:`${question.data?.explanation||'Poprawna odpowiedź została rozpoznana.'}${question.family==='odd-one-out'?'':` Poprawna odpowiedź: ${question.answer}.`}`} : diceTrainingHints(question);
  if(correct){
    trainingExplanation.className='training-explanation good';
    if(question?.category==='REFLEKS'){
      const reaction=(responseMs/1000).toFixed(2).replace('.',',');
      trainingExplanation.innerHTML=`<small>DOBRZE • CZAS REAKCJI ${reaction} s</small><p>${h.solution}</p>`;
    }else{
      trainingExplanation.innerHTML=`<small>DOBRZE</small><p>${h.solution}</p>`;
    }
  }else{
    trainingExplanation.className='training-explanation bad';
    trainingExplanation.innerHTML='<small>ZŁA ODPOWIEDŹ</small><p>Spróbuj ponownie. Za chwilę możesz zaznaczyć inną odpowiedź.</p>';
    setTimeout(()=>{
      resetSelectedAnswerTarget(question);
      buttons.forEach(button=>{
        button.disabled=false;
        button.classList.remove('wrong','correct');
      });
      trainingExplanation.className='training-explanation';
      trainingExplanation.innerHTML='<small>SPRÓBUJ PONOWNIE</small><p>To samo pytanie pozostaje na ekranie. Wybierz inną odpowiedź.</p>';
    },1600);
  }
}

function finishDicePreview(summary){
  clearInterval(state.timerId);
  const minutes=formatTime(summary.elapsedMs);
  modal(
    'Podgląd generatora zakończony',
    `Poprawne odpowiedzi: ${summary.correct}/${summary.total} (${summary.percent}%). Czas: ${minutes}. W następnych wersjach ten wynik zostanie przekazany do raportu Brain Score.`,
    '⬡'
  );
  nav('home');
}


let diceTrainingMode=false;

function diceTrainingHints(question){
  const layout=question.layout;
  const d=question.data;
  const answer=question.answer;

  if(layout==='sequence'){
    return {
      hint1:'Przeczytaj kostki od lewej do prawej. Sprawdź, o ile zmienia się liczba oczek między kolejnymi polami.',
      hint2:'Szukaj powtarzającego się kroku, naprzemienności albo par. Nie zgaduj na podstawie ostatniej kostki.',
      solution:`Poprawna odpowiedź to kostka z liczbą ${answer}. Reguła ciągu prowadzi właśnie do tej wartości.`
    };
  }
  if(layout==='analogy'||layout==='analogy3'){
    return {
      hint1:'Najpierw ustal zmianę w pierwszej parze: dodawanie, odejmowanie albo ściana przeciwległa.',
      hint2:'Zastosuj dokładnie tę samą zmianę do ostatniej kostki.',
      solution:`Poprawna odpowiedź to ${answer}. W każdej parze działa ta sama zmiana.`
    };
  }
  if(layout==='matrix2'||layout==='matrix3'){
    return {
      hint1:'Porównaj cały pierwszy wiersz lub kolumnę. Odkryj, jak z wcześniejszych pól powstaje ostatnie.',
      hint2:'Sprawdź tę samą regułę w kolejnym wierszu. Dopiero wtedy zastosuj ją w polu ze znakiem zapytania.',
      solution:`Brakujące pole powinno mieć ${answer} oczek. Ta sama reguła działa w każdym wierszu lub każdej kolumnie.`
    };
  }
  if(layout==='odd'){
    return {
      hint1:'Porównaj wszystkie kostki i poszukaj jednej, która nie pasuje do wspólnej reguły.',
      hint2:'Sprawdź parzystość, kolejność, powtarzanie oraz wartości przeciwległe.',
      solution:`Prawidłowy wybór odpowiada wartości ${answer}, ponieważ jako jedyna łamie wspólną regułę.`
    };
  }
  return {
    hint1:'Najpierw ustal, co łączy pokazane kostki.',
    hint2:'Sprawdź wartości, kolejność oraz pary przeciwległe sumujące się do 7.',
    solution:`Poprawna odpowiedź to kostka z liczbą ${answer}.`
  };
}


function trainingHintModalData(question){
  const layout=question?.layout || question?.meta?.layout || 'sequence';

  if(['sequence-training','matchstick','odd-one-out'].includes(question?.family)){
    const sets={
      'sequence-training':[
        {title:'Porównaj kolejne elementy',text:'Sprawdź, co zmienia się z kroku na krok.'},
        {title:'Szukaj jednej reguły',text:'Reguła musi pasować do całego ciągu.'},
        {title:'Sprawdź cykl',text:'Zwróć uwagę na naprzemienność, dodawanie, mnożenie i powtarzanie.'}],
      matchstick:[
        {title:'Tylko jeden ruch',text:'Możesz przenieść dokładnie jedną zapałkę.'},
        {title:'Sprawdź cały układ',text:'Zmiana musi poprawić całe równanie albo figurę.'},
        {title:'Szukaj najmniejszej zmiany',text:'Najczęściej zmienia się znak lub jedna cyfra.'}],
      'odd-one-out':[
        {title:'Znajdź wspólną cechę',text:'Najpierw ustal, co łączy większość elementów.'},
        {title:'Porównaj kategorię',text:'Sprawdź kształt, znaczenie, liczbę lub właściwość.'},
        {title:'Wskaż wyjątek',text:'Poprawna odpowiedź jako jedyna łamie wspólną zasadę.'}]};
    return {title:'Jak podejść do tego zadania?',hints:sets[question.family],remember:question.data?.hint||'Najpierw znajdź regułę.'};
  }

  if(question?.family==='cognitive'){
    const category=question.category;
    const categoryHints={
      REFLEKS:[
        {title:'Patrz na cały układ',text:'Nie analizuj pojedynczych elementów zbyt długo. Najpierw zauważ dominujący wzór.'},
        {title:'Reaguj po sprawdzeniu',text:'Szybkość jest ważna, ale najpierw potwierdź wybór jednym krótkim spojrzeniem.'},
        {title:'Ogranicz rozpraszanie',text:'Skup wzrok wyłącznie na symbolach i ignoruj pozostałe elementy ekranu.'}
      ],
      KONCENTRACJA:[
        {title:'Porównuj systematycznie',text:'Przesuwaj wzrok od lewej do prawej i nie pomijaj żadnego elementu.'},
        {title:'Szukaj jednej różnicy',text:'Porównuj kształt, wypełnienie, kierunek i położenie.'},
        {title:'Sprawdź wybór',text:'Przed zaznaczeniem upewnij się, że pozostałe elementy są identyczne.'}
      ],
      WIEDZA:[
        {title:'Najpierw odrzuć błędne',text:'Usuń odpowiedzi, które na pewno nie pasują do pytania.'},
        {title:'Porównaj pozostałe',text:'Zwróć uwagę na dokładne znaczenie słów w pytaniu.'},
        {title:'Nie zmieniaj odpowiedzi bez powodu',text:'Pierwszy wybór często jest poprawny, gdy wynika z pewnej wiedzy.'}
      ],
      WYOBRAŹNIA:[
        {title:'Ustal punkt początkowy',text:'Najpierw zapamiętaj kierunek lub położenie figury.'},
        {title:'Wykonuj obrót krokami',text:'Każdy obrót o 90° traktuj jako osobny ruch.'},
        {title:'Sprawdź kierunek obrotu',text:'Upewnij się, czy obrót jest w prawo, czy w lewo.'}
      ]
    };
    return {
      title:`Jak rozwiązywać zadania: ${category.toLowerCase()}?`,
      hints:categoryHints[category]||[],
      remember:question.data.hint||'Najpierw rozpoznaj zasadę, a dopiero potem wybierz odpowiedź.'
    };
  }

  if(question?.family==='matrix'){
    return {
      title:'Jak analizować matrycę logiczną?',
      hints:[
        {title:'Najpierw sprawdź wiersze',text:'Porównaj elementy od lewej do prawej i zobacz, co się przesuwa, dodaje, znika albo zmienia.'},
        {title:'Potem sprawdź kolumny',text:'Ta sama lub uzupełniająca reguła może działać z góry na dół.'},
        {title:'Wybierz odpowiedź pasującą do obu kierunków',text:'Poprawny element powinien jednocześnie kończyć ostatni wiersz i ostatnią kolumnę.'}
      ],
      remember:'Nie zgaduj po jednym polu — reguła musi pasować do całej matrycy.'
    };
  }

  if(layout==='sequence'){
    return {
      title:'Jak analizować ciąg kostek?',
      hints:[
        {title:'Porównuj kolejne elementy',text:'Sprawdź, co zmienia się między pierwszą i drugą kostką, a następnie między drugą i trzecią.'},
        {title:'Szukaj jednej powtarzalnej reguły',text:'Zwróć uwagę na dodawanie, odejmowanie, naprzemienność, powtarzanie albo zmianę o stałą wartość.'},
        {title:'Sprawdź regułę na całym ciągu',text:'Dobra reguła musi pasować do wszystkich pokazanych przejść, a nie tylko do jednej pary.'}
      ],
      remember:'Najpierw znajdź zmianę między elementami, a dopiero potem zastosuj ją do pola ze znakiem zapytania.'
    };
  }

  if(layout==='analogy'||layout==='analogy3'){
    return {
      title:'Jak rozwiązać analogię kostek?',
      hints:[
        {title:'Odkryj zmianę w pierwszej parze',text:'Sprawdź, w jaki sposób pierwsza kostka przechodzi w drugą.'},
        {title:'Nie zmieniaj reguły',text:'Dokładnie tę samą operację trzeba zastosować do kolejnej kostki.'},
        {title:'Porównaj wszystkie odpowiedzi',text:'Odrzuć warianty, które stosują inną zmianę niż ta pokazana w pierwszej parze.'}
      ],
      remember:'W analogii po obu stronach działa dokładnie ta sama zasada.'
    };
  }

  if(layout==='matrix2'||layout==='matrix3'){
    return {
      title:'Jak analizować matrycę kostek?',
      hints:[
        {title:'Zacznij od pełnego wiersza lub kolumny',text:'Najpierw znajdź fragment matrycy, w którym wszystkie pola są już widoczne.'},
        {title:'Odkryj zależność',text:'Sprawdź, czy ostatnie pole powstaje przez dodawanie, odejmowanie, zamianę albo powtarzanie wcześniejszych wartości.'},
        {title:'Zastosuj tę samą zasadę',text:'Reguła z pełnego wiersza lub kolumny musi działać również tam, gdzie znajduje się znak zapytania.'}
      ],
      remember:'W całej matrycy obowiązuje ta sama zależność.'
    };
  }

  if(layout==='odd'){
    return {
      title:'Jak znaleźć element niepasujący?',
      hints:[
        {title:'Znajdź wspólną cechę',text:'Porównaj wszystkie kostki i ustal zasadę, którą spełnia większość z nich.'},
        {title:'Sprawdzaj kilka możliwości',text:'Zwróć uwagę na parzystość, kolejność, powtarzalność i relacje między wartościami.'},
        {title:'Wybierz jedyny wyjątek',text:'Poprawna odpowiedź to ta kostka, która jako jedyna łamie wspólną regułę.'}
      ],
      remember:'Najpierw znajdź regułę większości, a dopiero potem wskaż wyjątek.'
    };
  }

  return {
    title:'Jak podejść do tego zadania?',
    hints:[
      {title:'Obejrzyj cały układ',text:'Nie skupiaj się tylko na jednej kostce. Porównaj wszystkie elementy pytania.'},
      {title:'Szukaj prostej reguły',text:'Sprawdź kolejność, zmianę wartości, powtarzanie i relacje między kostkami.'},
      {title:'Eliminuj odpowiedzi',text:'Odrzuć warianty, które nie pasują do reguły widocznej w całym zadaniu.'}
    ],
    remember:'Poprawna reguła musi wyjaśniać cały układ.'
  };
}

function showTrainingHints(){
  const question=state.questionEngine?.current;
  if(!question)return;
  const data=trainingHintModalData(question);
  openAcademyHintModal(data.title,data.hints,'TRENING KOSTEK',data.remember);
}

function resetTrainingHelp(){
  if(!diceTrainingMode)return;
  trainingHelpPanel.classList.remove('hidden');
  trainingNextQuestion.classList.add('hidden');
  trainingExplanation.className='training-explanation';
  trainingExplanation.innerHTML='<small>POWTÓRKA MATERIAŁU</small><p>To etap sprawdzający poznane zasady i umiejętności.</p>';
}

function showTrainingText(kind){
  const q=state.questionEngine?.current;
  if(!q)return;
  const h=diceTrainingHints(q);
  const labels={hint1:'WSKAZÓWKA 1',hint2:'WSKAZÓWKA 2',solution:'ROZWIĄZANIE'};
  trainingExplanation.innerHTML=`<small>${labels[kind]}</small><p>${h[kind]}</p>`;
  trainingExplanation.className=`training-explanation ${kind==='solution'?'solution':''}`;
}

function startDiceTraining(){
  diceTrainingMode=true;
  state.participant={firstName:'Trening',lastName:'Kostki',age:18,count:20,mode:'adaptive'};
  nav('question');
  questionCategory.textContent='TRENING • KOSTKI';
  state.testStartedAt=Date.now();
  clearInterval(state.timerId);
  questionTimer.textContent='00:00';
  state.timerId=setInterval(()=>questionTimer.textContent=formatTime(Date.now()-state.testStartedAt),1000);

  state.questionEngine=new QuestionEngine({
    generator:DiceGenerator,
    manualAdvance:false,
    retryIncorrect:true,
    autoAdvanceDelay:2000,
    onRender:q=>{
      renderDiceQuestion(q);
      resetTrainingHelp();
    },
    onProgress:updateQuestionProgress,
    onFeedback:showQuestionFeedback,
    onFinish:summary=>{
      clearInterval(state.timerId);
      diceTrainingMode=false;
      trainingHelpPanel.classList.add('hidden');
      modal('Trening Kostek ukończony',`Poprawne odpowiedzi: ${summary.correct}/${summary.total} (${summary.percent}%).`,'⬡');
      nav('training-category');
      renderTrainingCategory('logic');
    }
  });
  state.questionEngine.start(20,'adaptive');
}

document.getElementById('trainingHint1')?.addEventListener('click',showTrainingHints);
document.getElementById('trainingShowSolution')?.addEventListener('click',()=>showTrainingText('solution'));
document.getElementById('trainingNextQuestion')?.classList.add('hidden');



function startMatrixTraining(){
  diceTrainingMode=true;
  trainingHelpPanel.classList.remove('hidden');
  resetTrainingHelp();

  state.participant=state.participant||{firstName:'Trening',lastName:'Matryce',age:18,count:20,mode:'adaptive'};
  nav('question');
  state.testStartedAt=Date.now();
  clearInterval(state.timerId);
  document.getElementById('questionTimer').textContent='00:00';
  state.timerId=setInterval(()=>{
    document.getElementById('questionTimer').textContent=formatTime(Date.now()-state.testStartedAt);
  },1000);

  state.questionEngine=new QuestionEngine({
    generator:MatrixGenerator,
    manualAdvance:false,
    retryIncorrect:true,
    autoAdvanceDelay:2000,
    onRender:q=>{
      renderDiceQuestion(q);
      resetTrainingHelp();
    },
    onProgress:updateQuestionProgress,
    onFeedback:showQuestionFeedback,
    onFinish:summary=>{
      clearInterval(state.timerId);
      diceTrainingMode=false;
      trainingHelpPanel.classList.add('hidden');
      modal('Trening Matryc ukończony',`Poprawne odpowiedzi: ${summary.correct}/${summary.total} (${summary.percent}%).`,'▦');
      nav('training-category');
      renderTrainingCategory('logic');
    }
  });
  state.questionEngine.start(20,'adaptive');
}


let activeTrainingCategory='logic';



/* =========================================================
   v1082 — interaktywny trening Zapałki
   ========================================================= */

const MATCH_SEGMENTS={
  0:['a','b','c','d','e','f'],
  1:['b','c'],
  2:['a','b','d','e','g'],
  3:['a','b','c','d','g'],
  4:['b','c','f','g'],
  5:['a','c','d','f','g'],
  6:['a','c','d','e','f','g'],
  7:['a','b','c'],
  8:['a','b','c','d','e','f','g'],
  9:['a','b','c','d','f','g'],
  '+':['h','v'],
  '-':['h'],
  '=':['u','w']
};

const MATCH_PUZZLES=[{initial:[0,"+",0,"=",8],target:[8,"-",0,"=",8],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",1,"=",8],target:[8,"+",1,"=",9],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",2,"=",8],target:[6,"+",2,"=",8],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",3,"=",8],target:[0,"+",9,"=",9],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",7,"=",9],target:[8,"+",1,"=",9],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"-",0,"=",8],target:[0,"+",0,"=",0],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"-",1,"=",5],target:[6,"-",1,"=",5],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",0,"=",1],target:[9,"-",8,"=",1],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",1,"=",7],target:[0,"+",1,"=",1],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",1,"=",0],target:[9,"-",1,"=",8],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",1,"=",8],target:[9,"-",1,"=",8],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",1,"=",4],target:[0,"+",7,"=",7],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",2,"=",4],target:[6,"-",2,"=",4],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",1,"=",5],target:[5,"+",1,"=",6],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",2,"=",7],target:[9,"-",2,"=",7],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"+",7,"=",0],target:[8,"+",1,"=",9],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",2,"=",8],target:[8,"-",2,"=",6],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"-",0,"=",7],target:[9,"-",8,"=",1],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",3,"=",3],target:[6,"-",3,"=",3],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"-",1,"=",6],target:[5,"+",1,"=",6],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",4,"=",2],target:[6,"-",4,"=",2],moves:1,difficulty:"ŁATWY",hint:"Szukaj jednej zmiany, która jednocześnie odbierze zapałkę z jednego miejsca i uzupełni inne."},{initial:[0,"-",2,"=",0],target:[0,"+",2,"=",2],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",2,"=",3],target:[6,"-",3,"=",3],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",2,"=",5],target:[3,"+",2,"=",5],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",3,"=",2],target:[6,"-",3,"=",3],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",3,"=",7],target:[9,"-",2,"=",7],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",4,"=",6],target:[2,"+",4,"=",6],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."},{initial:[0,"-",5,"=",3],target:[6,"-",3,"=",3],moves:2,difficulty:"ŚREDNI",hint:"To zadanie nie ma rozwiązania jednym ruchem. Wykonaj dwa osobne przeniesienia zapałek."}];

let matchPuzzleIndex=0;
let matchSelected=null;
let matchInitialSet=new Set();
let matchActiveSet=new Set();
let matchTargetSet=new Set();
let matchMoveHistory=[];
let matchTimerId=null;
let matchStartedAt=0;
let matchInteractiveMode=false;

function matchSymbolSlots(symbol,position){
  const digitSlots=['a','b','c','d','e','f','g'];
  const operatorSlots=symbol==='='?['u','w']:['h','v'];
  const slots=typeof symbol==='number'?digitSlots:operatorSlots;
  return slots.map(segment=>`${position}:${segment}`);
}

function matchSetForEquation(equation){
  const set=new Set();
  equation.forEach((symbol,position)=>{
    (MATCH_SEGMENTS[symbol]||[]).forEach(segment=>set.add(`${position}:${segment}`));
  });
  return set;
}

function matchSegmentClass(segment){
  if(['a','d','g','h','u','w'].includes(segment))return 'horizontal';
  return 'vertical';
}

function renderMatchSymbol(symbol,position){
  const slots=matchSymbolSlots(symbol,position);
  return `<div class="match-symbol ${typeof symbol==='number'?'match-digit':'match-operator'}" data-position="${position}">
    ${slots.map(key=>{
      const segment=key.split(':')[1];
      const active=matchActiveSet.has(key);
      return `<button type="button" class="match-slot ${matchSegmentClass(segment)} ${active?'active':''} ${matchSelected===key?'selected':''}" data-match-key="${key}" aria-label="Zapałka"></button>`;
    }).join('')}
  </div>`;
}

function matchEquationText(eq){
  return `${eq[0]} ${eq[1]} ${eq[2]} ${eq[3]} ${eq[4]}`;
}


function currentMatchMoveLimit(){
  return MATCH_PUZZLES[matchPuzzleIndex]?.moves||1;
}

function setMatchStatus(text,type=''){
  const status=document.getElementById('matchStatus');
  if(!status)return;
  status.textContent=text;
  status.className=`match-status ${type}`.trim();
}

function renderInteractiveMatchsticks(){
  const puzzle=MATCH_PUZZLES[matchPuzzleIndex];
  document.querySelector('.question-card')?.classList.add('matchstick-question-card');
  document.getElementById('questionCategory').textContent='LOGIKA • ZAPAŁKI';
  document.getElementById('questionCounter').textContent=`${matchPuzzleIndex+1} / ${MATCH_PUZZLES.length}`;
  document.getElementById('questionLevel').textContent=String(Math.min(10,matchPuzzleIndex+1));
  document.getElementById('questionProgress').style.width=`${((matchPuzzleIndex+1)/MATCH_PUZZLES.length)*100}%`;
    const moveLimit=currentMatchMoveLimit();
  document.getElementById('questionPrompt').textContent=
    `Przenieś ${moveLimit===1?'jedną zapałkę':'dokładnie dwie zapałki'}, aby równanie było poprawne.`;
  document.getElementById('questionLevel').textContent=
    `${puzzle.difficulty} • ${moveLimit} ${moveLimit===1?'RUCH':'RUCHY'}`;

  const board=document.getElementById('diceSequence');
  board.className='dice-sequence interactive-match-board';
  board.innerHTML=`
    <div class="match-instruction">Kliknij zapałkę, którą chcesz zabrać, a następnie kliknij wolne miejsce. Ruchy: ${matchMoveHistory.length}/${moveLimit}</div>
    <div class="match-equation">
      ${puzzle.initial.map((symbol,position)=>renderMatchSymbol(symbol,position)).join('')}
    </div>
    <div id="matchStatus" class="match-status">Wykonaj dokładnie ${moveLimit} ${moveLimit===1?'ruch':'ruchy'}.</div>`;

  const title=document.querySelector('.answer-title');
  if(title)title.classList.add('hidden');

  const answers=document.getElementById('diceAnswers');
  answers.className='dice-answers match-controls';
  answers.innerHTML=`
    <button type="button" id="matchUndoBtn">↶ COFNIJ</button>
    <button type="button" id="matchResetBtn">↺ RESET</button>
    <button type="button" id="matchHintBtn">💡 PODPOWIEDŹ</button>
    <button type="button" id="matchCheckBtn" class="match-check">✓ SPRAWDŹ</button>`;

  document.getElementById('trainingHelpPanel')?.classList.add('hidden');

  board.querySelectorAll('[data-match-key]').forEach(slot=>slot.addEventListener('click',()=>{
    handleMatchSlot(slot.dataset.matchKey);
  }));
  document.getElementById('matchUndoBtn').onclick=undoMatchMove;
  document.getElementById('matchResetBtn').onclick=resetMatchPuzzle;
  document.getElementById('matchHintBtn').onclick=()=>openAcademyHintModal(
    'Jak rozwiązać zadanie z zapałkami?',
    [
      {title:'Najpierw oceń równanie',text:'Sprawdź, która cyfra lub znak powoduje, że wynik jest błędny.'},
      {title:'Każdy ruch ma dwa skutki',text:'Zabierasz zapałkę z jednego miejsca i odkładasz ją w innym.'},
      {title:'Sprawdź obie zmiany',text:'Po ruchu wszystkie cyfry i znaki muszą być prawidłowe.'}
    ],
    'ZAPAŁKI',
    `${puzzle.hint} Zagadka została sprawdzona tak, aby minimalna liczba ruchów wynosiła dokładnie ${puzzle.moves}.`
  );
  document.getElementById('matchCheckBtn').onclick=checkMatchPuzzle;
}

function handleMatchSlot(key){
  const moveLimit=currentMatchMoveLimit();

  if(matchMoveHistory.length>=moveLimit){
    setMatchStatus(`Wykonano już ${moveLimit} ${moveLimit===1?'ruch':'ruchy'}. Użyj COFNIJ albo RESET.`,'bad');
    return;
  }

  if(matchSelected===null){
    if(!matchActiveSet.has(key)){
      setMatchStatus('Najpierw wybierz zapałkę, którą chcesz przenieść.','bad');
      return;
    }
    matchSelected=key;
    renderInteractiveMatchsticks();
    setMatchStatus('Teraz wybierz wolne miejsce dla tej zapałki.','selected');
    return;
  }

  if(matchSelected===key){
    matchSelected=null;
    renderInteractiveMatchsticks();
    setMatchStatus('Wybór anulowany.');
    return;
  }

  if(matchActiveSet.has(key)){
    matchSelected=key;
    renderInteractiveMatchsticks();
    setMatchStatus('Wybrano inną zapałkę. Teraz wskaż wolne miejsce.','selected');
    return;
  }

  const from=matchSelected;
  matchActiveSet.delete(from);
  matchActiveSet.add(key);
  matchMoveHistory.push({from,to:key});
  matchSelected=null;
  renderInteractiveMatchsticks();

  const left=moveLimit-matchMoveHistory.length;
  if(left>0){
    setMatchStatus(`Pierwszy ruch wykonany. Pozostało ruchów: ${left}.`,'ready');
  }else{
    setMatchStatus('Wszystkie ruchy wykonane. Kliknij SPRAWDŹ.','ready');
  }
}

function undoMatchMove(){
  const move=matchMoveHistory.pop();
  if(!move)return;
  matchActiveSet.delete(move.to);
  matchActiveSet.add(move.from);
  matchSelected=null;
  renderInteractiveMatchsticks();
}

function resetMatchPuzzle(){
  matchActiveSet=new Set(matchInitialSet);
  matchMoveHistory=[];
  matchSelected=null;
  renderInteractiveMatchsticks();
}

function setsEqual(a,b){
  if(a.size!==b.size)return false;
  for(const value of a)if(!b.has(value))return false;
  return true;
}


function matchSignature(segments){
  return [...segments].sort().join(',');
}

const MATCH_REVERSE_DIGITS=Object.fromEntries(
  Object.entries(MATCH_SEGMENTS)
    .filter(([symbol])=>/^\d$/.test(symbol))
    .map(([symbol,segments])=>[matchSignature(segments),Number(symbol)])
);

const MATCH_REVERSE_OPERATORS=Object.fromEntries(
  Object.entries(MATCH_SEGMENTS)
    .filter(([symbol])=>['+','-','='].includes(symbol))
    .map(([symbol,segments])=>[matchSignature(segments),symbol])
);

function decodeMatchSymbol(position, expectedType){
  const segments=[];
  for(const key of matchActiveSet){
    const [pos,segment]=key.split(':');
    if(Number(pos)===position)segments.push(segment);
  }

  const signature=matchSignature(segments);
  return expectedType==='digit'
    ? MATCH_REVERSE_DIGITS[signature]
    : MATCH_REVERSE_OPERATORS[signature];
}

function evaluateCurrentMatchEquation(){
  const left=decodeMatchSymbol(0,'digit');
  const operator=decodeMatchSymbol(1,'operator');
  const right=decodeMatchSymbol(2,'digit');
  const equals=decodeMatchSymbol(3,'operator');
  const result=decodeMatchSymbol(4,'digit');

  if(
    left===undefined ||
    right===undefined ||
    result===undefined ||
    !['+','-'].includes(operator) ||
    equals!=='='
  ){
    return {
      valid:false,
      reason:'Po ruchu wszystkie cyfry i znaki muszą mieć prawidłowy kształt.'
    };
  }

  const calculated=operator==='+' ? left+right : left-right;
  return {
    valid:true,
    correct:calculated===result,
    text:`${left} ${operator} ${right} = ${result}`
  };
}

function checkMatchPuzzle(){
  const status=document.getElementById('matchStatus');
  const moveLimit=currentMatchMoveLimit();
  if(matchMoveHistory.length!==moveLimit){
    status.textContent=`Najpierw wykonaj dokładnie ${moveLimit} ${moveLimit===1?'ruch':'ruchy'}.`;
    status.className='match-status bad';
    return;
  }

  const evaluation=evaluateCurrentMatchEquation();

  if(!evaluation.valid){
    status.textContent=evaluation.reason;
    status.className='match-status bad';
    return;
  }

  if(evaluation.correct){
    status.textContent=`DOBRZE! ${evaluation.text}`;
    status.className='match-status good';
    document.querySelector('.interactive-match-board')?.classList.add('match-correct');
    setTimeout(()=>{
      matchPuzzleIndex++;
      if(matchPuzzleIndex>=MATCH_PUZZLES.length){
        clearInterval(matchTimerId);
        matchInteractiveMode=false;
        modal('Trening Zapałek ukończony',`Ukończyłeś ${MATCH_PUZZLES.length} zweryfikowanych zagadek. Każda wymagała dokładnie podanej liczby ruchów.`,'╱');
        nav('training-category');
        renderTrainingCategory('logic');
        return;
      }
      loadMatchPuzzle();
    },1800);
  }else{
    status.textContent=`Równanie ${evaluation.text} nadal jest nieprawidłowe. Cofnij ruch i spróbuj ponownie.`;
    status.className='match-status bad';
  }
}

function loadMatchPuzzle(){
  const puzzle=MATCH_PUZZLES[matchPuzzleIndex];
  matchInitialSet=matchSetForEquation(puzzle.initial);
  matchTargetSet=matchSetForEquation(puzzle.target);
  matchActiveSet=new Set(matchInitialSet);
  matchMoveHistory=[];
  matchSelected=null;
  renderInteractiveMatchsticks();
}

function startInteractiveMatchsticks(){
  matchInteractiveMode=true;
  diceTrainingMode=true;
  activeTrainingCategory='logic';
  matchPuzzleIndex=0;
  nav('question');
  clearInterval(state.timerId);
  matchStartedAt=Date.now();
  document.getElementById('questionTimer').textContent='00:00';
  matchTimerId=setInterval(()=>{
    document.getElementById('questionTimer').textContent=formatTime(Date.now()-matchStartedAt);
  },1000);
  state.timerId=matchTimerId;
  loadMatchPuzzle();
}


function logicGeneratorFor(gameId){
  return {sequences:SequenceGenerator,matches:MatchstickGenerator,odd:OddOneOutGenerator}[gameId]||null;
}
function startLogicTraining(gameId,title){
  const generator=logicGeneratorFor(gameId); if(!generator)return;
  activeTrainingCategory='logic'; diceTrainingMode=true; trainingHelpPanel.classList.remove('hidden'); resetTrainingHelp();
  state.participant=state.participant||{firstName:'Trening',lastName:title,age:18,count:20,mode:'adaptive'};
  nav('question'); state.testStartedAt=Date.now(); clearInterval(state.timerId);
  document.getElementById('questionTimer').textContent='00:00';
  state.timerId=setInterval(()=>{document.getElementById('questionTimer').textContent=formatTime(Date.now()-state.testStartedAt);},1000);
  state.questionEngine=new QuestionEngine({generator,manualAdvance:false,retryIncorrect:true,autoAdvanceDelay:2000,
    onRender:q=>{renderDiceQuestion(q);resetTrainingHelp();},onProgress:updateQuestionProgress,onFeedback:showQuestionFeedback,
    onFinish:summary=>{clearInterval(state.timerId);diceTrainingMode=false;trainingHelpPanel.classList.add('hidden');modal(`${title} — ukończono`,`Poprawne odpowiedzi: ${summary.correct}/${summary.total} (${summary.percent}%).`,'◇');nav('training-category');renderTrainingCategory('logic');}});
  state.questionEngine.start(20,'adaptive');
}

function startCognitiveTraining(gameId,title){
  const generator=CognitiveGenerators.forGame(gameId);
  if(!generator)return;

  const categoryMap={
    green:'reflex',
    differences:'focus',
    animals:'knowledge',
    rotate:'imagination'
  };
  activeTrainingCategory=categoryMap[gameId]||'logic';
  diceTrainingMode=true;
  trainingHelpPanel.classList.remove('hidden');
  resetTrainingHelp();

  state.participant=state.participant||{firstName:'Trening',lastName:title,age:18,count:20,mode:'adaptive'};
  nav('question');
  state.testStartedAt=Date.now();
  clearInterval(state.timerId);
  document.getElementById('questionTimer').textContent='00:00';
  state.timerId=setInterval(()=>{
    document.getElementById('questionTimer').textContent=formatTime(Date.now()-state.testStartedAt);
  },1000);

  const isReflex=gameId==='green';
  state.questionEngine=new QuestionEngine({
    generator,
    manualAdvance:false,
    retryIncorrect:true,
    autoAdvanceDelay:isReflex?650:2000,
    onRender:q=>{renderDiceQuestion(q);resetTrainingHelp();},
    onProgress:updateQuestionProgress,
    onFeedback:showQuestionFeedback,
    onFinish:summary=>{
      clearInterval(state.timerId);
      diceTrainingMode=false;
      trainingHelpPanel.classList.add('hidden');
      const resultText=isReflex
        ? `Poprawne odpowiedzi: ${summary.correct}/${summary.total} (${summary.percent}%). Średni czas reakcji: ${(summary.averageMs/1000).toFixed(2).replace('.',',')} s.`
        : `Poprawne odpowiedzi: ${summary.correct}/${summary.total} (${summary.percent}%).`;
      modal(`${title} — ukończono`,resultText,'✦');
      nav('training-category');
      renderTrainingCategory(activeTrainingCategory);
    }
  });
  state.questionEngine.start(20,'adaptive');
}

function startDailyChallenge(){
  activeTrainingCategory='daily';
  diceTrainingMode=true;
  trainingHelpPanel.classList.remove('hidden');
  resetTrainingHelp();

  state.participant=state.participant||{firstName:'Wyzwanie',lastName:'Dnia',age:18,count:20,mode:'adaptive'};
  nav('question');
  state.testStartedAt=Date.now();
  clearInterval(state.timerId);
  document.getElementById('questionTimer').textContent='00:00';
  state.timerId=setInterval(()=>{
    document.getElementById('questionTimer').textContent=formatTime(Date.now()-state.testStartedAt);
  },1000);

  state.questionEngine=new QuestionEngine({
    generator:DailyMixedGenerator,
    manualAdvance:false,
    retryIncorrect:true,
    autoAdvanceDelay:2000,
    onRender:q=>{renderDiceQuestion(q);resetTrainingHelp();},
    onProgress:updateQuestionProgress,
    onFeedback:showQuestionFeedback,
    onFinish:summary=>{
      clearInterval(state.timerId);
      diceTrainingMode=false;
      trainingHelpPanel.classList.add('hidden');
      modal('Wyzwanie dnia ukończone',`Poprawne odpowiedzi: ${summary.correct}/${summary.total} (${summary.percent}%).`,'◎');
      nav('home');
    }
  });
  state.questionEngine.start(20,'adaptive');
}

document.getElementById('dailyChallengeBtn')?.addEventListener('click',startDailyChallenge);

function startDiceTest(){
  diceTrainingMode=false;
  trainingHelpPanel.classList.remove('hidden');
  resetTrainingHelp();
  const p=state.participant;
  if(!p)return nav('setup');

  nav('question');
  state.testStartedAt=Date.now();
  clearInterval(state.timerId);
  document.getElementById('questionTimer').textContent='00:00';
  state.timerId=setInterval(()=>{
    document.getElementById('questionTimer').textContent=formatTime(Date.now()-state.testStartedAt);
  },1000);

  state.questionEngine=new QuestionEngine({
    generator:MixedGenerator,
    onRender:renderDiceQuestion,
    onProgress:updateQuestionProgress,
    onFeedback:showQuestionFeedback,
    onFinish:finishDicePreview,
    retryIncorrect:true,
    autoAdvanceDelay:2000
  });
  state.questionEngine.start(p.count,p.mode);
}

document.getElementById('startBtn').onclick=startDiceTest;
document.getElementById('endPreviewBtn').onclick=()=>{
  clearInterval(state.timerId);
  state.questionEngine?.reset();
  if(matchInteractiveMode){
    matchInteractiveMode=false;
    diceTrainingMode=false;
    document.querySelector('.question-card')?.classList.remove('matchstick-question-card');
    document.querySelector('.answer-title')?.classList.remove('hidden');
    nav('training-category');
    renderTrainingCategory('logic');
    return;
  }
  if(diceTrainingMode){
    diceTrainingMode=false;
    trainingHelpPanel.classList.add('hidden');
    if(activeTrainingCategory==='daily'){
      nav('home');
    }else{
      nav('training-category');
      renderTrainingCategory(activeTrainingCategory||'logic');
    }
  }else nav('home');
};

setTimeout(()=>{document.getElementById('app')?.classList.remove('hidden');setTimeout(()=>document.getElementById('splash')?.remove(),700)},1700);
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));

setTimeout(()=>{if(document.querySelector('[data-screen="dice-academy"]'))showOrientationLesson();},0);
