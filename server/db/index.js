//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const { Product } = require("./models/Product");
const Cart = require('./models/Cart')
const Order = require('./models/Order')

//associations could go here!

//Cart is the through table between order and products, and holds
//the current pending cart of the user
Order.belongsToMany(Product, {through: Cart})
Product.belongsToMany(Order, {through: Cart})

//Order is a table that has all pending and fulfilled orders for each user
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart
  }
};

