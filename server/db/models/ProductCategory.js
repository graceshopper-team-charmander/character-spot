const Sequelize = require("sequelize");
const db = require("../db");
const { snakeCase } = require("../../../utility-funcs/string-manip");

const ProductCategory = db.define("product_category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  code: {
      type: Sequelize.VIRTUAL,
      get() {
        return snakeCase(this.name)
      }
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = {
  ProductCategory
};
