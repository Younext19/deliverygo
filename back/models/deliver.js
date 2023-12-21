const mongoose = require("mongoose");

// Model pour un livreur
const deliverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  //nombre de tournées
  nbrTours: {
    type: Number,
    default: 0,
  },
});

const Deliver = mongoose.model("Deliver", deliverSchema);

module.exports = Deliver;
