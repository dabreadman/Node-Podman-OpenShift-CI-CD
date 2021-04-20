let express = require("express");
let serveStatic = require("serve-static");
let history = require("connect-history-api-fallback");
let app = express();
app.use(history());
app.use(serveStatic(__dirname + "/dist"));
app.get("/", (req, res) => {
  res.status(200).send("This is the home page!");
});
app.get("/stats", (req, res) => {
  res.status(200).send("This is the stats page!");
});
let port = process.env.APP_PORT || 8080;
module.exports = app.listen(port);
