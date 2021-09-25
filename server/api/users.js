const router = require("express").Router();
const {
  models: { User, Product, Cart, Order }
} = require("../db");
const { requireTokenMiddleware} = require("../auth-middleware");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));

const { idSchema, cartProductSchema } = require("./validationSchemas");
const { updateCartQuantity, refactorCartItems, refactorSingleCartItem } = require("../db/models/Cart");

router.get("/cart", requireTokenMiddleware, async (req, res, next) => {
  try {
    res.json(refactorCartItems(await Cart.getUserCartItems(req.user)));
  } catch (err) {
    next(err);
  }
});

//Checkout a cart
router.put("/checkout", requireTokenMiddleware, async (req, res, next) => {
  try {
    const order = await req.user.getOrders({
      where: {
        status: "PENDING"
      }
    });
    await order[0].update({ status: "FULFILLED" });
    await req.user.createOrder();
    res.send(order);
  } catch (err) {
    next(err);
  }
});

//PUT /api/users/cart/:id - update quantity of an item in the cart for a logged in user with a given productId
router.put("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    // need to validate userId with middleware
    await idSchema.validate(req.params);
    await cartProductSchema.validate(req.body);
    res.send(Cart.updateCartQuantity(req.user, req.params.id, req.body.quantity));
  } catch (err) {
    next(err);
  }
});

//Add a product into a user's cart
router.post("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    res.send(refactorSingleCartItem(await Cart.updateCartQuantity(req.user, req.params.id)));
  } catch (err) {
    next(err);
  }
});

//Delete a product from a user's cart
router.delete("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    const order = await req.user.getOrders({
      where: {
        status: "PENDING"
      }
    });
    await order[0].removeProduct(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
