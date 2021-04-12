var express = require("express");
var serveStatic = require("serve-static");
var history = require("connect-history-api-fallback");

var app = express();
app.use(history());

app.use(serveStatic(__dirname + "/dist"));

app.get("/", (req, res) => {
    res.status(200).send("This is the home page!");
  });

app.get("/stats", (req, res) => {
    res.status(200).send("This is the stats page!");
  });

var port = process.env.PORT || 5000;
module.exports = app.listen(port);
