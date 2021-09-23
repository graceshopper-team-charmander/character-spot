const router = require("express").Router();
const {
  models: { User, Product, Cart }
} = require("../db");
const { requireTokenMiddleware, isAdminMiddleware } = require("../auth-middleware");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));

const { idSchema } = require('./validationSchemas')

//GET /api/users - returns a list of all users
router.get("/", requireTokenMiddleware, isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "firstName", "lastName"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//Get the cart of a user
router.get("/cart", requireTokenMiddleware, async (req, res, next) => {
  try {
    const products = await req.user.getProducts()
    res.send(products);
  } catch (err) {
    next(err);
  }
});

//update quantity of an item in the cart
router.put("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    // need to validate userId with middleware
    await idSchema.validate(req.params)
    const productId = req.params.id;
    const newQuantity = req.body.quantity;
    const cartProduct = await Cart.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });
    // If product is not in the cart, we need to send some sort of error
    if(cartProduct){
      await cartProduct.update({ quantity: newQuantity })
    }
    const cart = await req.user.getProducts()
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//Add a product into a user's cart
router.post("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params)
    const user = req.user
    const product = await Product.findByPk(req.params.id);
    if (product) {
      if(await user.hasProduct(product)){
        const cartProduct = await Cart.findOne({
          where: {
            userId: req.user.id,
            productId: req.params.id
          }
        });

      if(cartProduct){
        await cartProduct.update({ quantity: cartProduct.quantity + 1 })
      }
      } else {
        user.addProduct(product);
      }

    }
    const cart = await req.user.getProducts()
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//Delete a product from a user's cart
router.delete("/cart/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params)
    const user = req.user
    const product = await Product.findByPk(req.params.id);
    if (product) {
      user.removeProduct(product);
    }
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
