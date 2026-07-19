(() => {
  'use strict';

  const SHAPES = ['circle','square','triangle','diamond','pentagon','hexagon','star','cross'];
  const FILLS = ['outline','solid','striped','dotted'];
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

  function normalizedRotation(shape,rotation=0){
    const periods={
      circle:1,
      square:90,
      diamond:90,
      triangle:120,
      pentagon:72,
      hexagon:60,
      star:72,
      cross:90
    };
    const period=periods[shape]||360;
    return period===1 ? 0 : rot(rotation)%period;
  }

  function visualKey(f){
    if(f?.kind) return `${f.kind}|${JSON.stringify(f.pattern||f.data||{})}`;
    const count=f.count||1;
    const position=count===1 ? (f.position||'center') : 'group';
    return [
      f.shape,
      f.fill,
      normalizedRotation(f.shape,f.rotation||0),
      count,
      f.size||'medium',
      position
    ].join('|');
  }

  function samePaletteCandidate(answer,changes){
    return {...answer,...changes,fill:answer.fill};
  }


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
    { id:'fill-rotation-cycle', level:4, prompt:'Uzupełnij jednoczesny cykl obrotu i wypełnienia.', build(){
      const shape=choose(['triangle','diamond','star','cross']);
      const fills=['outline','striped','dotted'];
      const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++){
        cells.push(feature(shape,fills[(r+c)%3],(r*45+c*90)));
      }
      const ans=cells[8]; cells[8]=null; return matrix(cells,ans);
    }},
    { id:'multi-count-cycle', level:5, prompt:'Uzupełnij liczbę i układ figur.', build(){
      const shape=choose(['circle','square','triangle','diamond','star']);
      const counts=[1,2,3];
      const fills=['outline','striped','dotted'];
      const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++){
        cells.push(feature(shape,fills[r],0,counts[(r+c)%3],c===0?'small':'medium'));
      }
      const ans=cells[8]; cells[8]=null; return matrix(cells,ans);
    }},
    { id:'dotted-striped-latin', level:5, prompt:'Odkryj cykl figur i sposobu wypełnienia.', build(){
      const shapes=shuffle(SHAPES).slice(0,3);
      const fills=['outline','striped','dotted'];
      const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++){
        cells.push(feature(shapes[(r+c)%3],fills[(2*r+c)%3]));
      }
      const ans=cells[8]; cells[8]=null; return matrix(cells,ans);
    }},
    { id:'shape-fill-count', level:7, prompt:'Połącz figurę, wypełnienie i ich liczbę.', build(){
      const shapes=shuffle(['circle','square','triangle','diamond','star','hexagon']).slice(0,3);
      const fills=['outline','striped','dotted'];
      const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++){
        cells.push(feature(
          shapes[(r+c)%3],
          fills[(r+2*c)%3],
          c*45,
          ((r+c)%3)+1,
          'medium'
        ));
      }
      const ans=cells[8]; cells[8]=null; return matrix(cells,ans);
    }},

    { id:'quadrant-shift', level:2, prompt:'Który element kończy przesuwanie zaciemnionego pola?', build(){
      const shapes=['diamond','square','circle'];
      const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++) cells.push({kind:'quadrant',pattern:{shape:shapes[r],q:(c+r)%4}});
      const answer=cells[8]; cells[8]=null;
      const options=[
        answer,
        {kind:'quadrant',pattern:{shape:'circle',q:0}},
        {kind:'quadrant',pattern:{shape:'circle',q:1}},
        {kind:'quadrant',pattern:{shape:'square',q:2}},
        {kind:'quadrant',pattern:{shape:'diamond',q:3}}
      ];
      return {cells,answer,options};
    }},
    { id:'grid-shift', level:3, prompt:'Uzupełnij przesuwanie zaznaczonych pól w siatce.', build(){
      const base=[0,3,6];
      const cells=[];
      const extras=[[null,4,5],[null,7,8],[null,1,2]];
      for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
          const p=[...base];
          if(extras[r][c]!=null)p.push(extras[r][c]);
          cells.push({kind:'grid3',pattern:p});
        }
      }
      const answer=cells[8]; cells[8]=null;
      const options=[
        answer,
        {kind:'grid3',pattern:[0,3,6,4]},
        {kind:'grid3',pattern:[0,3,6,7]},
        {kind:'grid3',pattern:[0,3,6,8]},
        {kind:'grid3',pattern:[0,3,6,2]}
      ];
      return {cells,answer,options};
    }},
    { id:'line-counts', level:3, prompt:'Uzupełnij liczbę linii poziomych i pionowych.', build(){
      const cells=[
        {kind:'lines',pattern:{h:2,v:0}},{kind:'lines',pattern:{h:2,v:0}},{kind:'lines',pattern:{h:3,v:1}},
        {kind:'lines',pattern:{h:1,v:1}},{kind:'lines',pattern:{h:1,v:1}},{kind:'lines',pattern:{h:2,v:2}},
        {kind:'lines',pattern:{h:0,v:2}},{kind:'lines',pattern:{h:0,v:2}},null
      ];
      const answer={kind:'lines',pattern:{h:1,v:3}};
      const options=[
        answer,
        {kind:'lines',pattern:{h:1,v:1}},
        {kind:'lines',pattern:{h:2,v:2}},
        {kind:'lines',pattern:{h:3,v:0}},
        {kind:'lines',pattern:{h:0,v:3}}
      ];
      return {cells,answer,options};
    }},
    { id:'block-growth', level:4, prompt:'Który układ bloków kończy wzrost wierszy i kolumn?', build(){
      const make=(r,c)=>{
        const p=[];
        for(let y=0;y<r+2;y++)p.push(y*4);
        for(let x=1;x<c+2;x++)p.push((r+1)*4+x);
        return {kind:'blocks',pattern:p};
      };
      const cells=[];
      for(let r=0;r<3;r++)for(let c=0;c<3;c++)cells.push(make(r,c));
      const answer=cells[8]; cells[8]=null;
      const options=[
        answer,
        make(1,2),
        make(2,1),
        make(0,2),
        {kind:'blocks',pattern:[0,4,8,9,10]}
      ];
      return {cells,answer,options};
    }},

    { id:'nested-three-rules', level:10, prompt:'Zastosuj jednocześnie reguły wierszy, kolumn i przekątnej.', build(){
      const s=shuffle(SHAPES).slice(0,3), fills=['outline','solid','striped']; const cells=[];
      for(let r=0;r<3;r++) for(let c=0;c<3;c++) cells.push(feature(s[(r+c)%3],fills[(2*r+c)%3],(r*90+c*45),((r+c)%3)+1,['small','medium','large'][(r+2*c)%3]));
      const ans=cells[8];cells[8]=null;return matrix(cells,ans);
    }}
  ];

  function clone(x){ return JSON.parse(JSON.stringify(x)); }
  function matrix(cells,answer){ return {cells,answer}; }


  function customMatrixSvg(item,className=''){
    const uid=`custom-matrix-${Math.random().toString(36).slice(2)}`;
    const base=`<svg class="matrix-shape-svg ${className}" viewBox="0 0 100 100" role="img" aria-label="Element matrycy">`;
    const end='</svg>';

    if(item.kind==='grid3'){
      const cells=item.pattern||[];
      let out=`${base}<rect x="8" y="8" width="84" height="84" rx="5" fill="#f6f4ef" stroke="#15212c" stroke-width="4"/>`;
      for(let i=1;i<3;i++){
        out+=`<line x1="${8+i*28}" y1="8" x2="${8+i*28}" y2="92" stroke="#15212c" stroke-width="2"/>`;
        out+=`<line x1="8" y1="${8+i*28}" x2="92" y2="${8+i*28}" stroke="#15212c" stroke-width="2"/>`;
      }
      cells.forEach(idx=>{
        const r=Math.floor(idx/3),c=idx%3;
        out+=`<rect x="${10+c*28}" y="${10+r*28}" width="24" height="24" fill="#3f6795"/>`;
      });
      return out+end;
    }

    if(item.kind==='quadrant'){
      const shape=item.pattern?.shape||'circle';
      const q=item.pattern?.q||0;
      let outline='',fill='';
      if(shape==='circle'){
        outline='<circle cx="50" cy="50" r="35" fill="#fff" stroke="#111" stroke-width="3"/><line x1="15" y1="50" x2="85" y2="50" stroke="#111" stroke-width="2"/><line x1="50" y1="15" x2="50" y2="85" stroke="#111" stroke-width="2"/>';
        const paths=[
          'M50 50 L50 15 A35 35 0 0 1 85 50 Z',
          'M50 50 L85 50 A35 35 0 0 1 50 85 Z',
          'M50 50 L50 85 A35 35 0 0 1 15 50 Z',
          'M50 50 L15 50 A35 35 0 0 1 50 15 Z'
        ];
        fill=`<path d="${paths[q]}" fill="#111"/>`;
      }else{
        const rot=shape==='diamond'?'rotate(45 50 50)':'';
        outline=`<g transform="${rot}"><rect x="18" y="18" width="64" height="64" fill="#fff" stroke="#111" stroke-width="3"/><line x1="50" y1="18" x2="50" y2="82" stroke="#111" stroke-width="2"/><line x1="18" y1="50" x2="82" y2="50" stroke="#111" stroke-width="2"/></g>`;
        const coords=[[50,18,32,32],[50,50,32,32],[18,50,32,32],[18,18,32,32]][q];
        fill=`<g transform="${rot}"><rect x="${coords[0]}" y="${coords[1]}" width="${coords[2]}" height="${coords[3]}" fill="#111"/></g>`;
      }
      return `${base}${outline}${fill}${end}`;
    }

    if(item.kind==='lines'){
      const h=item.pattern?.h||0, v=item.pattern?.v||0;
      let out=`${base}<rect x="12" y="12" width="76" height="76" fill="#fff" stroke="#111" stroke-width="3"/>`;
      for(let i=0;i<h;i++){
        const y=50+(i-(h-1)/2)*10;
        out+=`<line x1="26" y1="${y}" x2="74" y2="${y}" stroke="#1465e8" stroke-width="3"/>`;
      }
      for(let i=0;i<v;i++){
        const x=50+(i-(v-1)/2)*10;
        out+=`<line x1="${x}" y1="26" x2="${x}" y2="74" stroke="#1465e8" stroke-width="3"/>`;
      }
      return out+end;
    }

    if(item.kind==='blocks'){
      const cells=item.pattern||[];
      let out=base;
      cells.forEach(idx=>{
        const r=Math.floor(idx/4),c=idx%4;
        out+=`<rect x="${18+c*17}" y="${18+r*17}" width="15" height="15" fill="#111"/>`;
      });
      return out+end;
    }

    return `${base}<rect x="15" y="15" width="70" height="70" fill="none" stroke="#72f0f2" stroke-width="3"/>${end}`;
  }

  function shapeSvg(item,className=''){
    if(item?.kind) return customMatrixSvg(item,className);
    const count=item.count||1;
    const positions=countPositions(count,item.position);
    const uid=`matrix-${Math.random().toString(36).slice(2)}`;
    const shapes=positions.map(([x,y],i)=>shapeElement(item,x,y,scaleFor(item.size,count),`${i}`,uid)).join('');
    return `<svg class="matrix-shape-svg ${className}" viewBox="0 0 100 100" role="img" aria-label="Figura geometryczna">
      <defs>
        <pattern id="${uid}-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="rgba(3,21,33,.10)"/>
          <line x1="0" y1="0" x2="0" y2="8" stroke="#55edf0" stroke-width="1.5"/>
        </pattern>
        <pattern id="${uid}-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="rgba(3,21,33,.10)"/>
          <circle cx="3" cy="3" r="1.5" fill="#55edf0"/>
          <circle cx="8" cy="8" r="1.5" fill="#55edf0"/>
        </pattern>
        <filter id="${uid}-shadow" x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#000000" flood-opacity=".30"/>
        </filter>
      </defs>
      <g transform="rotate(${item.rotation||0} 50 50)" filter="url(#${uid}-shadow)">${shapes}</g>
    </svg>`;
  }

  function patternDefs(){
    const uid=`matrix-${Math.random().toString(36).slice(2)}`;
    return `<defs>
      <pattern id="${uid}-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="rgba(3,21,33,.10)"/>
        <line x1="0" y1="0" x2="0" y2="8" stroke="#55edf0" stroke-width="1.5"/>
      </pattern>
      <pattern id="${uid}-dots" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="rgba(3,21,33,.10)"/>
        <circle cx="3" cy="3" r="1.5" fill="#55edf0"/>
        <circle cx="8" cy="8" r="1.5" fill="#55edf0"/>
      </pattern>
    </defs>`;
  }
  function fillStyle(fill,uid){
    if(fill==='solid') return 'rgba(85,237,240,.22)';
    if(fill==='striped') return `url(#${uid}-stripes)`;
    if(fill==='dotted') return `url(#${uid}-dots)`;
    return 'rgba(3,21,33,.08)';
  }
  function shapeElement(it,x,y,s,key,uid){
    const fill=fillStyle(it.fill,uid);
    const stroke='#72f0f2';
    const sw=it.fill==='outline'?2.6:2.0;
    const common=`style="fill:${fill}!important;stroke:${stroke}!important;stroke-width:${sw}!important" stroke-linejoin="round"`;
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
  function scaleFor(size,count){
    const base={small:.88,medium:1.08,large:1.24}[size||'medium'];
    return count>1 ? base*.72 : base;
  }
  function countPositions(count,pos){
    if(count===1){ const m={center:[50,50],tl:[30,30],tr:[70,30],bl:[30,70],br:[70,70]}; return [m[pos]||m.center]; }
    if(count===2) return [[32,50],[68,50]];
    return [[50,27],[30,68],[70,68]];
  }

  function distractors(answer,typeId){
    const fillTypes=new Set([
      'fill-cycle','shape-fill-two-rules','row-combination','rotation-fill',
      'three-feature-latin','alternating-count-fill','xor-shape',
      'progressive-transform','nested-three-rules','fill-rotation-cycle','multi-count-cycle','dotted-striped-latin','shape-fill-count'
    ]);
    const rotationTypes=new Set([
      'rotation-rows','rotation-fill','three-feature-latin',
      'progressive-transform','nested-three-rules','fill-rotation-cycle','multi-count-cycle','dotted-striped-latin','shape-fill-count'
    ]);
    const countTypes=new Set([
      'count-cycle','column-shape-row-count','alternating-count-fill',
      'progressive-transform','nested-three-rules','fill-rotation-cycle','multi-count-cycle','dotted-striped-latin','shape-fill-count'
    ]);
    const sizeTypes=new Set([
      'size-cycle','progressive-transform','nested-three-rules','fill-rotation-cycle','multi-count-cycle','dotted-striped-latin','shape-fill-count'
    ]);
    const positionTypes=new Set(['position-cycle']);

    const candidates=[];

    // Basic shape puzzles should keep exactly the same visual palette.
    for(const shape of shuffle(SHAPES.filter(s=>s!==answer.shape))){
      candidates.push(samePaletteCandidate(answer,{shape}));
    }

    if(fillTypes.has(typeId)){
      for(const fill of FILLS.filter(f=>f!==answer.fill)){
        candidates.push({...answer,fill});
      }
    }

    if(rotationTypes.has(typeId)){
      for(const angle of [45,90,120,180,270]){
        candidates.push(samePaletteCandidate(answer,{rotation:rot((answer.rotation||0)+angle)}));
      }
    }

    if(countTypes.has(typeId)){
      for(const count of [1,2,3].filter(n=>n!==(answer.count||1))){
        candidates.push(samePaletteCandidate(answer,{count}));
      }
    }

    if(sizeTypes.has(typeId)){
      for(const size of ['small','medium','large'].filter(s=>s!==(answer.size||'medium'))){
        candidates.push(samePaletteCandidate(answer,{size}));
      }
    }

    if(positionTypes.has(typeId)){
      for(const position of ['center','tl','tr','br','bl'].filter(p=>p!==(answer.position||'center'))){
        candidates.push(samePaletteCandidate(answer,{position}));
      }
    }

    // Fallbacks remain in the same colour/fill family.
    candidates.push(
      samePaletteCandidate(answer,{shape:differentShape(answer.shape),count:(answer.count||1)===3?1:(answer.count||1)+1}),
      samePaletteCandidate(answer,{shape:differentShape(answer.shape),size:(answer.size||'medium')==='large'?'small':'large'}),
      samePaletteCandidate(answer,{shape:differentShape(answer.shape),position:(answer.position||'center')==='center'?'tr':'center'})
    );

    const unique=[];
    const seen=new Set([visualKey(answer)]);
    for(const candidate of shuffle(candidates)){
      const vk=visualKey(candidate);
      if(!seen.has(vk)){
        seen.add(vk);
        unique.push(candidate);
      }
      if(unique.length===4) break;
    }

    let guard=0;
    while(unique.length<4 && guard<100){
      guard++;
      const candidate=samePaletteCandidate(answer,{
        shape:choose(SHAPES.filter(s=>s!==answer.shape)),
        count:choose([1,2,3]),
        size:choose(['small','medium','large']),
        position:choose(['center','tl','tr','br','bl']),
        rotation:choose([0,45,90,120,180,270])
      });
      const vk=visualKey(candidate);
      if(!seen.has(vk)){
        seen.add(vk);
        unique.push(candidate);
      }
    }
    return unique;
  }

  function pickType(level){
    const max=Math.max(1,Math.min(10,level)); let eligible=TYPES.filter(t=>t.level<=max&&!usedTypes.includes(t.id));
    if(!eligible.length) eligible=TYPES.filter(t=>t.level<=max); const t=choose(eligible); usedTypes.push(t.id); if(usedTypes.length>MEMORY)usedTypes.shift(); return t;
  }
  function generate(index=0,level=1){
    const type=pickType(level);
    const data=type.build();
    const options=shuffle(data.options||[data.answer,...distractors(data.answer,type.id)]);
    const answerVisualKey=visualKey(data.answer);
    return {
      id:`matrix-${Date.now()}-${index}`,
      category:'MATRYCE',
      family:'matrix',
      layout:'matrix3-shapes',
      level:type.level,
      prompt:type.prompt,
      data,
      answer:data.answer,
      answerIndex:options.findIndex(o=>visualKey(o)===answerVisualKey),
      options
    };
  }
  window.MatrixGenerator={generate,shapeSvg,typeCount:TYPES.length,types:TYPES.map(({id,level,prompt})=>({id,level,prompt}))};
})();