const mongoose = require("mongoose");

// Model pour une tournée
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // one tour can have one deliver
  deliver: {
    type: String,
    ref: "Deliver",
  },
  // one tour can have many deliveries
  deliveries: [
    {
      type: String,
      ref: "Delivery",
    },
  ],
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
