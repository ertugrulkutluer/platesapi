const Plates = require("../models/plates");
const PlatesHelper = require("../helpers/plate")



module.exports.getPlates = async (req, res) => {
  try {
    const plates = await Plates.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(plates));
  } catch (error) {
    console.log(error);
  }
};

module.exports.getPlate = async (req, res, id) => {
  try {
    const plate = await Plates.findById(id);

    if (!plate) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Plate Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(plate));
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports.account = async (req, res) => {
  try {
    const account_id = Math.random().toString(36).slice(2, 7);
    const redis_key = `plates_${account_id}`;
    const redis_value = {
      plates: [],
      total: 0,
      delivery_cost: 0,
      discount: 0
    };
    await global.redisClient.hmset(redis_key, {
      val: JSON.stringify(redis_value)
    });
    await global.redisClient.expire(redis_key, 3 * 24 * 60 * 60); // set expiry to 72 h

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ account_id: account_id, basket: redis_value })
    );
  } catch (error) {
    console.log(error);
  }
};


module.exports.addToAccount = async (req, res, account_id, id) => {
  try {
    const plate = await Plates.findById(id);

    let redis_string = await global.redisClient.hgetall(`plates_${account_id}`);
    if (!redis_string) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Plate Not Found" }));
    }
    const basket = JSON.parse(redis_string.val);

    const result = await PlatesHelper.calculate(basket, plate);
    await global.redisClient.hmset(`plates_${account_id}`, {
        val: JSON.stringify(result)
      });
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
};