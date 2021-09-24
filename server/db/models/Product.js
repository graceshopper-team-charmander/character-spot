const Sequelize = require("sequelize");
const db = require("../db");
const { Op } = require("sequelize");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
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

/************************
 Sequelize Helpers      *
 ***********************/
/**
 * returns a sequelize fragment for filtering by category
 * @param {string|null} categories
 * @returns {{where: sequelize.where}|{}}
 */
const categoryFilter = ({ categories }) => {
  console.log("categories", categories);
  if (categories) {
    return {
      where: {
        id: {
          [Op.in]: [1, 2, 3]
        }
      }
    };
  }
  return {};
};

module.exports = { Product, categoryFilter };
