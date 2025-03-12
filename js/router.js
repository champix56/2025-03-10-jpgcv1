

/**
 * class de routeur generique
 * @param {[]} routes
 * @param {{}} errorRoutes
 */
export default class Router {
  #routes;
  #errorRoutes;
  #currentPath = "/";
  #wrapper;
  #wrapperId;
  /**
   * initialisation du router
   * @param {Routes} routes 
   * @param {ErrorRoutes} errorRoutes 
   * @param {string} wrapperId 
   */
  constructor(routes, errorRoutes, wrapperId = "wrapper") {
    this.#routes = routes;
    this.#errorRoutes = routes;
    this.#wrapperId=wrapperId;
  }
  /**
   * analyze current url in url bar of browser
   */
  routeAnalyze() {
    this.#currentPath = location.pathname;
    console.log(this.#currentPath);
    if (!this.#wrapper) {
      this.#wrapper = document.querySelector("#" + this.#wrapperId);
    }
    let currentRoute = this.#routes.find((route) => {
      if (typeof route.path === "string" && route.path === this.#currentPath) {
        return true;
      } else if (route.path instanceof RegExp) {
        const m = route.path.exec(this.#currentPath);
        if (m === null) return false;
        else return true;
      } else false;
    });

    if (undefined === currentRoute) {
      currentRoute = this.#errorRoutes[404];
    }

    if (currentRoute.template) {
      this.#loadingTemplateInView(currentRoute);
    } else if (currentRoute.templateUrl) {
      const promiseFetch = fetch(currentRoute.templateUrl).then((r) =>
        r.text()
      );
      const timeOut = new Promise((resolved) => {
        setTimeout(() => {
          resolved(this.#errorRoutes[408]);
        }, 1000);
      });
      Promise.race([promiseFetch, timeOut]).then((resp) => {
        if (typeof resp === "object") {
          currentRoute = resp;
        } else {
          currentRoute.template = resp;
          this.#loadingTemplateInView(currentRoute);
        }
      });
    } else {
      this.#loadingTemplateInView(errorRoutes[500]);
    }
  }
  /**
   * chargement de la route deja chargé(http) dans l'espace dedié a la vue(wrapper)
   * @param {Route} route
   */
  #loadingTemplateInView(route) {
    this.#wrapper.innerHTML = route.template;
    if(route.onLoaded)route.onLoaded(route);
  }

  /**
   * navigation vers un path
   * @param {string} path path a mettre en oeuvre
   * @returns {undefined} ne retourne rien
   */
  navigate(path) {
    if (undefined === path || path.length === 0) path = "/";
    if (path[0] !== "/") path = "/" + path;
    history.pushState(undefined, undefined, path);
    this.#currentPath = path;
    this.routeAnalyze();
  }
  mapRouterLinks(contextId) {
    document.querySelectorAll("#" + contextId + " a").forEach((element) => {
      element.addEventListener("click", (evt) => {
        evt.preventDefault();
        this.navigate(evt.target.href.replace(location.origin, ""));
      });
    });
  }

  /**
   * get currentPath value of stored in router
   */
  get currentPath() {
    return this.#currentPath;
  }
  /**
   *set current path value and navigate
   */
  set currentPath(value) {
    this.#currentPath = value;
    this.navigate(value);
  }
}
/**
 * instance globale du routeur
 */
export const router = new Router(routes, errorRoutes);
window.router=router;
