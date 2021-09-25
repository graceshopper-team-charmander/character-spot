const router = require("express").Router();
const {
  models: { User, Product, Cart }
} = require("../db");
const { requireTokenMiddleware, isAdminMiddleware } = require("../auth-middleware");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));

const { sendEmail, emailBody} = require("../email")

const { idSchema } = require("./validationSchemas");

const test = "freda.hamill81@ethereal.email"

//Get the cart of a user
router.get("/cart", requireTokenMiddleware, async (req, res, next) => {
  try {
    const order = await req.user.getOrders({
      where: {
        status: "PENDING"
      }
    });
    const products = await order[0].getProducts();
    res.send(products);
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
    console.log('order', await order[0].getProducts())
    const emailBodyHTML = emailBody(await order[0].getProducts())
    console.log(emailBodyHTML)
    sendEmail({to: test, html: emailBodyHTML })
    res.send(order);
  } catch (err) {
    next(err);
  }
});

//update quantity of an item in the cart
router.put("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    // need to validate userId with middleware
    await idSchema.validate(req.params);
    const productId = req.params.id;
    const newQuantity = req.body.quantity;

    const order = await req.user.getOrders({
      where: {
        status: "PENDING"
      }
    });

    const cartProduct = await order[0].getProducts({
      where: {
        id: productId
      }
    });
    // If product is not in the cart, we need to send some sort of error
    if (cartProduct[0]) {
      await cartProduct[0].cart.update({ quantity: newQuantity });
    }

    res.send(cartProduct[0]);
  } catch (err) {
    next(err);
  }
});

//Add a product into a user's cart
router.post("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    const user = req.user;
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    const order = await req.user.getOrders({
      where: {
        status: "PENDING"
      }
    });
    if (product) {
      //does order have the product?
      const cartProduct = await order[0].getProducts({
        where: {
          id: productId
        }
      });
      if (cartProduct[0]) {
        await cartProduct[0].cart.update({ quantity: cartProduct[0].cart.quantity + 1 });
      } else {
        await order[0].addProduct(product);
      }
    }
    const cart = await order[0].getProducts();
    res.send(cart);
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
