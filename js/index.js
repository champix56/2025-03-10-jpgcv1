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
