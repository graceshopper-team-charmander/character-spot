const Sequelize = require("sequelize");
const db = require("../db");

const ProductCategory = db.define("product_category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = {
  ProductCategory
};
