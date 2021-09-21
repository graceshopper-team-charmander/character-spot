//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const { Product } = require("./models/Product");
const Cart = require('./models/Cart')

//associations could go here!
User.hasOne(Cart)
Cart.hasOne(User)

Cart.belongsToMany(Product, {through: "cartProducts"})
Product.belongsToMany(Cart, {through: "cartProducts"})

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart
  }
};

