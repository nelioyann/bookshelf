const version = 10;
const staticCacheName = `site-static-v${version}`
const dynamicCache = `site-dynamic-v${version}`
// Fichier qui seront cacher
const assets = [
    '/',
    '/manifest.json',
    '/index.html',
    './styles/style.css',
    './styles/style.css.map',
    './scripts/script.js',
    './scripts/animations.js',
    './scripts/auth.js',
    './scripts/app.js',
    './images/logo.png',
    './images/thumbnail.png',
    './images/icons/icon-72x72.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',  
    './images/maskable_icon.png',  
    './images/favicon.ico',  
    "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500&display=swap",

    
    
]

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        if(keys.length > size){
          cache.delete(keys[0]).then(limitCacheSize(name, size));
        }
      });
    });
  };
// install evenet
self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(staticCacheName).then(cache =>{
            // cache.add()
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
    // console.log('service worker has been installed');
    self.skipWaiting();
});


// // ----------------------- Issue continuous caching 

// activate events
self.addEventListener('activate', event=>{
    // console.log('service worker has been activated');
    // DEleting old cache assets
    event.waitUntil(
        caches.keys().then(keys =>{
            console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCache)
                .map(key => caches.delete(key))
            )
        })
    );
    self.clients.claim();
});

// fetch event fires evrytime the brwer seeek an asset
self.addEventListener('fetch',(event)=>{
    // console.log('fetch event', event.request.url.indexOf('chrome-extension'))

    // Temporary hack
    if(event.request.url.indexOf('chrome-extension') != -1){
        return null
    }
    // Pause the request and 
    if(event.request.url.indexOf('firestore.googleapis.com') === -1){
    event.respondWith(
        caches.match(event.request)
        .then(cacheResponse=>{
            return cacheResponse || fetch(event.request).then(fetchResponse =>{
                return caches.open(dynamicCache).then(cache =>{
                    cache.put(event.request.url, fetchResponse.clone());
                    limitCacheSize(dynamicCache, 70);
                    return fetchResponse;
                })
            });
        }).catch((err)=> {
            if(event.request.url.indexOf('.html') > -1){
                return caches.match('/index.html');
            } 
            // else{
            //     console.log(err)
            // }
        })
    )}
});





















// =============================================
// self.addEventListener('install', (event)=>{
//     event.waitUntil(
//         caches.open(staticCacheName).then(cache =>{
//             // cache.add()
//             console.log('caching shell assets');
//             cache.addAll(assets);
//         })
//     );
//     // console.log('service worker has been installed');
// });

// // activate events
// self.addEventListener('activate', event=>{
//     // console.log('service worker has been activated');
//     // DEleting old cache assets
//     event.waitUntil(
//         caches.keys().then(keys =>{
//             console.log(keys);
//             return Promise.all(keys
//                 .filter(key => key !== staticCacheName && key !== dynamicCache)
//                 .map(key => caches.delete(key))
//             )
//         })
//     );
// });

// // fetch event fires evrytime the brwer seeek an asset
// self.addEventListener('fetch',(event)=>{
//     // console.log('fetch event', event)
//     // Pause the request and 
//     if(event.request.url.indexOf('firestore.googleapis.com') === -1){
//     event.respondWith(
//         caches.match(event.request)
//         .then(cacheResponse=>{
//             return cacheResponse || fetch(event.request).then(fetchResponse =>{
//                 return caches.open(dynamicCache).then(cache =>{
//                     cache.put(event.request.url, fetchResponse.clone());
//                     return fetchResponse;
//                 })
//             });
//         }).catch(()=> {
//             if(event.request.url.indexOf('.html') > -1){
//                 return caches.match('/index.html');
//             }
//         })
//     )}
// });