const mongoose = require("mongoose");

const Appointments = mongoose.Schema({
  username: {
    type: String,
  },
  appointments:{
    type: Array
  },
});

module.exports = mongoose.model("Appointments", Appointments);
