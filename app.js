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
 logic:{name:'Logika',icon:'◇',description:'Rozwijaj analizę, wnioskowanie i rozpoznawanie wzorców.',games:[['dice-training','Kostki','⬡',200,'available','Ciągi, zależności i układy kostek'],['matrix-training','Matryce','▦',200,'available','Figury, obroty i brakujące elementy'],['sequences','Sekwencje','⌁',200,'soon','Liczby, litery i symbole'],['matches','Zapałki','╱',500,'soon','Przesuwaj zapałki i naprawiaj układy'],['odd','Co nie pasuje?','◈',200,'soon','Znajdź element łamiący regułę']]},
 memory:{name:'Pamięć',icon:'◎',description:'Ćwicz pamięć roboczą i kolejność.',games:[['memory','Memory','▦',200,'soon','Łącz identyczne pary'],['order','Zapamiętaj kolejność','↔',200,'soon','Odtwarzaj sekwencje'],['numbers','Zapamiętaj liczby','123',200,'soon','Coraz dłuższe ciągi'],['path','Zapamiętaj drogę','⌁',200,'soon','Odtwarzaj trasę']]},
 reflex:{name:'Refleks',icon:'⚡',description:'Poprawiaj czas reakcji.',games:[['green','Kliknij zielone','●',200,'soon','Reaguj na właściwy kolor'],['click-numbers','Kliknij liczby','123',200,'soon','Znajdź liczby po kolei'],['avoid','Unikaj czerwonych','×',200,'soon','Reaguj szybko'],['stroop','Kolor kontra słowo','A',200,'soon','Pokonaj automatyczne skojarzenia']]},
 focus:{name:'Koncentracja',icon:'◉',description:'Trenuj spostrzegawczość i skupienie.',games:[['differences','Znajdź różnice','≠',300,'soon','Porównuj obrazy'],['same','Znajdź taki sam','=',200,'soon','Wskaż identyczny symbol'],['hidden','Ukryty obiekt','⌕',200,'soon','Odszukuj przedmioty'],['tracking','Śledzenie obiektu','◌',200,'soon','Nie zgub elementu']]},
 knowledge:{name:'Wiedza',icon:'⌁',description:'Łącz fakty i poznawaj świat.',games:[['animals','Pojedynki zwierząt','♞',300,'soon','Które jest większe lub szybsze?'],['world','Świat i geografia','◍',300,'soon','Kraje, góry i rzeki'],['science','Nauka','⚗',300,'soon','Przyroda i wynalazki'],['space','Kosmos','✦',300,'soon','Planety i gwiazdy'],['words','Słownictwo','Aa',300,'soon','Synonimy i znaczenia']]},
 imagination:{name:'Wyobraźnia',icon:'△',description:'Rozwijaj wyobraźnię przestrzenną.',games:[['rotate','Obrót figur','↻',200,'soon','Wybierz figurę po obrocie'],['solids','Bryły 3D','⬡',200,'soon','Wyobrażaj sobie obrót brył'],['tangram','Tangram','△',200,'soon','Układaj kształty'],['mazes','Labirynty','⌗',200,'soon','Znajdź drogę']]}
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
  modal(b.dataset.status==='available'?b.querySelector('strong').textContent:'Wkrótce dostępne',b.dataset.status==='available'?'Ten moduł otrzyma taki sam system nauki jak Kostki.':'Ten trening zostanie dodany w kolejnych wersjach.','✦')
});nav('training-category')}
document.querySelectorAll('.training-category').forEach(b=>b.onclick=()=>openTrainingCategory(b.dataset.category));




/* =========================================================
   v1051 — Etap 2: Ściany przeciwległe
   ========================================================= */
const OPPOSITE_LESSON_QUESTIONS=[
  {face:1,answer:6,hint:'Na standardowej kostce suma oczek na przeciwległych ścianach wynosi 7.',solution:'7 − 1 = 6, więc naprzeciwko 1 znajduje się 6.'},
  {face:2,answer:5,hint:'Dodaj brakującą liczbę do 2 tak, aby otrzymać 7.',solution:'7 − 2 = 5, więc naprzeciwko 2 znajduje się 5.'},
  {face:3,answer:4,hint:'Przeciwległa para musi sumować się do 7.',solution:'7 − 3 = 4, więc naprzeciwko 3 znajduje się 4.'},
  {face:6,answer:1,hint:'To ta sama para co 1 ↔ 6, tylko pytanie jest odwrócone.',solution:'Naprzeciwko 6 znajduje się 1.'},
  {face:5,answer:2,hint:'Przypomnij sobie parę 2 ↔ 5.',solution:'Naprzeciwko 5 znajduje się 2.'},
  {face:4,answer:3,hint:'Przypomnij sobie parę 3 ↔ 4.',solution:'Naprzeciwko 4 znajduje się 3.'}
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
  const q=OPPOSITE_LESSON_QUESTIONS[oppositeLessonIndex];
  const box=document.getElementById('oppositeExplanation');
  box.className='opposite-explanation hint';
  box.innerHTML=`<small>WSKAZÓWKA</small><p>${q.hint}</p>`;
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
  {a:1,b:2,answer:3,wrong:[6,5],hint:'Odrzuć ścianę przeciwną do 1 oraz ścianę przeciwną do 2.',solution:'6 jest naprzeciwko 1, a 5 jest naprzeciwko 2. Dlatego 3 może spotkać się z 1 i 2 w jednym narożniku.'},
  {a:1,b:3,answer:2,wrong:[6,4],hint:'Ściany 6 i 4 są przeciwległe do pokazanych ścian.',solution:'6 nie może dotykać 1, a 4 nie może dotykać 3. Ściana 2 może sąsiadować z obiema.'},
  {a:2,b:4,answer:1,wrong:[5,3],hint:'Nie wybieraj liczby przeciwległej do żadnej z dwóch pokazanych.',solution:'5 jest naprzeciwko 2, a 3 jest naprzeciwko 4. Ściana 1 może znaleźć się z nimi w narożniku.'},
  {a:6,b:5,answer:4,wrong:[1,2],hint:'1 i 2 są przeciwległe do ścian już pokazanych.',solution:'1 nie dotyka 6, a 2 nie dotyka 5. Ściana 4 może sąsiadować z obiema.'},
  {a:6,b:3,answer:5,wrong:[1,4],hint:'Odrzuć 1 jako przeciwną do 6 oraz 4 jako przeciwną do 3.',solution:'Jedyną poprawną możliwością jest 5, ponieważ dotyka zarówno 6, jak i 3.'},
  {a:5,b:4,answer:6,wrong:[2,3],hint:'2 jest naprzeciwko 5, a 3 naprzeciwko 4.',solution:'Ściana 6 może dotykać obu pokazanych ścian i utworzyć z nimi narożnik.'}
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
  const q=CORNER_LESSON_QUESTIONS[cornerLessonIndex];
  const box=document.getElementById('cornerExplanation');
  box.className='opposite-explanation hint';
  box.innerHTML=`<small>WSKAZÓWKA</small><p>${q.hint}</p>`;
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
const ORIENTATION_QUESTIONS=[
  {source:[4,2,3],answer:[2,3,4],wrong:[[4,6,3],[5,2,3]],hint:'Po obrocie mogą zmienić położenie, ale muszą pozostać te same trzy liczby.',solution:'Poprawna odpowiedź zawiera dokładnie ściany 4, 2 i 3.'},
  {source:[1,2,3],answer:[3,1,2],wrong:[[1,6,3],[5,2,3]],hint:'Sprawdź najpierw, czy żadna liczba nie została zamieniona.',solution:'Po obrocie nadal widzimy ściany 1, 2 i 3.'},
  {source:[6,5,4],answer:[5,4,6],wrong:[[1,5,4],[6,2,4]],hint:'Obrót nie zmienia zestawu ścian spotykających się w narożniku.',solution:'Poprawny układ zachowuje zestaw 6, 5 i 4.'},
  {source:[2,4,1],answer:[1,2,4],wrong:[[5,4,1],[2,3,1]],hint:'Odrzuć każdą odpowiedź z inną liczbą niż w układzie początkowym.',solution:'Tylko ta odpowiedź zawiera ściany 2, 4 i 1.'},
  {source:[3,5,1],answer:[5,1,3],wrong:[[4,5,1],[3,2,1]],hint:'Porównaj wszystkie trzy ściany, nie tylko jedną.',solution:'Po obrocie nadal spotykają się ściany 3, 5 i 1.'},
  {source:[6,2,4],answer:[4,6,2],wrong:[[1,2,4],[6,5,4]],hint:'Właściwa odpowiedź zachowuje wszystkie trzy liczby.',solution:'Poprawny narożnik nadal tworzą ściany 6, 2 i 4.'}
];

let orientationQuestionIndex=0;
let orientationLocked=false;

function orientationCubeHtml(values, cls='orientation-mini-die'){
  return `<div class="orientation-cube">
    <div class="orientation-cube-top">${DiceGenerator.diceSvg(values[0],cls)}</div>
    <div class="orientation-cube-left">${DiceGenerator.diceSvg(values[1],cls)}</div>
    <div class="orientation-cube-right">${DiceGenerator.diceSvg(values[2],cls)}</div>
  </div>`;
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
  const q=ORIENTATION_QUESTIONS[orientationQuestionIndex];
  const box=document.getElementById('orientationExplanation');
  box.className='opposite-explanation hint';
  box.innerHTML=`<small>WSKAZÓWKA</small><p>${q.hint}</p>`;
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
 academyTipBox.classList.add('hidden');academySolution.classList.add('hidden');
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
document.querySelectorAll('[data-tip]').forEach(b=>b.onclick=()=>{academyTipText.textContent=DICE_ACADEMY_LESSONS[diceAcademyLesson].tips[Number(b.dataset.tip)];academyTipBox.classList.remove('hidden')});



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

function renderDiceQuestion(question){
  document.querySelector('.question-card')?.classList.remove('matrix-question-card');
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
    ${value==null?'<div class="missing-die">?</div>':DiceGenerator.diceSvg(value,'sequence-die')}
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
    item==null?'<div class="shape-matrix-cell missing-shape">?</div>':`<div class="shape-matrix-cell">${MatrixGenerator.shapeSvg(item,'matrix-main-shape')}</div>`
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

function showQuestionFeedback({correct,correctIndex,selectedIndex}){
  const buttons=[...document.querySelectorAll('.dice-answer')];
  buttons.forEach((button,index)=>{
    button.disabled=true;
    if(index===correctIndex)button.classList.add('correct');
  });
  if(!correct && Number.isInteger(selectedIndex)){
    buttons[selectedIndex]?.classList.add('wrong');
  }
  document.querySelector('.question-card')?.classList.add(correct?'flash-correct':'flash-wrong');
  setTimeout(()=>document.querySelector('.question-card')?.classList.remove('flash-correct','flash-wrong'),420);
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

function resetTrainingHelp(){
  if(!diceTrainingMode)return;
  trainingHelpPanel.classList.remove('hidden');
  trainingNextQuestion.classList.add('hidden');
  trainingExplanation.className='training-explanation';
  trainingExplanation.innerHTML='<small>NAUKA PODCZAS TRENINGU</small><p>Wybierz wskazówkę, gdy nie widzisz reguły.</p>';
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
    manualAdvance:true,
    onRender:q=>{renderDiceQuestion(q);resetTrainingHelp()},
    onProgress:updateQuestionProgress,
    onFeedback:({correct,correctIndex,selectedIndex})=>{
      showQuestionFeedback({correct,correctIndex,selectedIndex});
      const q=state.questionEngine.current;
      const h=diceTrainingHints(q);
      trainingExplanation.className=`training-explanation ${correct?'good':'bad'}`;
      trainingExplanation.innerHTML=`<small>${correct?'DOBRZE':'NIE TYM RAZEM'}</small><p>${correct?'Poprawnie rozpoznałeś regułę. ':''}${h.solution}</p>`;
      trainingNextQuestion.classList.remove('hidden');
    },
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

document.getElementById('trainingHint1')?.addEventListener('click',()=>showTrainingText('hint1'));
document.getElementById('trainingHint2')?.addEventListener('click',()=>showTrainingText('hint2'));
document.getElementById('trainingShowSolution')?.addEventListener('click',()=>showTrainingText('solution'));
document.getElementById('trainingNextQuestion')?.addEventListener('click',()=>state.questionEngine?.advance());


function startDiceTest(){
  diceTrainingMode=false;
  trainingHelpPanel.classList.add('hidden');
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
    onFinish:finishDicePreview
  });
  state.questionEngine.start(p.count,p.mode);
}

document.getElementById('startBtn').onclick=startDiceTest;
document.getElementById('endPreviewBtn').onclick=()=>{
  clearInterval(state.timerId);
  state.questionEngine?.reset();
  if(diceTrainingMode){
    diceTrainingMode=false;
    trainingHelpPanel.classList.add('hidden');
    nav('training-category');
    renderTrainingCategory('logic');
  }else nav('home');
};

setTimeout(()=>{document.getElementById('app')?.classList.remove('hidden');setTimeout(()=>document.getElementById('splash')?.remove(),700)},1700);
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));

setTimeout(()=>{if(document.querySelector('[data-screen="dice-academy"]'))showOrientationLesson();},0);
