this.addEventListener('install',function(event){
    event.waitUntil(
        caches.open('v1').then(function(cache){
            return cache.addAll([
                '/js/sw/app.js',
                '/service-work.html'
            ])
        })
    )
})

this.addEventListener('fetch',function(event){
    event.responseWith(
        caches.match(event.request)
    )
})