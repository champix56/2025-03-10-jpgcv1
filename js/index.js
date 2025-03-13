import { errorRoutes, routes } from "../routes/routes.js";
import router, { routeAnalyze } from "./router.js";
// import { routeAnalyze as RegardeLeChemin , default as router} from "./router.js";
// import router from './router.js'
// import * as R from './router.js' // usage R.router ou R.routeAnalyze
document.addEventListener("DOMContentLoaded", function (evt) {
  console.log(evt);
  const notLoadedTag = document.getElementById("js-not-loaded");
  //   notLoadedTag.innerHTML = "JS <br/>Loaded";
  //   notLoadedTag.style.backgroundColor = "green";
  notLoadedTag.remove();
  router.initRoutes(routes, errorRoutes, "wrapper");
  routeAnalyze();
  router.mapRouterLinks("navbar");
});
