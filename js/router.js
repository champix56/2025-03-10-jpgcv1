/**
 * class Pour routeur flexible et modulaire
 */
class Router {
  /**
   * ensembles des routes du routeur
   */
  #routes;
  /**
   * ensemble des routes d'erreur
   */
  #errorRoutes;
  /**
   * element id of wrapper node
   */
  #wrapperId;
  /**
   * element instance to wrappe in
   */
  #wrapper;
  /**
   * chemin courrant
   */
  #currentPath = "/";
  /**
   * createur d'instance de routeur generique
   * @param {[]} routes
   * @param {{}} errorRoutes
   */
  constructor(routes, errorRoutes, wrapperId = "wrapper") {
    this.#routes = routes;
    this.#errorRoutes = errorRoutes;
    this.#wrapperId = wrapperId;
  }
  routeAnalyze() {
    const path = location.pathname;
    console.log(path);
    this.wrapperId = this.#wrapperId;
    let currentRoute = this.#routes.find((route) => {
      if (typeof route.path === "string" && route.path === path) {
        return true;
      } else if (route.path instanceof RegExp) {
        const m = route.path.exec(path);
        if (m === null) return false;
        else {
          route.params = m.groups;
          return true;
        }
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
      this.#loadingTemplateInView(this.#errorRoutes[500]);
    }
  }
  /**
   * chargement de la route deja chargé(http) dans l'espace dedié a la vue(wrapper)
   * @param {Route} route
   */
  #loadingTemplateInView(route) {
    this.#wrapper.innerHTML = route.template;
    if (
      route.onTemplateLoaded &&
      typeof route.onTemplateLoaded === "function"
    ) {
      route.onTemplateLoaded(this.#wrapper,route.params);
    }
  }
  /**
   * navigation vers un path
   * @param {string} route path a mettre en oeuvre
   * @returns {undefined} ne retourne rien
   */
  navigate(route) {
    if (undefined === route || route.length === 0) route = "/";
    if (route[0] !== "/") route = "/" + route;
    history.pushState(undefined, undefined, route);
    this.#currentPath = route;
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
  get currentPath() {
    return this.#currentPath;
  }
  get fullCurrentPath() {
    return location.origin + this.#currentPath;
  }
  set wrapperId(value) {
    this.#wrapperId = value;
    this.#wrapper = document.getElementById(value);
  }
}

/**
 * instance globale du routeur
 */
const router = new Router(routes, errorRoutes);
