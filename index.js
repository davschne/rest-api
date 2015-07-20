var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var userRouter = require("./routes/user-routes");

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function() {
  console.log("Server running on port " + app.get("port") + "...");
});

app.use("/api", bodyParser.json(), userRouter);
