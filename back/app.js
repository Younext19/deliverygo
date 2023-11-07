const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const UserRoute = require("./routes/user");
mongoose
  .connect(
    "mongodb://mongo:27017/deliverydb?directConnection=true&authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected ");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/user", UserRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
