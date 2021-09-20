const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "/images/default-product.jpg"
  },
  price: {
    type: Sequelize.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      isEmpty: false,
      min: 0.01
    }
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = { Product };
