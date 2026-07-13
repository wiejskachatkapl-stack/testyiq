const app=document.getElementById('app');
const splash=document.getElementById('splash');
const screens=[...document.querySelectorAll('.screen')];
const backBtn=document.getElementById('backBtn');
const modal=document.getElementById('modal');
const modalTitle=document.getElementById('modalTitle');
const modalText=document.getElementById('modalText');
const modalSymbol=document.getElementById('modalSymbol');
let currentScreen='home';
let userConfig=null;
let timerId=null;
let elapsed=0;
let demoIndex=0;

const demoQuestions=[
 {category:'SEKWENCJE',level:1,text:'Jaka liczba powinna znaleźć się w miejscu znaku zapytania?',visual:['2','5','9','14','20','?'],answers:['25','26','27','28','30'],correct:'27'},
 {category:'LITERY',level:2,text:'Która litera kontynuuje podany ciąg?',visual:['A','C','F','J','O','?'],answers:['S','T','U','V','W'],correct:'U'},
 {category:'LOGIKA',level:2,text:'Która liczba nie pasuje do pozostałych?',visual:['15','23','41','47','53','67'],answers:['15','23','41','47','67'],correct:'41'}
];

function showScreen(name){
 currentScreen=name;
 screens.forEach(s=>s.classList.toggle('active',s.dataset.screen===name));
 backBtn.classList.toggle('hidden-control',name==='home'||name==='prepare'||name==='quiz');
}
function openModal(symbol,title,text){modalSymbol.textContent=symbol;modalTitle.textContent=title;modalText.textContent=text;modal.classList.remove('hidden')}
function closeModal(){modal.classList.add('hidden')}
setTimeout(()=>{app.classList.remove('hidden');setTimeout(()=>splash.remove(),900)},2500);

document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('modalOk').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
backBtn.addEventListener('click',()=>{if(currentScreen==='setup')showScreen('home');else if(currentScreen==='instructions')showScreen('setup');else showScreen('home')});

const info={training:['✦','Trening umysłu','Ten moduł zostanie podłączony po zakończeniu silnika testów.'],daily:['◎','Wyzwanie dnia','Codzienne zadania pojawią się w kolejnym etapie rozwoju.'],progress:['⌁','Postępy','Historia wyników będzie początkowo zapisywana lokalnie na urządzeniu.'],achievements:['✧','Osiągnięcia','Odznaki i serie aktywności zostaną dodane po uruchomieniu treningów.'],settings:['⚙','Ustawienia','Tutaj pojawią się ustawienia dźwięku, animacji i czytelności.'],about:['●','IQ Challenge • Brain Lab','Wersja 1004 zawiera pełny początek ścieżki Test IQ: formularz, przygotowanie, instrukcję i uniwersalny ekran pytań.']};
document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{
 const action=btn.dataset.action;
 if(action==='open-test'){showScreen('setup');return}
 const item=info[action];if(item)openModal(...item);
}));

const form=document.getElementById('testForm');
form.addEventListener('submit',e=>{
 e.preventDefault();
 const firstName=document.getElementById('firstName').value.trim();
 const lastName=document.getElementById('lastName').value.trim();
 const age=Number(document.getElementById('age').value);
 const error=document.getElementById('formError');
 if(firstName.length<2||lastName.length<2){error.textContent='Wpisz imię i nazwisko.';return}
 if(!Number.isInteger(age)||age<10||age>99){error.textContent='Podaj wiek od 10 do 99 lat.';return}
 error.textContent='';
 userConfig={firstName,lastName,age,questionCount:Number(form.questionCount.value),mode:form.mode.value};
 startPreparation();
});

function startPreparation(){
 showScreen('prepare');
 const fill=document.getElementById('prepareFill');
 const status=document.getElementById('prepareStatus');
 const items=[...document.querySelectorAll('.prepare-list li')];
 fill.style.width='0';items.forEach(i=>i.classList.remove('done'));
 const steps=[['Tworzenie zestawu pytań…',34],['Dopasowywanie poziomu startowego…',68],['Uruchamianie pomiaru czasu…',100]];
 steps.forEach((step,i)=>setTimeout(()=>{status.textContent=step[0];fill.style.width=step[1]+'%';items[i].classList.add('done')},550+i*650));
 setTimeout(()=>{
  document.getElementById('testSummary').textContent=`${userConfig.firstName} ${userConfig.lastName} • wiek ${userConfig.age} • ${userConfig.questionCount} pytań • tryb ${userConfig.mode==='adaptive'?'adaptacyjny':'standardowy'}`;
  showScreen('instructions');
 },2600);
}

document.getElementById('beginTestBtn').addEventListener('click',startDemoQuiz);
function startDemoQuiz(){elapsed=0;demoIndex=0;showScreen('quiz');renderQuestion();clearInterval(timerId);timerId=setInterval(()=>{elapsed++;document.getElementById('timer').textContent=formatTime(elapsed)},1000)}
function formatTime(sec){return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`}
function renderQuestion(){
 const q=demoQuestions[demoIndex];
 document.getElementById('questionCategory').textContent=q.category;
 document.getElementById('questionLevel').textContent=`Poziom ${q.level}`;
 document.getElementById('questionNumber').textContent=demoIndex+1;
 document.getElementById('questionTotal').textContent=`/ ${demoQuestions.length}`;
 document.getElementById('questionText').textContent=q.text;
 document.getElementById('quizProgressFill').style.width=`${(demoIndex/demoQuestions.length)*100}%`;
 document.getElementById('remainingText').textContent=`Pozostało ${demoQuestions.length-demoIndex-1} pytań demonstracyjnych`;
 document.getElementById('questionVisual').innerHTML=`<div class="sequence">${q.visual.map(v=>`<span class="${v==='?'?'unknown':''}">${v}</span>`).join('')}</div>`;
 const answers=document.getElementById('answers');answers.innerHTML='';
 q.answers.forEach(value=>{const b=document.createElement('button');b.className='answer-btn';b.textContent=value;b.addEventListener('click',()=>selectAnswer(value));answers.appendChild(b)});
}
function selectAnswer(){demoIndex++;if(demoIndex>=demoQuestions.length){clearInterval(timerId);document.getElementById('quizProgressFill').style.width='100%';showScreen('demo-end');return}renderQuestion()}
document.getElementById('quitTestBtn').addEventListener('click',()=>openModal('!','Zakończyć test?','W wersji produkcyjnej pojawi się tu potwierdzenie zakończenia i zapis częściowego wyniku.'));
document.getElementById('returnHomeBtn').addEventListener('click',()=>{clearInterval(timerId);showScreen('home')});

let soundOn=true;document.getElementById('soundBtn').addEventListener('click',e=>{soundOn=!soundOn;e.currentTarget.textContent=soundOn?'♪':'×'});
let deferredPrompt;const installBtn=document.getElementById('installBtn');window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event});installBtn.addEventListener('click',async()=>{if(!deferredPrompt){openModal('⌄','Instalacja PWA','Po opublikowaniu na GitHub Pages użyj opcji „Dodaj do ekranu głównego” w menu przeglądarki.');return}deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
