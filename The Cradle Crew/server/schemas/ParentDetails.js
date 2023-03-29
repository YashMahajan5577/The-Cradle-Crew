const mongoose = require("mongoose");

const ParentDetails = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  contact_info: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pin_code: {
    type: String,
  },
  building: {
    type: String,
  },
  kids_info: {
    type: String,
  },
  kids_array: {
    type: Array,
  },
  profile_photo: {
    type: String,
  },
  identity_number: {
    type: String,
  },
  identity_photo: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
});

module.exports = mongoose.model(
  "ParentDetails" /* Collection Name */,
  ParentDetails /* Collection Schema to use */
);
