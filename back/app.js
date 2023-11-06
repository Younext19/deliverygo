var express = require("express");
const mongoose = require("mongoose");

var app = express();
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
mongoose.connect("mongodb://root:root@mongo:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
