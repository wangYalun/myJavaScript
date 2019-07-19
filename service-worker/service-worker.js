var cacheStorageKey = 'minimal-pwa-1';

var cacheList = [
    '/',
    'index.html',
    'main.css',
    'e.png'
]

// this.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open('v1').then(function (cache) {
//             return cache.addAll([
//                 '/',
//                 '/servier-worker',
//                 '/service-work.html'
//             ])
//         })
//     )
// })

// this.addEventListener('fetch', function (event) {
//     event.responseWith(
//         caches.match(event.request)
//     )
// })