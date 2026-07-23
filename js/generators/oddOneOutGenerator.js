(() => {
  'use strict';
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const tasks=[
    [['pies','kot','lew','krzesło','tygrys'],'krzesło','Pozostałe elementy są zwierzętami.'],
    [['kwadrat','prostokąt','trójkąt','koło','pięciokąt'],'koło','Pozostałe figury mają proste boki.'],
    [['2','4','6','9','10'],'9','Pozostałe liczby są parzyste.'],
    [['▲','▲','▲','■','▲'],'■','Pozostałe symbole są trójkątami.'],
    [['jabłko','gruszka','banan','samochód','brzoskwinia'],'samochód','Pozostałe elementy są owocami.'],
    [['A','E','I','B','O'],'B','Pozostałe litery są samogłoskami.'],
    [['styczeń','marzec','lipiec','wtorek','grudzień'],'wtorek','Pozostałe słowa są nazwami miesięcy.'],
    [['3','5','7','11','12'],'12','Pozostałe liczby są pierwsze.']
  ];
  function generate(index=0,level=1){const t=tasks[index%tasks.length],options=shuffle(t[0]);return {id:`odd-${Date.now()}-${index}`,category:'LOGIKA',family:'odd-one-out',layout:'cognitive',level,prompt:'Który element nie pasuje do pozostałych?',data:{stimulus:options.join('   •   '),mode:'CO NIE PASUJE?',hint:'Najpierw znajdź wspólną cechę większości elementów.',explanation:t[2]},answer:t[1],answerIndex:options.findIndex(v=>v===t[1]),options};}
  window.OddOneOutGenerator={generate};
})();
