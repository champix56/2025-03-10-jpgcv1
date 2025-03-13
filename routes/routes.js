// import Thumbnail from "./thumbnail/thumbnail.js";
// import Editor from "./editor/editor.js";
const loadedModules={};
export const routes = [
  {
    path: "/",
    template: "<h1>Bienvenue sur l'éditeur de meme</h1>",
  },
  {
    path: "/thumbnail",
    templateUrl: "/routes/thumbnail/thumbnail.html",
    onTemplateLoaded:async (domNode) => {
      // console.log(params, domNode);
      if (!window.viewsjs) {
        window.viewsjs = {};
      }
      if (!loadedModules.thumbnailjs) {
        loadedModules.thumbnailjs = await import("./thumbnail/thumbnail.js");
      }
      window.viewsjs.Thumbnail = new loadedModules.thumbnailjs.default();
      window.viewsjs.Thumbnail.initThumbnail(domNode);
    },
  },
  {
    path: /^\/editor(\/(?<id>\d*))?$/,
    // template: "<h1>Editor </h1>",
    templateUrl: "/routes/editor/editor.html",
    onTemplateLoaded:async (domNode, params) => {
      console.log(params, domNode);
      if (!window.viewsjs) {
        window.viewsjs = {};
      }
      if (!loadedModules.editorjs) {
        loadedModules.editorjs = await import("./editor/editor.js");
      }
      window.viewsjs.Editor = new loadedModules.editorjs.default();
      window.viewsjs.Editor.initEditor(domNode, params);
    },
  },
];

export const errorRoutes = {
  404: {
    template: '<div id="error-404" style="padding:50px"><h1>404 Not found</h1></div>',
    onTemplateLoaded: (domNode) => {
     const h1=domNode.querySelector('h1')
     const newNode=document.createElement('h5');
     newNode.style.color="tomato";
     newNode.style.textDecoration="underline";
     newNode.innerHTML="Liens innexistant : "+location.origin+location.pathname;
     h1.parentElement.appendChild(newNode);
    },
  },
  408: {
    template: "<h1>408 Timeout</h1>",
  },
  500: {
    template: "<h1>500 Internal server error</h1>",
  },
};
