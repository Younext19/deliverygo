const mongoose = require("mongoose");

const deliverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  carType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Deliver = mongoose.model("Deliver", deliverSchema);

module.exports = Deliver;
