var User = require("../models/user-model");

module.exports = function(router) {

  router.get("/", function(req, res) {
    console.log("GET request at /api/users");
    User.find({}, function(err, data) {
      if (err) {
        res.status(404).json({msg: err});
        console.error(err);
      } else {
        res.status(200).json(data);
        console.log("Successful response to GET request");
      }
    });
  });

  router.post("/", function(req, res) {
    console.log("POST request at /api/users");
    var user = new User(req.body);
    user.save(function(err, newUser) {
      if (err) {
        res.status(400).json({msg: err});
        console.error(err);
      } else {
        var id = newUser._id; // get _id property of new user
        console.log("Sucessfully created new user " + id);
        res.status(200).json(newUser);
      }
    });
  });

  router.get("/:id", function(req, res) {
    var id = req.params.id;
    console.log("GET request at /api/user/" + id);
    User.findById(id, function(err, data) {
      if (err) {
        res.status(404).json({msg: err});
        console.error(err);
      } else {
        res.status(200).json(data);
        console.log("Successful response to GET request for user " + id);
      }
    });
  });

  router.put("/:id", function(req, res) {
    var id = req.params.id;
    console.log("PUT request at /api/user/" + id);
    User.update({_id: id}, req.body, function(err, data) {
      if (err) {
        res.status(400).json({msg: err});
        console.error(err);
      } else {
        console.log("Successfully modified user " + id);
        res.status(200).json(data);
      }
    });
  });

  router.delete("/:id", function(req, res) {
    var id = req.params.id;
    console.log("DELETE request for /api/user/" + id);
    User.remove({_id: id}, function(err, data) {
      if (err) {
        res.status(400).json({msg: err});
        console.error(err);
      } else {
        console.log("Successfully deleted user " + id);
        res.status(200).json(data);
      }
    });
  });
};
