var routes = [
  {
    path: "/",
    template: "<h1>Bienvenue sur l'éditeur de meme</h1>",
  },
  {
    path: "/thumbnail",
    templateUrl:'/routes/thumbnail/thumbnail.html'
    // template: "<h1>Bienvenue sur la gallery de meme</h1>",
  },
  {
    path: /^\/editor(\/(?<id>\d*))?$/,
    // template: "<h1>Editor </h1>",
    templateUrl:'/routes/editor/editor.html'
  },
];

var errorRoutes = {
  404: {
    template: "<h1>404 Not found </h1>",
  },
  500: {
    template: "<h1>500 Internal server error</h1>",
  },
};
