const routes = Object.freeze([
  {
    title: `editor`,
    templateUrl: "/routes/editor/editor.html",
    // template: "<h1>Editeur</h1>",
    onLoad: function (params) {
      console.log("editor chargé", params);
    },
    path: /^\/editor(\/(?<id>\d*))?$/,
  },
  {
    title: "thumbnail",
    templateUrl: "/routes/thumbnail/thumbnail.html",
    // template: "<h1>Thumbnail</h1>",
    path: "/thumbnail",
  },
  {
    title: "Credits",
    template:
      "<script src='/routes/editor/editor.js'></script><h1>remerciements :</h1><ul><li>Formateur : Alexandre DESORBAIX</li><li>Tous les participants de la formation</li></ul>",
    path: "/credits",
    onLoad:()=>{loadScript();}
  },
  {
    title: "home",
    templateUrl: "/routes/home/home.html",
    // template: "<h1>Home</h1>",
    path: "/",
    default: true,
  },
]);
const errorsRoutes = Object.freeze({
  404: {
    title: "404 NOT FOUND",
    templateUrl: "/routes/errors/404.html",
    // template:'<h1>404</h1>',
  },
  500: {
    title: "500 Internal server error",
    template:
      "<h1>La page ne peut etre rendu</h1><h2>Erreur 500 : internal server error</h2>",
  },
});
const loadScript=(wrapperId="wrapper")=> {
    const s = document.querySelectorAll("#" + wrapperId + " script");
    console.log(s);
    s.forEach((sc) => {
      fetch(sc.src)
        .then((r) => r.text())
        .then((script) => {
          eval(script);
          console.log(script,Editor);
        });
    });
  }