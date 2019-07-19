if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/sw/sw.js', { scope: '/js/sw/' })
        .then(function (reg) {
            console.log('Registration succeed. Scope is ' + reg.scope)
        })
        .catch(function (error) {
            console.log("Registration failed with " + error);
        })
}