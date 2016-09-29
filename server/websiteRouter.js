var express               = require("express");
var isProduction          = process.env.NODE_ENV === "production";
var isDevelopment         = process.env.NODE_ENV === "development";
var browserify            = require("browserify-middleware");
var path                  = require("path");
var babelify              = require("babelify");
var less                  = require("express-less");
var LessPluginAutoPrefix  = require('less-plugin-autoprefix');
var autoprefixPlugin      = new LessPluginAutoPrefix({browsers: ["> 5%"]});

var paths = {
  _client: path.join(__dirname, "..", "src"),
  _public: path.join(__dirname, "..", "public"),
};
paths.scripts     = path.join(paths._client, "scripts");
paths.styles      = path.join(paths._client, "styles");
paths.components  = path.join(paths._client, "components");
paths.index       = path.join(paths._client, "index.html.ejs");

var browserifyOptions = {
  ignoreMissing: true,
  insertGlobals: true,
  transform: [
    [babelify, {
      presets: ["es2015", "react"]
    }]
  ],
  debug: true,
  precompile: true,
  minify: true,
  cache: isProduction ? true : "dynamic"
};

var lessOptions = {
  compress: true,
  debug: true,
  plugins: [autoprefixPlugin]
};

module.exports = function (rights) {
  var router = express.Router();

  router.use("/components", browserify(paths.components, browserifyOptions));
  router.use("/scripts", browserify(paths.scripts, browserifyOptions));
  router.use("/styles", less(paths.styles, lessOptions));
  router.use("/", function (req, res, next) {
    res.render(paths.index, {
      title: "Martha Marin Website",
      admin: rights === "/admin",
      user: rights === "/",
      base: path.join(rights, "/")
    });
  });
  router.use("*", function (req, res, next) {
    res.sendStatus(404);
  });

  return router;
};
