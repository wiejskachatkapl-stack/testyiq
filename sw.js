const CACHE='iq-brain-lab-v1096';
const ASSETS=[
  './','./index.html','./styles.css','./app.js','./manifest.json',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png',
  './js/generators/diceGenerator.js','./js/generators/matrixGenerator.js','./js/generators/mixedGenerator.js',
  './js/engine/questionEngine.js','./js/generators/oddOneOutGenerator.js','./assets/data/odd_one_out_database.json',
  'assets/audio/rain.ogg','assets/audio/ocean.ogg','assets/audio/forest.ogg','assets/audio/fire.ogg','assets/audio/night.ogg',
  'assets/audio/alpha.ogg','assets/audio/deepFocus.ogg','assets/audio/study.ogg','assets/audio/meditation.ogg',
  'assets/audio/pink.ogg','assets/audio/brown.ogg','assets/audio/white.ogg','assets/audio/delta.ogg'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached) return cached;
      return fetch(event.request).then(response=>{
        if(response && response.ok){
          const clone=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request, clone));
        }
        return response;
      }).catch(()=>{
        if(event.request.mode==='navigate') return caches.match('./index.html');
        return new Response('', {status:404, statusText:'Not Found'});
      });
    })
  );
});
