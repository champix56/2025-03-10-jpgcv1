/**
 * createur d'instance de routeur generique
 * @param {[]} routes
 * @param {{}} errorRoutes
 */
function Router(routes, errorRoutes) {
  let _currentPath = "/";
  const _privateFieldOnlyInInstance = "coucou";
  const _routeAnalyze = () => {
    const path = location.pathname;
    console.log(path);
    const wrapper = document.getElementById("wrapper");
    let currentRoute = routes.find((route) => {
      if (typeof route.path === "string" && route.path === path) {
        return true;
      } else if (route.path instanceof RegExp) {
        const m = route.path.exec(path);
        if (m === null) return false;
        else return true;
      } else false;
    });

    if (undefined === currentRoute) {
      currentRoute = errorRoutes[404];
    }

    if (currentRoute.template) {
      _loadingTemplateInView(currentRoute);
    } else if (currentRoute.templateUrl) {
      fetch(currentRoute.templateUrl)
        .then((r) => {
          //traitement erreur
          //renvoie du contenue
          r.text();
        })
        .then((contenuDeTemplate) => {
          currentRoute.template = contenuDeTemplate;
          _loadingTemplateInView(currentRoute);
        });
    } else {
      _loadingTemplateInView(errorRoutes[500]);
    }
  };

  const _loadingTemplateInView = (route) => {
    wrapper.innerHTML = route.template;
  };

  /**
   * navigation vers un path
   * @param {string} route path a mettre en oeuvre
   * @returns {undefined} ne retourne rien
   */
  const _navigate = (route) => {
    if (undefined === route || route.length === 0) route = "/";
    if (route[0] !== "/") route = "/" + route;
    history.pushState(undefined, undefined, route);
    this.currentPath = route;
    _routeAnalyze();
  };
  const _mapRouterLinks = (contextId) => {
    document.querySelectorAll("#" + contextId + " a").forEach((element) => {
      element.addEventListener("click", (evt) => {
        evt.preventDefault();
        this.navigate(evt.target.href.replace(location.origin, ""));
      });
    });
  };

  this.mapRouterLinks = _mapRouterLinks;
  this.navigate = _navigate;
  this.routeAnalyze = _routeAnalyze;
  this.currentPath = _currentPath;
}
/**
 * instance globale du routeur
 */
const router = new Router(routes, errorRoutes);
