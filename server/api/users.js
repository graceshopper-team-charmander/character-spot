const router = require("express").Router();
const {
  models: { Cart, User, Order, Product }
} = require("../db");
const { requireTokenMiddleware } = require("../auth-middleware");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));
const { idSchema, cartProductQuantitySchema } = require("./validationSchemas");
const { refactorCartItems, refactorSingleCartItem } = require("../db/models/Cart");
const { userSignupSchema } = require("../api/validationSchemas");
const faker = require("faker");

<<<<<<< HEAD
const { sendConfirmEmail, emailBody} = require("../email/email")
const test = "freda.hamill81@ethereal.email"
=======
const { sendEmail, emailBody } = require("../email/email");

const test = "freda.hamill81@ethereal.email";
>>>>>>> main

//Get the cart of a user
//GET /api/users/cart - returns the users cart
router.get("/cart", requireTokenMiddleware, async (req, res, next) => {
  try {
    res.json(refactorCartItems(await Cart.getUserCartItems(req.user)));
  } catch (err) {
    next(err);
  }
});

//POST /api/users/cart - sets the users cart with items, and returns the updated cart
router.post("/cart", requireTokenMiddleware, async (req, res, next) => {
  try {
    const mergedCart = refactorCartItems(await Cart.addProducts(req.user, req.body));
    res.send(mergedCart);
  } catch (err) {
    next(err);
  }
});

//PUT /api/users/cart - checks the users cart out
router.put("/checkout", requireTokenMiddleware, async (req, res, next) => {
  try {
    const order = await req.user.getOrders({
      where: {
        status: "PENDING"
      }
    });
    //create email to send
    const name = req.user.firstName
    const products = await order[0].getProducts()
    const orderNumber = order[0].id
    const date = order[0].createdAt
    const emailBodyHTML = await emailBody(name, products, orderNumber, date)

    const orderedProducts = await Order.checkout(req.user);
    await Product.updateInventory(orderedProducts);

    //send email
    sendConfirmEmail({to: req.user.email, html: emailBodyHTML })
    //@todo: quantity checking needs to occur before anything else

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//PUT /api/users/guest-checkout - checks the users cart out
router.put("/guest-checkout", async (req, res, next) => {
  try {
    //@todo: quantity checking needs to occur before anything else
    req.body.password =
      faker.internet.password() + faker.internet.password() + Math.floor(Math.random() * 1000);
    await userSignupSchema.validate(req.body);
    const guestUser = await User.makeOrFind(req.body); //find or create a guest account
    const orderedProducts = await Order.guestCheckout(guestUser, req.body.cart);
    await Product.updateInventory(orderedProducts);
    //@todo: send email
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//PUT /api/users/cart/:id - update quantity of an item in the cart for a logged in user with a given productId
router.put("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    // need to validate userId with middleware
    await idSchema.validate(req.params);
    await cartProductQuantitySchema.validate(req.body);
    res.send(Cart.updateCartQuantity(req.user, req.params.id, req.body.quantity));
  } catch (err) {
    next(err);
  }
});

//POST /api/users/cart/:id - adds a product into a user's cart
router.post("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    res.send(refactorSingleCartItem(await Cart.updateCartQuantity(req.user, req.params.id)));
  } catch (err) {
    next(err);
  }
});

//DELETE /api/users/cart/:id  deletes a product from a user's cart
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
