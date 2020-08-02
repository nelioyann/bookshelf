const version = 5;
const staticCacheName = `site-static-v${version}`
const dynamicCache = `site-dynamic-v${version}`
// Fichier qui seront cacher
const assets = [
    '/',
    './index.html',
    './styles/style.css',
    './scripts/script.js',
    './scripts/animations.js',
    './scripts/auth.js',
    './scripts/db.js',
    './scripts/app.js',
    './images/icons/icon-72x72.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png'
    
    
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
});



// self.addEventListener("activate", event =>{
//     event.waitUntil(
//         caches.keys().then(keys =>{
//             console.log(`Keys ${keys}`);
//             return Promise.all(keys
//             // Extract the keyname different than the cirrent keynameversion
//             .filter(key => key !== staticCacheName)
//             // Get the diffkey and delete it from our cache
//             .map(key => caches.delete(key))
//             )
//         })
//     );
//     self.clients.claim();
// });

// self.addEventListener("fetch", (event)=>{
//     event.respondWith(
//         caches.match(event.request)
//         .then(response =>{
//             if (response){
//                 return response;
//             }
//             else{
//                 return fetch(event.request)
//             }
//         })
//     )
// })















// ----------------------- Issue continuous caching 

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
                    limitCacheSize(dynamicCacheName, 15);
                    return fetchResponse;
                })
            });
        }).catch((err)=> {
            if(event.request.url.indexOf('.html') > -1){
                return caches.match('/index.html');
            } else{
                console.log(err)
            }
        })
    )}
});

self.addEventListener("push", event =>{
    const title = "Yay a message";
    const body = "We have received a push message.";
    const icon = "/images/icons/icon-72x72.png";
    const tag = "simple-push-example-tag";
    event.waitUntil(
        self.registration.showNotification(title,{
            body:body,
            icon:icon,
            tag:tag,
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1
            }
        })
    )
})
