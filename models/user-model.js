var mongoose = require("mongoose");

var addressSchema = mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: Number
});

var userSchema = mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  address: addressSchema
});

module.exports = mongoose.model("User", userSchema);
