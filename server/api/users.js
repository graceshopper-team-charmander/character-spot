const router = require("express").Router();
const {
  models: { User, Product, Cart }
} = require("../db");
const { requireTokenMiddleware, isAdminMiddleware } = require("../auth-middleware");
const cookieParser = require("cookie-parser");
const cookieSecret = process.env.cookieSecret;
router.use(cookieParser(cookieSecret));

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
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "name", "description", "price", "imageUrl"],
          through: {
            attributes: ["quantity"]
          }
        }
      ]
    });
    res.send(user.products);
  } catch (err) {
    next(err);
  }
});

//update quantity of an item in the cart
router.put("/cart/:productId", requireTokenMiddleware, async (req, res, next) => {
  try {
    // need to validate userId with middleware
    const productId = req.params.productId;
    const userId = req.user.id;
    const newQuantity = req.body.quantity;
    const cartProduct = await Cart.findAll({
      where: {
        userId: userId,
        productId: productId
      }
    });
    // If product is not in the cart, we need to send some sort of error
    if(cartProduct.length > 0){
      await cartProduct[0].update({ quantity: newQuantity })
    }
    const cart = await Cart.findAll({
      where: {
        userId: userId
      }
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//Add a product into a user's cart
router.post("/cart/:productId", requireTokenMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const product = await Product.findByPk(req.params.productId);
    if (product) {
      user.addProduct(product);
    }
    res.send(product);
  } catch (err) {
    next(err);
  }
});

//Delete a product from a user's cart
router.delete("/cart/:productId", requireTokenMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const product = await Product.findByPk(req.params.productId);
    if (product) {
      user.removeProduct(product);
    }
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
