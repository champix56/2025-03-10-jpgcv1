import router from './router.js'
document.addEventListener("DOMContentLoaded", function (evt) {
  console.log(evt);
  var notLoadedTag = document.getElementById("js-not-loaded");
  //   notLoadedTag.innerHTML = "JS <br/>Loaded";
  //   notLoadedTag.style.backgroundColor = "green";
  notLoadedTag.remove();
  router.routeAnalyze();
});
