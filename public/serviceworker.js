const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html','bundle.js','App.css'];

const self = this;

self.addEventListener('install',(event) =>{
  event.waitUntil(caches.open(CACHE_NAME).then((cache) =>{
    console.log('Cache is opened');
    return cache.addAll(urlsToCache);
  }))
})

self.addEventListener('fetch',(event) => {
  if(!navigator.onLine){
    event.respondWith(
      caches.match(event.request).then(() => {
        console.log('from fetch and match !');
        return fetch(event.request)
        
        //.catch(() => caches.match('offline.html'))
      })
    )
  }
})

self.addEventListener('activate',
(event) => {
  const targetCacheList = [];

  targetCacheList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then(
      (cacheNames) => Promise.all(cacheNames.map(
          (cacheName) => {
            if(!targetCacheList.includes(cacheName)){
              return caches.delete(cacheName);
            }
          }
        ))
    )
  )
})