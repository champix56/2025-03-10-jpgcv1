/**
 * Class de routeur modulaire
 * necessite un objet de configuration des routes et un objet de config de routes d'erreurs
 */
class Router {
  #wrapperId;
  /**
   * constructeur de l'instance router
   * @param {string} wrapperId id du wrapper tag dans le dom
   */
  constructor(wrapperId) {
    this.#wrapperId = wrapperId;
  }
  /**
   * analyseur de route(url) pour chargement dynamique a appeler lors des- changement de route forcé (pushstate)
   */
  routeAnalyze() {
    const path = location.pathname;
    console.log(path);
    let m = undefined;
    const currentRoute = routes.find((route) => {
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
  /**
   * charge le contenu de route depuis le reseau si pas deja caché
   * @param {Route} route instance de route a mettre en oeuvre
   */
  #loadRoute(route) {
    console.log(route);
    if (undefined !== route.template) {
      this.#loadRouteContentOnWrapper(route);
    } else {
      const f = fetch(route.templateUrl).then((r) => r.text());
      const timeout = new Promise((resolved) => {
        setTimeout(() => resolved(errorsRoutes[500]), 1000);
      });
      Promise.race([f, timeout]).then((r) => {
        if (typeof r === "object") {
          //retour obejet de route d'erreur
          this.#loadRouteContentOnWrapper(r);
        } else {
          //retour du fetch de vue chargement du tempate dans la route pour cache
          route.template = r;
          this.#loadRouteContentOnWrapper(route);
        }
      });
    }
  }
  /**
   * chargement dans le wrapper du contenu de template et execution de la fonction onLoad si présente
   * @param {Route} route route avec contenu préalablement chargé
   */
  #loadRouteContentOnWrapper(route) {
    const wrapper = document.querySelector("#" + this.#wrapperId);
    wrapper.innerHTML = route.template;
    if (undefined !== route.onLoad && route.onLoad instanceof Function) {
      route.onLoad(route.params);
    }
  }
  /**
   * navigation vers un liens
   * @param {string} path chemin de la vue
   */
  navigate(path) {
    if (undefined === path || path.length === 0) path = "/";
    if (path[0] !== "/") path = "/" + path;
    history.pushState(undefined, undefined, path);
    this.routeAnalyze();
  }
}
/**
 * instance du routeur
 */
const router = new Router("wrapper");
export default router;
window.router = router;
