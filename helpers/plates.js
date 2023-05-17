const constants = require("../data/constants");

const {
  DISCOUNT_THRESHOLD,
  DISCOUNT_AMOUNT,
  DELIVERY_COST_LOW,
  DELIVERY_COST_MEDIUM,
  DELIVERY_COST_THRESHOLD_LOW,
  DELIVERY_COST_THRESHOLD_HIGH
} = constants;

module.exports.calculate = async (basket, plate) => {
  try {
    const total = Number(basket.total);
    const deliveryCost = Number(basket.delivery_cost);
    const plates = [...basket.plates, plate.product];
    let newTotal = plates.length === 1 ? plate.price : total + plate.price;
    let discount = basket.discount;

    if (discount === 0 && checkDiscount(plates)) {
      newTotal -= DISCOUNT_AMOUNT;
      discount = DISCOUNT_AMOUNT;
    }

    const { newTotal: finalTotal, deliveryCost: finalDeliveryCost } =
      checkDeliveryCost(newTotal, deliveryCost);

    return {
      ...basket,
      total: finalTotal.toFixed(2),
      delivery_cost: finalDeliveryCost.toFixed(2),
      plates,
      discount,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

function checkDiscount(plates) {
  const count = plates.filter((x) => x === "Red Plate").length;
  return count >= DISCOUNT_THRESHOLD;
}

function checkDeliveryCost(total, deliveryCost) {
  total -= deliveryCost;

  if (total < DELIVERY_COST_THRESHOLD_LOW) {
    total += DELIVERY_COST_LOW;
    deliveryCost = DELIVERY_COST_LOW;
  } else if (total >= DELIVERY_COST_MEDIUM && total < DELIVERY_COST_THRESHOLD_HIGH) {
    total += DELIVERY_COST_MEDIUM;
    deliveryCost = DELIVERY_COST_MEDIUM;
  } else {
    deliveryCost = 0;
  }

  return { newTotal: total, deliveryCost };
}
