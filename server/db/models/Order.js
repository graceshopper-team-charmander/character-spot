const Sequelize = require("sequelize");
const db = require("../db");
const { Product } = require("./Product");
const { Cart } = require("./Cart");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("PENDING", "FULFILLED"),
    allowNull: false,
    defaultValue: "PENDING"
  }
});

/************************
 Model Methods          *
 ***********************/
/**
 *
 * @param {Sequelize.Model} user
 * @returns {Promise<Sequelize.Model>}
 */
Order.checkout = async (user) => {
  const order = (
    await user.getOrders({
      where: {
        status: "PENDING"
      }
    })
  )[0];
  await order.update({ status: "FULFILLED" });
  await user.createOrder(); //for their next order
  return order.getProducts();
};

/**
 *
 * @param {Sequelize.Model} guestUser
 * @param {[]} cart an array of products from the front end
 * @returns {Promise<Sequelize.Model>}
 */
Order.guestCheckout = async (guestUser, cart) => {
  const orderedProducts = await Cart.addProducts(guestUser, cart); //add the products to their cart
  const order = (await guestUser.getOrders({ where: { status: "PENDING" } }))[0]; //get their order
  await order.update({ status: "FULFILLED" }); //mark fulfilled
  guestUser.createOrder(); //for their next order
  return orderedProducts;
};

module.exports = Order;
