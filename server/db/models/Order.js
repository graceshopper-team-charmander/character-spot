const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("PENDING", "FULFILLED"),
    allowNull: false,
    defaultValue: "PENDING"
  }
});

module.exports = Order;
