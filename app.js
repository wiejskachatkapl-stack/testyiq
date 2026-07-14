const state={screen:'home',history:[],participant:null,sound:true,questionEngine:null,timerId:null,testStartedAt:0};
const screens=[...document.querySelectorAll('.screen')];
const back=document.getElementById('backBtn');
const label=document.getElementById('screenLabel');
const labels={home:'Brain Lab',setup:'Test IQ',intro:'Zasady testu',question:'Test IQ'};
function nav(name,push=true){if(name===state.screen)return;const t=document.querySelector(`[data-screen="${name}"]`);if(!t)return;if(push)state.history.push(state.screen);screens.forEach(s=>s.classList.toggle('active',s===t));state.screen=name;label.textContent=labels[name]||'Brain Lab';back.style.visibility=name==='home'?'hidden':'visible'}
function modal(title,text,icon='✦'){document.getElementById('modalTitle').textContent=title;document.getElementById('modalText').textContent=text;document.getElementById('modalIcon').textContent=icon;document.getElementById('modal').classList.remove('hidden')}
function closeModal(){document.getElementById('modal').classList.add('hidden')}
document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>nav(b.dataset.route));
document.querySelectorAll('[data-coming]').forEach(b=>b.onclick=()=>modal(b.dataset.coming,'Moduł jest zapisany w roadmapie i zostanie uruchomiony w kolejnych wersjach.'));
back.onclick=()=>nav(state.history.pop()||'home',false);
document.getElementById('closeModal').onclick=closeModal;document.getElementById('okModal').onclick=closeModal;
document.getElementById('modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
document.getElementById('soundBtn').onclick=e=>{state.sound=!state.sound;e.currentTarget.textContent=state.sound?'♪':'×'};
document.getElementById('testForm').onsubmit=e=>{e.preventDefault();const firstName=document.getElementById('firstName').value.trim(),lastName=document.getElementById('lastName').value.trim(),age=Number(document.getElementById('age').value),count=Number(document.querySelector('[name=count]:checked').value),mode=document.querySelector('[name=mode]:checked').value,error=document.getElementById('formError');if(firstName.length<2||lastName.length<2){error.textContent='Wpisz poprawne imię i nazwisko.';return}if(!Number.isInteger(age)||age<10||age>99){error.textContent='Wiek musi mieścić się w zakresie 10–99 lat.';return}error.textContent='';state.participant={firstName,lastName,age,count,mode};document.getElementById('summary').textContent=`${firstName}, ${age} lat • ${count} pytań • tryb ${mode==='adaptive'?'adaptacyjny':'standardowy'}`;nav('intro')};
function formatTime(ms){
  const total=Math.floor(ms/1000);
  const min=String(Math.floor(total/60)).padStart(2,'0');
  const sec=String(total%60).padStart(2,'0');
  return `${min}:${sec}`;
}

function renderDiceQuestion(question){
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
