const mongoose = require("mongoose");

const Feedbacks = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("Feedbacks", Feedbacks);
