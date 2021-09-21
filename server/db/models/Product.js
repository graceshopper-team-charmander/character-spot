const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "/images/default-product.jpg"
  },
  price: {
    type: Sequelize.DECIMAL(3, 2),
    allowNull: false,
    validate: {
      notEmpty: false,
      min: 0.01
    }
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = { Product };
