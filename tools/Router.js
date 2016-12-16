function Router() {
    this.routes = {};
    this.currentUrl = '';
}

Router.prototype.route = function (path, callback) {
    console.log(path);
    this.routes[path] = callback || function () { };
};

Router.prototype.refresh = function () {
    this.currentUrl = location.hash.slice(1) || '/';
    console.log(this.currentUrl);

    this.routes[this.currentUrl]();
};

Router.prototype.init = function () {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
};

window.router = new Router();
window.router.init();
console.log('fasd');

var content = document.querySelector('body');
function changeBgColor(color) {
    content.style.backgroundColor = color;
}
console.log(router === window.router);
console.log('fasf');
router.route('/blue', function () {
    changeBgColor('blue');
});
router.route('/', function () {
    changeBgColor('white');
});
router.route('/green', function () {
    changeBgColor('green');
});