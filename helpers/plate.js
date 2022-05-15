module.exports.calculate = async (basket, plate) => {
  try {
    basket.total = Number(basket.total);
    basket.delivery_cost = Number(basket.delivery_cost);
    if (basket.plates.length === 0 && basket.total === 0) {
      basket.plates.push(plate.product);
      basket.total = plate.price;
    } else {
      basket.plates.push(plate.product);
      basket.total += plate.price;
      if (basket.discount === 0 && checkDiscount(basket.plates)) {
        basket.total = basket.total - 16.475;
        basket.discount = 16.475;
      }
    }
    basket = checkDeliveryCost(basket);
    basket.total = basket.total.toFixed(2);
    basket.delivery_cost = basket.delivery_cost.toFixed(2);
    return basket;
  } catch (e) {
    console.error(e);
  }
};

function checkDiscount(basket) {
  try {
    const count = basket.filter((x) => x === "Red Plate").length;
    return count >= 2 ? true : false;
  } catch (e) {
    console.error(e);
  }
}

function checkDeliveryCost(basket) {
  try {
    basket.total = basket.total - basket.delivery_cost;
    if (basket.total < 50) {
      basket.total = basket.total + 4.95;
      basket.delivery_cost = 4.95;
      return basket;
    } else if (basket.total >= 50 && basket.total < 90) {
      basket.total = basket.total + 2.95;
      basket.delivery_cost = 2.95;
      return basket;
    } else {
      basket.delivery_cost = 0;
      return basket;
    }
  } catch (e) {
    console.error(e);
  }
}
