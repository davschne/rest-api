var express = require("express");
var app = express();

var userRouter = require("./routes/user-routes");

app.use("/user", userRouter);
