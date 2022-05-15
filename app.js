const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const redis = require("async-redis");
const Plates = require("./models/plates");

const _routes = require("./routes/plates");

const connectDBRedis = () => {
  try {
    // redis client
    //   global.redisClient = redis.createClient(process.env.REDIS_URI);

    global.redisClient = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    );
    global.redisClient.auth(process.env.REDIS_PASS);
    global.redisClient.on("connect", async () => {});

    global.redisClient.on("error", (err) => {
      console.error(`Redis Error ${err}`);
    });
  } catch (error) {
    console.error("Redis Cloud connection error", error);
  }
};

async function startServer() {
  try {
    // .env configuration
    dotenv.config({ path: path.resolve(__dirname + "/environment/.env") }); // This usage is necessary for MacOS users.
    // Port selection
    const PORT = process.env.PORT || 5000;

    const server = http.createServer(async (req, res) => {
      if (req.url === "/api" && req.method === "GET") {
        let result = {
          rules: []
        };
        result.plates = await Plates.findAll();
        result.rules.push(["Orders under $50 cost $4.95. For orders under $90, delivery costs $2.95. Orders of $90 or more have free delivery."]);
        result.rules.push(["Buy one red plate, get the second half price."])
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } else if (req.url && req.method) {
        // If plates routes
        await _routes.platesRoutes(req, res);
      }
      // If no route
      else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
      }
    });

    try {
      connectDBRedis();
    } catch (error) {
      console.error("DB Redis Socket connection error", error);
    }

    server.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (e) {
    console.log("Error starting server:", err);
  }
}

module.exports = startServer();
