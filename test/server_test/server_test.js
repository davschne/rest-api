var chai = require("chai");
var expect = chai.expect;
var port = process.env.PORT || 5000;
var url = "localhost:" + port;
var path = "/api/users"
var app = require("../server");

var dummyUser = {
  "username": "dumbo",
  "firstname": "Dummy",
  "lastname": "Dum-dum",
  "email": "dumbo@dummy.dum",
  "address": {
    "street": "1400 Dumb Dr",
    "city": "Dumbarton",
    "state": "DU",
    "zip": "00000"
  }
};

var modifiedUser = {
  "username": "dumbo",
  "firstname": "Dummy",
  "lastname": "Dum-dum",
  "email": "dumbo@dummy.dum",
  "address": {
    "street": "1400 Dumb Dr",
    "city": "Dumbarton",
    "state": "DU",
    "zip": "11111"
  }
};

var id;

chai.use(require("chai-http"));

describe("index.js", function() {
  describe("POST request", function() {
    it("should respond to a POST request at /api/users with a JSON success message", function(done) {
      chai.request(url)
        .post(path)
        .type("json")
        .send(dummyUser)
        .end(function(err, res) {
          id = res.body.id;                // SAVE id for later use
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe("GET request", function() {
    it("should respond to a GET request at /api/users with a JSON array of all users", function(done) {
      chai.request(url)
        .get(path)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("array");
          done();
        });
    });
    it("should respond to a GET request for an existing id with the user object in JSON", function(done) {
      chai.request(url)
        .get(path + "/" + id)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property("username", "dumbo");
          done();
        });
    });
  });
  describe("PUT request", function() {
    it("should respond to a PUT request for an existing id with a JSON success message", function(done) {
      chai.request(url)
        .put(path + "/" + id)
        .type("json")
        .send(modifiedUser)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe("DELETE request", function() {
    it("should respond to a DELETE request for an existing id with a JSON success message", function(done) {
      chai.request(url)
        .delete(path + "/" + id)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });
});
