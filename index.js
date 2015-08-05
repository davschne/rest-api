var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 5000;
var userRouter = express.Router();

require("./routes/user-routes")(userRouter);

app.use("/api/users", bodyParser.json(), userRouter);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/rest-api", function(err) {
  if (err) console.error(err);
  else console.log("Opened connection to MongoDB...");
});

app.listen(PORT, function() {
  console.log("Server running on port " + PORT);
});
