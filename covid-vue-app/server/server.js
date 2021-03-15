const express = require("express");
const app = express();
app.use(express.static("dist"));
// app.use(express.static("css"));
// app.use(express.static("js"));

app.listen(8118, () => {});
