//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block

describe("Plates", () => {
  it("it should GET all the books", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/api/plates")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object")
        done();
      });
  });
  it("it should GET a book", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/api/plates/R01")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object")
        done();
      });
  });
  it("it should creates an account", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/api/account")
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object")
        done();
      });
  });
  it("it should adds product to the account", (done) => {
    chai
      .request("http://localhost:5000")
      .get("/api/account/3w393/add/R01")
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object")
        done();
      });
  });
});
