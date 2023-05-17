const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const redis = require("async-redis");
const Plates = require("../models/plates");
const { platesRoutes } = require("../routes/plates");

dotenv.config({ path: path.resolve(__dirname, "../environment/.env") });

const connectDBRedis = () => {
  return new Promise((resolve, reject) => {
    try {
      global.redisClient = redis.createClient(
        process.env.REDIS_PORT,
        process.env.REDIS_HOST
      );
      global.redisClient.auth(process.env.REDIS_PASS);
      global.redisClient.on("connect", () => {
        console.log("Redis connection successfully established");
        resolve();
      });

      global.redisClient.on("error", (err) => {
        console.error(`Redis Error ${err}`);
        reject(err);
      });

    } catch (error) {
      console.error("Redis Cloud connection error", error);
      reject(error);
    }
  });
};


const handleRequest = async (req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    let result = {
      rules: [],
      plates: await Plates.findAll(),
    };

    result.rules.push(
      "Orders under $50 cost $4.95. For orders under $90, delivery costs $2.95. Orders of $90 or more have free delivery."
    );
    result.rules.push("Buy one red plate, get the second half price.");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } else if (req.url && req.method) {
    await platesRoutes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

const startServer = async () => {
  const PORT = process.env.PORT || 5000;

  const server = http.createServer(handleRequest);

  await connectDBRedis();

  server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });

  return server;
};

module.exports = startServer;