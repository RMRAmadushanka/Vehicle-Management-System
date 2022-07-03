const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const service_Center = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    telephone1: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone2: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const service_Center_Schema = mongoose.model("service_Center", service_Center);
module.exports = service_Center_Schema;
