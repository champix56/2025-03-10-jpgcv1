class Router {
  #wrapperId;
  constructor(wrapperId) {
    this.#wrapperId = wrapperId;
  }
  routeAnalyze() {
    var path = location.pathname;
    console.log(path);
    var m = undefined;
    var currentRoute = routes.find((route) => {
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
    if (currentRoute !== undefined) this.#loadRoute(currentRoute);
    else this.#loadRoute(errorsRoutes[404]);
  }
  #loadRoute(route) {
    var vm = this;
    console.log(route);
    if (undefined !== route.template) {
      loadRouteContentOnWrapper(route);
    } else {
      const f = fetch(route.templateUrl).then((r) => r.text());
      const timeout = new Promise((resolved) => {
        setTimeout(() => resolved(errorsRoutes[500]), 10000);
      });
      Promise.race([f, timeout]).then((r) => {
        if (r[1] !== undefined) {
          this.#loadRouteContentOnWrapper(r[1]);
        } else {
          route.template = t;
          this.#loadRouteContentOnWrapper(route);
        }
      });
    }
  }
  #loadRouteContentOnWrapper(route) {
    var wrapper = document.querySelector("#" + this.#wrapperId);
    wrapper.innerHTML = route.template;
    if (undefined !== route.onLoad && route.onLoad instanceof Function) {
      route.onLoad(route.params);
    }
  }
  navigate(route) {
    if (undefined === route || route.length === 0) route = "/";
    if (route[0] !== "/") route = "/" + route;
    history.pushState(undefined, undefined, route);
    routeAnalyze();
  }
}
var router = new Router("wrapper");
