var router = require("express").Router();
var User = require("../models/user-model");

router.get("/", function(req, res) {
  console.log("GET request at /api/user");
  User.find({}, function(err, data) {
    if (err) {
      res.status(404).json({msg: err});
      console.log("Not found");
    } else {
      res.json(data);
      console.log("Successful response to GET request")
    }
  });
});

router.get("/:id", function(req, res) {

});

router.post("/", function(req, res) {
  console.log("POST request at /api/user");
  console.log(req.body);
  var user = new User(req.body);
  user.save(function(err, newUser) {
    if (err) {
      res.status(400).json({msg: err});
    } else {
      var id = newUser._id; // get _id property of new user
      console.log("POST request created new user, id: " + id);
      res.json({
        msg : "User saved",
        id  : id
      });
    }
  });
});

router.put("/:id", function(req, res) {

});

router.delete("/:id", function(req, res) {

});

module.exports = router;
