(() => {
  'use strict';
  const families=[window.DiceGenerator,window.MatrixGenerator];
  let lastFamily=-1;
  function generate(index=0,level=1){
    let idx=index%families.length;
    if(idx===lastFamily) idx=(idx+1)%families.length;
    lastFamily=idx;
    return families[idx].generate(index,level);
  }
  window.MixedGenerator={generate};
})();