const Sequelize = require("sequelize");
const db = require("../db");
const { Product } = require("./Product");
const { cartProductQuantitySchema, idSchema } = require("../../api/validationSchemas");

const Cart = db.define("cart", {
  cartQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
});

// const getUserCart = (userId, productId) => {
//   return db.query(`
//       SELECT orders.id as "orderId",
//              products.id,
//              products.name,
//              products.price,
//              products."imageUrl",
//              products.quantity,
//              carts."cartQuantity"
//       FROM orders
//                JOIN carts on orders.id = carts."orderId"
//                JOIN products on carts."productId" = ${productId || "products.id"}
//       WHERE orders.status = 'PENDING'
//         AND orders."userId" = ${userId}
//   `);
// };

const refactorSingleCartItem = (item) => {
  item = Array.isArray(item) ? item[0] : item;
  return {
    id: item["id"],
    name: item["name"],
    imageUrl: item["imageUrl"],
    price: item["price"],
    quantity: item["quantity"],
    cartQuantity: item.cart.cartQuantity
  };
};

const refactorCartItems = (items) => {
  const results = [];
  items.forEach((item) => {
    results.push(refactorSingleCartItem(item));
  });
  return results;
};

/*********************
 * Model Methods     *
 *********************/
/**
 *
 * @param {Sequelize.Model} user
 * @param {[{}]} products
 */
Cart.addProducts = async (user, products) => {
  let order = await user.getOrders({
    where: {
      status: "PENDING"
    }
  });
  order = order[0];
  for (let i = 0; i < products.length; i++) {
    await cartProductQuantitySchema.validate(products[i]);
    await idSchema.validate(products[i]);
    const { id, cartQuantity } = products[i];
    const dbProduct = await Product.findByPk(id);
    let hasProduct = await order.getProducts({ where: { id } });
    if (hasProduct.length) {
      await hasProduct[0].cart.update({
        cartQuantity: hasProduct[0].cart.cartQuantity + cartQuantity
      });
    } else {
      await order.addProduct(dbProduct);
      const orderedProduct = (await order.getProducts({ where: { id } }))[0];
      await orderedProduct.cart.update({
        cartQuantity: cartQuantity
      });
    }
  }
  return order.getProducts();
};

/**
 *
 * @param {Sequelize.Model} user
 * @param {number|undefined} productId - if specified returns a specific item
 * @returns {Promise<Sequelize.Model[]>}
 *
 */
Cart.getUserCartItems = async (user, productId) => {
  const order = await user.getOrders({
    where: {
      status: "PENDING"
    }
  });
  return order[0].getProducts(productId ? { where: { id: productId } } : {});
};

/**
 *
 * @param {number} user
 * @param {number} productId
 * @param {undefined|number} newQuantity
 * @returns {Promise<{quantity, price, imageUrl, name, id, cartQuantity}>}
 */
Cart.updateCartQuantity = async (user, productId, newQuantity) => {
  const order = await user.getOrders({
    where: {
      status: "PENDING"
    }
  });
  const cartProduct = (await order[0].getProducts({
    where: {
      id: productId
    }
  }))[0];
  if (cartProduct) {
    await cartProduct.cart.update({ cartQuantity: newQuantity ? newQuantity : cartProduct.cart.cartQuantity + 1});
    return cartProduct;
  } else {
    const product = await Product.findByPk(productId);
    await order[0].addProduct(product);
    return Cart.getUserCartItems(user, productId);
  }
};

module.exports = {
  Cart,
  refactorCartItems,
  refactorSingleCartItem
};
