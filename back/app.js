var express = require("express");
const mongoose = require("mongoose");

var app = express();
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/MyDatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
