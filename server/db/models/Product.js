const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "/images/default-product.jpg"
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1
    }
  },

  description: {
    type: Sequelize.TEXT
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
});

module.exports = { Product };
