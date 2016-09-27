var express               = require("express");
var isProduction          = process.env.NODE_ENV === "production";
var isDevelopment         = process.env.NODE_ENV === "development";
var browserify            = require("browserify-middleware");

var paths = {
  _client: path.join(__dirname, "..", "src"),
  _public: path.join(__dirname, "..", "public"),
};
paths.scripts     = path.join(paths._client, "scripts");
paths.styles      = path.join(paths._client, "styles");
paths.components  = path.join(paths._client, "components");
paths.index       = path.join(paths._client, "index");

var browserifyOptions = {
  ignoreMissing: true,
  insertGlobals: true,
  transform: [
    [babelify, {
      presets: ["es2015"]
    }]
  ],
  debug: true,
  precompile: true,
  minify: true,
  cache: "dynamic"
};

var lessOptions = {
  compress: true,
  debug: true
};

module.exports = function (rights) {
  var router = express.Router();

  router.get(path.join(rights, "/components"), browserify(paths.components, browserifyOptions));
  router.get(path.join(rights, "/scripts"), browserify(paths.scripts, browserifyOptions));
  router.get(path.join(rights, "/styles"), less(paths.styles, lessOptions));
  router.get("*", function (req, res, next) {
    res.render(paths.index, {
      title: "Martha Marin Website",
      admin: rights === "admin",
      user: rights !== "admin"
    });
  });

  return router;
};
