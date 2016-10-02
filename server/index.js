var path                  = require("path");
var express               = require("express");
var ExpressStormpath      = require("express-stormpath");
// var dbRouter              = require("./dbaccess");
var websiteRouter         = require("./websiteRouter");
var adminRouter           = websiteRouter("/admin");
var userRouter            = websiteRouter("/");
var app                   = express();
var isProduction          = process.env.NODE_ENV === "production";
var isDevelopment         = process.env.NODE_ENV === "development";
var PORT                  = process.env.PORT || 5000;

function skipMiddleWare(req, res, next) {
  next();
}
var adminGroupMiddleWare  = isProduction ? ExpressStormpath.groupsRequired(["admin"]) : skipMiddleWare;

var paths = {
  _client: path.join(__dirname, "..", "src"),
  _public: path.join(__dirname, "..", "public")
};

function startServer() {
  app.listen(PORT);
}
function redirect(to) {
  return function (req, res, next) {
    res.redirect(to);
  };
}
function initExpressStormpath(argument) {
  return ExpressStormpath.init(app, {
    website: true,
    enableRegistration: false,
    web: {
      login: {
        enabled: true,
        uri: "/login",
        nextUri: "/admin"
      },
      logout: {
        enabled: true,
        uri: "/logout",
        nextUri: "/"
      }
    },
    apiKeyId:     process.env.STORMPATH_API_KEY_ID,
    apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
    application:  process.env.STORMPATH_SECRET_KEY,
    postLogoutHandler: function (account, req, res, next) {
      console.log('User', account.email, 'just logged out!');
      next();
    }
  });
}

isProduction && app.use(initExpressStormpath());
isDevelopment && app
  .get('/login', redirect('/admin'))
  .get('/logout', redirect('/'));

app.set("view engine", "ejs");
app.use("/public", express.static(paths._public));
app.use("/admin", adminGroupMiddleWare, adminRouter);
// app.use("/api", dbRouter);
app.use("/", userRouter);

isProduction && app.on("stormpath.ready", startServer);
isDevelopment && startServer();
