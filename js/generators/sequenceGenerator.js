(() => {
  'use strict';
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const numeric=[
    i=>{const s=1+i%5,d=1+i%4,v=Array.from({length:4},(_,n)=>s+n*d);return [v,s+4*d,`Każdy kolejny element zwiększa się o ${d}.`];},
    i=>{const s=2+i%4,d=1+i%3,v=[s,s+d,s+3*d,s+6*d];return [v,s+10*d,'Różnice zwiększają się kolejno.'];},
    i=>{const s=1+i%3,v=[s,s*2,s*4,s*8];return [v,s*16,'Każdy kolejny element jest dwa razy większy.'];},
    i=>{const a=2+i%4,b=5+i%5;return [[a,b,a,b],a,'Dwa elementy występują naprzemiennie.'];}
  ];
  const symbolSets=[['▲','■','▲','■','▲'],['↑','→','↓','←','↑'],['○','●','○','●','○'],['★','☆','★','☆','★']];
  function generate(index=0,level=1){
    let stimulus,answer,distractors,explanation,prompt;
    if(index%3===2){
      const set=symbolSets[index%symbolSets.length];
      stimulus=set.slice(0,4).join('   ')+'   ?';answer=set[4];prompt='Który symbol powinien pojawić się następny?';
      distractors=['▲','■','●','◆','↑','→','↓','←','○','★','☆','△','◇'].filter(v=>v!==answer);explanation='Symbole tworzą powtarzający się cykl.';
    }else{
      const [series,a,rule]=numeric[index%numeric.length](index);answer=String(a);stimulus=series.join('   ')+'   ?';prompt='Która liczba kończy sekwencję?';
      distractors=[-3,-2,-1,1,2,3,4,5].map(v=>String(a+v)).filter(v=>Number(v)>=0);explanation=rule;
    }
    const options=shuffle([answer,...shuffle(distractors).slice(0,4)]);
    return {id:`sequence-${Date.now()}-${index}`,category:'LOGIKA',family:'sequence-training',layout:'cognitive',level,prompt,
      data:{stimulus,mode:'SEKWENCJE',hint:'Porównaj kolejne elementy i znajdź jedną regułę działającą w całym ciągu.',explanation},
      answer,answerIndex:options.findIndex(v=>v===answer),options};
  }
  window.SequenceGenerator={generate};
})();
