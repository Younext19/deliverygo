const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const DeliverRoute = require("./routes/deliver");
const TourRoute = require("./routes/tours");
const DeliveryRoute = require("./routes/delivery");
const port = process.env.PORT || 8080;

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
app.use(cors());

app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// app.use("/user", UserRoute);
app.use("/deliver", DeliverRoute); // Add this line for Deliver routes
app.use("/tours", TourRoute); // Add this line for Tour routes
app.use("/livraisons", DeliveryRoute); // Add this line for Tour routes
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API for Delivery App",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:4200",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
