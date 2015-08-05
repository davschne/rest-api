var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema({
  username  : String,
  firstname : String,
  lastname  : String,
  email     : String,
  address   : {
    street : String,
    city   : String,
    state  : String,
    zip    : String
  }
});

module.exports = mongoose.model("User", userSchema);
