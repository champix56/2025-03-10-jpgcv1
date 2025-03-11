/**
 * Createur d'instance d'un router
 */
function Router(routes, errorRoutes) {
  var _currentPath = "/";
  var _privateFieldOnlyInInstance = "coucou";
  function _routeAnalyze() {
    var path = location.pathname;
    console.log(path);
    var wrapper = document.getElementById("wrapper");
    switch (path) {
      case "/editor":
        wrapper.innerHTML = "<h1>Bienvenue sur l'éditeur de meme'</h1>";
        break;
      case "/thumbnail":
        wrapper.innerHTML =
          "<h1>Bienvenue sur la gallery des memes enregistrés</h1>";
        break;
      case "/":
      default:
        wrapper.innerHTML =
          "<h1>Bienvenue sur le site de generation de memes en svg avec js</h1>";
        break;
    }
  }
  /**
   * navigation vers un path
   * @param {string} route path a mettre en oeuvre
   * @returns {undefined} ne retourne rien
   */
  function _navigate(route) {
    if (undefined === route || route.length === 0) route = "/";
    if (route[0] !== "/") route = "/" + route;
    history.pushState(undefined, undefined, route);
    this.currentPath = route;
    _routeAnalyze();
  }
  this.mapRouterLinks = function (contextId) {
    document.querySelectorAll("#" + contextId + " a").forEach((element) => {
      element.addEventListener("click", (evt) => {
        evt.preventDefault();
        this.navigate(evt.target.href.replace(location.origin, ""));
      });
    });
  };

  this.navigate = _navigate;
  this.routeAnalyze = _routeAnalyze;
  this.currentPath = _currentPath;
}
/**
 * instance globale du routeur
 */
var router = new Router(routes, errorRoutes);