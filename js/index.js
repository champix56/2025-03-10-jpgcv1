document.addEventListener("DOMContentLoaded", function (evt) {
  console.log(evt);
  var notLoadedTag = document.getElementById("js-not-loaded");
  //   notLoadedTag.innerHTML = "JS <br/>Loaded";
  //   notLoadedTag.style.backgroundColor = "green";
  notLoadedTag.remove();
  routeAnalyze();
});

function routeAnalyze() {
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
function navigate(route) {
  if (undefined === route || route.length === 0) route = "/";
  if (route[0] !== "/") route = "/" + route;
  history.pushState(undefined, undefined, route);
  routeAnalyze();
}
