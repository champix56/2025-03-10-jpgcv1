import { errorRoutes, routes } from "../routes/routes.js";
import router from "./router.js";
/**
 * instance globale du routeur
 */

(function () {
  document.addEventListener("DOMContentLoaded", function (evt) {
    console.log(evt);
    var notLoadedTag = document.getElementById("js-not-loaded");
    //   notLoadedTag.innerHTML = "JS <br/>Loaded";
    //   notLoadedTag.style.backgroundColor = "green";
    notLoadedTag.remove();
    router.initRouter(routes, errorRoutes, "wrapper");
    router.routeAnalyze();
    router.mapRouterLinks("navbar");
  });
})();
