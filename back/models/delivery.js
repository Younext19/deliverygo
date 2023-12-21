const mongoose = require("mongoose");

// Model pour une livraison
const deliverySchema = new mongoose.Schema({
  pickupAddress: {
    type: String,
    required: true,
  },
  depositAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  // many deliveries can have one tour
  tour: {
    type: String,
    ref: "Tour",
  },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
