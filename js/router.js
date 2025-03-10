function Router(wrapperId) {
  function routeAnalyze() {
    var path = location.pathname;
    console.log(path);
    var wrapper = document.getElementById("wrapper");
    var m = undefined;
    var currentRoute = routes.find(function (route) {
      if (
        route.path instanceof RegExp &&
        (m = route.path.exec(path)) !== null
      ) {
        return true;
      } else if (typeof route.path === "string" && route.path === path) {
        return true;
      }
      return false;
    });
    if (m !== null) currentRoute.params = m.groups;
    if (currentRoute !== undefined) loadRoute(currentRoute);
    else loadRoute(errorsRoutes[404]);
  }
  function loadRoute(route) {
    console.log(route);
    var wrapper = document.querySelector("#" + wrapperId);
    wrapper.innerHTML = route.template;
    if (undefined !== route.onLoad && route.onLoad instanceof Function) {
      route.onLoad(route.params);
    }
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
var router = new Router("wrapper");
