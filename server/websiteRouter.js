var express               = require("express");
var isProduction          = process.env.NODE_ENV === "production";
var isDevelopment         = process.env.NODE_ENV === "development";

var paths = {
  _client: path.join(__dirname, "..", "src"),
  _public: path.join(__dirname, "..", "public")
};

module.exports = function (rights) {
  var router = express.Router();

  router.get("*", function (req, res, next) {
    res.render(path.join(paths._client, "index"), {
      title: "Martha Marin Website",
      admin: rights === "admin",
      user: rights === "user"
    });
  });

  return router;
};
