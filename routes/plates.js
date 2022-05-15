const Controller = require("../controllers/plates");

async function platesRoutes(req, res) {
  if (req.url === "/api/plates" && req.method === "GET") {
    Controller.getPlates(req, res);
  } else if (req.url.match(/\/api\/plates\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    Controller.getPlate(req, res, id);
  } else if (
    req.url.match(/\/api\/account\/\w+\/add\/\w+/) &&
    req.method === "GET"
  ) {
    const account_id = req.url.split("/")[3];
    const plate_id = req.url.split("/")[5];
    Controller.addToAccount(req, res, account_id, plate_id);
  } else if (req.url === "/api/account" && req.method === "GET") {
    Controller.account(req, res);
    // } else if (req.url === "/api/account/add" && req.method === "GET") {
    //     Controller.account(req, res);
    // } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "PUT") {
    //   const id = req.url.split("/")[3];
    //   updateProduct(req, res, id);
    // } else if (
    //   req.url.match(/\/api\/products\/\w+/) &&
    //   req.method === "DELETE"
    // ) {
    //   const id = req.url.split("/")[3];
    //   deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
}

module.exports = {
  platesRoutes
};
