const app=document.getElementById('app'),splash=document.getElementById('splash'),modal=document.getElementById('modal'),modalTitle=document.getElementById('modalTitle'),modalText=document.getElementById('modalText'),modalSymbol=document.getElementById('modalSymbol');
const closeModal=()=>modal.classList.add('hidden');
setTimeout(()=>{app.classList.remove('hidden');setTimeout(()=>splash.remove(),900)},2500);
document.getElementById('modalClose').addEventListener('click',closeModal);document.getElementById('modalOk').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
const info={test:['◇','Test IQ','Tutaj powstanie formularz uczestnika, adaptacyjny test i profesjonalny raport wyniku.'],training:['✦','Trening umysłu','W kolejnym etapie dodamy pierwsze gry: sekwencje, figury, matryce, symetrię i kostki do gry.'],daily:['◎','Wyzwanie dnia','Codziennie pojawi się jedno nowe zadanie oraz seria dni aktywności.'],progress:['⌁','Postępy','Tutaj zobaczysz historię wyników, rozwój umiejętności i czas treningu.'],achievements:['✧','Osiągnięcia','Odznaki, poziomy i misje będą motywować do regularnego treningu.'],settings:['⚙','Ustawienia','W przyszłości: dźwięk, animacje, rozmiar tekstu i preferencje testu.'],about:['●','IQ Challenge • Brain Lab','Spokojna aplikacja do testów i treningu umysłu. Wersja 1001 rozwija budowę nowej platformy.']};
document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{const[symbol,title,text]=info[btn.dataset.action];modalSymbol.textContent=symbol;modalTitle.textContent=title;modalText.textContent=text;modal.classList.remove('hidden')}));
let soundOn=true;document.getElementById('soundBtn').addEventListener('click',e=>{soundOn=!soundOn;e.currentTarget.textContent=soundOn?'♪':'×';e.currentTarget.title=soundOn?'Dźwięk włączony':'Dźwięk wyłączony'});
let deferredPrompt;const installBtn=document.getElementById('installBtn');window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event;installBtn.classList.add('install-ready')});installBtn.addEventListener('click',async()=>{if(!deferredPrompt){modalSymbol.textContent='⌄';modalTitle.textContent='Instalacja PWA';modalText.textContent='Po opublikowaniu na GitHub Pages użyj opcji „Dodaj do ekranu głównego” w menu przeglądarki.';modal.classList.remove('hidden');return}deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));


// v1002: dopasowanie całego interfejsu do faktycznie widocznej wysokości.
const fitContent = document.getElementById('fitContent');
function fitInterface(){
  if (!fitContent || app.classList.contains('hidden')) return;
  fitContent.style.setProperty('--fit-scale','1');
  requestAnimationFrame(() => {
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const rect = fitContent.getBoundingClientRect();
    const naturalHeight = fitContent.scrollHeight;
    const naturalWidth = fitContent.scrollWidth;
    const safeH = Math.max(200, viewportHeight - 2);
    const safeW = Math.max(240, viewportWidth - 2);
    const scaleH = safeH / naturalHeight;
    const scaleW = safeW / naturalWidth;
    const scale = Math.min(1, scaleH, scaleW);
    fitContent.style.setProperty('--fit-scale', String(Math.max(.72, scale)));
  });
}
window.addEventListener('resize', fitInterface, {passive:true});
window.addEventListener('orientationchange', () => setTimeout(fitInterface, 150));
if (window.visualViewport) window.visualViewport.addEventListener('resize', fitInterface, {passive:true});
setTimeout(fitInterface, 2600);
setTimeout(fitInterface, 3300);
