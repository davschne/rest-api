var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/rest-api", function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Opened connection to MongoDB...");
  }
});

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
