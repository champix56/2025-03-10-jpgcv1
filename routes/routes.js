var routes = [
  {
    title: `editor`,
    templateUrl: "/routes/editor/editor.html",
    template: "<h1>Editeur</h1>",
    onLoad: function (params) {
      console.log("editor chargé", params);
    },
    path: /^\/editor(\/(?<id>\d*))?$/,
  },
  {
    title: "thumbnail",
    templateUrl: "/routes/thumbnail/thumbnail.html",
    template: "<h1>Thumbnail</h1>",
    path: "/thumbnail",
  },
  {
    title: "Credits",
    template:
      "<h1>remerciements :</h1><ul><li>Formateur : Alexandre DESORBAIX</li><li>Tous les participants de la formation</li></ul>",
    path: "/credits",
  },
  {
    title: "home",
    templateUrl: "/routes/home/home.html",
    template: "<h1>Home</h1>",
    path: "/",
    default: true,
  },
];
var errorsRoutes = {
  404: {
    title: "404 NOT FOUND",
    templateUrl: "/routes/errors/404.html",
    template:'<h1>404</h1>',
  },
  500: {
    title: "500 Internal server error",
    template:
      "<h1>La page ne peut etre rendu</h1><h2>Erreur 500 : internal server error</h2>",
  },
};
