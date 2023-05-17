const Controller = require("../controllers/plates");

async function platesRoutes(req, res) {
  const { url, method } = req;
  let match;

  switch (true) {
    case url === "/api/plates" && method === "GET":
      Controller.getPlates(req, res);
      break;

    case (match = url.match(/^\/api\/plates\/(\w+)$/)) && method === "GET":
      const [_, id] = match;
      Controller.getPlate(req, res, id);
      break;

    case (match = url.match(/^\/api\/account\/(\w+)\/add\/(\w+)$/)) && method === "GET":
      const [__, account_id, plate_id] = match;
      Controller.addToAccount(req, res, account_id, plate_id);
      break;

    case url === "/api/account" && method === "GET":
      Controller.account(req, res);
      break;

    default:
      handleRouteNotFound(res);
  }
}

function handleRouteNotFound(res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
}

module.exports = {
  platesRoutes
};
