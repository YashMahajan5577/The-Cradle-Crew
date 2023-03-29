const mongoose = require("mongoose");

const RegistrationRequests = mongoose.Schema({
  username: {
    type: String,
  },
  data: {
    type: Array
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model(
  "RegistrationRequests" /* Collection Name */,
  RegistrationRequests /* Collection Schema to use */
);
