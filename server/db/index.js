//this is the access point for all things database related!

const db = require("./db");

const {User, userSort} = require("./models/User");
const { Product, categoryFilter } = require("./models/Product");
const { ProductCategory } = require("./models/ProductCategory");

const {Cart} = require('./models/Cart')
const Order = require('./models/Order')


//associations could go here!

//Cart is the through table between order and products, and holds
//the current pending cart of the user
Order.belongsToMany(Product, {through: Cart})
Product.belongsToMany(Order, {through: Cart})

//Order is a table that has all pending and fulfilled orders for each user
User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(ProductCategory, {through: 'product_category_join', as: 'categories'});
ProductCategory.belongsToMany(Product, {through: 'product_category_join', as: 'categories'});

User.belongsToMany(Product, {through: 'wishlist_join', as: 'wishlistItems'});
Product.belongsToMany(User, {through: 'wishlist_join', as: 'wishlistItems'});

module.exports = {
  db,
  models: {
    User,
    Product,
    ProductCategory,
    Cart,
    Order,
    categoryFilter,
    userSort
  }
};

