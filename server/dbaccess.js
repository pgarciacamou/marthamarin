var express               = require("express");
var ExpressStormpath      = require("express-stormpath");
var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var Schema                = mongoose.Schema;
var router                = express.Router();
var isProduction          = process.env.NODE_ENV === "production";
var isDevelopment         = process.env.NODE_ENV === "development";

function skipMiddleWare(req, res, next) {
  next();
}

var adminGroupMiddleWare = isProduction ? ExpressStormpath.groupsRequired(["admin"]) : skipMiddleWare;
var dbURI = isProduction ? process.env.MONGOLAB_URI : "mongodb://localhost/";

mongoose.set("debug", true);
var conn = mongoose.connection;

[
  "connecting", 
  "connected", 
  "open", 
  "disconnecting", 
  "disconnected", 
  "close", 
  "reconnected", 
  "error"
].forEach(function (event) {
  conn.on(event, function () {
    console.log(event);
  });
});

mongoose.connect(dbURI);

function handleError(res, err) {
  console.log("err", err);
  res.type("application/json");
  res.status(400);
  res.json(err);
}

// SCHEMAS
var projectSchema = new Schema({
  mytitle:  String,
  myinfo: String
  // comments: [{ body: String, date: Date }],
  // date: { type: Date, default: Date.now },
  // hidden: Boolean,
  // meta: {
  //   votes: Number,
  //   favs:  Number
  // }
});

// MODELS
var Project = conn.model("Project", projectSchema);


router
.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
})
.use(bodyParser.json())
.get("/projects", function (req, res) {
  Project
  .find()
  .limit(20)
  .exec(function(err, projects) {
    if(err) return handleError(res, err);

    res.status(200).json({
      projects: projects
    });
  });
})
.post("/projects", adminGroupMiddleWare, function (req, res, next) {
  Project.create(req.body.project, function (err) {
    if(err) return handleError(res, err);

    res.type("application/json");
    res.status(200);
    res.json({});
  })
})
.delete("/projects", adminGroupMiddleWare, function (req, res, next) {
  Project.remove(req.body.project, function (err) {
    if(err) return handleError(res, err);

    res.type("application/json");
    res.status(200);
    res.json({});
  });
})
.use(function (req, res, next) {
  res
  .type("application/json")
  .status(400)
  .json({});
});


module.exports = router;