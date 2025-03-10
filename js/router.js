function Router() {
  function routeAnalyze() {
    var path = location.pathname;
    console.log(path);
    var wrapper = document.getElementById("wrapper");
    var m=undefined;
    var currentRoute=routes.find(function (route) {
        if(route.path instanceof RegExp && (m = route.path.exec(path)) !== null){
            return true;
        }
        else if(route.path instanceof String && route.path===path) {
            return true;
        }
        return false;
    });
    currentRoute.params=m.groups;
    if(currentRoute!==null)loadRoute(currentRoute);
    else loadRoute(errorsRoutes[404])
  }
  function loadRoute(route){
    console.log(route);
  }
  function navigate(route) {
    if (undefined === route || route.length === 0) route = "/";
    if (route[0] !== "/") route = "/" + route;
    history.pushState(undefined, undefined, route);
    routeAnalyze();
  }

  //   exposition public des fonctions
  this.routeAnalyze = routeAnalyze;
  this.navigate = navigate;
}
var router = new Router();
