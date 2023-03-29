const mongoose = require("mongoose");

const CrecheDetails = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  director_name: {
    type: String,
  },
  creche_name: {
    type: String,
  },
  profile_photo: {
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
  capacity: {
    type: Number,
  },
  identity_number: {
    type: String,
  },
  identity_photo: {
    type: String,
  },
  daycare_license_number_kyc: {
    type: String,
  },
  daycare_license_photo_kyc: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
});

module.exports = mongoose.model(
  "CrecheDetails" /* Collection Name */,
  CrecheDetails /* Collection Schema to use */
);
