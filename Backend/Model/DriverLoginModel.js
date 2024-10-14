const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  
  phone: {
    type: Number,
    required: true,
  },
  licenseNo: {
    type: String,
    required: true,
  },

  vehicleNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DriverRegistration", UserSchema);
