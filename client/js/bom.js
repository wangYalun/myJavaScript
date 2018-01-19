/**
 *  Browser Object Model
 */
/**
 * History
 */
(function () {
    //Moving forward and backward
    // history.back();//backward, this will act exactly like the user clicked on the Back button in their Browser toolbar
    // history.forward();//forward

    // //moving to a specific point in history
    // history.go(-1); // just like history.back()
    // history.go(1); // history.forword()

    // history.length;

    /**
     * HTML5, history.pushState history.replaceState()
     */

    var stateObj = { foo: "bar" };
    //This will cause the URL bar to display http://xxxx/bar.html,but won't cause the browser to load bar.html or even check that bar.html exists;
    history.pushState(stateObj, "page 2", "bar.html");
    history.replaceState(stateObj, "page 3", "foo.html");
    window.addEventListener('popstate', function (event) {
        console.log(event.state);
    }, false);
});
console.log(history.length);

(function () {
    //利用history API pushState window.onpopstate前端路由
    var Router = function (navigateDom) {

        var hrefs = navigateDom.querySelectorAll("a");
        var it = this;
        function clickEvent(event) {
            event.preventDefault();
            var routeURL = event.target.getAttribute("data-link");
            console.log(routeURL);
            if(!it.routes[routeURL]){
                return false;
            }
            console.log("fasd");
            history.pushState({ routeURL: routeURL }, "", routeURL);
            it.routes[routeURL]();
            return false;
        }
        hrefs.forEach(function (item, index) {
            item.onclick = clickEvent;
        })
        this.routes = {};
        this.currentUrl = "";
    };

    Router.prototype.route = function (path, cb) {
        this.routes[path] = cb || function () { };
    };
    Router.prototype.init = function () {
        var it = this;
        window.addEventListener("popstate", function (event) {
            var fn = it.routes[event.state.routeURL] || function () { };
            fn();
        }, false);
    }
    window.Router = Router;
})();