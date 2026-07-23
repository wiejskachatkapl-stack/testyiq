(() => {
  'use strict';
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const tasks=[
    ['VI + IV = XI','Przenieś jedną zapałkę, aby równanie było poprawne.','VI + V = XI',['VII + IV = XI','VI + IV = X','V + IV = XI','VI + VI = XI'],'Jedną zapałkę z IV przenosimy tak, aby powstało V.'],
    ['IX - III = V','Przenieś jedną zapałkę, aby równanie było poprawne.','VIII - III = V',['IX - II = V','IX - IV = V','XI - III = V','IX - III = VI'],'Przeniesienie jednej zapałki zmienia IX na VIII.'],
    ['III + III = III','Przenieś jedną zapałkę, aby równanie było poprawne.','III - III = 0',['II + III = V','III + II = V','III - II = I','II - III = I'],'Znak plus zmieniamy na minus, a przeniesiona zapałka tworzy zero.'],
    ['□ □','Przenieś jedną zapałkę, aby powstały trzy kwadraty.','Dwa małe i jeden duży',['Trzy osobne małe','Jeden duży','Dwa duże','Cztery małe'],'Przeniesiona zapałka domyka trzeci kwadrat wewnątrz większej figury.'],
    ['△ △ △','Przenieś jedną zapałkę, aby powstały dwa trójkąty.','Jeden mały i jeden duży',['Dwa małe osobne','Jeden trójkąt','Trzy małe','Dwa duże'],'Jedna zapałka tworzy większy trójkąt, pozostawiając jeden mniejszy.']
  ];
  function generate(index=0,level=1){const t=tasks[index%tasks.length],options=shuffle([t[2],...t[3]]);return {id:`match-${Date.now()}-${index}`,category:'LOGIKA',family:'matchstick',layout:'cognitive',level,prompt:t[1],data:{stimulus:t[0],mode:'ZAPAŁKI',hint:'Możesz przenieść tylko jedną zapałkę. Szukaj najmniejszej zmiany poprawiającej cały układ.',explanation:t[4]},answer:t[2],answerIndex:options.findIndex(v=>v===t[2]),options};}
  window.MatchstickGenerator={generate};
})();
