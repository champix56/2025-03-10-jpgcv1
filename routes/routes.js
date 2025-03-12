import {Thumbnail} from './thumbnail/thumbnail.js'
import {Editor} from './editor/editor.js'
export const routes = [
  {
    path: "/",
    template: "<h1>Bienvenue sur l'éditeur de meme</h1>",
  },
  {
    path: "/thumbnail",
    templateUrl: "/routes/thumbnail/thumbnail.html",
    // template: "<h1>Bienvenue sur la gallery de meme</h1>",
    onTemplateLoaded: (domNode) => {
      console.log( domNode);
      if (!window.viewsjs) {
        window.viewsjs = {};
      }
      window.viewsjs.Thumbnail = new Thumbnail();
      window.viewsjs.Thumbnail.initThumbnail(domNode);
    },
  },
  {
    path: /^\/editor(\/(?<id>\d*))?$/,
    // template: "<h1>Editor </h1>",
    templateUrl: "/routes/editor/editor.html",
    onTemplateLoaded: (domNode, params) => {
      console.log(params, domNode);
      if (!window.viewsjs) {
        window.viewsjs = {};
      }
      window.viewsjs.Editor = new Editor();
      window.viewsjs.Editor.initEditor(domNode, params);
    },
  },
];

export const errorRoutes = {
  404: {
    template: "<h1>404 Not found</h1>",
  },
  408: {
    template: "<h1>408 Timeout</h1>",
  },
  500: {
    template: "<h1>500 Internal server error</h1>",
  },
};
