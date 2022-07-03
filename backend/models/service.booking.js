const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const service_booking = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone1: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    serviceCenter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const service_booking_Schema = mongoose.model(
  "service_booking",
  service_booking
);
module.exports = service_booking_Schema;
