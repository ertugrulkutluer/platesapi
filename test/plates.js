//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let startServer = require("../app/app");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block

describe("Plates", () => {

  let server;

  before(async function () {
    this.timeout(5000);
    server = await startServer();
  });

  it("it should GET all the books", function(done) {
    chai
      .request("http://localhost:8080")
      .get("/api/plates")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        done();
      });
  });

  it("it should GET a book", function(done) {
    chai
      .request("http://localhost:8080")
      .get("/api/plates/R01")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        done();
      });
  });

  it("it should creates an account", function(done) {
    chai
      .request("http://localhost:8080")
      .get("/api/account")
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object");
        this.accountId = res.body.account_id;
        done();
      });
  });

  it("it should adds product to the account", function(done) {
    chai
      .request("http://localhost:8080")
      .get(`/api/account/${this.accountId}/add/R01`)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object");
        done();
      });
  });

  after(function (done) {
    server.close(() => {
      global.redisClient.quit(done);
    });
  });
});
