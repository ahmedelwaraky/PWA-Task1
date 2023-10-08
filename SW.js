// cache name
const cacheName = "cacheNumOne";

// assets to cache
const assets =
[
    '/index.html',
    '/about.html',
    '/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    '/node_modules/@fortawesome/fontawesome-free/css/all.min.css"',
    '/app.js'
];

// self =this   live cycle method at serice worker
self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                return cache.addAll(assets);
            })
            .catch((err) => console.log(err))
    );
});


//if he has cached already go remove and cache again
self.addEventListener("activate", (activateEvent) => {
    activateEvent.waitUntil(                                  //in waituntill write logic  
        caches.keys().then((keys) => {
            return Promise.all(                               //promise all becouse if one rejected => all rejected 
                keys.filter((key) => key !== cacheName)       //key = all assests    
                    .map((key) => caches.delete(key))
            );
        })
        .catch((err) => console.log(err))
    );
});



//to use 
self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request).then((fetchers) => {
                caches.open(cacheName).then((cache) => {
                    cache.put(fetchEvent.request, fetchers.clone())
                    return response;
                })
            })
        })
    )
})