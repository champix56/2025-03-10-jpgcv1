/**
 * createur d'instance de routeur generique
 * @param {[]} routes 
 * @param {{}} errorRoutes 
 */
function Router(routes, errorRoutes) {
  var _currentPath = "/";
  var _privateFieldOnlyInInstance = "coucou";
  function _routeAnalyze() {
    var path = location.pathname;
    console.log(path);
    var wrapper = document.getElementById("wrapper");
    var currentRoute=routes.find((route)=>{
        if(typeof route.path==='string' && route.path===path){return true;}
        else if(route.path instanceof RegExp){
          var m=route.path.exec(path)
          if(m===null)return false;
          else return true;
        }
        else false;
    });
    if(undefined===currentRoute){
      currentRoute=errorRoutes[404];
    }
    wrapper.innerHTML=currentRoute.template;
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