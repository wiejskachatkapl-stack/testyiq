(() => {
  'use strict';

  const SHAPES = ['circle','square','triangle','diamond','pentagon','hexagon','star','cross'];
  const FILLS = ['outline','solid','striped'];
  const usedTypes = [];
  const MEMORY = 7;

  function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function choose(a){ return a[Math.floor(Math.random()*a.length)]; }
  function shuffle(a){ const c=[...a]; for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]];} return c; }
  function rot(v){ return ((v%360)+360)%360; }
  function differentShape(shape){ return choose(SHAPES.filter(s=>s!==shape)); }
  function differentFill(fill){ return choose(FILLS.filter(f=>f!==fill)); }
  function feature(shape,fill='outline',rotation=0,count=1,size='medium',position='center'){
    return {shape,fill,rotation:rot(rotation),count,size,position};
  }
  function key(f){ return [f.shape,f.fill,f.rotation,f.count,f.size,f.position].join('|'); }

  const TYPES = [
    { id:'latin-shapes', level:1, prompt:'Która figura uzupełnia matrycę?', build(){
      const s=shuffle(SHAPES).slice(0,3);
      return matrix([feature(s[0]),feature(s[1]),feature(s[2]), feature(s[1]),feature(s[2]),feature(s[0]), feature(s[2]),feature(s[0]),null], feature(s[1]));
    }},
    { id:'fill-cycle', level:2, prompt:'Uzupełnij cykl sposobu wypełnienia.', build(){
      const shape=choose(SHAPES.slice(0,6));
      return matrix([feature(shape,'outline'),feature(shape,'solid'),feature(shape,'striped'), feature(shape,'solid'),feature(shape,'striped'),feature(shape,'outline'), feature(shape,'striped'),feature(shape,'outline'),null], feature(shape,'solid'));
    }},
    { id:'rotation-rows', level:3, prompt:'W każdym wierszu figura obraca się o ten sam kąt.', build(){
      const shape=choose(['triangle','diamond','star','cross']); const start=choose([0,45,90]);
      const row=(r)=>[feature(shape,'outline',r),feature(shape,'outline',r+90),feature(shape,'outline',r+180)];
      return matrix([...row(start),...row(start+45),feature(shape,'outline',start+90),feature(shape,'outline',start+180),null], feature(shape,'outline',start+270));
    }},
    { id:'size-cycle', level:3, prompt:'Która wielkość figury kończy układ?', build(){
      const shape=choose(SHAPES); const z=['small','medium','large'];
      return matrix([feature(shape,'outline',0,1,z[0]),feature(shape,'outline',0,1,z[1]),feature(shape,'outline',0,1,z[2]), feature(shape,'outline',0,1,z[1]),feature(shape,'outline',0,1,z[2]),feature(shape,'outline',0,1,z[0]), feature(shape,'outline',0,1,z[2]),feature(shape,'outline',0,1,z[0]),null], feature(shape,'outline',0,1,z[1]));
    }},
    { id:'shape-fill-two-rules', level:4, prompt:'Połącz regułę figury i wypełnienia.', build(){
      const s=shuffle(SHAPES).slice(0,3), f=['outline','solid','striped'];
      const cells=[]; for(let r=0;r<3;r++) for(let c=0;c<3;c++) cells.push(feature(s[(r+c)%3],f[(r+2*c)%3]));
      const ans=cells[8]; cells[8]=null; return matrix(cells,ans);
    }},
    { id:'count-cycle', level:4, prompt:'Uzupełnij liczbę figur w ostatnim polu.', build(){
      const shape=choose(['circle','square','triangle','diamond']); const n=[1,2,3];
      return matrix([feature(shape,'solid',0,n[0]),feature(shape,'solid',0,n[1]),feature(shape,'solid',0,n[2]), feature(shape,'solid',0,n[1]),feature(shape,'solid',0,n[2]),feature(shape,'solid',0,n[0]), feature(shape,'solid',0,n[2]),feature(shape,'solid',0,n[0]),null], feature(shape,'solid',0,n[1]));
    }},
    { id:'position-cycle', level:5, prompt:'Znajdź brakujące położenie figury.', build(){
      const shape=choose(['circle','square','triangle','star']); const p=['tl','tr','br','bl'];
      return matrix([feature(shape,'solid',0,1,'small',p[0]),feature(shape,'solid',0,1,'small',p[1]),feature(shape,'solid',0,1,'small',p[2]), feature(shape,'solid',0,1,'small',p[1]),feature(shape,'solid',0,1,'small',p[2]),feature(shape,'solid',0,1,'small',p[3]), feature(shape,'solid',0,1,'small',p[2]),feature(shape,'solid',0,1,'small',p[3]),null], feature(shape,'solid',0,1,'small',p[0]));
    }},
    { id:'row-combination', level:6, prompt:'Trzecie pole łączy cechy dwóch pierwszych.', build(){
      const s=shuffle(SHAPES).slice(0,3);
      const r1=[feature(s[0],'outline'),feature(s[1],'solid'),feature(s[0],'solid')];
      const r2=[feature(s[1],'striped'),feature(s[2],'outline'),feature(s[1],'outline')];
      const a=feature(s[2],'solid'), b=feature(s[0],'striped'), ans=feature(s[2],'striped');
      return matrix([...r1,...r2,a,b,null],ans);
    }},
    { id:'rotation-fill', level:6, prompt:'Dwie cechy zmieniają się jednocześnie.', build(){
      const shape=choose(['triangle','diamond','star','cross']); const fs=['outline','solid','striped'];
      const cells=[]; for(let r=0;r<3;r++) for(let c=0;c<3;c++) cells.push(feature(shape,fs[(r+c)%3],(r*45+c*90)));
      const ans=cells[8];cells[8]=null;return matrix(cells,ans);
    }},
    { id:'column-shape-row-count', level:7, prompt:'Kolumny wyznaczają figurę, wiersze ich liczbę.', build(){
      const s=shuffle(SHAPES).slice(0,3); const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++) cells.push(feature(s[c],r===1?'solid':'outline',0,r+1));
      const ans=cells[8];cells[8]=null;return matrix(cells,ans);
    }},
    { id:'mirror-diagonal', level:7, prompt:'Matryca jest odbiciem względem przekątnej.', build(){
      const a=feature(choose(SHAPES),'outline',0), b=feature(choose(SHAPES),'solid',45), c=feature(choose(SHAPES),'striped',90);
      const d=feature(choose(SHAPES),'solid',90), e=feature(choose(SHAPES),'outline',180), f=feature(choose(SHAPES),'striped',270);
      return matrix([a,b,c,d,e,f,clone(c),clone(f),null],clone(a));
    }},
    { id:'three-feature-latin', level:8, prompt:'Odkryj cykl figury, wypełnienia i obrotu.', build(){
      const s=shuffle(SHAPES).slice(0,3), f=['outline','solid','striped'], ro=[0,90,180]; const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++) cells.push(feature(s[(r+c)%3],f[(r+2*c)%3],ro[(2*r+c)%3]));
      const ans=cells[8];cells[8]=null;return matrix(cells,ans);
    }},
    { id:'alternating-count-fill', level:8, prompt:'Wiersze i kolumny stosują różne reguły.', build(){
      const s=choose(['circle','triangle','diamond','star']); const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++) cells.push(feature(s,(r+c)%2?'solid':'outline',c*45,(r+c)%3+1));
      const ans=cells[8];cells[8]=null;return matrix(cells,ans);
    }},
    { id:'xor-shape', level:9, prompt:'Trzecia figura zachowuje cechę obecną tylko raz.', build(){
      const s=shuffle(['circle','square','triangle','diamond']).slice(0,3);
      const row=(a,b)=>[feature(a,'outline'),feature(b,'solid'),feature(a,'solid')];
      const r1=row(s[0],s[1]), r2=row(s[1],s[2]); const a=feature(s[2],'outline'), b=feature(s[0],'solid'), ans=feature(s[2],'solid');
      return matrix([...r1,...r2,a,b,null],ans);
    }},
    { id:'progressive-transform', level:9, prompt:'Każdy krok zmienia trzy cechy figury.', build(){
      const s=shuffle(SHAPES).slice(0,3), fills=['outline','solid','striped']; const cells=[];
      for(let i=0;i<9;i++) cells.push(feature(s[i%3],fills[Math.floor(i/3)%3],i*45,(i%3)+1,['small','medium','large'][i%3]));
      const ans=cells[8];cells[8]=null;return matrix(cells,ans);
    }},
    { id:'nested-three-rules', level:10, prompt:'Zastosuj jednocześnie reguły wierszy, kolumn i przekątnej.', build(){
      const s=shuffle(SHAPES).slice(0,3), fills=['outline','solid','striped']; const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++) cells.push(feature(s[(r+c)%3],fills[(2*r+c)%3],(r*90+c*45),((r+c)%3)+1,['small','medium','large'][(r+2*c)%3]));
      const ans=cells[8];cells[8]=null;return matrix(cells,ans);
    }}
  ];

  function clone(x){ return JSON.parse(JSON.stringify(x)); }
  function matrix(cells,answer){ return {cells,answer}; }

  function shapeSvg(item,className=''){
    const count=item.count||1; const positions=countPositions(count,item.position);
    const shapes=positions.map(([x,y],i)=>shapeElement(item,x,y,scaleFor(item.size,count),`${i}`)).join('');
    return `<svg class="matrix-shape-svg ${className}" viewBox="0 0 100 100" role="img" aria-label="Figura geometryczna">${patternDefs()}<g transform="rotate(${item.rotation||0} 50 50)">${shapes}</g></svg>`;
  }

  function patternDefs(){ return `<defs><pattern id="matrix-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="#2b343a" stroke-width="3"/></pattern></defs>`; }
  function fillStyle(fill){ return fill==='solid'?'#e9dec9':fill==='striped'?'url(#matrix-stripes)':'rgba(255,255,255,.03)'; }
  function shapeElement(it,x,y,s){
    const fill=fillStyle(it.fill), stroke='#182126', sw=3;
    const common=`fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"`;
    switch(it.shape){
      case 'circle': return `<circle cx="${x}" cy="${y}" r="${22*s}" ${common}/>`;
      case 'square': return `<rect x="${x-21*s}" y="${y-21*s}" width="${42*s}" height="${42*s}" rx="${5*s}" ${common}/>`;
      case 'triangle': return `<polygon points="${x},${y-25*s} ${x+24*s},${y+21*s} ${x-24*s},${y+21*s}" ${common}/>`;
      case 'diamond': return `<polygon points="${x},${y-26*s} ${x+25*s},${y} ${x},${y+26*s} ${x-25*s},${y}" ${common}/>`;
      case 'pentagon': return `<polygon points="${polyPoints(5,x,y,25*s,-90)}" ${common}/>`;
      case 'hexagon': return `<polygon points="${polyPoints(6,x,y,25*s,0)}" ${common}/>`;
      case 'star': return `<polygon points="${starPoints(x,y,25*s,11*s)}" ${common}/>`;
      case 'cross': return `<path d="M${x-8*s} ${y-25*s}h${16*s}v${17*s}h${17*s}v${16*s}h-${17*s}v${17*s}h-${16*s}v-${17*s}h-${17*s}v-${16*s}h${17*s}z" ${common}/>`;
      default:return '';
    }
  }
  function polyPoints(n,cx,cy,r,start){ return Array.from({length:n},(_,i)=>{const a=(start+i*360/n)*Math.PI/180;return `${cx+Math.cos(a)*r},${cy+Math.sin(a)*r}`}).join(' '); }
  function starPoints(cx,cy,r1,r2){ return Array.from({length:10},(_,i)=>{const r=i%2?r2:r1,a=(-90+i*36)*Math.PI/180;return `${cx+Math.cos(a)*r},${cy+Math.sin(a)*r}`}).join(' '); }
  function scaleFor(size,count){ const base={small:.62,medium:.82,large:1}[size||'medium']; return count>1?base*.68:base; }
  function countPositions(count,pos){
    if(count===1){ const m={center:[50,50],tl:[30,30],tr:[70,30],bl:[30,70],br:[70,70]}; return [m[pos]||m.center]; }
    if(count===2) return [[32,50],[68,50]];
    return [[50,27],[30,68],[70,68]];
  }

  function distractors(answer){
    const candidates=[
      {...answer,shape:differentShape(answer.shape)},
      {...answer,fill:differentFill(answer.fill)},
      {...answer,rotation:rot((answer.rotation||0)+90)},
      {...answer,count:answer.count===3?1:(answer.count||1)+1},
      {...answer,size:answer.size==='large'?'small':answer.size==='small'?'medium':'large'},
      {...answer,position:answer.position==='center'?'tr':'center'}
    ];
    const unique=[]; const seen=new Set([key(answer)]);
    for(const c of shuffle(candidates)){ const k=key(c); if(!seen.has(k)){seen.add(k);unique.push(c);} if(unique.length===4) break; }
    while(unique.length<4){ const c=feature(differentShape(answer.shape),choose(FILLS),choose([0,45,90,180]),rand(1,3),choose(['small','medium','large'])); const k=key(c); if(!seen.has(k)){seen.add(k);unique.push(c);} }
    return unique;
  }

  function pickType(level){
    const max=Math.max(1,Math.min(10,level)); let eligible=TYPES.filter(t=>t.level<=max&&!usedTypes.includes(t.id));
    if(!eligible.length) eligible=TYPES.filter(t=>t.level<=max); const t=choose(eligible); usedTypes.push(t.id); if(usedTypes.length>MEMORY)usedTypes.shift(); return t;
  }
  function generate(index=0,level=1){
    const type=pickType(level), data=type.build(), options=shuffle([data.answer,...distractors(data.answer)]);
    return {id:`matrix-${Date.now()}-${index}`,category:'MATRYCE',family:'matrix',layout:'matrix3-shapes',level:type.level,prompt:type.prompt,data,answer:data.answer,answerIndex:options.findIndex(o=>key(o)===key(data.answer)),options};
  }
  window.MatrixGenerator={generate,shapeSvg,typeCount:TYPES.length,types:TYPES.map(({id,level,prompt})=>({id,level,prompt}))};
})();