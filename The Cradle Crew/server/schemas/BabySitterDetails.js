const mongoose = require("mongoose");

const BabySitterDetails = mongoose.Schema({
  username: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  profile_photo: {
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
  pricing: {
    type: String,
  },
  activities: {
    type: Array,
  },
  services_offered: {
    type: Array,
  },
  special_features: {
    type: Array,
  },
  gallery_photos: {
    type: Array,
  },
  birth_date: {
    type: String,
  },
  identity_number: {
    type: String,
  },
  identity_photo: {
    type: String,
  },
  about_yourself: {
    type: String,
  },
  verified:{
    type: Boolean,
  }
});

module.exports = mongoose.model("BabySitterDetails", BabySitterDetails);
