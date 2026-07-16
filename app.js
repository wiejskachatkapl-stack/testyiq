const state={screen:'home',history:[],participant:null,sound:true,questionEngine:null,timerId:null,testStartedAt:0};
const screens=[...document.querySelectorAll('.screen')];
const back=document.getElementById('backBtn');
const label=document.getElementById('screenLabel');
const labels={home:'Brain Lab',training:'Trening Umysłu','training-category':'Kategoria treningu',setup:'Test IQ',intro:'Zasady testu',question:'Test IQ'};
function nav(name,push=true){if(name===state.screen)return;const t=document.querySelector(`[data-screen="${name}"]`);if(!t)return;if(push)state.history.push(state.screen);screens.forEach(s=>s.classList.toggle('active',s===t));state.screen=name;label.textContent=labels[name]||'Brain Lab';back.style.visibility=name==='home'?'hidden':'visible';if(name==='training')renderTrainingProfile()}
function modal(title,text,icon='✦'){document.getElementById('modalTitle').textContent=title;document.getElementById('modalText').textContent=text;document.getElementById('modalIcon').textContent=icon;document.getElementById('modal').classList.remove('hidden')}
function closeModal(){document.getElementById('modal').classList.add('hidden')}
document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>nav(b.dataset.route));
document.querySelectorAll('[data-coming]').forEach(b=>b.onclick=()=>modal(b.dataset.coming,'Moduł jest zapisany w roadmapie i zostanie uruchomiony w kolejnych wersjach.'));
back.onclick=()=>nav(state.history.pop()||'home',false);
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
function openTrainingCategory(key){const c=TRAINING_CATEGORIES[key];if(!c)return;const p=getTrainingProfile(),v=p.categories?.[key]||0;categoryScreenIcon.textContent=c.icon;categoryScreenTitle.textContent=c.name;categoryScreenDescription.textContent=c.description;categoryScreenProgress.textContent=`${v}%`;let total=0,done=0,stars=0;c.games.forEach(g=>{total+=g.levels;done+=p.games?.[g.id]?.completed||0;stars+=p.games?.[g.id]?.stars||0});categoryCompleted.textContent=`${done} / ${total}`;categoryStars.textContent=stars;categoryStreak.textContent=`${p.streak||0} dni`;trainingGameGrid.innerHTML=c.games.map((g,idx)=>`<button class="training-game-card game-card-${idx+1} ${g.status==='available'?'available':'locked'}" data-game="${g.id}" data-status="${g.status}"><span class="game-icon">${TRAINING_GAME_ICONS[g.id]||g.icon}</span><span class="game-copy"><strong>${g.name}</strong><small>${g.subtitle}</small></span><span class="game-level"><b>${p.games?.[g.id]?.completed||0} / ${g.levels}</b><i><em style="width:0%"></em></i></span><span class="game-status">${g.status==='available'?'GRAJ':'WKRÓTCE'}</span></button>`).join('');trainingGameGrid.querySelectorAll('button').forEach(b=>b.onclick=()=>modal(b.dataset.status==='available'?b.querySelector('strong').textContent:'Wkrótce dostępne',b.dataset.status==='available'?'Generator działa już w Test IQ. Pełny tryb treningowy z poziomami, gwiazdkami i XP podłączymy w kolejnej wersji.':'Ten trening zostanie dodany w kolejnych wersjach.','✦'));nav('training-category')}
document.querySelectorAll('.training-category').forEach(b=>b.onclick=()=>openTrainingCategory(b.dataset.category));


/* =========================================================
   Brain Music v1037 — procedural ambient audio engine
   ========================================================= */
const brainMusic={
  context:null,
  master:null,
  nodes:[],
  playing:false,
  sound:'rain',
  name:'Deszcz',
  category:'Natura',
  volume:35,
  timerMinutes:0,
  timerEnd:0,
  timerInterval:null,

  load(){
    try{
      const saved=JSON.parse(localStorage.getItem('brainMusicSettings')||'{}');
      this.sound=saved.sound||this.sound;
      this.name=saved.name||this.name;
      this.category=saved.category||this.category;
      this.volume=Number.isFinite(saved.volume)?saved.volume:this.volume;
      this.timerMinutes=Number.isFinite(saved.timerMinutes)?saved.timerMinutes:0;
    }catch{}
  },

  save(){
    localStorage.setItem('brainMusicSettings',JSON.stringify({
      sound:this.sound,name:this.name,category:this.category,
      volume:this.volume,timerMinutes:this.timerMinutes
    }));
  },

  ensureContext(){
    if(!this.context){
      const AudioCtx=window.AudioContext||window.webkitAudioContext;
      if(!AudioCtx) return false;
      this.context=new AudioCtx();
      this.master=this.context.createGain();
      this.master.gain.value=this.volume/100*.55;
      this.master.connect(this.context.destination);
    }
    if(this.context.state==='suspended') this.context.resume();
    return true;
  },

  add(node){
    this.nodes.push(node);
    return node;
  },

  makeNoise(color='white'){
    const ctx=this.context;
    const length=ctx.sampleRate*4;
    const buffer=ctx.createBuffer(1,length,ctx.sampleRate);
    const data=buffer.getChannelData(0);
    let last=0;
    for(let i=0;i<length;i++){
      const white=Math.random()*2-1;
      if(color==='brown'){
        last=(last+.02*white)/1.02;
        data[i]=last*3.5;
      }else if(color==='pink'){
        last=.97*last+.03*white;
        data[i]=(white*.35+last*.9)*.7;
      }else{
        data[i]=white;
      }
    }
    const src=ctx.createBufferSource();
    src.buffer=buffer;
    src.loop=true;
    return src;
  },

  connectNoise({color='white',gain=.12,lowpass=1200,highpass=20}={}){
    const src=this.makeNoise(color);
    const hp=this.context.createBiquadFilter();
    hp.type='highpass'; hp.frequency.value=highpass;
    const lp=this.context.createBiquadFilter();
    lp.type='lowpass'; lp.frequency.value=lowpass;
    const g=this.context.createGain(); g.gain.value=gain;
    src.connect(hp).connect(lp).connect(g).connect(this.master);
    src.start();
    this.add(src);this.add(hp);this.add(lp);this.add(g);
    return {src,hp,lp,g};
  },

  oscillator(freq,type='sine',gain=.03,detune=0){
    const o=this.context.createOscillator();
    const g=this.context.createGain();
    o.frequency.value=freq;o.type=type;o.detune.value=detune;g.gain.value=gain;
    o.connect(g).connect(this.master);o.start();
    this.add(o);this.add(g);
    return {o,g};
  },

  lfo(target,param,min,max,seconds){
    const o=this.context.createOscillator();
    const g=this.context.createGain();
    const base=(min+max)/2,amount=(max-min)/2;
    target[param].value=base;
    o.frequency.value=1/seconds;g.gain.value=amount;
    o.connect(g).connect(target[param]);o.start();
    this.add(o);this.add(g);
  },

  playRain(){
    const n=this.connectNoise({color:'pink',gain:.17,lowpass:6500,highpass:500});
    this.lfo(n.g,'gain',.10,.20,4.5);
    const low=this.connectNoise({color:'brown',gain:.05,lowpass:450,highpass:30});
    this.lfo(low.g,'gain',.025,.07,7);
  },

  playOcean(){
    const n=this.connectNoise({color:'pink',gain:.12,lowpass:1300,highpass:40});
    this.lfo(n.g,'gain',.025,.18,7.5);
    this.lfo(n.lp,'frequency',350,1700,7.5);
    this.oscillator(92,'sine',.018);
  },

  playForest(){
    const n=this.connectNoise({color:'pink',gain:.055,lowpass:2800,highpass:90});
    this.lfo(n.g,'gain',.025,.08,8);
    [1450,1870,2320].forEach((f,i)=>{
      const chirp=this.oscillator(f,'sine',.004,i*7);
      this.lfo(chirp.g,'gain',0,.009,2.7+i*.9);
    });
  },

  playFire(){
    const n=this.connectNoise({color:'brown',gain:.11,lowpass:900,highpass:80});
    this.lfo(n.g,'gain',.035,.15,1.7);
    const crack=this.connectNoise({color:'white',gain:.018,lowpass:5000,highpass:1700});
    this.lfo(crack.g,'gain',.002,.035,.45);
  },

  playNight(){
    const n=this.connectNoise({color:'pink',gain:.035,lowpass:1100,highpass:30});
    this.oscillator(220,'sine',.012);
    this.oscillator(330,'sine',.007,4);
    const insect=this.oscillator(4200,'sine',.002);
    this.lfo(insect.g,'gain',0,.006,1.2);
  },

  playBinaural(base,beat,gain=.025){
    const merger=this.context.createChannelMerger(2);
    const left=this.context.createOscillator(),right=this.context.createOscillator();
    const gl=this.context.createGain(),gr=this.context.createGain();
    left.frequency.value=base;right.frequency.value=base+beat;
    gl.gain.value=gain;gr.gain.value=gain;
    left.connect(gl).connect(merger,0,0);
    right.connect(gr).connect(merger,0,1);
    merger.connect(this.master);
    left.start();right.start();
    [left,right,gl,gr,merger].forEach(n=>this.add(n));
  },

  playAlpha(){
    this.playBinaural(180,10,.035);
    this.connectNoise({color:'pink',gain:.025,lowpass:700,highpass:30});
  },

  playDeepFocus(){
    this.playBinaural(210,18,.028);
    this.oscillator(105,'sine',.018);
    this.connectNoise({color:'brown',gain:.025,lowpass:520,highpass:30});
  },

  playStudy(){
    [110,164.8,220,329.6].forEach((f,i)=>{
      const x=this.oscillator(f,'sine',.010-i*.001);
      this.lfo(x.g,'gain',.004,.014,5+i);
    });
    this.connectNoise({color:'pink',gain:.018,lowpass:900,highpass:40});
  },

  playMeditation(){
    this.oscillator(110,'sine',.030);
    this.oscillator(165,'sine',.015);
    const n=this.connectNoise({color:'brown',gain:.020,lowpass:420,highpass:20});
    this.lfo(n.g,'gain',.010,.035,9);
  },

  playDelta(){
    this.playBinaural(100,3,.035);
    this.connectNoise({color:'brown',gain:.04,lowpass:350,highpass:20});
  },

  start(){
    if(!this.ensureContext()) return;
    this.stopNodes();
    const map={
      rain:()=>this.playRain(),ocean:()=>this.playOcean(),forest:()=>this.playForest(),
      fire:()=>this.playFire(),night:()=>this.playNight(),alpha:()=>this.playAlpha(),
      deepFocus:()=>this.playDeepFocus(),study:()=>this.playStudy(),
      meditation:()=>this.playMeditation(),pink:()=>this.connectNoise({color:'pink',gain:.09,lowpass:5000,highpass:30}),
      brown:()=>this.connectNoise({color:'brown',gain:.12,lowpass:1300,highpass:20}),
      white:()=>this.connectNoise({color:'white',gain:.055,lowpass:8000,highpass:60}),
      delta:()=>this.playDelta()
    };
    (map[this.sound]||map.rain)();
    this.playing=true;
    this.applyVolume();
    this.startTimer();
    this.updateUI();
  },

  pause(){
    if(this.context&&this.context.state==='running') this.context.suspend();
    this.playing=false;
    this.updateUI();
  },

  resume(){
    if(!this.context){this.start();return}
    this.context.resume();
    this.playing=true;
    this.updateUI();
  },

  stopNodes(){
    this.nodes.forEach(n=>{
      try{if(typeof n.stop==='function')n.stop()}catch{}
      try{n.disconnect()}catch{}
    });
    this.nodes=[];
  },

  stop(){
    this.stopNodes();
    this.playing=false;
    clearInterval(this.timerInterval);
    this.timerInterval=null;
    this.timerEnd=0;
    this.updateUI();
  },

  select(sound,name,category){
    this.sound=sound;this.name=name;this.category=category;
    this.save();
    if(this.playing) this.start();
    this.updateUI();
  },

  applyVolume(){
    if(this.master&&this.context){
      this.master.gain.cancelScheduledValues(this.context.currentTime);
      this.master.gain.linearRampToValueAtTime(this.volume/100*.55,this.context.currentTime+.08);
    }
  },

  setVolume(value){
    this.volume=Number(value);
    this.applyVolume();this.save();this.updateUI();
  },

  setTimer(minutes){
    this.timerMinutes=Number(minutes);
    this.save();
    if(this.playing)this.startTimer();
    else this.updateTimerUI();
  },

  startTimer(){
    clearInterval(this.timerInterval);
    this.timerInterval=null;
    if(!this.timerMinutes){
      this.timerEnd=0;this.updateTimerUI();return;
    }
    this.timerEnd=Date.now()+this.timerMinutes*60000;
    this.timerInterval=setInterval(()=>{
      if(Date.now()>=this.timerEnd){
        this.stop();
        this.timerEnd=0;
      }
      this.updateTimerUI();
    },1000);
    this.updateTimerUI();
  },

  updateTimerUI(){
    const el=document.getElementById('musicTimerDisplay');
    if(!el)return;
    if(this.timerEnd){
      const sec=Math.max(0,Math.ceil((this.timerEnd-Date.now())/1000));
      const m=Math.floor(sec/60),s=String(sec%60).padStart(2,'0');
      el.textContent=`${m}:${s}`;
    }else{
      el.textContent=this.timerMinutes?`${this.timerMinutes} min`:'Bez limitu';
    }
    document.querySelectorAll('[data-minutes]').forEach(b=>b.classList.toggle('active',Number(b.dataset.minutes)===this.timerMinutes));
  },

  updateUI(){
    const name=document.getElementById('musicCurrentName');
    const cat=document.getElementById('musicCurrentCategory');
    if(name)name.textContent=this.name;
    if(cat)cat.textContent=this.category;
    const btn=document.getElementById('musicPlayPause');
    if(btn){
      btn.querySelector('span').textContent=this.playing?'Ⅱ':'▶';
      btn.querySelector('b').textContent=this.playing?'PAUZA':'ODTWÓRZ';
    }
    document.getElementById('musicEqualizer')?.classList.toggle('playing',this.playing);
    document.getElementById('brainMusicBtn')?.classList.toggle('playing',this.playing);
    document.querySelectorAll('.music-track').forEach(b=>{
      b.classList.toggle('active',b.dataset.sound===this.sound);
      b.querySelector('i').textContent=b.dataset.sound===this.sound&&this.playing?'Ⅱ':'▶';
    });
    const vol=document.getElementById('musicVolume');
    if(vol)vol.value=this.volume;
    const vv=document.getElementById('musicVolumeValue');
    if(vv)vv.textContent=`${this.volume}%`;
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

function startDiceTest(){
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
  nav('home');
};

setTimeout(()=>{document.getElementById('app').classList.remove('hidden');setTimeout(()=>document.getElementById('splash')?.remove(),700)},1700);
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
