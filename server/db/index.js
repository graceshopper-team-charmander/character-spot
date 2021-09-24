//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const { Product, categoryFilter } = require("./models/Product");
const { ProductCategory } = require("./models/ProductCategory");

const Cart = require('./models/Cart')


//associations could go here!
User.belongsToMany(Product, {through: Cart})
Product.belongsToMany(User, {through: Cart})

Product.belongsToMany(ProductCategory, {through: 'product_category_join', as: 'categories'});
ProductCategory.belongsToMany(Product, {through: 'product_category_join', as: 'categories'});

module.exports = {
  db,
  models: {
    User,
    Product,
    ProductCategory,
    Cart,
    categoryFilter
  }
};

