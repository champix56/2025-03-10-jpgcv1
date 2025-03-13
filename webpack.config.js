const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const routes = [
  "routes/editor/editor.html",
  "routes/thumbnail/thumbnail.html",
  "routes/home/home.html",
];
let multiplesFiles = routes.map(function (entryName) {
  return new HtmlWebpackPlugin({
    filename:  `/${entryName.substring(
     0,
        entryName.lastIndexOf("/")
      )}/${entryName.substring(entryName.lastIndexOf('/')+1)}`,
    template:
      __dirname +"/"+
      entryName,
  });
});



module.exports = {
  mode: "development",
  entry: {
    index: "./js/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./webpackTemplates/index.html",
      title: "Development",
    })
  ].concat(multiplesFiles),
  output: {
    filename: "js/index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    modules: ["node_modules"],
  },
  resolveLoader: {
    modules: ["node_modules"],
    extensions: [".js", ".json", "css"],
    mainFields: ["loader", "main"],
  },
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      
      {
        test: /\.(js)$/i,
        loader: "file-loader",
        include:path.join(__dirname,'node_modules/bootstrap/dist/js/'),
        options: {
          name: "[path][name].[ext]",
        },
      },
    
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"],
      // },
    ],
  },
};
